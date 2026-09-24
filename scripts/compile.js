const childProcess = require('child_process');
const buildIcons = require('./build-icons');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

const compile = () => {
    run(`yarn vite build`);
    run(`cp dist-es/style.css css/mistica.css`);

    // transpile to es5 (see .swcrc targets and package.json browserslist)
    // Copy/paste from package.json "browserslist" as SWC has a bug and cannot read that config
    // https://github.com/swc-project/swc/issues/3365
    // "ios_saf" is "ios" only for SWC
    run(`yarn swc dist-es --out-dir dist-es`);

    run(`yarn swc dist-es --out-dir dist -C module.type=commonjs`);

    // Entry point for community folder (import {Component} from '@telefonica/mistica/community')
    run(`echo "export * from './dist/community';" > community.d.ts`);
    run(`echo "export * from './dist-es/community';" > community.js`);
    run(`yarn swc community.js -o community.js --source-maps=false -C module.type=commonjs`);

    /*
     * src/icon-runtime.tsx is an entry of the vite build, so dist-es/icon-runtime.js,
     * dist/icon-runtime.js and dist/icon-runtime.d.ts exist. @telefonica/mistica-icons reads those
     * files, each world its own. There is no shim at the root of the package, and no "exports" map:
     * a shim can only point at one of the two builds, and a map would break every extensionless deep
     * import of every consumer.
     */

    // @telefonica/mistica-icons comes from the same repository and from the same release
    buildIcons();

    // the icons must never come back into this package. See the script for the reason.
    run(`node scripts/check-icons-not-bundled.js`);
};

if (require.main === module) {
    compile();
}

module.exports = compile;
