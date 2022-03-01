const childProcess = require('child_process');
const compile = require('./compile');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
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
