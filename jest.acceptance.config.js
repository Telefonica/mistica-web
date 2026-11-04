// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const getMaxWorkers = () => {
    if (process.platform === 'darwin') {
        return '50%';
    }
    if (process.argv.includes('--ci')) {
        return 2;
    }
    return '100%';
};

module.exports = {
    ...require('./jest.base.config'),
    displayName: 'acceptance',
    maxConcurrency: 1,
    testTimeout: 60000,
    maxWorkers: getMaxWorkers(),

    testMatch: [
        '**/__acceptance_tests__/*-acceptance-test.tsx',
        '**/__screenshot_tests__/*-screenshot-test.tsx',
        '!**/__acceptance_tests__/*-ssr-acceptance-test.tsx', // these are handled in jest.ssr.config.js
    ],

    globalSetup: require.resolve('./src/test-utils/environment/setup-browser.js'),
    globalTeardown: require.resolve('./src/test-utils/environment/teardown-browser.js'),
    testEnvironment: require.resolve('./src/test-utils/environment/playwright.js'),
    setupFilesAfterEnv: [require.resolve('./src/test-utils/fail-test-on-console-error.tsx')],
};
