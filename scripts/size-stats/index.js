// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');
const isCi = require('is-ci');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST = join(PATH_REPO_ROOT, 'dist');
const PATH_DIST_ES = join(PATH_REPO_ROOT, 'dist-es');
const PATH_CRA = join(__dirname, 'cra-minimal');
const PATH_CRA_BUILD = join(PATH_CRA, 'build');

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

const buildCra = () => {
    execSync('yarn', {cwd: PATH_CRA});
    execSync('yarn build', {cwd: PATH_CRA});
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
    console.log('Creating size stats...');
    buildCra();
    const craInitial = 133128; // precalculated
    const craWithMistica = getTotalSize(glob.sync(join(PATH_CRA_BUILD, '**/*.js')));

    const distJsFilenames = glob.sync(join(PATH_DIST, '**/*.js'));
    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    const result = JSON.stringify(
        {
            dist: {
                js: getTotalSize(distJsFilenames),
                jsNoMisticaIcons: getTotalSize(distJsFilenames, [/\/generated\/mistica-icons\.js$/]),
            },
            distEs: {
                js: getTotalSize(distEsJsFilenames),
                jsNoMisticaIcons: getTotalSize(distEsJsFilenames, [/\/generated\/mistica-icons\.js$/]),
            },
            cra: {
                initial: craInitial,
                withMistica: craWithMistica,
                difference: craWithMistica - craInitial,
            },
        },
        null,
        4
    );

    fs.writeFileSync(join(PATH_REPO_ROOT, FILE_NAME_STATS_JSON), result);

    if (isCi) {
        assertNoChangesInStatsFile();
    }
};

main();
