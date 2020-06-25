/* eslint-disable filenames/match-regex */

module.exports = {
    // Automatically restore mock state between every test
    restoreMocks: true,
    collectCoverageFrom: [
        '**/src/**/*.tsx',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
    ],
    coverageReporters: ['json-summary', 'lcov'],
};
