// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');
const isCi = require('is-ci');

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

const buildApp = () => {
    execSync('yarn', {cwd: PATH_APP});
    execSync('yarn build', {cwd: PATH_APP});
};

const assertNoChangesInStatsFile = () => {
    const stdout = execSync(`git diff "${FILE_NAME_STATS_JSON}"`, {cwd: PATH_REPO_ROOT})
        .toString('utf-8')
        .trim();

    if (stdout) {
        console.log();
        console.log(stdout);
        console.log();
        console.error('Size stats file was not updated!');
        console.error(`Run yarn build and commit the generated "${FILE_NAME_STATS_JSON}" file`);
        console.log();
        process.exit(1);
    }
};

const main = () => {
    const t0 = Date.now();
    console.log('Creating size stats...');
    buildApp();
    const appInitial = 130857; // precalculated - see webpack.config.js
    const appWithMistica = getTotalSize(glob.sync(join(PATH_APP_BUILD, '**/*.js')));

    const distJsFilenames = glob.sync(join(PATH_DIST, '**/*.js'));
    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    const result =
        JSON.stringify(
            {
                dist: {
                    js: getTotalSize(distJsFilenames),
                    jsNoMisticaIcons: getTotalSize(distJsFilenames, [
                        /\/generated\/mistica-icons\/.*/,
                        /\/dist\/index.js$/,
                    ]),
                },
                distEs: {
                    js: getTotalSize(distEsJsFilenames),
                    jsNoMisticaIcons: getTotalSize(distEsJsFilenames, [
                        /\/generated\/mistica-icons\/.*/,
                        /\/dist-es\/index.js$/,
                    ]),
                },
                libOverhead: {
                    initial: appInitial,
                    withMistica: appWithMistica,
                    difference: appWithMistica - appInitial,
                },
            },
            null,
            4
        ) + '\n';

    fs.writeFileSync(join(PATH_REPO_ROOT, FILE_NAME_STATS_JSON), result);

    console.log('Done in:', Date.now() - t0, 'ms');

    if (isCi) {
        assertNoChangesInStatsFile();
    }
};

main();
