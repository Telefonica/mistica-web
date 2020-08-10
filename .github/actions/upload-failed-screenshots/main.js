#!/usr/bin/env node
const core = require('@actions/core');
const storage = require('./azure-storage');
const {join} = require('path');
const {execSync} = require('child_process');

const PATH_ROOT = join(__dirname, '../../..');
process.chdir(PATH_ROOT);

const main = async () => {
    const files = execSync("find src | grep '/__diff_output__/.*-diff.png$'")
        .toString('utf8')
        .trim()
        .split('\n');

    core.startGroup('Upload failed screenshot test diffs');

    for (const file of files) {
        core.info(file);
        const url = await storage.uploadFile(file, 'image/png');
        core.info(url);
    }

    core.endGroup();

    await storage.deleteOldContainers();
};

main().catch((error) => {
    core.setFailed(error.message);
});
