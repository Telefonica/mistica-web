import puppeteerTeardown from 'jest-environment-puppeteer/teardown';

export default async () => {
    if (process.argv.includes('--ci')) {
        console.log('\nStopping storybook server');
        global.__STORYBOOK_SERVER__.kill();
    }
    await puppeteerTeardown();
};
