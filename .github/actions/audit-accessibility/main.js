// @ts-check
const path = require('path');
const {execSync} = require('child_process');
const StaticServer = require('static-server');
const {AxePuppeteer} = require('@axe-core/puppeteer');
const {createHtmlReport} = require('axe-html-reporter');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const {uploadFile} = require('../utils/azure-storage');

const PATH_REPO_ROOT = path.join(__dirname, '../../..');
const PATH_REPORTS = path.join(PATH_REPO_ROOT, 'reports/accessibility');
const PORT_STORYBOOK = 6006;

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

/**
 * @param {string} id
 */
const getStoryUrl = (id) => `http://localhost:${PORT_STORYBOOK}/iframe.html?viewMode=story&id=${id}`;

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
    rimraf.sync(PATH_REPORTS);
    mkdirp.sync(PATH_REPORTS);

    let lines = ['**Accessibility report**'];

    for (const [name, result] of results) {
        const jsonFilename = path.join(PATH_REPORTS, name + '.json');
        const htmlFilename = path.join(PATH_REPORTS, name + '.html');

        fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2));
        createHtmlReport({
            results: result,
            options: {
                outputDir: path.relative(process.cwd(), PATH_REPORTS),
                reportFileName: name + '.html',
            },
        });

        let jsonUrl = jsonFilename;
        let htmlUrl = htmlFilename;

        if (process.env.CI) {
            [jsonUrl, htmlUrl] = await Promise.all([
                uploadFile(jsonFilename, 'application/json'),
                uploadFile(htmlFilename, 'text/html'),
            ]);
        }

        if (result.violations.length) {
            lines.push(
                `<details>`,
                `  <summary>❌ <span style="color:red;font-weight:bold;">${result.violations.length}</span> <b>${name}</b></summary>`,
                `  <ul>`,
                `    <li><a href="${htmlUrl}" target="_blank">HTML Report</a></li>`,
                `    <li><a href="${jsonUrl}" target="_blank">JSON Data</a></li>`,
                `  </ul>`,
                `</details>`
            );
        }
    }

    if (process.env.CI) {
        require('../utils/github').commentPullRequest(lines.join('\n'));
    } else {
        console.log(lines.join('\n'));
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
};

main();
