import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

export const compile = () => {
    run(`yarn vite build`);
    run(`mkdir -p ./dist/css`);
    run(`cp ./css/*.css ./dist/css`);
    run(`mv dist/style.css ./dist/css/mistica.css`);

    // transpile to es5 (see .swcrc targets and package.json browserslist)
    // Copy/paste from package.json "browserslist" as SWC has a bug and cannot read that config
    // https://github.com/swc-project/swc/issues/3365
    // "ios_saf" is "ios" only for SWC
    run(`yarn swc dist --out-dir dist`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // The script was run from cli
    compile();
}
