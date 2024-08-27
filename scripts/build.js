import {execSync} from 'node:child_process';
import {compile} from './compile.js';
import {existsSync} from 'node:fs';

const run = (command, {stdio = 'inherit'} = {}) => {
    execSync(command, {stdio});
};

const checkBuild = () => {
    if (existsSync('./dist/node_modules')) {
        console.log('ERROR: "dist/node_modules" exists. Check "vite.config.js" external config.');
        process.exit(1);
    }
};

(async () => {
    console.log('Compiling...');
    compile();

    console.log('Generating TS defs...');
    run('yarn gen-ts-defs');

    console.log('Check build');
    checkBuild();
})();
