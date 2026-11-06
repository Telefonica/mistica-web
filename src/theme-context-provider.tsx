'use client';
import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {DialogRoot} from './dialog-context';
import ScreenSizeContextProvider from './screen-size-context-provider';
import {dimensions, getMisticaLinkComponent, NAVBAR_HEIGHT_MOBILE} from './theme';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';
import ThemeContext from './theme-context';
import {useIsomorphicLayoutEffect} from './hooks';
import ModalContextProvider from './modal-context-provider';
import TooltipContextProvider from './tooltip-context-provider';
import {DocumentVisibilityProvider} from './utils/document-visibility';
import {AspectRatioSupportProvider} from './utils/aspect-ratio-support';
import {TrackingConfig} from './utils/analytics';
import {vars} from './skins/skin-contract.css';
import {fromHexToRgb} from './utils/color';
import {
    defaultBorderRadiiConfig,
    defaultComponentPropertiesConfig,
    defaultSpacing,
    defaultTextPresetsConfig,
    defaultThemeVariantsConfig,
} from './skins/defaults';
import {isClientSide} from './utils/environment';
import {PACKAGE_VERSION} from './package-version';
import {SnackbarRoot} from './snackbar-context';
import {mapToWeight} from './text';
import * as mq from './media-queries.css';
import {localeToLanguage} from './utils/locale';
import {DEFAULT_DENSITY, DENSITIES, DENSITY_ATTRIBUTE, DENSITY_CATEGORIES} from './density/definitions';
import {getSkinConfigForDensity} from './density/resolve';
import {MaybeDensitySkinConfigContext} from './density/density-provider';

import type {DensityCategory} from './density/definitions';
import type {MaybeDensitySkinConfig, SkinConfigForDensity} from './density/resolve';
import type {Colors, Density, MaybeDensityConfig, TextPresetsConfig} from './skins/types';
import type {Theme, ThemeConfig} from './theme';
import type {TextToken} from './text-tokens';

// Check there is only one version of mistica installed in the page.
if (process.env.NODE_ENV !== 'production' && isClientSide()) {
    // @ts-expect-error __mistica_version__ does not exist in window
    if (window['__mistica_version__'] && window['__mistica_version__'] !== PACKAGE_VERSION) {
        throw new Error(`There is more than one version of @telefonica/mistica running on the same page`);
    } else {
        // @ts-expect-error __mistica_version__ does not exist in window
        window['__mistica_version__'] = PACKAGE_VERSION;
    }
}

const darkModeMedia = '(prefers-color-scheme: dark)';
export const useIsOsDarkModeEnabled = (): boolean => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (!window.matchMedia) {
            return;
        }

        const mq = window.matchMedia(darkModeMedia);

        const listener = () => {
            setIsDarkMode(mq.matches);
        };

        mq.addEventListener('change', listener);
        listener();

        return () => {
            mq.removeEventListener('change', listener);
        };
    }, []);

    return isDarkMode;
};

type Props = {
    theme: ThemeConfig;
    /** The density of the whole theme. Use DensityProvider to override it in a subtree */
    density?: Density;
    as?: string;
    withoutStyles?: boolean;
    children?: React.ReactNode;
};

const useDefaultHrefDecorator = () => {
    return (href: string) => href;
};

const sanitizeDimensions = (dimensions: ThemeConfig['dimensions']): Partial<Theme['dimensions']> => {
    return {
        headerMobileHeight:
            dimensions?.headerMobileHeight === 'mistica'
                ? NAVBAR_HEIGHT_MOBILE
                : dimensions?.headerMobileHeight,
    };
};

const SetupStackingContext = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [hasContentIsolation, setHasContentIsolation] = React.useState(false);
    const [isFirstRender, setIsFirstRender] = React.useState(true);

    useIsomorphicLayoutEffect(() => {
        if (isFirstRender) {
            // Given that we don't render the extra div in server side, we skip creating it in the first client
            // render in order to avoid hydration issues
            setIsFirstRender(false);
        } else {
            // Set isolation: isolate to the parent of the provider. This way, we avoid content inside portals
            // from being rendered under content that is inside the provider (in case it has z-index defined).
            const root = ref.current?.parentElement;
            if (root) {
                root.style.isolation = 'isolate';
                setHasContentIsolation(true);
            }
        }
    }, [isFirstRender]);

    // Don't render the div in server side, because effects are not executed in there and it makes the div useless
    if (hasContentIsolation || !isClientSide() || isFirstRender) {
        return null;
    }
    return <div ref={ref} style={{display: 'none'}} />;
};

// Define the same colors in css variables as rgb components, to allow applying alpha aftherwards. See utils/color.tsx
const makeRawColors = (colors: Colors): Colors =>
    Object.fromEntries(
        Object.entries(colors).map(([colorName, colorValue]) => {
            let rawColorValue = '';
            if (colorValue.startsWith('#')) {
                const [r, g, b] = fromHexToRgb(colorValue);
                rawColorValue = `${r}, ${g}, ${b}`;
            }
            return [colorName, rawColorValue];
        })
    ) as Colors;

type Breakpoint = 'mobile' | 'desktop';
type BreakpointValues = Record<Breakpoint, number>;

// The contract shape of a category, with the css values in place of the var names
type CssValues<Contract> = {
    [Key in keyof Contract]: Contract[Key] extends string ? string : CssValues<Contract[Key]>;
};

type CssVarValues = {[Category in DensityCategory]: CssValues<(typeof vars)[Category]>};

type ContractValues = Parameters<typeof assignInlineVars<typeof vars>>[1];

type CssVarValueBuilders = {
    [Category in DensityCategory]: (
        config: SkinConfigForDensity[Category],
        breakpoint: Breakpoint
    ) => CssVarValues[Category];
};

// The mapped type asks for a builder for each category of DENSITY_CATEGORIES
const cssVarValueBuilders: CssVarValueBuilders = {
    textPresets: (textPresets, breakpoint) =>
        Object.fromEntries(
            Object.entries(textPresets).map(([token, config]) => [
                token,
                {
                    // Map light/regular/medium/bold to valid css fontWeight values
                    ...(config.weight && {weight: String(mapToWeight[config.weight])}),
                    ...(config.size && {size: `${config.size[breakpoint]}px`}),
                    ...(config.lineHeight && {lineHeight: `${config.lineHeight[breakpoint]}px`}),
                },
            ])
        ) as CssVarValues['textPresets'],
    spacing: (spacing, breakpoint) =>
        Object.fromEntries(
            Object.entries(spacing).map(
                ([token, values]: [string, BreakpointValues | Record<string, BreakpointValues>]) => {
                    if (breakpoint in values) {
                        return [token, `${(values as BreakpointValues)[breakpoint]}px`];
                    }
                    return [
                        token,
                        Object.fromEntries(
                            Object.entries(values as Record<string, BreakpointValues>).map(
                                ([side, sideValues]) => [side, `${sideValues[breakpoint]}px`]
                            )
                        ),
                    ];
                }
            )
        ) as CssVarValues['spacing'],
    borderRadii: (borderRadii) => borderRadii as CssVarValues['borderRadii'],
};

const buildCategoryVars = <Category extends DensityCategory>(
    category: Category,
    config: SkinConfigForDensity,
    breakpoint: Breakpoint
): CssVarValues[Category] => cssVarValueBuilders[category](config[category], breakpoint);

const buildCssVarValues = (config: SkinConfigForDensity, breakpoint: Breakpoint): CssVarValues =>
    Object.fromEntries(
        DENSITY_CATEGORIES.map((category) => [category, buildCategoryVars(category, config, breakpoint)])
    ) as CssVarValues;

// assignInlineVars walks the values and not the contract, so the values of the density categories are enough
const assignCssVarValues = (cssVarValues: CssVarValues): Record<string, string> => ({
    ...assignInlineVars(vars, cssVarValues as ContractValues),
});

/**
 * The skin config of one density mode, and its css var values in each breakpoint.
 */
type SkinForDensity = {
    config: SkinConfigForDensity;
    desktopCssVarValues: CssVarValues;
    mobileCssVarValues: CssVarValues;
};

const toCssDeclarations = (declarations: Record<string, string>): string =>
    Object.entries(declarations)
        .map(([name, value]) => `${name}:${value}`)
        .join(';');

/**
 * Writes, for every density mode, the css vars that change with the density. A DensityProvider sets the density
 * attribute on its wrapper, so these rules override the vars of the theme in its subtree.
 *
 * The desktop rule has every var that changes with the density, in any breakpoint. The mobile rule has only the
 * vars whose mobile value differs from the desktop value of the same mode: the desktop rule also matches on
 * mobile, and it hides the mobile value that the theme root sets in its media query.
 */
const buildDensityStyles = (selector: string, skinByDensity: Record<Density, SkinForDensity>): string => {
    const densityVars = DENSITIES.map((density) => ({
        density,
        desktop: assignCssVarValues(skinByDensity[density].desktopCssVarValues),
        mobile: assignCssVarValues(skinByDensity[density].mobileCssVarValues),
    }));

    const [referenceVars, ...otherVars] = densityVars;
    const varNamesThatChange = Object.keys(referenceVars.desktop).filter((varName) =>
        otherVars.some(
            (densityVar) =>
                densityVar.desktop[varName] !== referenceVars.desktop[varName] ||
                densityVar.mobile[varName] !== referenceVars.mobile[varName]
        )
    );
    if (varNamesThatChange.length === 0) {
        return '';
    }

    const pick = (declarations: Record<string, string>, varNames: Array<string>) =>
        toCssDeclarations(Object.fromEntries(varNames.map((varName) => [varName, declarations[varName]])));

    return densityVars
        .map(({density, desktop, mobile}) => {
            // Only the DensityProvider wrappers and the portal containers have the attribute, and they are
            // descendants of the theme element
            const densitySelector = `${selector} [${DENSITY_ATTRIBUTE}="${density}"]`;
            // The desktop rule matches the same element on mobile too, so a mobile value equal to the desktop one
            // needs no declaration
            const mobileVarNames = varNamesThatChange.filter(
                (varName) => mobile[varName] !== desktop[varName]
            );
            const mobileRule =
                mobileVarNames.length === 0
                    ? ''
                    : `
                @media ${mq.tabletOrSmaller} {
                    ${densitySelector} {
                        ${pick(mobile, mobileVarNames)}
                    }
                }`;
            return `
                ${densitySelector} {
                    ${pick(desktop, varNamesThatChange)}
                }${mobileRule}`;
        })
        .join('\n');
};

const ThemeContextProvider = ({
    theme,
    density = DEFAULT_DENSITY,
    children,
    as,
    withoutStyles = false,
}: Props): JSX.Element => {
    const themeScopeId = React.useId();
    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const colorScheme = theme.colorScheme ?? 'auto';
    const lightColors: Colors = theme.skin.colors;
    const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
    const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
    const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

    const language = localeToLanguage(theme.i18n.locale);

    const translate = React.useCallback(
        (token: TextToken | string, ...params: Array<string | number>): string => {
            const text = typeof token === 'string' ? token : token[language] || token.en;
            if (!params.length) {
                return text;
            }
            // replace token parameters: 1$s, 2$s, 3$s, etc.
            return text.replace(/\d+\$s/g, (substr) => {
                return String(params[parseInt(substr) - 1] ?? substr);
            });
        },
        [language]
    );

    const maybeDensitySkinConfig = React.useMemo(
        (): MaybeDensitySkinConfig => ({
            textPresets: Object.fromEntries(
                Object.entries(defaultTextPresetsConfig).map(([token, defaultConfig]) => [
                    token,
                    {...defaultConfig, ...theme.skin.textPresets?.[token as keyof TextPresetsConfig]},
                ])
            ) as MaybeDensityConfig<TextPresetsConfig>,
            spacing: theme.skin.spacing ?? defaultSpacing,
            borderRadii: theme.skin.borderRadii ?? defaultBorderRadiiConfig,
        }),
        [theme.skin]
    );

    // Every mode is resolved once per skin: the theme picks its own mode, and the density rules use all of them
    const skinByDensity = React.useMemo(
        () =>
            Object.fromEntries(
                DENSITIES.map((mode) => {
                    const config = getSkinConfigForDensity(maybeDensitySkinConfig, mode);
                    return [
                        mode,
                        {
                            config,
                            desktopCssVarValues: buildCssVarValues(config, 'desktop'),
                            mobileCssVarValues: buildCssVarValues(config, 'mobile'),
                        },
                    ];
                })
            ) as Record<Density, SkinForDensity>,
        [maybeDensitySkinConfig]
    );
    const {config: skinConfigForDensity, desktopCssVarValues, mobileCssVarValues} = skinByDensity[density];

    const contextTheme = React.useMemo((): Theme => {
        const platformOverrides = {
            platform: getPlatform(),
            insideNovumNativeApp: isInsideNovumNativeApp(),
            ...theme.platformOverrides,
        };

        return {
            skinName: theme.skin.name,
            i18n: {
                ...theme.i18n,
            },
            platformOverrides,
            texts: {
                ...theme.texts,
            },
            analytics: {
                logEvent: () => Promise.resolve(),
                eventFormat: 'universal-analytics',
                ...theme.analytics,
            },
            colorValues: colors,
            dimensions: {
                ...dimensions,
                ...sanitizeDimensions(theme.dimensions),
            },
            density,
            ...skinConfigForDensity,
            themeVariants: theme.skin.themeVariants ?? defaultThemeVariantsConfig,
            componentProperties: theme.skin.componentProperties ?? defaultComponentPropertiesConfig,
            Link: getMisticaLinkComponent(theme.Link),
            isDarkMode: isDarkModeEnabled,
            isIos: getPlatform(platformOverrides) === 'ios',
            useHrefDecorator: theme.useHrefDecorator ?? useDefaultHrefDecorator,
            t: translate,
            preventCopyInFormFields: theme.preventCopyInFormFields ?? false,
        };
    }, [colors, theme, isDarkModeEnabled, translate, density, skinConfigForDensity]);

    const styleSelector = as ? `[data-mistica-theme="${themeScopeId}"]` : ':root';

    // The density rules change only with the skin, not with the color scheme or the density of the theme
    const densityStyles = React.useMemo(
        () => buildDensityStyles(styleSelector, skinByDensity),
        [styleSelector, skinByDensity]
    );

    const renderStyles = (selector: string) => {
        if (withoutStyles || (process.env.NODE_ENV === 'test' && !process.env.SSR_TEST)) {
            return null;
        }

        const lightRawColors = makeRawColors(lightColors);
        const darkRawColors = makeRawColors(darkColors);

        const [defaultColors, defaultRawColors] =
            colorScheme === 'auto' || colorScheme === 'light'
                ? [lightColors, lightRawColors]
                : [darkColors, darkRawColors];

        const darkModeMediaQuery =
            colorScheme === 'auto'
                ? `@media (prefers-color-scheme: dark) {
                    ${selector} {
                        ${assignInlineVars(vars.colors, darkColors)};
                        ${assignInlineVars(vars.rawColors, darkRawColors)}
                    }
                }`
                : '';

        return (
            <style>
                {`
                ${selector} {
                    ${assignInlineVars(vars, {
                        colors: defaultColors,
                        rawColors: defaultRawColors,
                        ...desktopCssVarValues,
                    })}
                }
                @media ${mq.tabletOrSmaller} {
                    ${selector} {
                        ${toCssDeclarations(assignCssVarValues(mobileCssVarValues))}
                    }
                }
                ${densityStyles}
                ${darkModeMediaQuery}
            `}
            </style>
        );
    };

    return (
        <>
            <ModalContextProvider>
                <TooltipContextProvider>
                    <ThemeContext.Provider value={contextTheme}>
                        <MaybeDensitySkinConfigContext.Provider value={maybeDensitySkinConfig}>
                            <TrackingConfig eventFormat={contextTheme.analytics.eventFormat}>
                                <AspectRatioSupportProvider>
                                    <DocumentVisibilityProvider>
                                        <ScreenSizeContextProvider>
                                            <DialogRoot>
                                                <SnackbarRoot>
                                                    {as ? (
                                                        <>
                                                            {renderStyles(styleSelector)}
                                                            {React.createElement(
                                                                as,
                                                                {
                                                                    style: {
                                                                        isolation: 'isolate',
                                                                    },
                                                                    'data-mistica-theme': withoutStyles
                                                                        ? undefined
                                                                        : themeScopeId,
                                                                },
                                                                children
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {renderStyles(styleSelector)}
                                                            {children}
                                                        </>
                                                    )}
                                                </SnackbarRoot>
                                            </DialogRoot>
                                        </ScreenSizeContextProvider>
                                    </DocumentVisibilityProvider>
                                </AspectRatioSupportProvider>
                            </TrackingConfig>
                        </MaybeDensitySkinConfigContext.Provider>
                    </ThemeContext.Provider>
                </TooltipContextProvider>
            </ModalContextProvider>
            {!as && <SetupStackingContext />}
        </>
    );
};

export default ThemeContextProvider;
