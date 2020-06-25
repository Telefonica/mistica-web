module.exports = {
    ...require('./jest.base.config'),
    projects: ['<rootDir>/jest.unit.config.js', '<rootDir>/jest.acceptance.config.js'],
};
