#!/usr/bin/env node
// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
const core = require('@actions/core');
const storage = require('./azure-storage');
const {join} = require('path');
const {execSync} = require('child_process');
const glob = require('glob');

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
};

main().catch((error) => {
    core.setFailed(error.message);
});
