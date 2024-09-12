const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

const main = async () => {
    const token = core.getInput('npm-token') || process.env.NPM_TOKEN;
    if (!token) {
        throw new Error('NPM_TOKEN env var not set');
    }

    const lines = [
        // set npm auth token with publish permission from environment
        `//registry.npmjs.org/:_authToken=${token}`,

        // this allows to execute npm lifecycle scripts by root
        'unsafe-perm = true',
    ];

    fs.writeFileSync(path.join(__dirname, '..', '..', '..', '.npmrc'), lines.join('\n'));
};

main().catch((error) => {
    core.setFailed(error.message);
});
