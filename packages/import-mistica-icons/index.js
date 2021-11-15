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
            icons.set('icon-' + basename(filename, '.svg'), filename);
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
    const svg = '<svg' + matches[1] + '</svg>';
    const svgSize = svg.match(/(width|height)={(\d+)}/)[2];
    return svg
        .replace(
            /<svg .*?>/,
            `<svg width={size} height={size} viewBox="0 0 ${svgSize} ${svgSize}" role="presentation">`
        )
        .replace(/fill="#?\w+"/g, 'fill={fillColor}');
};

/** lower number means higher priority (more generic) */
const SKIN_PRIORITY = {
    telefonica: 1,
    o2: 2,
    blau: 3,
};

/**
 * @param {string} name
 * @param {string} componentName
 * @param {svgIconsInfo} svgIconsInfo
 */
const createIconComponentSource = async (name, componentName, svgIconsInfo) => {
    // sort skins by priority, lower priority (more specific) first
    const skins = Object.keys(svgIconsInfo).sort(
        (a, b) => (SKIN_PRIORITY[b] ?? 100) - (SKIN_PRIORITY[a] ?? 100)
    );

    const availableIcons = [];
    for (const skin of skins) {
        if (svgIconsInfo[skin].has(name)) {
            availableIcons.push([skin, svgIconsInfo[skin].get(name)]);
        }
    }

    console.log(
        yellow(basename(name)),
        `[${availableIcons.map(([skin]) => skin).join(', ')}] =>`,
        green(componentName)
    );

    const getVariants = () => {
        if (availableIcons.length === 1) {
            return `return ${getIconJsx(availableIcons[0][1])}`;
        }
        let result = '';
        for (let i = 0; i < availableIcons.length; i++) {
            const [skin, filename] = availableIcons[i];
            // using a match because we want "o2" to match with "O2" and "O2-classic"
            const ifStr = i < availableIcons.length - 1 ? `if (skinName.match(/^${skin}/i))` : '';
            const elseStr = i > 0 ? 'else' : '';
            result += `${elseStr} ${ifStr} {return ${getIconJsx(filename)}}`;
        }
        return result;
    };

    const source = `/*
     * This file was autogenerated. Don't edit this file!
     * To update, execute "yarn start" inside "packages/import-mistica-icons"
     */
    import * as React from 'react';
    import {useTheme} from '../../hooks';
    import {useIsInverseVariant} from '../../theme-variant-context';

    type Props = {
        color?: string;
        size?: string | number;
    };

    const ${componentName}: React.FC<Props> = ({color, size = 24}) => {
        const {skinName, colors} = useTheme();
        const isInverse = useIsInverseVariant();
        const fillColor = color ?? (isInverse ? colors.inverse : colors.neutralHigh);

        ${getVariants()}
    };

    export default ${componentName};
    `;

    return format(source);
};

const main = async () => {
    checkoutMisticaIconsRepo();

    const svgIconsInfo = getSvgIconsInfo();
    const allIconNames = getAllIconNames(svgIconsInfo);

    rimraf.sync(PATH_OUTPUT);
    mkdirp.sync(PATH_OUTPUT);

    /** @type Array<[string, string]> */
    const components = [];

    for (const name of allIconNames) {
        const componentName = pascalCase(name);
        const importName = kebabCase(componentName);
        const source = await createIconComponentSource(name, componentName, svgIconsInfo);
        const filename = `${importName}.tsx`;
        components.push([componentName, importName]);
        fs.writeFileSync(join(PATH_OUTPUT, filename), source);
    }

    const index = components
        .sort((a, b) => (a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1))
        .map(
            ([componentName, importName]) =>
                `export {default as ${componentName}} from './generated/mistica-icons/${importName}';`
        )
        .join('\n');

    fs.writeFileSync(PATH_OUTPUT_INDEX_FILENAME, index, 'utf8');

    console.log();
    console.log(`Done! (${allIconNames.length} components).`);
    console.log(`Copy exports in `, yellow(PATH_OUTPUT_INDEX_FILENAME), ' to src/index.tsx');
    console.log();
};

main();
