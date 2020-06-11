// @flow
const config /* : any */ = {
    // Automatically restore mock state between every test
    restoreMocks: true,

    testMatch: ['**/__tests__/*-test.js'],
    collectCoverageFrom: [
        '**/src/**/*.js',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
    ],

    coverageReporters: ['json-summary', 'lcov'],

    testURL: 'http://test.tuenti.com',

    // transform: {
    //     '^.+\\.js$': require.resolve('./src/babel-jest-transformer'),
    // },

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: [require.resolve('./setup-test-env'), '@testing-library/jest-dom/extend-expect'],
};

module.exports = config;
