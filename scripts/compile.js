const childProcess = require('child_process');
const {readFileSync, writeFileSync} = require('fs');
const execSync = childProcess.execSync;

const run = (command) => {
    execSync(command, {stdio: 'inherit'});
};

const compile = () => {
    run(`yarn vite build`);
    let themeContextProviderJs = readFileSync('dist-es/theme-context-provider.js').toString();
    const styles = readFileSync('dist-es/style.css').toString();
    themeContextProviderJs = themeContextProviderJs.replace('"<MISTICA_CSS>"', `\`${styles}\``);
    writeFileSync('dist-es/theme-context-provider.js', themeContextProviderJs);
    run(`cp dist-es/style.css css/mistica.css`);
    run(`yarn swc dist-es --out-dir dist -C module.type=commonjs`);
};

if (require.main === module) {
    compile();
}

module.exports = compile;
