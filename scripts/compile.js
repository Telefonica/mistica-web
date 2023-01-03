const childProcess = require('child_process');
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
};

if (require.main === module) {
    compile();
}

module.exports = compile;
