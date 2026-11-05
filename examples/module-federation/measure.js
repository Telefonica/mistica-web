/**
 * Builds the host and the remote, then reports the files that each one emits.
 *
 * Run "yarn build" in the root of the repository first, then here:
 *
 *     yarn install
 *     yarn measure
 *     SHARE_ICONS=1 yarn measure
 */
const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const WEBPACK = path.join(__dirname, 'node_modules', '.bin', 'webpack');
const APPS = ['remote', 'host'];

const kB = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

const build = (app) => {
    console.log(`\nBuilding ${app}…`);
    execFileSync(WEBPACK, ['--config', path.join(__dirname, app, 'webpack.config.js')], {
        stdio: 'inherit',
        cwd: path.join(__dirname, app),
        env: process.env,
    });
};

const report = (app) => {
    const dist = path.join(__dirname, app, 'dist');
    const files = fs
        .readdirSync(dist)
        .filter((name) => name.endsWith('.js'))
        .map((name) => {
            const content = fs.readFileSync(path.join(dist, name));
            return {name, size: content.length, gzip: zlib.gzipSync(content).length};
        })
        .sort((a, b) => b.size - a.size);

    const total = files.reduce((sum, file) => sum + file.size, 0);
    const totalGzip = files.reduce((sum, file) => sum + file.gzip, 0);

    console.log(`\n${app}: ${files.length} files, ${kB(total)} (${kB(totalGzip)} gzip)`);
    files.slice(0, 8).forEach((file) => {
        console.log(`  ${kB(file.size).padStart(10)}  ${kB(file.gzip).padStart(10)} gzip  ${file.name}`);
    });
    if (files.length > 8) {
        console.log(`  … and ${files.length - 8} smaller files`);
    }

    return {total, totalGzip, sizes: files};
};

const main = () => {
    console.log(
        process.env.SHARE_ICONS === '1'
            ? 'Sharing the icons through the path prefix'
            : 'The icons stay out of the shared list'
    );

    APPS.forEach(build);

    const reports = APPS.map((app) => ({app, ...report(app)}));
    const emitted = reports.reduce((sum, item) => sum + item.total, 0);
    const emittedGzip = reports.reduce((sum, item) => sum + item.totalGzip, 0);

    console.log(`\nEmitted by the two builds: ${kB(emitted)} (${kB(emittedGzip)} gzip)`);
    /**
     * Each application also emits its own copy of every shared module, as a fallback for the case
     * where it runs alone. The browser downloads one of those copies, not both, so this sum counts
     * the library two times.
     */
    console.log('That sum holds one fallback copy of the library for each application.');
    console.log('Run "node examples/module-federation/verify.js" to measure the page itself.');
};

main();
