/* eslint-disable filenames/match-regex */

module.exports = {
    ...require('./jest.base.config'),
    displayName: 'unit',
    testMatch: ['**/__tests__/*-test.tsx'],
    testURL: 'http://test.tuenti.com',
    setupFilesAfterEnv: [require.resolve('./setup-test-env.tsx'), '@testing-library/jest-dom/extend-expect'],
};
