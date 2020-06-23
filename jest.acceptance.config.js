/* eslint-disable filenames/match-regex */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    ...require('./jest.base.config'),
    displayName: 'acceptance',
    maxConcurrency: 1,
    testTimeout: 30000,
    maxWorkers: process.platform === 'darwin' ? '50%' : '100%', // chromium docker crashes on mac when using 8 cores (taking 8 screenshots at once)

    testMatch: [
        '**/__acceptance_tests__/*-acceptance-test.tsx',
        '**/__screenshot_tests__/*-screenshot-test.tsx',
    ],

    // $FlowFixMe
    globalSetup: require.resolve('./src/test-utils/environment/setup.tsx'),
    // $FlowFixMe
    globalTeardown: require.resolve('./src/test-utils/environment/teardown.tsx'),
    testEnvironment: 'jest-environment-puppeteer',
    // $FlowFixMe
    setupFilesAfterEnv: [require.resolve('./src/test-utils/setup-acceptance-test-env.tsx')],
};
