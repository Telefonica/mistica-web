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
const PATH_CRA_INDEX = join(PATH_CRA, 'src', 'index.js');
const PATH_CRA_BUILD = join(PATH_CRA, 'build');

const getTotalSize = (filenames, exclude = []) => {
    let size = 0;
    for (const filename of filenames) {
        if (!exclude.some((exclude) => filename.match(exclude))) {
            size += fs.statSync(filename).size;
        }
    }
    return size;
};

const patchCra = () => {
    const indexJs = `
        import React from 'react';
        import ReactDOM from 'react-dom';
        import {ThemeContextProvider, Text1} from '@telefonica/mistica';

        ReactDOM.render(
            <React.StrictMode>
                <ThemeContextProvider theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}>
                    <Text1>Hello</Text1>
                </ThemeContextProvider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    `;

    // update index.js
    fs.writeFileSync(PATH_CRA_INDEX, indexJs);

    // add @telefonica/mistica dependency to package.json
    const pathCraPackageJson = join(PATH_CRA, 'package.json');
    const packageJson = require(pathCraPackageJson);
    packageJson.dependencies['@telefonica/mistica'] = 'latest';
    fs.writeFileSync(pathCraPackageJson, JSON.stringify(packageJson, null, 4));

    // link @telefonica/mistica dependency
    const pathTelefonicaScope = join(PATH_CRA, 'node_modules', '@telefonica');
    const pathMisticaPackage = join(pathTelefonicaScope, 'mistica');
    mkdirp(pathTelefonicaScope);
    fs.linkSync(PATH_REPO_ROOT, pathMisticaPackage);
};

const installCraDeps = () => {
    execSync('yarn', {stdio: 'inherit', cwd: PATH_CRA});
};

const buildCra = () => {
    console.log(fs.readFileSync(PATH_CRA_INDEX, 'utf-8'));
    execSync('yarn build', {stdio: 'inherit', cwd: PATH_CRA});
};

const main = () => {
    installCraDeps();
    buildCra();
    const craInitial = getTotalSize(glob.sync(join(PATH_CRA_BUILD, '**/*.js')));
    patchCra();
    buildCra();
    const craWithMistica = getTotalSize(glob.sync(join(PATH_CRA_BUILD, '**/*.js')));

    const distJsFilenames = glob.sync(join(PATH_DIST, '**/*.js'));
    const distEsJsFilenames = glob.sync(join(PATH_DIST_ES, '**/*.js'));

    const result = {
        dist: {
            js: getTotalSize(distJsFilenames),
            jsNoMisticaIcons: getTotalSize(distJsFilenames, [/\/generated\/mistica-icons\.js$/]),
        },
        distEs: {
            js: getTotalSize(distEsJsFilenames),
            jsNoMisticaIcons: getTotalSize(distEsJsFilenames, [/\/generated\/mistica-icons\.js$/]),
        },
        cra: {
            craInitial,
            craWithMistica,
        },
    };

    console.log(result);
};

main();
