const fs = require('fs');
const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));
const swcTransform = ['@swc/jest', {...swcConfig, sourceMaps: 'inline'}];

module.exports = {
    // Automatically restore mock state between every test
    restoreMocks: true,
    collectCoverageFrom: [
        '**/src/**/*.tsx',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
    ],
    transform: {
        '\\.css\\.ts$': ['@vanilla-extract/jest-transform', swcTransform],
        '^.+\\.(t|j)sx?$': swcTransform,
    },
    coverageReporters: ['json-summary', 'lcov'],
};
