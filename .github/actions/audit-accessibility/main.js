// @ts-check
// CI entry point: runs the Playwright audit (audit.spec.ts) and reports its results to the pull request.
// For a local audit, use `yarn audit-accessibility`.
const path = require('path');
const fs = require('fs');
const {spawnSync} = require('child_process');
const {createHtmlReport} = require('axe-html-reporter');
const rimraf = require('rimraf');
const {uploadFile} = require('../utils/azure-storage');
const {PATH_AXE_REPORTS, getAuditCases, parseAxeReportPath} = require('./audit-rules');
const core = require('@actions/core');

const PATH_REPO_ROOT = path.join(__dirname, '../../..');
const PATH_PLAYWRIGHT_CONFIG = path.join(__dirname, 'playwright.config.ts');

/**
 * @typedef {{story: string, skin: string, result: import('axe-core').AxeResults, jsonPath: string}} AuditResult
 */

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

/**
 * Violations make the Playwright run fail, so its exit code is not a reason to stop here
 * @returns {number} exit code
 */
const runAudit = () => {
    // The package does not export its cli, so it is found next to package.json
    const playwrightCli = path.join(path.dirname(require.resolve('playwright/package.json')), 'cli.js');
    const {status} = spawnSync(process.execPath, [playwrightCli, 'test', '-c', PATH_PLAYWRIGHT_CONFIG], {
        stdio: 'inherit',
    });
    return status ?? 1;
};

/**
 * @returns {Array<AuditResult>}
 */
const readAuditResults = () => {
    if (!fs.existsSync(PATH_AXE_REPORTS)) {
        return [];
    }
    return fs
        .readdirSync(PATH_AXE_REPORTS)
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => {
            const jsonPath = path.join(PATH_AXE_REPORTS, filename);
            const result = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            return {...parseAxeReportPath(jsonPath), result, jsonPath};
        });
};

/**
 * @param {AuditResult} auditResult
 * @returns {string} path of the HTML report
 */
const writeHtmlReport = ({story, skin, result}) => {
    const reportFileName = `${story}--${skin}.html`;
    createHtmlReport({
        results: result,
        options: {
            outputDir: path.relative(process.cwd(), PATH_AXE_REPORTS),
            reportFileName,
        },
    });
    return path.join(PATH_AXE_REPORTS, reportFileName);
};

/**
 * @param {Array<AuditResult>} results
 */
const countProblems = (results) => results.reduce((acc, {result}) => acc + result.violations.length, 0);

/**
 * A test that breaks before axe runs writes no result, so its page would be missing from the report
 * @param {Array<AuditResult>} results
 * @returns {Array<string>}
 */
const findMissingPages = (results) => {
    const auditedPages = new Set(results.map(({story, skin}) => `${story} [${skin}]`));
    return getAuditCases()
        .map(({story, skin}) => `${story} [${skin}]`)
        .filter((page) => !auditedPages.has(page));
};

/**
 * @param {Array<AuditResult>} results
 * @param {Array<string>} missingPages
 * @param {number} exitCode
 */
const generateReportForStepSummary = (results, missingPages, exitCode) => {
    const problemsCount = countProblems(results);

    const lines = ['## Accessibility report', ''];

    if (exitCode !== 0) {
        lines.push(`❌ Playwright exited with code ${exitCode}. Check the audit logs for details.`, '');
    }

    if (problemsCount > 0) {
        lines.push(`❌ **${problemsCount}** problems detected`, '');
        for (const {story, skin, result} of results) {
            if (result.violations.length) {
                lines.push(`### ${story} [${skin}] (${result.violations.length} violations)`);
                for (const violation of result.violations) {
                    lines.push(
                        `- **${violation.id}**: ${violation.description} (${violation.nodes.length} node(s))`
                    );
                }
                lines.push('');
            }
        }
        core.setFailed('Accessibility problems detected');
    }

    if (missingPages.length > 0) {
        lines.push(`⚠️ **${missingPages.length}** pages were not audited`, '');
        lines.push(...missingPages.map((page) => `- ${page}`), '');
        core.setFailed('Some pages were not audited');
    }

    if (problemsCount === 0 && missingPages.length === 0 && exitCode === 0) {
        lines.push('✔️ No issues found');
    }

    lines.push('', 'ℹ️ You can run this locally by executing `yarn audit-accessibility`.');

    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (summaryPath) {
        fs.appendFileSync(summaryPath, lines.join('\n') + '\n');
    }
};

/**
 * @param {Array<AuditResult>} results
 * @param {Array<string>} missingPages
 * @param {number} exitCode
 */
const generateReportForGithub = async (results, missingPages, exitCode) => {
    const lines = ['**Accessibility report**'];

    if (exitCode !== 0) {
        lines.push(`❌ Playwright exited with code ${exitCode}. Check the audit logs for details.`, '');
    }

    const problemsCount = countProblems(results);

    if (problemsCount > 0) {
        core.setFailed('Accessibility problems detected');
        lines.push(`<details>`);
        lines.push(`<summary>❌ <b>${problemsCount}</b> problems detected</summary><br />`);

        for (const auditResult of results) {
            const {story, skin, result, jsonPath} = auditResult;
            if (!result.violations.length) {
                continue;
            }
            const [jsonUrl, htmlUrl] = await Promise.all([
                uploadFile(jsonPath, 'application/json'),
                uploadFile(writeHtmlReport(auditResult), 'text/html'),
            ]);
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
        lines.push(`</details>`);
    }

    if (missingPages.length > 0) {
        core.setFailed('Some pages were not audited');
        lines.push(
            `<details>`,
            `<summary>⚠️ <b>${missingPages.length}</b> pages were not audited</summary>`,
            `<ul>`,
            ...missingPages.map((page) => `  <li>${page}</li>`),
            `</ul>`,
            `</details>`
        );
    }

    if (problemsCount === 0 && missingPages.length === 0 && exitCode === 0) {
        lines.push('✔️ No issues found');
    }

    lines.push('\nℹ️ You can run this locally by executing `yarn audit-accessibility`.');
    await require('../utils/github').commentPullRequest(lines.join('\n'));
};

const main = async () => {
    process.chdir(PATH_REPO_ROOT);
    rimraf.sync(PATH_AXE_REPORTS);

    const exitCode = runAudit();
    const results = readAuditResults();
    const missingPages = findMissingPages(results);

    // Every page has a result and none has violations, so the run broke after the audit
    if (exitCode !== 0 && countProblems(results) === 0 && missingPages.length === 0) {
        core.setFailed(`The accessibility audit failed with exit code ${exitCode}`);
    }

    const isForkPr = core.getInput('fork-pr') === 'true';
    if (isForkPr) {
        generateReportForStepSummary(results, missingPages, exitCode);
        return;
    }
    await generateReportForGithub(results, missingPages, exitCode);
};

main();
