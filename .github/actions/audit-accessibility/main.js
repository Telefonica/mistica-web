// @ts-check
const path = require('path');
const os = require('os');
const handler = require('serve-handler');
const http = require('http');
const {AxePuppeteer} = require('@axe-core/puppeteer');
const {createHtmlReport} = require('axe-html-reporter');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const {uploadFile} = require('../utils/azure-storage');
const core = require('@actions/core');
/** @type any */
const PromisePool = require('es6-promise-pool');

const PATH_REPO_ROOT = path.join(__dirname, '../../..');
const PATH_REPORTS = path.join(PATH_REPO_ROOT, 'reports/accessibility');

const STORIES_BLACKLIST = new Set([
    'welcome-welcome--mistica',
    'icons-catalog--catalog', // takes a lot of time to parse and it is not very relevant for a11y
]);

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

const getStories = () => {
    console.log('Extracting stories information');
    return Object.keys(require('../../../public/index.json').entries);
};

/**
 * @returns {Promise<{
 *     closeStorybook: () => void,
 *     getStoryUrl: (id: string, skin: string) => string}
 * >}
 */
const startStorybook = () => {
    return new Promise((resolve) => {
        const port = 6006;

        const storybookServer = http.createServer((request, response) => {
            return handler(request, response, {
                public: 'public',
                cleanUrls: ['/'],
            });
        });

        storybookServer.listen(port, () => {
            console.log(`Serving static storybook at: http://localhost:${port}`);
            resolve({
                getStoryUrl: (id, skin) =>
                    `http://localhost:${port}/iframe.html?viewMode=story&id=${id}&skin=${skin}`,
                closeStorybook: () => {
                    console.log('Stopping static storybook server');
                    storybookServer.close();
                },
            });
        });
    });
};

/**
 * @param {import('puppeteer').Browser} browser
 * @param {string} url
 * @param {Array<string>} disabledRules
 * @returns {Promise<import('axe-core').AxeResults>}
 */
const audit = async (browser, url, disabledRules = []) => {
    const page = await browser.newPage();
    const ua = await browser.userAgent();
    await page.setUserAgent(`${ua} acceptance-test`);
    await page.goto(url);
    const result = await new AxePuppeteer(page)
        .disableRules([
            // ignored because some stories don't include an H1 header
            'page-has-heading-one',
            ...disabledRules,
        ])
        .analyze();
    page.close();
    return result;
};

/**
 * @param {Array<[story: string, skin: string, results: import('axe-core').AxeResults]>} results
 * @returns {Promise<Map<string, {json: String, html: string}>>}
 */
const writeReportsToDisk = async (results) => {
    rimraf.sync(PATH_REPORTS);
    mkdirp.sync(PATH_REPORTS);
    const files = new Map();
    for (const [story, skin, result] of results) {
        const jsonFilename = path.join(PATH_REPORTS, `${story}--${skin}.json`);
        const htmlFilename = path.join(PATH_REPORTS, `${story}--${skin}.html`);

        fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2));
        createHtmlReport({
            results: result,
            options: {
                outputDir: path.relative(process.cwd(), PATH_REPORTS),
                reportFileName: `${story}--${skin}.html`,
            },
        });

        files.set(`${story}--${skin}`, {json: jsonFilename, html: htmlFilename});
    }
    return files;
};

/**
 * @param {Array<[story: string, skin: string, results: import('axe-core').AxeResults]>} results
 */
const generateReportForConsole = async (results) => {
    const files = await writeReportsToDisk(results);

    const lines = [];
    for (const [story, skin, result] of results) {
        if (result.violations.length) {
            lines.push(
                `${story} [${skin}] (${result.violations.length} violations)`,
                `    - HTML: ${files.get(`${story}--${skin}`)?.html}`,
                `    - JSON: ${files.get(`${story}--${skin}`)?.json}`
            );
        }
    }

    console.log(lines.join('\n'));
};

/**
 * @param {Array<[story: string, skin: string, results: import('axe-core').AxeResults]>} results
 */
const generateReportForGithub = async (results) => {
    const files = await writeReportsToDisk(results);

    let lines = ['**Accessibility report**'];

    const problemsCount = results.reduce((acc, [, , result]) => acc + result.violations.length, 0);

    if (problemsCount > 0) {
        core.setFailed('Accessibility problems detected');
        lines.push(`<details>`);
        lines.push(`<summary>❌ <b>${problemsCount}</b> problems detected</summary><br />`);

        for (const [story, skin, result] of results) {
            const [jsonUrl, htmlUrl] = await Promise.all([
                uploadFile(files.get(`${story}--${skin}`)?.json ?? '', 'application/json'),
                uploadFile(files.get(`${story}--${skin}`)?.html ?? '', 'text/html'),
            ]);

            if (result.violations.length) {
                lines.push(
                    `<details>`,
                    `  <summary><b>${story} [${skin}]</b> (${result.violations.length} violations)</summary>`,
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

/**
 * @type {Record<string, Record<string, Array<string>>>}
 */
const disabledRulesByStoryAndSkin = {
    'components-carousels-slideshow--default': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-slideshow--with-carousel-context': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-centeredcarousel--default': {
        all: ['scrollable-region-focusable'],
    },
    'components-carousels-centeredcarousel--with-controls': {
        all: ['scrollable-region-focusable'],
    },
    'layout-horizontalscroll--default': {
        all: ['scrollable-region-focusable'],
    },

    'patterns-loading--loading-screen-story': {
        all: ['color-contrast'],
    },
    'patterns-loading--brand-loading-screen-story': {
        all: ['color-contrast'],
    },

    'patterns-feedback-feedbackscreen--feedback-screen-story': {
        Blau: ['color-contrast'],
    },
    'community-examplecomponent--default': {
        Blau: ['color-contrast'],
    },
    'private-components-in-different-skins--default': {
        Blau: ['color-contrast'],
    },
};

/**
 * @param {string} story
 * @param {string} skin
 * @returns {Array<string>}
 */
const getDisabledRules = (story, skin) => {
    const disabledRulesForStory = disabledRulesByStoryAndSkin[story] || {};
    const disabledRulesForSkin = disabledRulesForStory[skin] || [];
    const disabledRulesForAllSkins = disabledRulesForStory['all'] || [];
    return [...disabledRulesForSkin, ...disabledRulesForAllSkins];
};

const main = async () => {
    const isCi = process.env.CI;
    process.chdir(PATH_REPO_ROOT);

    if (!process.env.CI) {
        console.log('⚠️ This script assumes that a static storybook build exists!');
        console.log('Execute `yarn storybook-static` to create or update existing build');
    }

    const stories = getStories().filter((story) => !STORIES_BLACKLIST.has(story));
    const skins = ['Movistar-new', 'O2-new', 'Vivo-new', 'Blau'];

    /**
     * @type Array<[story: string, skin: string]>
     */
    const storySkinCombos = [];
    for (const story of stories) {
        for (const skin of skins) {
            storySkinCombos.push([story, skin]);
        }
    }

    const {closeStorybook, getStoryUrl} = await startStorybook();

    const browser = await puppeteer.launch({
        // Launch chromium installed in docker in CI
        ...(isCi ? {executablePath: '/usr/bin/chromium'} : {}),
        args: ['--incognito', '--no-sandbox'],
    });

    /** @type Array<[story: string, skin: string, results: import('axe-core').AxeResults]> */
    const results = [];

    const t = Date.now();

    /** @returns {null | Promise<void>} */
    const job = () => {
        const storySkinTuple = storySkinCombos.shift();
        if (!storySkinTuple) {
            return null;
        }
        const [story, skin] = storySkinTuple;
        return new Promise((resolve) => {
            console.log(`${story} [${skin}]`);
            audit(browser, getStoryUrl(story, skin), getDisabledRules(story, skin)).then((result) => {
                results.push([story, skin, result]);
                resolve();
            });
        });
    };

    const pool = new PromisePool(job, os.cpus().length);
    await pool.start();

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
