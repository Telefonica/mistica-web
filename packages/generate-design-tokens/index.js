import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/extensions
import {generateSkinCssSrc, buildRadius, generateCommonCssSrc} from './css-generator.js';
import prettier from 'prettier';

/**
 * Generates skin files and CSS from design tokens in mistica-design.
 *
 * By default, reads tokens from .github/mistica-design/tokens.
 * To use a custom tokens folder:
 *
 *   node index.js /path/to/mistica-design/tokens
 *   # or via yarn, from the repo root: yarn generate-design-tokens /path/to/mistica-design/tokens
 *
 * Can also use DESIGN_TOKENS_FOLDER env var: DESIGN_TOKENS_FOLDER="/path/to/tokens" node index.js
 *
 * @see https://github.com/Telefonica/mistica-design
 */

const DESIGN_TOKENS_FOLDER = path.resolve(
    process.argv[2] ||
        process.env.DESIGN_TOKENS_FOLDER ||
        path.join(import.meta.dirname, '../../.github/mistica-design/tokens/')
);

console.log('Using design tokens from:', DESIGN_TOKENS_FOLDER);

const SKINS_FOLDER = path.join(import.meta.dirname, '..', '..', 'src', 'skins');
const CSS_FOLDER = path.join(import.meta.dirname, '..', '..', 'css');

const KNOWN_SKINS = ['blau', 'movistar', 'o2', 'telefonica', 'vivo', 'vivo-evolution', 'esimflag'];

// Marks every output file, so nobody edits it by hand. The block comment syntax is valid in TS and in CSS.
const GENERATED_FILE_BANNER = `/**
 * @generated
 *
 * This file was generated from the mistica-design tokens. Do not edit it by hand, your changes will be
 * lost on the next import. Run \`yarn generate-design-tokens\` to update it.
 *
 * @see packages/generate-design-tokens
 */`;

const withBanner = (source) => `${GENERATED_FILE_BANNER}\n${source}`;

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
        ${
            designTokens.componentProperties?.showBoxedBorder
                ? `componentProperties: ${JSON.stringify({
                      showBoxedBorder: designTokens.componentProperties.showBoxedBorder.value,
                  })},`
                : ''
        }
        spacing: ${JSON.stringify(
            Object.fromEntries(Object.entries(designTokens.spacing).map(([name, {value}]) => [name, value]))
        )},
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

// `resolveConfig` needs a file path, and returns null for a folder path, so it takes one of the files it
// formats. Without the config, prettier falls back to its own defaults and rewrites every generated file.
const formatCss = async (source) =>
    prettier.format(source, {
        ...(await prettier.resolveConfig(path.join(CSS_FOLDER, 'mistica-common.css'))),
        parser: 'css',
    });

const formatTs = async (source) =>
    prettier.format(source, {
        ...(await prettier.resolveConfig(path.join(SKINS_FOLDER, 'movistar.tsx'))),
        parser: 'typescript',
    });

const generateSkinFiles = async () => {
    let anyGeneratedSkin;

    for (const skinName of KNOWN_SKINS) {
        console.log('Generating tokens for skin', skinName);

        if (!fs.existsSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`))) {
            console.error(`Missing ${path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`)} file`);
            return;
        }

        const skinSrc = await formatTs(withBanner(generateSkinSrc(skinName)));
        fs.writeFileSync(path.join(SKINS_FOLDER, `${skinName}.tsx`), skinSrc);

        const skinCssSrc = await formatCss(withBanner(generateSkinCssSrc(skinName, DESIGN_TOKENS_FOLDER)));
        fs.writeFileSync(path.join(CSS_FOLDER, `${skinName}.css`), skinCssSrc);

        anyGeneratedSkin = skinName;
    }

    if (anyGeneratedSkin) {
        const typesSrc = await formatTs(withBanner(generateColorTypesSrc(anyGeneratedSkin)));
        fs.writeFileSync(path.join(SKINS_FOLDER, 'types', 'colors.tsx'), typesSrc);

        const commonCssSrc = await formatCss(withBanner(generateCommonCssSrc(DESIGN_TOKENS_FOLDER)));
        fs.writeFileSync(path.join(CSS_FOLDER, `mistica-common.css`), commonCssSrc);
    }
};

generateSkinFiles();
