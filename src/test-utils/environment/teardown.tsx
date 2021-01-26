import puppeteerTeardown from 'jest-environment-puppeteer/teardown';
import {execSync} from 'child_process';

export default async (): Promise<void> => {
    console.log('Closing...');
    if (process.argv.includes('--ci')) {
        console.log('\nStopping storybook server');
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__.stop();
    }
    execSync('yarn down-chromium', {stdio: 'ignore'});
    await puppeteerTeardown();
};
