const fetch = require('node-fetch');
const execSync = require('child_process').execSync;

const PATH_REPO_ROOT = __dirname;

const poll = async (url) => {
    let tries = 10;
    while (tries--) {
        try {
            return await fetch(url);
        } catch (e) {
            await new Promise((r) => setTimeout(r, 500));
        }
    }
    throw Error(`Error fetching ${url}`);
};

const getConfig = async () => {
    const baseConfig = {
        ignoreHTTPSErrors: true,
        headless: !!process.env.HEADLESS,
        slowMo: process.env.HEADLESS ? 0 : 50,
    };

    /**
     * CI => everything runs inside a docker, it has a running chrome at port 9222 (see ci.yml workflow)
     * Local, headless => uses a dockerized chromium at port 9223 (see docker-compose.yaml)
     * Local, with UI => uses a local chromium installed by puppetteer
     */

    const debugPort = process.env.CI ? 9222 : 9223;
    const isLocal = !process.env.CI;
    const isHeadless = process.env.HEADLESS;

    let connect;

    if (isLocal && isHeadless) {
        const dockerChromiumUrl = `http://localhost:${debugPort}`;

        try {
            await fetch(dockerChromiumUrl);
        } catch (e) {
            execSync('yarn up-chromium', {stdio: 'inherit', cwd: PATH_REPO_ROOT});
            await poll(dockerChromiumUrl);
        }

        const {webSocketDebuggerUrl} = await fetch(`http://localhost:${debugPort}/json/version`).then((r) =>
            r.json()
        );

        connect = {
            ...baseConfig,
            browserWSEndpoint: webSocketDebuggerUrl,
        };
    }

    return {
        launch: {
            ...baseConfig,
            env: {
                ...process.env,
                TZ: 'UTC',
                LANG: 'es_ES',
                LANGUAGE: 'es_ES',
            },
            args: [
                '--no-sandbox', // probably not needed in ubuntu
                '--font-render-hinting=none', // this flag avoids font rendering differences between headless/headfull
            ],
        },
        connect,
        browserContext: 'incognito',
    };
};

module.exports = getConfig();
