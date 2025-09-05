'use client';
import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {DialogRoot} from './dialog-context';
import ScreenSizeContextProvider from './screen-size-context-provider';
import {dimensions, getMisticaLinkComponent, NAVBAR_HEIGHT_MOBILE} from './theme';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';
import ThemeContext from './theme-context';
import {useIsomorphicLayoutEffect} from './hooks';
import TabFocus from './tab-focus';
import ModalContextProvider from './modal-context-provider';
import TooltipContextProvider from './tooltip-context-provider';
import {DocumentVisibilityProvider} from './utils/document-visibility';
import {AspectRatioSupportProvider} from './utils/aspect-ratio-support';
import {TrackingConfig} from './utils/analytics';
import {vars} from './skins/skin-contract.css';
import {fromHexToRgb} from './utils/color';
import {
    defaultBorderRadiiConfig,
    defaultTextPresetsConfig,
    defaultThemeVariantsConfig,
} from './skins/defaults';
import {isClientSide} from './utils/environment';
import {PACKAGE_VERSION} from './package-version';
import {SnackbarRoot} from './snackbar-context';
import {mapToWeight} from './text';
import * as mq from './media-queries.css';
import * as styles from './theme-context.css';
import {localeToLanguage} from './utils/locale';

import type {Colors, TextPresetsConfig} from './skins/types';
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

type TextPresetsVars = {
    [key in keyof TextPresetsConfig]: {
        weight: string;
        size: string;
        lineHeight: string;
    };
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

const ThemeContextProvider = ({theme, children, as, withoutStyles = false}: Props): JSX.Element => {
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

    const contextTheme = React.useMemo((): Theme => {
        const platformOverrides = {
            platform: getPlatform(),
            insideNovumNativeApp: isInsideNovumNativeApp(),
            ...theme.platformOverrides,
        };

        const textTokenValues = Object.entries(defaultTextPresetsConfig).map(([token, defaultConfig]) => {
            return {
                [token]: {...defaultConfig, ...theme.skin.textPresets?.[token as keyof TextPresetsConfig]},
            };
        });

        const textPresets = Object.assign({}, ...textTokenValues) as TextPresetsConfig;

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
            borderRadii: theme.skin.borderRadii ?? defaultBorderRadiiConfig,
            textPresets,
            themeVariants: theme.skin.themeVariants ?? defaultThemeVariantsConfig,
            Link: getMisticaLinkComponent(theme.Link),
            isDarkMode: isDarkModeEnabled,
            isIos: getPlatform(platformOverrides) === 'ios',
            useHrefDecorator: theme.useHrefDecorator ?? useDefaultHrefDecorator,
            t: translate,
            preventCopyInFormFields: theme.preventCopyInFormFields ?? false,
        };
    }, [colors, theme, isDarkModeEnabled, translate]);

    const textPresetsVars = React.useMemo(() => {
        // Get an object mapping textPresets tokens to objects containing the token's weight
        // For example, {title1: {weight: '700'}}
        const tokenValues = Object.entries(contextTheme.textPresets).map(([token, config]) => {
            // Map light/regular/medium/bold to valid css fontWeight values
            return {
                [token]: {
                    ...(config.weight && {weight: String(mapToWeight[config.weight])}),
                    ...(config.size && {size: `${config.size.desktop}px`}),
                    ...(config.lineHeight && {lineHeight: `${config.lineHeight.desktop}px`}),
                },
            };
        });

        return Object.assign({}, ...tokenValues) as TextPresetsVars;
    }, [contextTheme]);

    const textPresetsResponsiveVars = React.useMemo(() => {
        const tokenValues = Object.entries(contextTheme.textPresets).map(([token, config]) => {
            return {
                [token]: {
                    ...(config.weight && {weight: String(mapToWeight[config.weight])}),
                    // Use mobile values for size/lineHeight
                    ...(config.size && {size: `${config.size.mobile}px`}),
                    ...(config.lineHeight && {lineHeight: `${config.lineHeight.mobile}px`}),
                },
            };
        });

        return Object.assign({}, ...tokenValues) as TextPresetsVars;
    }, [contextTheme]);

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
                        textPresets: textPresetsVars,
                        borderRadii: theme.skin.borderRadii ?? defaultBorderRadiiConfig,
                    })}
                }
                @media ${mq.tabletOrSmaller} {
                    ${selector} {
                        ${assignInlineVars(vars.textPresets, textPresetsResponsiveVars)}
                    }
                }
                ${darkModeMediaQuery}
            `}
            </style>
        );
    };

    return (
        <>
            <TabFocus disabled={!theme.enableTabFocus}>
                <ModalContextProvider>
                    <TooltipContextProvider>
                        <ThemeContext.Provider value={contextTheme}>
                            <TrackingConfig eventFormat={contextTheme.analytics.eventFormat}>
                                <AspectRatioSupportProvider>
                                    <DocumentVisibilityProvider>
                                        <ScreenSizeContextProvider>
                                            <DialogRoot>
                                                <SnackbarRoot>
                                                    {as ? (
                                                        <>
                                                            {renderStyles(`.${styles.themeVars}`)}
                                                            {React.createElement(
                                                                as,
                                                                {
                                                                    style: {
                                                                        isolation: 'isolate',
                                                                    },
                                                                    className: withoutStyles
                                                                        ? undefined
                                                                        : styles.themeVars,
                                                                },
                                                                children
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {renderStyles(':root')}
                                                            {children}
                                                        </>
                                                    )}
                                                </SnackbarRoot>
                                            </DialogRoot>
                                        </ScreenSizeContextProvider>
                                    </DocumentVisibilityProvider>
                                </AspectRatioSupportProvider>
                            </TrackingConfig>
                        </ThemeContext.Provider>
                    </TooltipContextProvider>
                </ModalContextProvider>
            </TabFocus>
            {!as && <SetupStackingContext />}
        </>
    );
};

export default ThemeContextProvider;
