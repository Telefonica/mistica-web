/* eslint-disable filenames/match-regex */
const fs = require('fs');
const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

module.exports = {
    // Automatically restore mock state between every test
    restoreMocks: true,
    collectCoverageFrom: [
        '**/src/**/*.tsx',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
    ],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', {...swcConfig, sourceMaps: 'inline'}],
    },
    coverageReporters: ['json-summary', 'lcov'],
};
