/* eslint-disable filenames/match-regex */
const fetch = require('node-fetch');
const execSync = require('child_process').execSync;

const poll = async (url, attempt = 0) => {
    try {
        await fetch(url);
    } catch (e) {
        if (attempt > 10) {
            throw e;
        }
        await new Promise((r) => setTimeout(r, 500));
        await poll(url, attempt + 1);
    }
};

const getConfig = async () => {
    const baseConfig = {
        ignoreHTTPSErrors: true,
        headless: !!process.env.HEADLESS,
        slowMo: process.env.HEADLESS ? 0 : 50,
    };

    let connect;
    const needsChromiumDocker =
        process.platform !== 'linux' && process.env.SCREENSHOT && process.env.HEADLESS;
    if (needsChromiumDocker) {
        execSync('yarn up-chromium', {stdio: 'inherit', cwd: __dirname});
        await poll('http://localhost:9223');
    }

    try {
        const {webSocketDebuggerUrl} = await fetch('http://localhost:9223/json/version').then((r) =>
            r.json()
        );
        connect = {
            ...baseConfig,
            browserWSEndpoint: webSocketDebuggerUrl,
        };
    } catch (e) {
        if (needsChromiumDocker) {
            throw e;
        }
    }

    return {
        launch: {
            ...baseConfig,
            env: {
                ...process.env,
                TZ: 'UTC',
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
