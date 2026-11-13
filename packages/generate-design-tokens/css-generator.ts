import * as fs from 'node:fs';
import * as path from 'node:path';
import {DEFAULT_DENSITY, DENSITIES, DENSITY_ATTRIBUTE} from '../../src/density/definitions.ts';
import {isBreakpointValue, mapDensityLeaves, normalizeTextTokenValue, resolveDensity} from './density.ts';

import type {
    Breakpoint,
    BreakpointValue,
    ColorDescription,
    Density,
    DensityValue,
    DesignTokens,
    GradientDescription,
    RadiusDescription,
} from './token-types.ts';

const pxToRem = (px: number): string => `${(px / 16).toFixed(3)}rem`;

const fromHexToRgb = (hexColor: string): [number, number, number] => {
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

const buildRadiusScalar = (radius: string): string => {
    if (radius.endsWith('%')) {
        return radius;
    }
    if (radius === 'circle') {
        return '50%';
    }
    if (radius.endsWith('px')) {
        return radius;
    }
    if (/\d+/.test(radius)) {
        return `${radius}px`;
    }

    throw new Error(`Unknown radius format: ${radius}`);
};

/**
 * mistica-web has no responsive border radius, so a radius can change with the density only.
 */
export const buildRadius = (radiusDescription: RadiusDescription): string | DensityValue<string> => {
    if (isBreakpointValue(radiusDescription.value)) {
        throw new Error(
            `A border radius with breakpoints is not supported: ${JSON.stringify(radiusDescription.value)}`
        );
    }
    return mapDensityLeaves(radiusDescription.value, buildRadiusScalar);
};

const prefix = 'mistica-';
const colorSchemeSelector = (colorScheme: string): string => `[data-${prefix}color-scheme="${colorScheme}"]`;
const buildVarName = (propertyName: string, name: string): string => `--${prefix}${propertyName}-${name}`;
const buildColorVarName = (colorName: string): string => buildVarName('color', colorName);
const buildBorderRadiusVarName = (radiusName: string): string => buildVarName('border-radius', radiusName);
const buildFontSizeVarName = (textPreset: string): string => buildVarName('font-size', textPreset);
const buildLineHeightVarName = (textPreset: string): string => buildVarName('line-height', textPreset);
const buildFontWeightVarName = (textPreset: string): string => buildVarName('font-weight', textPreset);
const tabletMediaQuery = '@media (min-width: 768px)';
const desktopMediaQuery = '@media (min-width: 1024px)';
const largeDesktopMediaQuery = '@media (min-width: 1512px)';

type DensityNumber = number | DensityValue<number>;

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type TextPreset = {
    size?: BreakpointValue<DensityNumber>;
    lineHeight?: BreakpointValue<DensityNumber>;
    weight?: FontWeight | DensityValue<FontWeight>;
};

type CssVars = Record<string, string>;

const fontWeights = {light: 300, regular: 400, medium: 500, bold: 700};

const toCssDeclarations = (cssVars: CssVars): string =>
    Object.entries(cssVars)
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n');

/**
 * The names of the vars whose value in some density mode differs from the default mode. The vars of every
 * mode come in the same order of breakpoints.
 */
const findVarNamesThatChangeWithDensity = (varsByMode: Record<Density, Array<CssVars>>): Array<string> => {
    const defaultModeVars = varsByMode[DEFAULT_DENSITY];
    const varNames = new Set(defaultModeVars.flatMap((cssVars) => Object.keys(cssVars)));
    return Array.from(varNames).filter((varName) =>
        DENSITIES.some((mode) =>
            varsByMode[mode].some((cssVars, index) => cssVars[varName] !== defaultModeVars[index][varName])
        )
    );
};

const pickVars = (cssVars: CssVars, varNames: Array<string>): CssVars =>
    Object.fromEntries(
        varNames.filter((varName) => varName in cssVars).map((varName) => [varName, cssVars[varName]])
    );

export const generateSkinCssSrc = (skinName: string, DESIGN_TOKENS_FOLDER: string): string => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `${skinName}.json`), 'utf8');
    const designTokens: DesignTokens = JSON.parse(designTokensFile);

    const skinSelector = `[data-${prefix}skin='${skinName}']`;
    const palettePrefix = prefix + `${skinName}-`;
    const buildPaletteColorVarName = (colorName: string): string => `--${palettePrefix}${colorName}`;
    const buildRawPaletteColorVarName = (colorName: string): string => `--${palettePrefix}raw-${colorName}`;

    const usedPaleteColors = new Set<string>();
    const usedRawPaletteColors = new Set<string>();

    const buildCssGradient = (gradientDescription: GradientDescription): string => {
        const stops = gradientDescription.colors.map((color) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return `${buildCssColor(color)} ${color.stop * 100}%`;
        });
        return `linear-gradient(${gradientDescription.angle}deg, ${stops.join(', ')})`;
    };

    const buildCssColor = (colorDescription: ColorDescription): string => {
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

    const builtRadii = Object.entries(designTokens.radius).map(
        ([radiusName, radiusDescription]) => [radiusName, buildRadius(radiusDescription)] as const
    );
    const buildBorderRadiusVars = (mode: Density): CssVars =>
        Object.fromEntries(
            builtRadii.map(([radiusName, radius]) => [
                buildBorderRadiusVarName(radiusName),
                resolveDensity(radius, mode),
            ])
        );

    const textPresets: Record<string, TextPreset> = {
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
        Object.entries(textAttributeConfig).forEach(([rawPresetName, {value}]) => {
            const presetName = rawPresetName.startsWith('text')
                ? rawPresetName.replace('text', '')
                : rawPresetName;

            textPresets[presetName] = {
                ...(textPresets[presetName] ?? {}),
                [textAttribute]: normalizeTextTokenValue(textAttribute, value),
            } as TextPreset;
        });
    });

    const buildTextVars = (breakpoint: Breakpoint, mode: Density, {withWeight = false} = {}): CssVars =>
        Object.fromEntries(
            Object.entries(textPresets).flatMap(([presetName, preset]) => [
                ...(preset.size
                    ? [
                          [
                              buildFontSizeVarName(presetName),
                              pxToRem(resolveDensity(preset.size[breakpoint], mode)),
                          ],
                      ]
                    : []),
                ...(preset.lineHeight
                    ? [
                          [
                              buildLineHeightVarName(presetName),
                              pxToRem(resolveDensity(preset.lineHeight[breakpoint], mode)),
                          ],
                      ]
                    : []),
                ...(withWeight && preset.weight
                    ? [
                          [
                              buildFontWeightVarName(presetName),
                              String(fontWeights[resolveDensity(preset.weight, mode)]),
                          ],
                      ]
                    : []),
            ])
        );

    const varsByDensityMode = Object.fromEntries(
        DENSITIES.map((mode) => [
            mode,
            [
                {...buildBorderRadiusVars(mode), ...buildTextVars('mobile', mode, {withWeight: true})},
                buildTextVars('desktop', mode),
            ],
        ])
    ) as Record<Density, Array<CssVars>>;
    const varNamesThatChangeWithDensity = findVarNamesThatChangeWithDensity(varsByDensityMode);

    // The rules of every mode, the default one too, let a subtree go back to the default mode inside another one
    const densityRules =
        varNamesThatChangeWithDensity.length === 0
            ? ''
            : DENSITIES.map((mode) => {
                  const densitySelector = `[${DENSITY_ATTRIBUTE}="${mode}"]`;
                  const selector = `${skinSelector}${densitySelector}, ${skinSelector} ${densitySelector}`;
                  const [mobileVars, desktopVars] = varsByDensityMode[mode];
                  // The css is mobile first: the base rule also matches on desktop, so a desktop value equal to
                  // the mobile one needs no declaration
                  const desktopVarNames = varNamesThatChangeWithDensity.filter(
                      (varName) => desktopVars[varName] !== mobileVars[varName]
                  );
                  const desktopDeclarations = toCssDeclarations(pickVars(desktopVars, desktopVarNames));
                  const desktopRule = desktopDeclarations
                      ? `
${desktopMediaQuery} {
    ${selector} {
        ${desktopDeclarations}
    }
}`
                      : '';
                  return `
${selector} {
    ${toCssDeclarations(pickVars(mobileVars, varNamesThatChangeWithDensity))}
}
${desktopRule}`;
              }).join('\n');

    return `
${skinSelector} {
    /* Palette colors */
    ${paletteColors}

    /* Raw palette colors, for use with rgba() */
    ${rawPaletteColors}

    /* Colors */
    ${lightColors}

    /* Border radius */
    ${toCssDeclarations(buildBorderRadiusVars(DEFAULT_DENSITY))}

    /* Text */
    ${toCssDeclarations(buildTextVars('mobile', DEFAULT_DENSITY, {withWeight: true}))}
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
        ${toCssDeclarations(buildTextVars('desktop', DEFAULT_DENSITY))}
    }
}
${densityRules}
`;
};

export const generateCommonCssSrc = (DESIGN_TOKENS_FOLDER: string): string => {
    const designTokensFile = fs.readFileSync(path.join(DESIGN_TOKENS_FOLDER, `movistar.json`), 'utf8');
    const designTokens: DesignTokens = JSON.parse(designTokensFile);

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
    --${prefix}responsive-layout-margin: ${designTokens.spacing.responsiveLayoutMargin.value.mobile}px;
}

${tabletMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: 24px;
    }
}

${desktopMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: ${designTokens.spacing.responsiveLayoutMargin.value.desktop}px;
    }
}

${largeDesktopMediaQuery} {
    .${prefix}responsive-layout {
        --${prefix}responsive-layout-margin: calc((100vw - 1416px) / 2);
    }
}
    `;
};
