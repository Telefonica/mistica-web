// @ts-check
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const {join, basename} = require('path');
const {execSync} = require('child_process');
const svgr = require('@svgr/core').default;
const prettier = require('prettier');
const {camelCase, kebabCase, upperFirst, uniq} = require('lodash');
const {yellow, green} = require('colors/safe');
const glob = require('glob');

const pascalCase = (s) => upperFirst(camelCase(s));

const PATH_REPO_ROOT = join(__dirname, '..', '..');
const PATH_CACHE = join(__dirname, 'node_modules', '.cache');
const PATH_MISTICA_ICONS_REPO = join(PATH_CACHE, 'mistica-icons');
const PATH_OUTPUT = join(PATH_REPO_ROOT, 'src', 'generated/mistica-icons');
const PATH_OUTPUT_INDEX_FILENAME = join(PATH_OUTPUT, 'index.tsx.txt');

// const GIT_MISTICA_ICONS_BRANCH = 'production';
const GIT_MISTICA_ICONS_BRANCH = 'multibrand-icons';

const GIT_MISTICA_ICONS = 'git@github.com:Telefonica/mistica-icons.git';

const checkoutMisticaIconsRepo = () => {
    mkdirp.sync(PATH_CACHE);

    if (!fs.existsSync(PATH_MISTICA_ICONS_REPO)) {
        execSync(`git clone ${GIT_MISTICA_ICONS} ${PATH_MISTICA_ICONS_REPO}`, {
            cwd: PATH_CACHE,
            stdio: 'inherit',
        });
    }

    execSync(`git fetch`, {
        cwd: PATH_MISTICA_ICONS_REPO,
        stdio: 'inherit',
    });

    execSync(`git checkout ${GIT_MISTICA_ICONS_BRANCH}`, {
        cwd: PATH_MISTICA_ICONS_REPO,
        stdio: 'inherit',
    });

    execSync(`git pull`, {
        cwd: PATH_MISTICA_ICONS_REPO,
        stdio: 'inherit',
    });
};

/**
 * @typedef {string} name
 * @typedef {string} filename
 * @typedef {{[skin: string]: Map<name, filename>}} svgIconsInfo
 *
 * @returns {svgIconsInfo}
 */
const getSvgIconsInfo = () => {
    const basePath = join(PATH_MISTICA_ICONS_REPO, 'icons');
    const skins = fs.readdirSync(basePath);

    /** @type {svgIconsInfo} */
    const result = {};

    for (const skin of skins) {
        const filenames = glob.sync(join(basePath, skin, '**/*.svg'));

        /** @type {Map<name, filename>} */
        const icons = new Map();
        filenames.forEach((filename) => {
            icons.set(basename(filename, '.svg'), filename);
        });

        result[skin] = icons;
    }
    return result;
};

/**
 * @param {svgIconsInfo} svgIconsInfo
 */
const getAllIconNames = (svgIconsInfo) => {
    const allIconNames = [];
    Object.entries(svgIconsInfo).forEach(([, icons]) => {
        for (const [name] of icons) {
            allIconNames.push(name);
        }
    });
    return uniq(allIconNames).sort();
};

// const createIconComponentSource = async (svgSource, componentName) => {
//     const generated = svgr.sync(
//         svgSource,
//         {
//             ref: false,
//             titleProp: false,
//             typescript: true,
//             template: require('./template'),
//             plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
//         },
//         {componentName}
//     );

//     // get icon size, needed to set the viewBox
//     const svgSize = generated.match(/(width|height)={(\d+)}/)[2];

//     return (
//         generated
//             // set svg props
//             .replace(
//                 /<svg .*?>/,
//                 `<svg width={size} height={size} viewBox="0 0 ${svgSize} ${svgSize}" role="presentation">`
//             )
//             // set fill color
//             .replace(/fill="#?\w+"/g, 'fill={fillColor}')
//             // add component type, for some reason it gets stripped from the template
//             .replace(/\s*=\s*\({\s*color,/m, ': React.FC<Props> = ({color,')
//     );
// };

const format = async (src) =>
    prettier.format(src, {...(await prettier.resolveConfig('.')), parser: 'babel-ts'});

/**
 * @param {string} svgFilename
 * @returns {string}
 */
const getIconJsx = (svgFilename) => {
    const svgSource = fs.readFileSync(svgFilename, 'utf8');
    const jsx = svgr.sync(svgSource, {
        ref: false,
        titleProp: false,
        typescript: true,
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    });
    // this generates a complete component, but we only need the JSX
    const matches = jsx.match(/<svg(.*)<\/svg>/);
    return '<svg' + matches[1] + '</svg>';
};

/** lower number means higher priority */
const SKIN_PRIORITY = {
    telefonica: 1,
    o2: 2,
    blau: 3,
};

/**
 * @param {string} name
 * @param {svgIconsInfo} svgIconsInfo
 */
const createIconComponentSource = async (name, svgIconsInfo) => {
    // sort skins by priority, lower priority first
    const skins = Object.keys(svgIconsInfo).sort(
        (a, b) => (SKIN_PRIORITY[b] ?? 100) - (SKIN_PRIORITY[a] ?? 100)
    );
    console.log(skins);

    const availableIcons = [];
    for (const skin of skins) {
        if (svgIconsInfo[skin].has(name)) {
            availableIcons.push([skin, svgIconsInfo[skin].get(name)]);
        }
    }
    console.log(availableIcons);

    const componentName = pascalCase(name);

    const getVariants = () => {
        if (availableIcons.length === 1) {
            return `return ${getIconJsx(availableIcons[0][1])}`;
        }
        for (const i = 0; i < availableIcons.length - 1; i++) {}
    };

    const source = `/*
     * This file was autogenerated. Don't edit this file!
     * To update, execute "yarn start" inside "packages/import-mistica-icons"
     */
    import * as React from 'react';
    import {useTheme} from '../../hooks';
    import {useIsInverseVariant} from '../../theme-variant-context';


    const ${componentName} = ({fillColor, size}) => {
        const {skinName} = useTheme();
        ${getVariants()}
    };

    export default ${componentName};
    `;

    return format(source);
};

const main = async () => {
    // checkoutMisticaIconsRepo();

    const svgIconsInfo = getSvgIconsInfo();
    const allIconNames = getAllIconNames(svgIconsInfo);

    console.log(svgIconsInfo.telefonica.get('wallet-filled'));

    console.log(getIconJsx(svgIconsInfo.telefonica.get('wallet-filled')));

    rimraf.sync(PATH_OUTPUT);
    mkdirp.sync(PATH_OUTPUT);

    for (const name of allIconNames) {
        console.log(await createIconComponentSource(name, svgIconsInfo));
        return;
    }

    // const doNotEditComment = `/*
    //     * This file was autogenerated. Don't edit this file!
    //     *
    //     * To update, execute "yarn start" inside "import-mistica-icons"
    //     */
    // `;

    // const componentHead = `
    //     ${doNotEditComment}

    //     import * as React from 'react';
    //     import {useTheme} from '../../hooks';
    //     import {useIsInverseVariant} from '../../theme-variant-context';

    //     type Props = {
    //         color?: string;
    //         size?: string | number;
    //     };

    // `;

    // const components = [];

    // for (const svgFilename of svgFilenames) {
    //     const svgCode = fs.readFileSync(svgFilename, 'utf-8');
    //     const componentName = 'Icon' + pascalCase(basename(svgFilename, '.svg'));

    //     console.log(yellow(basename(svgFilename)), '=>', green(componentName));
    //     const src = componentHead + (await createIconComponentSource(svgCode, componentName));
    //     const formatted = await format(src);
    //     const importName = kebabCase(componentName);
    //     const filename = `${importName}.tsx`;
    //     components.push([componentName, importName]);

    //     fs.writeFileSync(join(PATH_OUTPUT, filename), formatted);
    // }

    // const index = components
    //     .sort((a, b) => (a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1))
    //     .map(
    //         ([componentName, importName]) =>
    //             `export {default as ${componentName}} from './generated/mistica-icons/${importName}';`
    //     )
    //     .join('\n');

    // fs.writeFileSync(PATH_OUTPUT_INDEX_FILENAME, index, 'utf8');

    // console.log();
    // console.log('Done! Copy exports in ', yellow(PATH_OUTPUT_INDEX_FILENAME), ' to src/index.tsx');
    // console.log();
};

main();
