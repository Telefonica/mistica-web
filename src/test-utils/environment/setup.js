import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {exec, execSync} from 'child_process';
import {join} from 'path';

export default async (jestConfig = {}) => {
    if (process.argv.includes('--ci')) {
        execSync('yarn storybook-static', {cwd: join(__dirname, '../../../'), stdio: 'inherit'});
        global.__STORYBOOK_SERVER__ = exec('http-server -p 6006', {
            cwd: join(__dirname, '../../../.storybook/dist'),
        });
    }
    await puppeteerSetup(jestConfig);
};
