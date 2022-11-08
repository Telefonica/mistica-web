// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');
const gzipSize = require('gzip-size');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST_ES = join(PATH_REPO_ROOT, 'dist-es');
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
    execSync('yarn', {cwd: PATH_APP});
    execSync('yarn build', {cwd: PATH_APP});
};

const calcStats = () => {
    buildApp();
    const appInitial = 131684; // precalculated - see webpack.config.js
    const appInitialGzip = 42497;
    const appWithMistica = getTotalSize(glob.sync(join(PATH_APP_BUILD, '**/*.js')));
    const appWithMisticaGzip = getTotalSize(glob.sync(join(PATH_APP_BUILD, '**/*.js')), {gzip: true});

    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    return {
        totalJs: getTotalSize(distEsJsFilenames),
        jsWithoutIcons: getTotalSize(distEsJsFilenames, {
            exclude: [/\/generated\/mistica-icons\/.*/, /\/dist-es\/index.js$/],
        }),
        libOverhead: appWithMistica - appInitial,
        libOverheadGzip: appWithMisticaGzip - appInitialGzip,
    };
};

if (require.main === module) {
    console.log(calcStats());
}

module.exports = calcStats;
