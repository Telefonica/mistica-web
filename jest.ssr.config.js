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
    displayName: 'ssr',
    maxConcurrency: 1,
    testTimeout: 60000,
    maxWorkers: getMaxWorkers(),

    testMatch: ['**/__acceptance_tests__/*-ssr-acceptance-test.tsx'],

    globalSetup: require.resolve('./src/test-utils/environment/setup-ssr.tsx'),
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: [require.resolve('./src/test-utils/setup-ssr-test-env.tsx')],
};
