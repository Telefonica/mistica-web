// @flow
/* eslint-disable filenames/match-regex */

const config /* : any */ = {
    ...require('./jest.base.config'),
    displayName: 'unit',
    testMatch: ['**/__tests__/*-test.js'],
    testURL: 'http://test.tuenti.com',
    setupFilesAfterEnv: [require.resolve('./setup-test-env'), '@testing-library/jest-dom/extend-expect'],
};

module.exports = config;
