module.exports = {
    ...require('./jest.base.config.cjs'),
    projects: [
        '<rootDir>/jest.unit.config.cjs',
        '<rootDir>/jest.ssr.config.cjs',
        '<rootDir>/jest.acceptance.config.cjs',
    ],
};
