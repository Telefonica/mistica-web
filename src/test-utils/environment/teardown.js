import puppeteerTeardown from 'jest-environment-puppeteer/teardown';

export default async () => {
    if (process.argv.includes('--ci')) {
        console.log('Stopping storybook server');
        global.__STORYBOOK_SERVER__.kill();
    }
    await puppeteerTeardown();
};
