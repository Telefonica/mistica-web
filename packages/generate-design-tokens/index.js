const fs = require('fs');
const path = require('path');

/*
By default, this script will look for the design tokens inside .github folder but you may want to clone the mistica-design repo elsewhere.

To run this script locally using a custom path for the tokens, you can do the following:

1. Clone this repo:
    https://github.com/Telefonica/mistica-design

2. Run:
    DESIGN_TOKENS_FOLDER="/path/to/mistica-design/tokens" node index.js
*/

const DESIGN_TOKENS_FOLDER =
    process.env.DESIGN_TOKENS_FOLDER ||
    path.join(__dirname, '..', '..', '.github', 'mistica-design', 'tokens');

const SKINS_FOLDER = path.join(__dirname, '..', '..', 'src', 'skins');

const KNOWN_SKINS = ['blau', 'movistar', 'o2', 'o2-new', 'telefonica', 'vivo', 'vivo-new', 'tu'];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const toPascalCase = (str) => capitalize(toCamelCase(str));

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

const buildRadius = (radiusDescription) => {
    if (radiusDescription.value.endsWith('%')) {
        return radiusDescription.value;
    }
    if (radiusDescription.value === 'circle') {
        return '50%';
    }
    if (radiusDescription.value.endsWith('px')) {
        return radiusDescription.value;
    }
    if (/\d+/.test(radiusDescription.value)) {
        return `${radiusDescription.value}px`;
    }

    throw new Error(`Unknown radius format: ${radiusDescription.value}`);
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
        textPresets: ${JSON.stringify(textTokens)},
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

const generateSkinFiles = () => {
    let anyGeneratedSkin;

    KNOWN_SKINS.forEach((skinName) => {
        console.log('Generating tokens for skin', skinName);

        if (!fs.existsSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`))) {
            console.error(`Missing ${skinName}.json file`);
            return;
        }

        const skinSrc = generateSkinSrc(skinName);
        fs.writeFileSync(path.join(SKINS_FOLDER, `${skinName}.tsx`), skinSrc);
        anyGeneratedSkin = skinName;
    });

    if (anyGeneratedSkin) {
        const typesSrc = generateColorTypesSrc(anyGeneratedSkin);
        fs.writeFileSync(path.join(SKINS_FOLDER, 'types', 'colors.tsx'), typesSrc);
    }
};

generateSkinFiles();
