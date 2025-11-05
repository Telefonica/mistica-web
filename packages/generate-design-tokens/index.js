import fs from 'fs';
import path from 'path';
import url from 'url';
// eslint-disable-next-line import/extensions
import {generateSkinCssSrc, buildRadius, generateCommonCssSrc} from './css-generator.js';
import prettier from 'prettier';

/*
By default, this script will look for the design tokens inside .github folder but you may want to clone the mistica-design repo elsewhere.

To run this script locally using a custom path for the tokens, you can do the following:

1. Clone this repo:
    https://github.com/Telefonica/mistica-design

2. Run:
    DESIGN_TOKENS_FOLDER="/path/to/mistica-design/tokens" node index.js
*/

// in node >= 20 we could use import.meta.dirname instead
// @ts-ignore
const currentDir = url.fileURLToPath(new URL('.', import.meta.url));

const DESIGN_TOKENS_FOLDER =
    process.env.DESIGN_TOKENS_FOLDER || path.join(currentDir, '../../.github/mistica-design/tokens/');

console.log('Using design tokens from:', DESIGN_TOKENS_FOLDER);

const SKINS_FOLDER = path.join(currentDir, '..', '..', 'src', 'skins');
const CSS_FOLDER = path.join(currentDir, '..', '..', 'css');

const KNOWN_SKINS = [
    'blau',
    'movistar',
    'movistar-new',
    'o2',
    'o2-new',
    'telefonica',
    'vivo',
    'vivo-new',
    'tu',
    'esimflag',
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const toPascalCase = (str) => capitalize(toCamelCase(str));

const jsonSort = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(jsonSort);
    }

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    return Object.keys(obj)
        .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
        .reduce((acc, key) => {
            acc[key] = jsonSort(obj[key]);
            return acc;
        }, {});
};

/**
 * @param {{angle: number, colors: Array<{
 *     value: string,
 *     stop: number, // value from 0 to 1
 * }>}} gradientDescription
 * @returns {string}
 */
const buildGradient = (gradientDescription) => {
    const stops = gradientDescription.colors.map((color) => {
        // eslint-disable-next-line no-use-before-define
        const formattedColor = '${' + buildColor(color) + '}';
        return `${formattedColor} ${color.stop * 100}%`;
    });
    return '`' + `linear-gradient(${gradientDescription.angle}deg, ${stops.join(', ')})` + '`';
};

const buildColor = (colorDescription) => {
    if (colorDescription.type === 'linear-gradient') {
        return buildGradient(colorDescription.value);
    }

    if (typeof colorDescription.value !== 'string') {
        console.error('Unexpected color description:', JSON.stringify(colorDescription, null, 2));
        process.exit(1);
    }

    if (colorDescription.value.startsWith('{') && colorDescription.value.endsWith('}')) {
        return colorDescription.value.replace('{', '').replace('}', '');
    }

    // https://regexper.com/#%2Frgba%5C%28%5C%7B%28.%2B%29%5C%7D%2C%20%28%5B01%5D%28%3F%3A%5C.%5Cd%2B%29%3F%29%5C%29%2F
    const colorWithAlphaRegExp = /rgba\(\{(.+)\}, ([01](?:\.\d+)?)\)/;
    const colorWithAlphaMatches = colorDescription.value.match(colorWithAlphaRegExp);

    if (colorWithAlphaMatches) {
        const colorName = colorWithAlphaMatches[1];
        const alpha = colorWithAlphaMatches[2];
        return `applyAlpha(${colorName}, ${alpha})`;
    }

    throw new Error(`Unknown color format: ${colorDescription.value}`);
};

const generateSkinSrc = (skinName) => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`), 'utf8');
    const needsApplyAlphaImport = designTokensFile.includes('rgba');
    const designTokens = JSON.parse(designTokensFile);
    const skinConstantName = `${skinName.toUpperCase().replace(/-/g, '_')}_SKIN`;

    const textTokens = {};
    Object.entries(designTokens.text).forEach(([textAttribute, textAttributeConfig]) => {
        Object.entries(textAttributeConfig).forEach(([textPresetName, {value}]) => {
            if (!textTokens[textPresetName]) {
                textTokens[textPresetName] = {};
            }
            textTokens[textPresetName][textAttribute] = value;
        });
    });

    return `
import {${skinConstantName}} from './constants';
${needsApplyAlphaImport ? `import {applyAlpha} from '../utils/color';` : ''}

import type {GetKnownSkin, KnownSkin} from './types';

export const palette = {
    ${Object.entries(designTokens.global.palette)
        .map(([colorName, colorDescription]) => `'${colorName}':'${colorDescription.value}'`)
        .join(',')}
};

export const get${toPascalCase(skinName)}Skin: GetKnownSkin = () => {
    const skin: KnownSkin = {
        name: ${skinConstantName},
        colors: {
            ${Object.entries(designTokens.light)
                .map(([colorName, colorDescription]) => `'${colorName}': ${buildColor(colorDescription)}`)
                .join(',')}
        },
        darkModeColors: {
            ${Object.entries(designTokens.dark)
                .map(([colorName, colorDescription]) => `'${colorName}': ${buildColor(colorDescription)}`)
                .join(',')}
        },
        borderRadii: {
            ${Object.entries(designTokens.radius)
                .map(
                    ([radiusName, radiusDescription]) =>
                        `'${radiusName}': '${buildRadius(radiusDescription)}'`
                )
                .join(',')}
        },
        textPresets: ${JSON.stringify(jsonSort(textTokens))},
        themeVariants: {
            ${Object.entries(designTokens.themeVariant)
                .map(
                    ([componentName, variantDescription]) =>
                        `'${componentName}': '${variantDescription.value}'`
                )
                .join(',')},
        },
    };
    return skin;
};
`;
};

const generateColorTypesSrc = (skinName) => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`), 'utf8');
    const designTokens = JSON.parse(designTokensFile);

    return `
export type Colors = {
    ${Object.keys(designTokens.light)
        .map((colorName) => `'${colorName}': string`)
        .join(';')}
};`;
};

const formatCss = async (source) =>
    prettier.format(source, {
        ...(await prettier.resolveConfig('.')),
        parser: 'css',
    });

const formatTs = async (source) =>
    prettier.format(source, {
        ...(await prettier.resolveConfig('.')),
        parser: 'typescript',
    });

const generateSkinFiles = async () => {
    let anyGeneratedSkin;

    for (const skinName of KNOWN_SKINS) {
        console.log('Generating tokens for skin', skinName);

        if (!fs.existsSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`))) {
            console.error(`Missing ${skinName}.json file`);
            return;
        }

        const skinSrc = await formatTs(generateSkinSrc(skinName));
        fs.writeFileSync(path.join(SKINS_FOLDER, `${skinName}.tsx`), skinSrc);

        const skinCssSrc = await formatCss(generateSkinCssSrc(skinName, DESIGN_TOKENS_FOLDER));
        fs.writeFileSync(path.join(CSS_FOLDER, `${skinName}.css`), skinCssSrc);

        anyGeneratedSkin = skinName;
    }

    if (anyGeneratedSkin) {
        const typesSrc = await formatTs(generateColorTypesSrc(anyGeneratedSkin));
        fs.writeFileSync(path.join(SKINS_FOLDER, 'types', 'colors.tsx'), typesSrc);

        const commonCssSrc = await formatCss(generateCommonCssSrc(DESIGN_TOKENS_FOLDER));
        fs.writeFileSync(path.join(CSS_FOLDER, `mistica-common.css`), commonCssSrc);
    }
};

generateSkinFiles();
