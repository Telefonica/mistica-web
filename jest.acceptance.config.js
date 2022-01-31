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
    ],

    globalSetup: require.resolve('./src/test-utils/environment/setup.tsx'),
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: [require.resolve('./src/test-utils/setup-acceptance-test-env.tsx')],
};
