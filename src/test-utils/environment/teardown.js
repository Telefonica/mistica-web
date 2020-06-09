// @flow
import puppeteerTeardown from 'jest-environment-puppeteer/teardown';

export default async (): Promise<void> => {
    if (process.argv.includes('--ci')) {
        console.log('\nStopping storybook server');
        global.__STORYBOOK_SERVER__.stop();
    }
    await puppeteerTeardown();
};
