const childProcess = require('child_process');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

const compile = () => {
    run(`yarn vite build`);
    run(`yarn swc dist-es --out-dir dist -C module.type=commonjs`);
    run(`cp dist-es/style.css css/mistica.css`);
};

if (require.main === module) {
    compile();
}

module.exports = compile;
