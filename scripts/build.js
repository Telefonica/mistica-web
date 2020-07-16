const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ignore = [
    '"**/test-utils/**"',
    '"**/__acceptance_tests__/**"',
    '"**/__screenshot_tests__/**"',
    '"**/__tests__/**"',
    '"**/__stories__/**"',
    '"**/__type_tests__/**"',
]
    .flatMap((patter) => ['--ignore', patter])
    .join(' ');

(async () => {
    await exec(`yarn babel src --extensions .tsx --out-dir dist-es ${ignore}`);
    await exec(`yarn babel --plugins @babel/plugin-transform-modules-commonjs dist-es --out-dir dist`);
})();
