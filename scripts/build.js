import {execSync} from 'node:child_process';
import {compile} from './compile.js';

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

(async () => {
    console.log('Compiling...');
    compile();

    console.log('Generating TS defs...');
    run('yarn gen-ts-defs');
})();
