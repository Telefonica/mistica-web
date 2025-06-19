import fs from 'fs';
import path from 'path';

const pxToRem = (px) => `${(px / 16).toFixed(3)}rem`;

const fromHexToRgb = (hexColor) => {
    if (!hexColor.startsWith('#')) {
        throw Error(`Bad hex color, ${hexColor}`);
    }
    if (hexColor.length === 4) {
        return [
            parseInt(hexColor.substr(-3, 1).repeat(2), 16),
            parseInt(hexColor.substr(-2, 1).repeat(2), 16),
            parseInt(hexColor.substr(-1, 1).repeat(2), 16),
        ];
    }
    if (hexColor.length === 7) {
        return [
            parseInt(hexColor.substr(-6, 2), 16),
            parseInt(hexColor.substr(-4, 2), 16),
            parseInt(hexColor.substr(-2, 2), 16),
        ];
    }
    throw Error(`Bad hex color, ${hexColor}`);
};

export const buildRadius = (radiusDescription) => {
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

const prefix = 'mistica-';
const colorSchemeSelector = (colorScheme) => `[data-${prefix}color-scheme="${colorScheme}"]`;
const buildVarName = (propertyName, name) => `--${prefix}${propertyName}-${name}`;
const buildColorVarName = (colorName) => buildVarName('color', colorName);
const buildBorderRadiusVarName = (radiusName) => buildVarName('border-radius', radiusName);
const buildFontSizeVarName = (textPreset) => buildVarName('font-size', textPreset);
const buildLineHeightVarName = (textPreset) => buildVarName('line-height', textPreset);
const buildFontWeightVarName = (textPreset) => buildVarName('font-weight', textPreset);
const tabletMediaQuery = '@media (min-width: 768px)';
const desktopMediaQuery = '@media (min-width: 1024px)';
const largeDesktopMediaQuery = '@media (min-width: 1512px)';

export const generateSkinCssSrc = (skinName, DESIGN_TOKENS_FOLDER) => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`), 'utf8');
    const designTokens = JSON.parse(designTokensFile);

    const skinSelector = `[data-${prefix}skin='${skinName}']`;
    const palettePrefix = prefix + `${skinName}-`;
    const buildPaletteColorVarName = (colorName) => `--${palettePrefix}${colorName}`;
    const buildRawPaletteColorVarName = (colorName) => `--${palettePrefix}raw-${colorName}`;

    const usedPaleteColors = new Set();
    const usedRawPaletteColors = new Set();

    /**
     * @param {{angle: number, colors: Array<{
     *     value: string,
     *     stop: number, // value from 0 to 1
     * }>}} gradientDescription
     * @returns {string}
     */
    const buildCssGradient = (gradientDescription) => {
        const stops = gradientDescription.colors.map((color) => {
            // eslint-disable-next-line no-use-before-define
            return `${buildCssColor(color)} ${color.stop * 100}%`;
        });
        return `linear-gradient(${gradientDescription.angle}deg, ${stops.join(', ')})`;
    };

    const buildCssColor = (colorDescription) => {
        if (colorDescription.type === 'linear-gradient') {
            return buildCssGradient(colorDescription.value);
        }

        if (colorDescription.value.startsWith('{palette.') && colorDescription.value.endsWith('}')) {
            const paletteColorName = colorDescription.value.replace('{palette.', '').replace('}', '');
            usedPaleteColors.add(paletteColorName);
            return `var(${buildPaletteColorVarName(paletteColorName)})`;
        }

        // https://regexper.com/#%2Frgba%5C%28%5C%7Bpalette%5C.%28.%2B%29%5C%7D%2C%20%28%5B01%5D%28%3F%3A%5C.%5Cd%2B%29%3F%29%5C%29%2F
        const colorWithAlphaRegExp = /rgba\(\{palette\.(.+)\}, ([01](?:\.\d+)?)\)/;
        const colorWithAlphaMatches = colorDescription.value.match(colorWithAlphaRegExp);

        if (colorWithAlphaMatches) {
            const colorName = colorWithAlphaMatches[1];
            const alpha = colorWithAlphaMatches[2];
            usedRawPaletteColors.add(colorName);
            return `rgba(var(${buildRawPaletteColorVarName(colorName)}), ${alpha})`;
        }

        throw new Error(`Unknown color format: ${colorDescription.value}`);
    };

    const lightColors = Object.entries(designTokens.light)
        .map(
            ([colorName, colorDescription]) =>
                `${buildColorVarName(colorName)}: ${buildCssColor(colorDescription)};`
        )
        .join('\n');

    const darkModeColors = Object.entries(designTokens.dark)
        .map(
            ([colorName, colorDescription]) =>
                `${buildColorVarName(colorName)}: ${buildCssColor(colorDescription)};`
        )
        .join('\n');

    const forceLightModeColors = Object.keys(designTokens.dark)
        .map(
            (colorName) => `${buildColorVarName(colorName)}: ${buildCssColor(designTokens.light[colorName])};`
        )
        .join('\n');

    const paletteColors = Array.from(usedPaleteColors)
        .map((colorName) => {
            return `${buildPaletteColorVarName(colorName)}: ${designTokens.global.palette[colorName].value};`;
        })
        .join('\n');

    const rawPaletteColors = Array.from(usedRawPaletteColors)
        .map((colorName) => {
            const colorValue = designTokens.global.palette[colorName].value;
            const [r, g, b] = fromHexToRgb(colorValue);
            return `${buildRawPaletteColorVarName(colorName)}: ${r}, ${g}, ${b};`;
        })
        .join('\n');

    const borderRadii = Object.entries(designTokens.radius)
        .map(
            ([radiusName, radiusDescription]) =>
                `${buildBorderRadiusVarName(radiusName)}: ${buildRadius(radiusDescription)};`
        )
        .join('\n');

    const textPresets = {
        1: {
            size: {mobile: 12, desktop: 14},
            lineHeight: {mobile: 16, desktop: 20},
        },
        2: {
            size: {mobile: 14, desktop: 16},
            lineHeight: {mobile: 20, desktop: 24},
        },
        3: {
            size: {mobile: 16, desktop: 18},
            lineHeight: {mobile: 24, desktop: 24},
        },
        4: {
            size: {mobile: 18, desktop: 20},
            lineHeight: {mobile: 24, desktop: 28},
        },
        5: {
            size: {mobile: 20, desktop: 28},
            lineHeight: {mobile: 24, desktop: 32},
        },
        6: {
            size: {mobile: 24, desktop: 32},
            lineHeight: {mobile: 32, desktop: 40},
        },
        7: {
            size: {mobile: 28, desktop: 40},
            lineHeight: {mobile: 32, desktop: 48},
        },
        8: {
            size: {mobile: 32, desktop: 48},
            lineHeight: {mobile: 40, desktop: 56},
        },
        9: {
            size: {mobile: 40, desktop: 56},
            lineHeight: {mobile: 48, desktop: 64},
        },
        10: {
            size: {mobile: 48, desktop: 64},
            lineHeight: {mobile: 56, desktop: 72},
        },
        cardTitle: {
            size: {mobile: 20, desktop: 24},
            lineHeight: {mobile: 24, desktop: 28},
        },
    };
    Object.entries(designTokens.text).forEach(([textAttribute, textAttributeConfig]) => {
        Object.entries(textAttributeConfig).forEach(([presetName, {value}]) => {
            presetName = presetName.startsWith('text') ? presetName.replace('text', '') : presetName;

            textPresets[presetName] = {
                ...(textPresets[presetName] ?? {}),
                [textAttribute]: value,
            };
        });
    });

    const textVars = Object.entries(textPresets)
        .map(([presetName, preset]) => {
            const sizeVar = preset.size
                ? `${buildFontSizeVarName(presetName)}: ${pxToRem(preset.size.mobile)};`
                : '';
            const lineHeightVar = preset.lineHeight
                ? `${buildLineHeightVarName(presetName)}: ${pxToRem(preset.lineHeight.mobile)};`
                : '';
            const weightVar = preset.weight
                ? `${buildFontWeightVarName(presetName)}: ${
                      {
                          light: 300,
                          regular: 400,
                          medium: 500,
                          bold: 700,
                      }[preset.weight]
                  };`
                : '';
            return [sizeVar, lineHeightVar, weightVar].filter(Boolean).join('\n');
        })
        .join('\n');

    const desktopTextVars = Object.entries(textPresets)
        .map(([presetName, preset]) => {
            const sizeVar = preset.size
                ? `${buildFontSizeVarName(presetName)}: ${pxToRem(preset.size.desktop)};`
                : '';
            const lineHeightVar = preset.lineHeight
                ? `${buildLineHeightVarName(presetName)}: ${pxToRem(preset.lineHeight.desktop)};`
                : '';
            return [sizeVar, lineHeightVar].filter(Boolean).join('\n');
        })
        .join('\n');

    return `
${skinSelector} {
    /* Palette colors */
    ${paletteColors}

    /* Raw palette colors, for use with rgba() */
    ${rawPaletteColors}

    /* Colors */
    ${lightColors}

    /* Border radius */
    ${borderRadii}

    /* Text */
    ${textVars}
}

${skinSelector}${colorSchemeSelector('dark')} {
    ${darkModeColors}
}

@media (prefers-color-scheme: dark) {
    ${skinSelector} {
        ${darkModeColors}
    }
    
    ${skinSelector}${colorSchemeSelector('light')} {
        ${forceLightModeColors}
    }
}

${desktopMediaQuery} {
    ${skinSelector} {
        /* Text */
        ${desktopTextVars}
    }
}
`;
};

export const generateCommonCssSrc = (DESIGN_TOKENS_FOLDER) => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `movistar.json`), 'utf8');
    const designTokens = JSON.parse(designTokensFile);

    const textPresets = new Set([
        'text1',
        'text2',
        'text3',
        'text4',
        'text5',
        'text6',
        'text7',
        'text8',
        'text9',
        'text10',
        ...Object.values(designTokens.text).flatMap(Object.keys),
    ]);
    const textClasses = Array.from(textPresets)
        .map((presetName) => (presetName.startsWith('text') ? presetName.replace('text', '') : presetName))
        .map(
            (presetName) => `.${prefix}text-${presetName} {
                font-size: var(${buildFontSizeVarName(presetName)});
                line-height: var(${buildLineHeightVarName(presetName)});
                font-weight: var(${buildFontWeightVarName(presetName)});
            }`
        )
        .join('\n');

    return `
/* Default text color */
[data-${prefix}skin] {
    color: var(${buildColorVarName('textPrimary')});
    background: var(${buildColorVarName('background')});
}

/* text utility classes */
${textClasses}

/* Boxed */
.${prefix}boxed {
    border: 1px solid var(${buildColorVarName('border')});
    border-radius: var(${buildBorderRadiusVarName('container')});
    background: var(${buildColorVarName('backgroundContainer')});
}

/* Responsive layout */
.${prefix}responsive-layout {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    margin: 0 var(--${prefix}responsive-layout-margin);
    --${prefix}responsive-layout-margin: 16px;
}

${tabletMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: 24px;
    }
}

${desktopMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: 40px;
    }
}

${largeDesktopMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: calc((100vw - 1416px) / 2);
    }
}
    `;
};
