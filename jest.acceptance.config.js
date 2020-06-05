// @flow
/* eslint-disable filenames/match-regex */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const jestConfigBase = require('./jest.config');

module.exports = {
    ...jestConfigBase,
    displayName: 'acceptance',
    maxConcurrency: 1,
    testTimeout: 30000,

    testMatch: ['**/__acceptance_tests__/*-acceptance-test.js'],

    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: [],
};
