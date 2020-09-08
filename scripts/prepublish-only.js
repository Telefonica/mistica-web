const fs = require('fs');
const path = require('path');

if (!process.env.CI) {
    const lines = [
        '',
        'Cannot publish from this machine',
        '',
        'To publish, execute:',
        '    tu-ci npm_publish',
        '',
        'Or, for a dry-run:',
        '    tu-ci npm_publish_dry_run',
        '',
    ];
    console.error(lines.join('\n'));
    process.exit(1);
}

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

fs.writeFileSync(path.join(__dirname, '..', '.npmrc'), lines.join('\n'));

require('./build');
