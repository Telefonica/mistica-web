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
const core = require('@actions/core');

const PATH_REPO_ROOT = path.join(__dirname, '../../..');
const PATH_REPORTS = path.join(PATH_REPO_ROOT, 'reports/accessibility');

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
 * @returns {Promise<{
 *     closeStorybook: () => void,
 *     getStoryUrl: (id: string) => string}
 * >}
 */
const startStorybook = () => {
    if (process.env.CI) {
        const baseUrl = require('@actions/core').getInput('storybook-url');
        return Promise.resolve({
            getStoryUrl: (id) => {
                return `${baseUrl}/iframe.html?viewMode=story&id=${id}`;
            },
            closeStorybook: () => {},
        });
    } else {
        return new Promise((resolve) => {
            const port = 6006;
            const storybookServer = new StaticServer({rootPath: 'public', port: port});
            storybookServer.start(() => {
                console.log(`Serving static storybook at: http://localhost:${port}`);
                resolve({
                    getStoryUrl: (id) => `http://localhost:${port}/iframe.html?viewMode=story&id=${id}`,
                    closeStorybook: () => {
                        console.log('Stopping static storybook server');
                        storybookServer.stop();
                    },
                });
            });
        });
    }
};

/**
 * @param {import('puppeteer').Browser} browser
 * @param {string} url
 * @returns {Promise<import('axe-core').AxeResults>}
 */
const audit = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    const result = await new AxePuppeteer(page)
        .disableRules(['color-contrast', 'page-has-heading-one'])
        .analyze();
    page.close();
    return result;
};

/**
 * @param {Array<[name: string, results: import('axe-core').AxeResults]>} results
 * @returns {Promise<Map<string, {json: String, html: string}>>}
 */
const writeReportsToDisk = async (results) => {
    rimraf.sync(PATH_REPORTS);
    mkdirp.sync(PATH_REPORTS);
    const files = new Map();
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

        files.set(name, {json: jsonFilename, html: htmlFilename});
    }
    return files;
};

/**
 * @param {Array<[name: string, results: import('axe-core').AxeResults]>} results
 */
const generateReportForConsole = async (results) => {
    const files = await writeReportsToDisk(results);

    const lines = [];
    for (const [name, result] of results) {
        lines.push(
            `${name} (${result.violations.length} violations)`,
            `    - HTML: ${files.get(name).html}`,
            `    - JSON: ${files.get(name).json}`
        );
    }

    console.log(lines.join('\n'));
};

/**
 * @param {Array<[name: string, results: import('axe-core').AxeResults]>} results
 */
const generateReportForGithub = async (results) => {
    const files = await writeReportsToDisk(results);

    let lines = ['**Accessibility report**'];

    if (files.size) {
        core.setFailed('Accessibility problems detected');
        lines.push(`<details>`);
        lines.push(`<summary>❌ <b>${files.size}</b> Stories with problems</summary><br />`);

        for (const [name, result] of results) {
            const [jsonUrl, htmlUrl] = await Promise.all([
                uploadFile(files.get(name).json, 'application/json'),
                uploadFile(files.get(name).html, 'text/html'),
            ]);

            if (result.violations.length) {
                lines.push(
                    `<details>`,
                    `  <summary><b>${name}</b> (${result.violations.length} violations)</summary>`,
                    `  <ul>`,
                    `    <li><a href="${htmlUrl}">HTML Report</a></li>`,
                    `    <li><a href="${jsonUrl}">JSON Data</a></li>`,
                    `  </ul>`,
                    `</details>`
                );
            }
        }
        lines.push(`</details>`);
    } else {
        lines.push('✔️ No issues found');
    }

    lines.push('\nℹ️ You can run this locally by executing `yarn audit-accessibility`.');
    require('../utils/github').commentPullRequest(lines.join('\n'));
};

const main = async () => {
    process.chdir(PATH_REPO_ROOT);

    if (!process.env.CI) {
        console.log('⚠️ This script assumes that a static storybook build exists!');
        console.log('Execute `yarn storybook-static` to create or update existing build');
    }

    const stories = getStories().filter((story) => !STORIES_BLACKLIST.has(story));
    const {closeStorybook, getStoryUrl} = await startStorybook();

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

    if (process.env.CI) {
        await generateReportForGithub(results);
    } else {
        await generateReportForConsole(results);
    }

    browser.close();
    closeStorybook();
};

main();
