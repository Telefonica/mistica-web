// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST = join(PATH_REPO_ROOT, 'dist');
const PATH_DIST_ES = join(PATH_REPO_ROOT, 'dist-es');
const PATH_APP = join(__dirname, 'app-test-lib-overhead');
const PATH_APP_BUILD = join(PATH_APP, 'dist');

const FILE_NAME_STATS_JSON = 'size-stats.json';

const getTotalSize = (filenames, exclude = []) => {
    let size = 0;
    for (const filename of filenames) {
        if (!exclude.some((exclude) => filename.match(exclude))) {
            size += fs.statSync(filename).size;
        }
    }
    return size;
};

const formatKb = (bytes) => (bytes / 1024).toFixed(2) + ' KB';

const buildApp = () => {
    execSync('yarn', {cwd: PATH_APP});
    execSync('yarn build', {cwd: PATH_APP});
};

module.exports = () => {
    buildApp();
    const appInitial = 130857; // precalculated - see webpack.config.js
    const appWithMistica = getTotalSize(glob.sync(join(PATH_APP_BUILD, '**/*.js')));

    const distJsFilenames = glob.sync(join(PATH_DIST, '**/*.js'));
    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    const result =
        JSON.stringify(
            {
                dist: {
                    js: formatKb(getTotalSize(distJsFilenames)),
                    jsNoMisticaIcons: formatKb(
                        getTotalSize(distJsFilenames, [/\/generated\/mistica-icons\/.*/, /\/dist\/index.js$/])
                    ),
                },
                distEs: {
                    js: formatKb(getTotalSize(distEsJsFilenames)),
                    jsNoMisticaIcons: formatKb(
                        getTotalSize(distEsJsFilenames, [
                            /\/generated\/mistica-icons\/.*/,
                            /\/dist-es\/index.js$/,
                        ])
                    ),
                },
                libOverhead: {
                    initial: formatKb(appInitial),
                    withMistica: formatKb(appWithMistica),
                    difference: formatKb(appWithMistica - appInitial),
                },
            },
            null,
            4
        ) + '\n';

    fs.writeFileSync(join(PATH_REPO_ROOT, FILE_NAME_STATS_JSON), result);
};
