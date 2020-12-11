// @ts-check
const path = require('path');
const {execSync} = require('child_process');
const StaticServer = require('static-server');
const lighthouse = require('lighthouse');
const fetch = require('node-fetch').default;
const fs = require('fs');

const PATH_REPO_ROOT = path.join(__dirname, '..');
const PORT_STORYBOOK = 6006;
const PORT_CHROME = 9223;

const getStories = () => {
    console.log('Extracting stories information');
    // creates "stories.json" file with stories information
    execSync('yarn sb extract ./public', {stdio: 'inherit'});
    // @ts-ignore
    return Object.keys(require('../public/stories.json').stories);
};

const getStoryUrl = (id) => {
    let host = 'localhost';
    if (!process.env.CI) {
        host = process.platform === 'linux' ? '172.17.0.1' : 'host.docker.internal';
    }
    return `http://${host}:${PORT_STORYBOOK}/iframe.html?viewMode=story&id=${id}`;
};

const startStorybookServer = () =>
    new Promise((resolve) => {
        const storybookServer = new StaticServer({rootPath: 'public', port: PORT_STORYBOOK});
        storybookServer.start(() => {
            console.log(`Serving static storybook at: http://localhost:${PORT_STORYBOOK}`);
            resolve(() => {
                console.log('Stopping static storybook server');
                storybookServer.stop();
            });
        });
    });

const startChrome = async () => {
    if (process.env.CI) {
        console.log('Assuming Chrome is already running');
        return () => {};
    }
    console.log('Execute Chrome');
    execSync('yarn up-chromium', {stdio: 'inherit'});

    let retries = 10;
    // eslint-disable-next-line no-constant-condition
    while (retries--) {
        try {
            await fetch(`http://localhost:${PORT_CHROME}`);
            return () => {
                execSync('yarn down-chromium', {stdio: 'inherit'});
            };
        } catch (e) {
            console.log('Waiting for Chrome dev server');
            await new Promise((r) => setTimeout(r, 500));
        }
    }
    throw Error('Chrome dev server not running');
};

/**
 * see https://github.com/GoogleChrome/lighthouse/tree/master/docs
 * see https://github.com/GoogleChrome/lighthouse/blob/888bd6dc9d927a734a8e20ea8a0248baa5b425ed/typings/externs.d.ts#L82-L119
 */
const runLighthouse = async (url) => {
    console.log('Running lighthouse on', url);
    const result = await lighthouse(url, {
        logLevel: 'error',
        output: 'html',
        onlyCategories: ['accessibility'],
        port: PORT_CHROME,
        disableDeviceEmulation: true,
        emulatedFormFactor: false,
        throttlingMethod: 'provided',
        throttling: {},
        /*
            rttMs: 0,
            throughputKbps: 0,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
            cpuSlowdownMultiplier: 1,

        */
    });
    return result;
};

const main = async () => {
    process.chdir(PATH_REPO_ROOT);
    console.log('⚠️ This script assumes that a static storybook build exists!');
    console.log('Execute `yarn storybook-static` to create or update existing build');

    const stories = getStories();
    const stopStorybookServer = await startStorybookServer();
    const stopChrome = await startChrome();

    const t = Date.now();
    for (const story of stories) {
        const result = await runLighthouse(getStoryUrl(story));
        fs.writeFileSync(`/tmp/${story}.html`, result.report);
        fs.writeFileSync(`/tmp/${story}.json`, JSON.stringify(result.lhr, null, 2));
    }
    console.log('total time:', Date.now() - t, 'ms');

    stopStorybookServer();
    stopChrome();
};

main();
