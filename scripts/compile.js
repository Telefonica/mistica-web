const childProcess = require('child_process');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

const compile = () => {
    run(`yarn vite build`);
    run(`cp dist-es/style.css css/mistica.css`);
    run(`yarn swc dist-es --out-dir dist-es`); // transpile to es5 (package.json browserslist)
    run(`yarn swc dist-es --out-dir dist -C module.type=commonjs`);
};

if (require.main === module) {
    compile();
}

module.exports = compile;
