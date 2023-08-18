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
        '\\.css\\.ts$': '@vanilla-extract/jest-transform',
        '^.+\\.(t|j)sx?$': ['@swc/jest', {...swcConfig, sourceMaps: 'inline'}],
    },
    coverageReporters: ['json-summary', 'lcov'],

    /* Jest module support is still experimental: https://jestjs.io/docs/ecmascript-modules
     * this maps lodash-es to the commonjs lodash module, which is faster than transpiling.
     * Once we migrate Mistica to a module this should be removed */
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
    },
};
