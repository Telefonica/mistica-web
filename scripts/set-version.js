const fs = require('fs').promises;

const versionFilePath = require.resolve('../src/package-version.tsx');

const prepare = async (config, context) => {
    const {logger} = context;
    logger.log(`Writting new version in ${versionFilePath}`);
    const code = `export const PACKAGE_VERSION = '${context.nextRelease.version}' as string;`;
    await fs.writeFile(versionFilePath, code, 'utf8');
    logger.log(code);
};

module.exports = {prepare};
