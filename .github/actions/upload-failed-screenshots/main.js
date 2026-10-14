// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
// @ts-check
const core = require('@actions/core');
const storage = require('../utils/azure-storage');
const {basename} = require('path');
const glob = require('glob');
const {commentPullRequest} = require('../utils/github');

const fs = require('fs');

/** @param {string} content */
const writeStepSummary = (content) => {
    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (summaryPath) {
        fs.appendFileSync(summaryPath, content + '\n');
    }
};

const main = async () => {
    const filenames = glob.sync(core.getInput('glob') || process.env.INPUT_GLOB || '');
    const isForkPr = core.getInput('fork-pr') === 'true';

    core.info('Upload failed screenshot test diffs');

    if (isForkPr) {
        if (filenames.length) {
            const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
            const lines = [
                '## ❌ Screenshot test failures',
                '',
                'Screenshot diffs are available as artifacts in this workflow run.',
                `[Download from the Actions run](${runUrl})`,
                '',
                '### Failed diffs',
                ...filenames.map((f) => `- \`${basename(f)}\``),
            ];
            writeStepSummary(lines.join('\n'));
            core.setFailed('Screenshot test failures detected');
        } else {
            writeStepSummary('## ✔️ All screenshot tests passing');
        }
        return;
    }

    const uploads = [];

    for (const filename of filenames) {
        core.info(filename);
        const url = await storage.uploadFile(filename, 'image/png');
        core.info(url);
        uploads.push({filename, url});
    }

    core.setOutput('uploads', uploads);

    await storage.deleteOldContainers();

    if (uploads.length) {
        await commentPullRequest(
            [
                '**Screenshot tests report**',
                '',
                ...uploads.map(({filename, url}) => {
                    // src/__screenshot_tests__/__image_snapshots__/__diff_output__/suite-screenshot-test-tsx-name-1-diff.png
                    const name = basename(filename).replace(/(-1)?-diff.png$/, '');
                    const [testSuite, testName] = name.split(/-screenshot-test-tsx-/);

                    return [
                        `<details>`,
                        `  <summary>❌ <b>${testSuite}</b> / ${testName}</summary>`,
                        `  <img src="${url}" />`,
                        `</details>`,
                    ].join('\n');
                }),
            ].join('\n')
        );
    } else {
        await commentPullRequest(['**Screenshot tests report**', '', '✔️ All passing'].join('\n'), {
            updateOnly: true,
        });
    }
};

main().catch((error) => {
    core.setFailed(error.message);
});
