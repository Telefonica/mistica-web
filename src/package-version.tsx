// @ts-expect-error no definitions for this module
import preval from 'babel-plugin-preval/macro';

// Cannot be `import` as it's not under TS root dir
const version = preval(`module.exports = require('../package.json').version`);

export const PACKAGE_VERSION: string = version;
