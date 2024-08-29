// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');
const gzipSize = require('gzip-size');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST = join(PATH_REPO_ROOT, 'dist');
const PATH_APP = join(__dirname, 'app-test-lib-overhead');
const PATH_APP_BUILD = join(PATH_APP, 'dist');

const getTotalSize = (filenames, {exclude = [], gzip = false} = {}) => {
    let size = 0;
    for (const filename of filenames) {
        if (!exclude.some((exclude) => filename.match(exclude))) {
            if (gzip) {
                size += gzipSize.fileSync(filename);
            } else {
                size += fs.statSync(filename).size;
            }
        }
    }
    return size;
};

const buildApp = () => {
    execSync('yarn', {cwd: PATH_APP, stdio: 'inherit'});
    execSync('yarn build', {cwd: PATH_APP, stdio: 'inherit'});
};

const calcStats = () => {
    buildApp();
    const appInitial = 139844; // precalculated - see webpack.config.js
    const appInitialGzip = 45086;
    const appWithMistica = getTotalSize([join(PATH_APP_BUILD, 'main.js')]);
    const appWithMisticaGzip = getTotalSize([join(PATH_APP_BUILD, 'main.js')], {gzip: true});

    const distJsFilenames = glob.sync(join(PATH_DIST, '**/*.js'));

    return {
        totalJs: getTotalSize(distJsFilenames),
        jsWithoutIcons: getTotalSize(distJsFilenames, {
            exclude: [/\/generated\/mistica-icons\/.*/],
        }),
        libOverhead: appWithMistica - appInitial,
        libOverheadGzip: appWithMisticaGzip - appInitialGzip,
    };
};

if (require.main === module) {
    console.log(calcStats());
}

module.exports = calcStats;
