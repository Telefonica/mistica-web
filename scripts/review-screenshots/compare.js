const {execFile} = require('child_process');
const {promisify} = require('util');
const {createHash} = require('crypto');
const path = require('path');
const Jimp = require('jimp');

const exec = promisify(execFile);
const snapshotDirectory = /\/__(?:image|playwright)_snapshots__\//;
const isSnapshot = (file) => snapshotDirectory.test('/' + file) && file.toLowerCase().endsWith('.png');
const canonicalPath = (file) => file.replace(snapshotDirectory, '/__snapshots__/');
const legacyCasePath = (file) =>
    canonicalPath(file)
        .replace(/-case-\d+(?=-\d+-snap\.png$)/, '')
        .replace(/-\d+-snap\.png$/, '-snap.png');

async function git(repo, args, binary = false) {
    const {stdout} = await exec('git', args, {
        cwd: repo,
        encoding: binary ? 'buffer' : 'utf8',
        maxBuffer: 64 * 1024 * 1024,
        windowsHide: true,
    });
    return stdout;
}

async function resolveRevision(repo, revision) {
    if (
        typeof revision !== 'string' ||
        !revision ||
        revision.startsWith('-') ||
        revision.includes('\0') ||
        revision.length > 512
    ) {
        throw new Error('Selecciona una rama o un commit válido.');
    }
    try {
        return (
            await git(repo, ['rev-parse', '--verify', '--end-of-options', `${revision}^{commit}`])
        ).trim();
    } catch {
        throw new Error(
            `No se encuentra la referencia «${revision}». Ejecuta git fetch si es una rama remota nueva.`
        );
    }
}

async function listBranches(repo) {
    const [output, current] = await Promise.all([
        git(repo, ['for-each-ref', '--format=%(refname:short)', 'refs/heads', 'refs/remotes']),
        git(repo, ['branch', '--show-current']),
    ]);
    const branches = output
        .trim()
        .split('\n')
        .filter((name) => name && !name.endsWith('/HEAD'));
    const currentBranch = current.trim();
    return {
        branches,
        base:
            ['origin/master', 'master', 'origin/main', 'main'].find((name) => branches.includes(name)) ||
            'HEAD',
        head: branches.includes(`origin/${currentBranch}`)
            ? `origin/${currentBranch}`
            : currentBranch || 'HEAD',
    };
}

function parseTree(output) {
    const files = new Map();
    for (const record of output.split('\0')) {
        if (!record) continue;
        const separator = record.indexOf('\t');
        const [, type, sha] = record.slice(0, separator).split(' ');
        const file = record.slice(separator + 1);
        if (isSnapshot(file) && type === 'blob') files.set(file, {path: file, sha});
    }
    return files;
}

function parseChanges(output) {
    const tokens = output.split('\0');
    const changes = [];
    for (let i = 0; i < tokens.length - 1; ) {
        const status = tokens[i++];
        const first = tokens[i++];
        if (status.startsWith('R') || status.startsWith('C')) {
            changes.push({status: status[0], before: first, after: tokens[i++]});
        } else {
            changes.push({
                status,
                before: status === 'A' ? null : first,
                after: status === 'D' ? null : first,
            });
        }
    }
    return changes;
}

function pairSnapshots(changes, beforeFiles, afterFiles) {
    const pairs = [];
    const removed = new Map();
    const added = new Map();
    for (const change of changes) {
        const before = beforeFiles.get(change.before) || null;
        const after = afterFiles.get(change.after) || null;
        if (!before && !after) continue;
        if (before && after)
            pairs.push({before, after, type: change.status === 'R' ? 'renamed' : 'modified'});
        else if (before) removed.set(before.path, before);
        else added.set(after.path, after);
    }
    const matchUnique = (candidates, key, type) => {
        const groups = new Map();
        for (const before of candidates.values()) {
            const group = key(before);
            if (!groups.has(group)) groups.set(group, []);
            groups.get(group).push(before);
        }
        const afterGroups = new Map();
        for (const after of added.values()) {
            const group = key(after);
            if (!afterGroups.has(group)) afterGroups.set(group, []);
            afterGroups.get(group).push(after);
        }
        for (const [group, before] of groups) {
            const after = afterGroups.get(group);
            // Ambiguous filenames stay separate rather than silently pairing different tests.
            if (before.length !== 1 || after?.length !== 1) continue;
            pairs.push({before: before[0], after: after[0], type});
            candidates.delete(before[0].path);
            added.delete(after[0].path);
        }
    };
    matchUnique(removed, (file) => canonicalPath(file.path), 'renamed');
    matchUnique(removed, (file) => legacyCasePath(file.path), 'renamed');
    matchUnique(removed, (file) => file.sha, 'renamed');

    // Staged Playwright references can be compared with the legacy reference still in the base.
    const legacyFiles = new Map(
        [...beforeFiles].filter(([file]) => file.includes('/__image_snapshots__/') && afterFiles.has(file))
    );
    const prepared = new Map([...added].filter(([file]) => file.includes('/__playwright_snapshots__/')));
    const otherAdded = new Map([...added].filter(([file]) => !prepared.has(file)));
    added.clear();
    for (const [file, value] of prepared) added.set(file, value);
    matchUnique(legacyFiles, (file) => canonicalPath(file.path), 'prepared');
    matchUnique(legacyFiles, (file) => legacyCasePath(file.path), 'prepared');
    for (const [file, value] of otherAdded) added.set(file, value);
    for (const before of removed.values()) pairs.push({before, after: null, type: 'deleted'});
    for (const after of added.values()) pairs.push({before: null, after, type: 'added'});
    return pairs;
}

async function createComparison(repo, base, head, mode = 'branch') {
    if (!['branch', 'tips'].includes(mode)) throw new Error('Modo de comparación desconocido.');
    const [selectedBase, headSha] = await Promise.all([
        resolveRevision(repo, base),
        resolveRevision(repo, head),
    ]);
    let baseSha = selectedBase;
    if (mode === 'branch') {
        try {
            baseSha = (await git(repo, ['merge-base', selectedBase, headSha])).trim();
        } catch {
            throw new Error('Las referencias no comparten historia. Usa «Comparar versiones directamente».');
        }
    }
    const [beforeTree, afterTree, diff] = await Promise.all([
        git(repo, ['ls-tree', '-rz', baseSha]),
        git(repo, ['ls-tree', '-rz', headSha]),
        git(repo, ['diff', '--name-status', '-z', '--find-renames=50%', baseSha, headSha, '--']),
    ]);
    const changes = parseChanges(diff);
    const beforeFiles = parseTree(beforeTree);
    const afterFiles = parseTree(afterTree);
    const snapshotChanges = changes.filter(
        (change) => isSnapshot(change.before || '') || isSnapshot(change.after || '')
    );
    const pairs = pairSnapshots(snapshotChanges, beforeFiles, afterFiles);
    const items = pairs
        .map((pair) => {
            const file = pair.after?.path || pair.before.path;
            const filename = path.posix.basename(file, '.png');
            const suite = filename.split(/-(?:screenshot|ssr-acceptance)-test-tsx-/)[0];
            const fingerprint = createHash('sha256')
                .update(
                    JSON.stringify([pair.before?.path, pair.before?.sha, pair.after?.path, pair.after?.sha])
                )
                .digest('hex');
            return {
                id: fingerprint.slice(0, 20),
                fingerprint,
                ...pair,
                suite,
                title: filename,
                metrics: null,
                error: null,
            };
        })
        .sort(
            (a, b) => a.suite.localeCompare(b.suite) || a.title.localeCompare(b.title, 'es', {numeric: true})
        );
    return {
        id: createHash('sha256').update(`${baseSha}:${headSha}:${mode}`).digest('hex').slice(0, 20),
        base,
        head,
        baseSha,
        selectedBase,
        headSha,
        mode,
        counts: {gitFiles: changes.length, pngFiles: snapshotChanges.length, comparisons: items.length},
        items,
    };
}

async function readImage(repo, image) {
    return image ? git(repo, ['cat-file', 'blob', image.sha], true) : null;
}

async function compareImages(beforeBuffer, afterBuffer, withDiff = false) {
    const [before, after] = await Promise.all([
        beforeBuffer ? Jimp.read(beforeBuffer) : null,
        afterBuffer ? Jimp.read(afterBuffer) : null,
    ]);
    const width = Math.max(before?.bitmap.width || 0, after?.bitmap.width || 0);
    const height = Math.max(before?.bitmap.height || 0, after?.bitmap.height || 0);
    const diffData = withDiff ? Buffer.alloc(width * height * 4) : null;
    let different = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const inBefore = before && x < before.bitmap.width && y < before.bitmap.height;
            const inAfter = after && x < after.bitmap.width && y < after.bitmap.height;
            const oldIndex = inBefore ? (y * before.bitmap.width + x) * 4 : -1;
            const newIndex = inAfter ? (y * after.bitmap.width + x) * 4 : -1;
            let changed = Boolean(inBefore) !== Boolean(inAfter);
            if (inBefore && inAfter) {
                for (let channel = 0; channel < 4; channel++) {
                    if (before.bitmap.data[oldIndex + channel] !== after.bitmap.data[newIndex + channel])
                        changed = true;
                }
            }
            if (changed) different++;
            if (diffData) {
                const index = (y * width + x) * 4;
                const bitmap = inAfter ? after.bitmap.data : inBefore ? before.bitmap.data : null;
                const source = inAfter ? newIndex : oldIndex;
                diffData[index] = changed ? 237 : bitmap ? Math.round(204 + bitmap[source] / 5) : 255;
                diffData[index + 1] = changed ? 28 : bitmap ? Math.round(204 + bitmap[source + 1] / 5) : 255;
                diffData[index + 2] = changed ? 46 : bitmap ? Math.round(204 + bitmap[source + 2] / 5) : 255;
                diffData[index + 3] = 255;
            }
        }
    }
    const metrics = {
        beforeSize: before ? [before.bitmap.width, before.bitmap.height] : null,
        afterSize: after ? [after.bitmap.width, after.bitmap.height] : null,
        different,
        area: width * height,
        ratio: width * height ? different / (width * height) : 0,
        resized: Boolean(
            before &&
                after &&
                (before.bitmap.width !== after.bitmap.width || before.bitmap.height !== after.bitmap.height)
        ),
    };
    let diff = null;
    if (diffData) {
        const image = new Jimp({data: diffData, width, height});
        diff = await new Promise((resolve, reject) =>
            image.getBuffer(Jimp.MIME_PNG, (error, buffer) => (error ? reject(error) : resolve(buffer)))
        );
    }
    return {metrics, diff};
}

module.exports = {
    git,
    isSnapshot,
    canonicalPath,
    parseChanges,
    parseTree,
    pairSnapshots,
    resolveRevision,
    listBranches,
    createComparison,
    readImage,
    compareImages,
};
