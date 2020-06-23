/* eslint-disable @typescript-eslint/no-var-requires */
const version =
    process.env.NODE_ENV === 'production'
        ? require('babel-plugin-preval/macro').preval(`module.exports = require('../package.json').version`)
        : require('../package.json').version;

export const PACKAGE_VERSION: string = version;
