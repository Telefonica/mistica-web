const childProcess = require('child_process');
const rimraf = require('rimraf');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

const compile = () => {
    run(`yarn swc src --out-dir dist-es --extensions .tsx`);

    [
        '__tests__',
        '__acceptance_tests__',
        '__screenshot_tests__',
        '__type_tests__',
        '__stories__',
        'test-utils',
    ].forEach((dirName) => {
        rimraf.sync(`dist-es/${dirName}`);
    });

    run(`yarn swc dist-es --out-dir dist -C module.type=commonjs`);
};

(async () => {
    console.log('Compiling...');
    compile();

    console.log('Generating TS defs...');
    run('yarn gen-ts-defs');

    console.log('Generating Flow defs...');
    run('yarn ts-to-flow "dist" "flow-defs" "flow-overrides"');

    console.log('Flow check...');
    run('yarn flow check');
})();
