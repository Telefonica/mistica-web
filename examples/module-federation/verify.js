/**
 * Loads the federated page in a browser, and reports what it downloads.
 *
 * It fails when the remote does not render, or when the page logs an error. The usual cause of such
 * an error is a second copy of the theme context: "To use @telefonica/mistica components you must
 * instantiate <ThemeContextProvider> as their parent", thrown by a component or an icon that reads a
 * context which no provider filled.
 *
 * Run it after "yarn measure":
 *
 *     yarn verify
 *
 * This file is a tool of the repository, not part of the example. It therefore borrows puppeteer and
 * serve-handler from the root, where the acceptance tests already declare them. The host and the
 * remote need neither.
 */
const http = require('http');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const handler = require(path.join(REPO_ROOT, 'node_modules', 'serve-handler'));
const puppeteer = require(path.join(REPO_ROOT, 'node_modules', 'puppeteer'));

const HOST_PORT = 3001;
const REMOTE_PORT = 3002;

const kB = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

const serve = (directory, port) =>
    new Promise((resolve) => {
        const server = http.createServer((request, response) =>
            handler(request, response, {
                public: directory,
                // the host loads the chunks of the remote from another origin
                headers: [{source: '**', headers: [{key: 'Access-Control-Allow-Origin', value: '*'}]}],
            })
        );
        server.listen(port, () => resolve(server));
    });

const readConsoleMessage = async (message) => {
    const parts = await Promise.all(
        message.args().map((arg) =>
            arg
                .executionContext()
                .evaluate(
                    (value) => (value && value.stack ? `${value.message}\n${value.stack}` : String(value)),
                    arg
                )
                .catch(() => message.text())
        )
    );
    return `${message.type()}: ${parts.join(' ') || message.text()}`;
};

const inspectPage = async (page) => {
    const errors = [];
    /**
     * webpack warns that react 19.2.1 does not satisfy the peer range of react-autosuggest and of
     * react-datetime, two dependencies of @telefonica/mistica whose ranges predate react 19. The
     * page renders, so these warnings do not fail the check.
     */
    const warnings = [];
    const downloads = [];

    page.on('console', async (message) => {
        if (message.type() === 'error') {
            errors.push(await readConsoleMessage(message));
        } else if (message.type() === 'warning') {
            warnings.push(await readConsoleMessage(message));
        }
    });
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) =>
        errors.push(`request failed: ${request.url()} ${request.failure()?.errorText}`)
    );
    page.on('requestfinished', async (request) => {
        if (!request.url().endsWith('.js')) {
            return;
        }
        try {
            const body = await request.response().buffer();
            downloads.push({url: request.url().replace('http://localhost', ''), size: body.length});
        } catch (error) {
            downloads.push({url: request.url(), size: 0});
        }
    });

    await page.goto(`http://localhost:${HOST_PORT}`, {waitUntil: 'networkidle0'});

    const remoteRendered = await page.evaluate(() =>
        document.body.innerText.includes('A card from the remote')
    );
    const iconCount = await page.evaluate(() => document.querySelectorAll('svg').length);

    await page.screenshot({path: path.join(__dirname, 'host', 'dist', 'page.png'), fullPage: true});

    const total = downloads.reduce((sum, item) => sum + item.size, 0);
    downloads.sort((a, b) => b.size - a.size);

    console.log(`\nThe remote rendered inside the host: ${remoteRendered}`);
    console.log(`Icons on the page: ${iconCount}`);
    console.log(`Errors: ${errors.length}`);
    errors.slice(0, 5).forEach((error) => console.log(`  - ${error}`));
    console.log(`Warnings: ${warnings.length}`);
    warnings.slice(0, 5).forEach((warning) => console.log(`  - ${warning}`));
    console.log(`\nThe page downloads ${kB(total)} in ${downloads.length} requests:`);
    downloads.forEach((item) => console.log(`  ${kB(item.size).padStart(10)}  ${item.url}`));

    return !remoteRendered || iconCount === 0 || errors.length > 0;
};

/** The servers keep the event loop alive, so every path must close them. */
const main = async () => {
    const remoteServer = await serve(path.join(__dirname, 'remote', 'dist'), REMOTE_PORT);
    const hostServer = await serve(path.join(__dirname, 'host', 'dist'), HOST_PORT);
    const browser = await puppeteer.launch({args: ['--no-sandbox']});

    try {
        const failed = await inspectPage(await browser.newPage());
        if (failed) {
            process.exitCode = 1;
        }
    } finally {
        await browser.close();
        hostServer.close();
        remoteServer.close();
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
