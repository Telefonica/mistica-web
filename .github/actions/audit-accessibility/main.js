// @ts-check
const path = require('path');
const {execSync} = require('child_process');
const StaticServer = require('static-server');
const {AxePuppeteer} = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch').default;
const fs = require('fs');
const mkdirp = require('mkdirp');
const {uploadFile} = require('../utils/azure-storage');

const PATH_REPO_ROOT = path.join(__dirname, '..');
const PATH_REPORTS = path.join(PATH_REPO_ROOT, 'accessibility');
const PORT_STORYBOOK = 6006;
const PORT_CHROME = 9223;

const STORIES_BLACKLIST = new Set(['welcome-welcome--mistica', 'icons-mistica-icons--catalog']);

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

const getStories = () => {
    console.log('Extracting stories information');
    // creates "stories.json" file with stories information
    execSync('yarn sb extract ./public', {stdio: 'inherit'});
    // @ts-ignore
    return Object.keys(require('../../../public/stories.json').stories);
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

// /**
//  * @returns function to stop chrome
//  */
// const startChrome = async () => {
//     if (process.env.CI) {
//         return () => {};
//     }
//     console.log('Execute Chrome');
//     execSync('yarn up-chromium', {stdio: 'inherit'});
//     return () => {
//         execSync('yarn down-chromium', {stdio: 'inherit'});
//     };
// };

// /**
//  * @returns {Promise<string>}
//  */
// const getBrowserWsEndpoint = async () => {
//     let retries = 10;
//     while (retries--) {
//         try {
//             const response = await fetch(`http://localhost:${PORT_CHROME}/json/version`);
//             return (await response.json()).webSocketDebuggerUrl;
//         } catch (e) {
//             console.log('Waiting for Chrome dev server');
//             await new Promise((r) => setTimeout(r, 500));
//         }
//     }
//     throw Error('Chrome dev server not running');
// };

/**
 * @param {import('puppeteer').Browser} browser
 * @param {string} url
 * @returns {Promise<import('axe-core').AxeResults>}
 */
const audit = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    const result = await new AxePuppeteer(page).analyze();
    page.close();
    return result;
};

/**
 * @param {Array<[name: string, results: import('axe-core').AxeResults]>} results
 */
const generateReport = async (results) => {
    mkdirp.sync(PATH_REPORTS);

    let lines = ['**Accessibility report**'];
    results.forEach(([name, result]) => {
        const filename = path.join(PATH_REPORTS, name + '.json');
        fs.writeFileSync(filename, JSON.stringify(result, null, 2));
        const url = uploadFile(filename, 'application/json');

        lines.push(
            `<details>`,
            `  <summary>❌ (${result.violations.length}) <b>${name}</b></summary>`,
            `  [report](${url})`,
            `</details>`
        );
    });
    if (process.env.CI) {
        require('../utils/github').commentPullRequest(lines.join('\n'));
    } else {
        console.log(lines);
    }
};

const main = async () => {
    process.chdir(PATH_REPO_ROOT);

    if (!process.env.CI) {
        console.log('⚠️ This script assumes that a static storybook build exists!');
        console.log('Execute `yarn storybook-static` to create or update existing build');
    }

    const stories = getStories().filter((story) => !STORIES_BLACKLIST.has(story));
    const stopStorybookServer = await startStorybookServer();
    // const stopChrome = await startChrome();

    const browser = await puppeteer.launch({args: ['--incognito', '--no-sandbox']});

    /** @type Array<[name: string, results: import('axe-core').AxeResults]> */
    const results = [];

    const t = Date.now();
    for (const story of stories) {
        console.log(story);
        const result = await audit(browser, getStoryUrl(story));
        results.push([story, result]);
    }
    console.log('total time:', Date.now() - t, 'ms');

    await generateReport(results);

    browser.close();
    stopStorybookServer();
    // stopChrome();
};

main();
