module.exports = {
    ...require('./jest.base.config'),
    displayName: 'unit',
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/*-test.tsx'],
    testEnvironmentOptions: {url: 'http://test.tuenti.com'},
    setupFilesAfterEnv: [require.resolve('./setup-test-env.tsx'), '@testing-library/jest-dom/extend-expect'],
};
