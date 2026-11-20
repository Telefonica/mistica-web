const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const {setImmediate: yieldToRequests} = require('timers/promises');
const {git, listBranches, createComparison, readImage, compareImages} = require('./compare');

const assetFiles = {
    '/': ['index.html', 'text/html'],
    '/app.js': ['app.js', 'text/javascript'],
    '/styles.css': ['styles.css', 'text/css'],
};
const maximumBodyBytes = 64 * 1024;
const maximumImageCacheBytes = 64 * 1024 * 1024;

async function readBody(request) {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
        chunks.push(chunk);
        bytes += chunk.length;
        if (bytes > maximumBodyBytes) throw new Error('La petición es demasiado grande.');
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function startServer({repo = process.cwd(), port = 0, base, head} = {}) {
    repo = (await git(repo, ['rev-parse', '--show-toplevel'])).trim();
    const stateDirectory = path.join(repo, 'reports', 'screenshot-review');
    const stateFile = path.join(stateDirectory, 'reviews.json');
    let reviewed;
    try {
        reviewed = new Set(JSON.parse(await fs.readFile(stateFile, 'utf8')));
    } catch (error) {
        if (error.code !== 'ENOENT')
            throw new Error(`No se puede leer el progreso guardado en ${stateFile}: ${error.message}`);
        reviewed = new Set();
    }
    const comparisons = new Map();
    const imageCache = new Map();
    let cachedBytes = 0;
    let analysisQueue = Promise.resolve();
    let saveQueue = Promise.resolve();
    let closing = false;
    const imageBuffer = async (image) => {
        if (!image) return null;
        if (imageCache.has(image.sha)) return imageCache.get(image.sha);
        const buffer = await readImage(repo, image);
        imageCache.set(image.sha, buffer);
        cachedBytes += buffer.length;
        while (cachedBytes > maximumImageCacheBytes && imageCache.size > 1) {
            const first = imageCache.keys().next().value;
            cachedBytes -= imageCache.get(first).length;
            imageCache.delete(first);
        }
        return buffer;
    };
    const touch = (comparison, item) => {
        item.version = ++comparison.version;
    };
    const summary = (comparison) => ({
        ...comparison.counts,
        analyzed: comparison.items.filter((item) => item.metrics || item.error).length,
        visualChanges: comparison.items.filter((item) => item.metrics?.different > 0).length,
        identicalPixels: comparison.items.filter((item) => item.metrics?.different === 0).length,
        errors: comparison.items.filter((item) => item.error).length,
        reviewed: comparison.items.filter((item) => item.reviewed).length,
        pending: comparison.items.filter((item) => !item.reviewed).length,
    });
    const analyze = async (comparison) => {
        for (const item of comparison.items) {
            if (closing) return;
            if (item.metrics || item.error) continue;
            try {
                const [before, after] = await Promise.all([
                    imageBuffer(item.before),
                    imageBuffer(item.after),
                ]);
                item.metrics = (await compareImages(before, after)).metrics;
            } catch (error) {
                item.error = `No se ha podido comparar esta captura: ${error.message}`;
            }
            touch(comparison, item);
            await yieldToRequests();
        }
        comparison.complete = true;
    };
    const json = (response, value, status = 200) => {
        response.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(value));
    };
    const server = http.createServer(async (request, response) => {
        response.setHeader('Cache-Control', 'no-store');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; base-uri 'none'; frame-ancestors 'none'"
        );
        try {
            const host = request.headers.host || '';
            if (!/^(127\.0\.0\.1|localhost):\d+$/.test(host))
                return json(response, {error: 'Host no permitido.'}, 403);
            const url = new URL(request.url, `http://${host}`);
            if (request.headers.origin && request.headers.origin !== url.origin)
                return json(response, {error: 'Origen no permitido.'}, 403);
            if (request.method === 'GET' && assetFiles[url.pathname]) {
                const [filename, type] = assetFiles[url.pathname];
                response.writeHead(200, {'Content-Type': `${type}; charset=utf-8`});
                return response.end(await fs.readFile(path.join(__dirname, filename)));
            }
            if (request.method === 'GET' && url.pathname === '/api/branches') {
                const branches = await listBranches(repo);
                return json(response, {
                    ...branches,
                    base: base || branches.base,
                    head: head || branches.head,
                });
            }
            if (request.method === 'POST' && url.pathname === '/api/comparisons') {
                if (!request.headers['content-type']?.startsWith('application/json'))
                    return json(response, {error: 'Se requiere JSON.'}, 415);
                const body = await readBody(request);
                const comparison = await createComparison(repo, body.base, body.head, body.mode);
                const existing = comparisons.get(comparison.id);
                if (existing)
                    return json(response, {
                        ...existing,
                        base: comparison.base,
                        head: comparison.head,
                        selectedBase: comparison.selectedBase,
                        summary: summary(existing),
                    });
                if (comparisons.size >= 8) {
                    const completed = [...comparisons].find(([, value]) => value.complete);
                    if (!completed)
                        return json(
                            response,
                            {error: 'Hay varias comparaciones analizándose. Espera a que termine alguna.'},
                            429
                        );
                    comparisons.delete(completed[0]);
                }
                comparison.version = 1;
                comparison.complete = comparison.items.length === 0;
                for (const item of comparison.items) {
                    item.reviewed = reviewed.has(item.fingerprint);
                    item.version = 1;
                }
                comparisons.set(comparison.id, comparison);
                analysisQueue = analysisQueue
                    .then(() => analyze(comparison))
                    .catch((error) => console.error(error.message));
                return json(response, {...comparison, summary: summary(comparison)});
            }
            const match = url.pathname.match(
                /^\/api\/comparisons\/([a-f0-9]{20})(?:\/([a-f0-9]{20})(?:\/(before|after|diff))?)?$/
            );
            const comparison = match && comparisons.get(match[1]);
            if (!comparison) return json(response, {error: 'Comparación no encontrada.'}, 404);
            if (request.method === 'GET' && !match[2]) {
                const since = Number(url.searchParams.get('since') || 0);
                return json(response, {
                    version: comparison.version,
                    complete: comparison.complete,
                    summary: summary(comparison),
                    updates: comparison.items.filter((item) => item.version > since),
                });
            }
            const item = comparison.items.find((candidate) => candidate.id === match[2]);
            if (!item) return json(response, {error: 'Captura no encontrada.'}, 404);
            if (request.method === 'POST' && !match[3]) {
                if (!request.headers['content-type']?.startsWith('application/json'))
                    return json(response, {error: 'Se requiere JSON.'}, 415);
                const body = await readBody(request);
                if (typeof body.reviewed !== 'boolean')
                    return json(response, {error: 'Estado de revisión no válido.'}, 400);
                if (body.reviewed) reviewed.add(item.fingerprint);
                else reviewed.delete(item.fingerprint);
                for (const value of comparisons.values()) {
                    for (const candidate of value.items) {
                        if (candidate.fingerprint === item.fingerprint) {
                            candidate.reviewed = body.reviewed;
                            touch(value, candidate);
                        }
                    }
                }
                saveQueue = saveQueue.then(async () => {
                    await fs.mkdir(stateDirectory, {recursive: true});
                    await fs.writeFile(stateFile + '.tmp', JSON.stringify([...reviewed], null, 2) + '\n');
                    await fs.rename(stateFile + '.tmp', stateFile);
                });
                await saveQueue;
                return json(response, {reviewed: item.reviewed, summary: summary(comparison)});
            }
            if (request.method === 'GET' && match[3]) {
                let buffer;
                if (match[3] === 'diff') {
                    const [before, after] = await Promise.all([
                        imageBuffer(item.before),
                        imageBuffer(item.after),
                    ]);
                    const result = await compareImages(before, after, true);
                    buffer = result.diff;
                    if (!item.metrics) {
                        item.metrics = result.metrics;
                        touch(comparison, item);
                    }
                } else buffer = await imageBuffer(item[match[3]]);
                if (!buffer) return json(response, {error: 'Esta captura no existe en esa versión.'}, 404);
                response.writeHead(200, {'Content-Type': 'image/png'});
                return response.end(buffer);
            }
            return json(response, {error: 'Ruta no encontrada.'}, 404);
        } catch (error) {
            if (!response.headersSent) json(response, {error: error.message}, 400);
            else response.end();
        }
    });
    await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, '127.0.0.1', resolve);
    });
    return {
        url: `http://127.0.0.1:${server.address().port}`,
        close: async () => {
            closing = true;
            await saveQueue;
            await new Promise((resolve) => server.close(resolve));
        },
    };
}

if (require.main === module) {
    const options = {};
    const args = process.argv.slice(2);
    if (args.includes('--help') || args.includes('-h')) {
        console.log('Uso: yarn review-screenshots [--repo ruta] [--base rama] [--head rama] [--port número]');
        console.log('Abre un visor local. Lee referencias Git sin cambiar tests ni imágenes.');
        process.exit(0);
    }
    for (let i = 0; i < args.length; i += 2) {
        const flag = args[i];
        const value = args[i + 1];
        if (!['--repo', '--port', '--base', '--head'].includes(flag) || value === undefined) {
            console.error(
                'Uso: node scripts/review-screenshots/server.js [--repo ruta] [--base rama] [--head rama] [--port número]'
            );
            process.exit(1);
        }
        options[flag.slice(2)] = flag === '--port' ? Number(value) : value;
    }
    startServer(options)
        .then((server) => {
            console.log(`Visor de capturas: ${server.url}`);
            console.log('Solo lectura de Git. Ctrl+C para cerrar.');
            for (const signal of ['SIGINT', 'SIGTERM'])
                process.once(signal, () => server.close().then(() => process.exit(0)));
        })
        .catch((error) => {
            console.error(error.message);
            process.exitCode = 1;
        });
}

module.exports = {startServer};
