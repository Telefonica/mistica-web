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
})();
