const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const execSync = childProcess.execSync;
const dtsToFlow = require('./dts-to-flow');

const exclude = `--ignore '__tests__/**/*'`;

(async () => {
    const t0 = Date.now();
    execSync(`yarn swc src --out-dir dist-es --extensions .tsx ${exclude}`, {stdio: 'inherit'});
    const t1 = Date.now();
    console.log('TIME swc: ', t1 - t0);
    execSync(`yarn swc dist-es --out-dir dist -C module.type=commonjs ${exclude}`, {stdio: 'inherit'});
    const t2 = Date.now();
    console.log('TIME swc2:', t2 - t1);

    await exec(`yarn gen-ts-defs`);
    const t3 = Date.now();
    console.log('TIME gen ts defs', t3 - t2);

    await dtsToFlow();
    const t4 = Date.now();
    console.log('TIME gen flow defs', t4 - t3);
    execSync(`yarn flow check`, {stdio: 'inherit'});
    const t5 = Date.now();
    console.log('TIME flow check', t5 - t4);

    await exec(`node scripts/size-stats`);
    console.log('TIME size stats:', Date.now() - t5);
})();
