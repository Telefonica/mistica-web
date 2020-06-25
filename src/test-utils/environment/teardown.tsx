import puppeteerTeardown from 'jest-environment-puppeteer/teardown';

export default async (): Promise<void> => {
    if (process.argv.includes('--ci')) {
        console.log('\nStopping storybook server');
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__.stop();
    }
    await puppeteerTeardown();
};
