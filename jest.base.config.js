// @flow
/* eslint-disable filenames/match-regex */

const config /* : any */ = {
    // Automatically restore mock state between every test
    restoreMocks: true,
    collectCoverageFrom: [
        '**/src/**/*.js',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
    ],
    coverageReporters: ['json-summary', 'lcov'],
};

module.exports = config;
