import puppeteerTeardown from 'jest-environment-puppeteer/teardown';

export default async () => {
    if (process.argv.includes('--ci')) {
        global.__STORYBOOK_SERVER__.kill();
    }
    await puppeteerTeardown();
};
