import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {exec} from 'child_process';
import {join} from 'path';

export default async (jestConfig = {}) => {
    if (process.argv.includes('--ci')) {
        console.log('\nStarting storybook server on port 6006');
        global.__STORYBOOK_SERVER__ = exec('yarn storybook-serve', {
            cwd: join(__dirname, '../../../'),
            env: null,
        });
    }
    await puppeteerSetup(jestConfig);
};
