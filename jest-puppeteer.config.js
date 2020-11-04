const fetch = require('node-fetch');
const execSync = require('child_process').execSync;
const fs = require('fs');
const os = require('os');
const path = require('path');

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
    const needsChromiumDocker = !process.env.CI && process.env.SCREENSHOT && process.env.HEADLESS;
    if (needsChromiumDocker) {
        const dockerChromiumUrl = 'http://localhost:9223';
        try {
            await fetch(dockerChromiumUrl);
        } catch (e) {
            execSync('yarn up-chromium', {stdio: 'inherit', cwd: __dirname});
            await poll(dockerChromiumUrl);
            const DIR = path.join(os.tmpdir(), 'jest_puppeteer_setup');
            fs.mkdirSync(DIR, {recursive: true});
            fs.writeFileSync(path.join(DIR, 'killDocker'), '');
        }
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
