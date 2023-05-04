const fs = require('fs');
const path = require('path');

const DESIGN_TOKENS_FOLDER = path.join(__dirname, '..', '..', '.github', 'mistica-design', 'tokens');
const SKINS_FOLDER = path.join(__dirname, '..', '..', 'src', 'skins');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const buildColor = (colorDescription) => {
    if (colorDescription.value.startsWith('{') && colorDescription.value.endsWith('}')) {
        return colorDescription.value.replace('{', '').replace('}', '');
    }

    const colorWithAlphaRegExp = /rgba\(\{(.+)\}, (0\.\d+)\)/;
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
    if (radiusDescription.value.endsWith('px')) {
        return radiusDescription.value;
    }
    if (/\d+/.test(radiusDescription.value)) {
        return `${radiusDescription.value}px`;
    }

    throw new Error(`Unknown radius format: ${radiusDescription.value})`);
};

const generateSkinSrc = (skinName) => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`), 'utf8');
    const needsApplyAlphaImport = designTokensFile.includes('rgba');
    const designTokens = JSON.parse(designTokensFile);
    const skinConstantName = `${skinName.toUpperCase()}_SKIN`;

    return `
import {${skinConstantName}} from './constants';
${needsApplyAlphaImport ? `import {applyAlpha} from '../utils/color';` : ''}

import type {GetKnownSkin} from './types';

export const palette = {
    ${Object.entries(designTokens.global.palette)
        .map(([colorName, colorDescription]) => `${colorName}:'${colorDescription.value}'`)
        .join(',')}
};

export const get${capitalize(skinName)}Skin: GetKnownSkin = () => {
    return {
        name: ${skinConstantName},
        colors: {
            ${Object.entries(designTokens.light)
                .map(([colorName, colorDescription]) => `${colorName}: ${buildColor(colorDescription)}`)
                .join(',')}
        },
        darkModeColors: {
            ${Object.entries(designTokens.dark)
                .map(([colorName, colorDescription]) => `${colorName}: ${buildColor(colorDescription)}`)
                .join(',')}
        },
        borderRadii: {
            ${Object.entries(designTokens.radius)
                .map(
                    ([radiusName, radiusDescription]) => `${radiusName}: '${buildRadius(radiusDescription)}'`
                )
                .join(',')}
        },
        textPresets: {
            ${Object.entries(designTokens.text.weight)
                .map(
                    ([textPresetName, textPresetDescription]) =>
                        `${textPresetName}: '${textPresetDescription.value}'`
                )
                .join(',')}
        },
    };
};
`;
};

const generateSkinFiles = () => {
    const KNOWN_SKINS = ['blau', 'movistar', 'o2', 'telefonica', 'vivo'];

    fs.readdirSync(DESIGN_TOKENS_FOLDER).filter((file) => file.endsWith('.json'));

    KNOWN_SKINS.forEach((skinName) => {
        console.log('Generating tokens for skin', skinName);

        if (!fs.existsSync(`${skinName}.json`)) {
            console.error(`Missing ${skinName}.json file`);
            return;
        }

        const skinSrc = generateSkinSrc(skinName);
        fs.writeFileSync(path.join(SKINS_FOLDER, `${skinName}.tsx`), skinSrc);
    });
};

generateSkinFiles();
