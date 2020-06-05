// @flow
/* eslint-disable filenames/match-regex */
const acceptanceConfig = require('./jest.acceptance.config.js');

module.exports = {
    ...acceptanceConfig,
    displayName: 'screenshot',

    testMatch: ['**/__screenshot_tests__/*-screenshot-test.js'],

    setupFilesAfterEnv: [require.resolve('./src/test-utils/setup-screenshot-test-env.js')],
};
