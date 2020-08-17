// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
// @ts-check
const core = require('@actions/core');
const storage = require('./azure-storage');
const {basename} = require('path');
const glob = require('glob');
const {commentPullRequest} = require('./github');

const main = async () => {
    const filenames = glob.sync(core.getInput('glob') || process.env.INPUT_GLOB);

    core.info('Upload failed screenshot test diffs');

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
