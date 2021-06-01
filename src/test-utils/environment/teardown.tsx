import puppeteerTeardown from 'jest-environment-puppeteer/teardown';
import {execSync} from 'child_process';

export default async (): Promise<void> => {
    console.log('Closing...');
    // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
    if (global.__STORYBOOK_SERVER__) {
        console.log('\nStopping storybook server');
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__.stop();
    }
    try {
        execSync('yarn down-chromium', {stdio: 'ignore'});
    } catch (e) {
        // ignore failures, docker could be not running
    }
    await puppeteerTeardown();
};
