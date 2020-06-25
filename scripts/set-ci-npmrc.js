const {writeFileSync} = require('fs');
const {join} = require('path');

if (process.env.CI) {
    if (!process.env.NPM_TOKEN) {
        console.error('NPM_TOKEN env var not set');
        process.exit(1);
    }

    const lines = [
        // set npm auth token with publish permission from environment
        `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN || ''}`,

        // this allows to execute npm lifecycle scripts by root
        'unsafe-perm = true',
    ];

    writeFileSync(join(__dirname, '..', '.npmrc'), lines.join('\n'));
}
