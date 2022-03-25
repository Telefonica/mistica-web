// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST_ES = join(PATH_REPO_ROOT, 'dist-es');
const PATH_APP = join(__dirname, 'app-test-lib-overhead');
const PATH_APP_BUILD = join(PATH_APP, 'dist');

const getTotalSize = (filenames, exclude = []) => {
    let size = 0;
    for (const filename of filenames) {
        if (!exclude.some((exclude) => filename.match(exclude))) {
            size += fs.statSync(filename).size;
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
    const appInitial = 130857; // precalculated - see webpack.config.js
    const appWithMistica = getTotalSize(glob.sync(join(PATH_APP_BUILD, '**/*.js')));

    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    return {
        totalJs: getTotalSize(distEsJsFilenames),
        jsWithoutIcons: getTotalSize(distEsJsFilenames, [
            /\/generated\/mistica-icons\/.*/,
            /\/dist-es\/index.js$/,
        ]),
        libOverhead: appWithMistica - appInitial,
    };
};

if (require.main === module) {
    console.log(calcStats());
}

module.exports = calcStats;
