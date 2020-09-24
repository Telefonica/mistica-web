// @ts-check
const fs = require('fs');
const glob = require('glob');
const {join} = require('path');
const {execSync} = require('child_process');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const PATH_REPO_ROOT = join(__dirname, '../..');
const PATH_DIST = join(PATH_REPO_ROOT, 'dist');
const PATH_DIST_ES = join(PATH_REPO_ROOT, 'dist-es');
const PATH_CRA = join(__dirname, 'cra-minimal');
const PATH_CRA_BUILD = join(PATH_CRA, 'build');
const PATH_TELEFONICA_SCOPE = join(PATH_CRA, 'node_modules', '@telefonica');

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

    // link @telefonica/mistica dependency
    const pathMisticaPackage = join(PATH_TELEFONICA_SCOPE, 'mistica');
    rimraf.sync(PATH_TELEFONICA_SCOPE);
    mkdirp.sync(PATH_TELEFONICA_SCOPE);
    fs.symlinkSync(PATH_REPO_ROOT, pathMisticaPackage);

    // build
    execSync('yarn build', {cwd: PATH_CRA});
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

    console.log(result);
    fs.writeFileSync(join(PATH_REPO_ROOT, 'build-stats.json'), result);
};

main();
