module.exports = {
    ...require('./jest.base.config'),
    testTimeout: 30000,
    displayName: 'unit',

    collectCoverage: true,
    collectCoverageFrom: [
        '**/src/**/*.[jt]s(x)?',
        '!**/node_modules/**',
        '!**/__*__/**', // ignore tests, acceptance, stories, etc
        '!**/src/generated/**', // ignore generated files
        '!**/*.d.ts',
    ],

    coverageReporters: ['lcov'],
    coverageDirectory: './reports/coverage',

    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/*-test.tsx'],
    testEnvironmentOptions: {url: 'http://test.tuenti.com'},
    setupFilesAfterEnv: ['<rootDir>/setup-test-env.tsx'],
};
