const {spawnSync} = require('child_process');

const args = process.argv.slice(2);
const hasConfig = args.some((arg) => arg === '--config' || arg === '-c' || arg.startsWith('--config='));
const result = spawnSync(
    process.execPath,
    [
        require.resolve('jest/bin/jest'),
        ...(hasConfig ? [] : ['--config', 'jest.acceptance.config.js']),
        ...args.filter((arg) => arg !== '--ui'),
    ],
    {
        stdio: 'inherit',
        env: {...process.env, HEADLESS: args.includes('--ui') ? 'false' : 'true'},
    }
);
if (result.error) {
    console.error(result.error);
}
process.exit(result.status ?? 1);
