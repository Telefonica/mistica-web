#!/usr/bin/env node
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

    await commentPullRequest(
        [
            '**Failed screenshot tests**',
            '',
            ...uploads.map(({filename, url}) => {
                // src/__screenshot_tests__/__image_snapshots__/__diff_output__/form-fields-screenshot-test-tsx-default-textfield-appears-properly-typing-and-blur-on-mobile-ios-1-diff.png
                const name = basename(filename).replace(/(-1)?-diff.png$/, '');
                const [testFileName, testName] = name.split(/-screenshot-test-tsx-/);

                return `* \`${testFileName}\` [${testName}](${url})`;
            }),
        ].join('\n')
    );
};

main().catch((error) => {
    core.setFailed(error.message);
});
