// Inspired from: https://github.com/facebook/jest/blob/master/packages/jest-core/src/version.ts

// Cannot be `import` as it's not under TS root dir
const {version} = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires

export const PACKAGE_VERSION: string = version;
