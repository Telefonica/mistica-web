'use client';
import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {DialogRoot} from './dialog-context';
import ScreenSizeContextProvider from './screen-size-context-provider';
import AriaIdGetterContext from './aria-id-getter-context';
import {dimensions, getTexts, getMisticaLinkComponent, NAVBAR_HEIGHT_MOBILE} from './theme';
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
import {defaultBorderRadiiConfig, defaultTextPresetsConfig} from './skins/defaults';
import {isClientSide} from './utils/environment';
import {PACKAGE_VERSION} from './package-version';
import {SnackbarRoot} from './snackbar-context';
import {mapToWeight} from './text';
import path from 'path';
import fs from 'fs';

import type {Colors, TextPresetsConfig} from './skins/types';
import type {Theme, ThemeConfig} from './theme';

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

const ThemeContextProvider: React.FC<Props> = ({theme, children, as, withoutStyles = false}) => {
    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const misticaCssPath = path.resolve(__dirname, '../css/mistica.css');
    const misticaCss = fs.readFileSync(misticaCssPath, 'utf-8');

    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const colorScheme = theme.colorScheme ?? 'auto';
    const lightColors: Colors = theme.skin.colors;
    const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
    const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
    const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

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
            i18n: theme.i18n,
            platformOverrides,
            texts: {
                ...getTexts(theme.i18n.locale),
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
            textPresets,
            Link: getMisticaLinkComponent(theme.Link),
            isDarkMode: isDarkModeEnabled,
            isIos: getPlatform(platformOverrides) === 'ios',
            useHrefDecorator: theme.useHrefDecorator ?? useDefaultHrefDecorator,
            useId: theme.useId,
        };
    }, [colors, theme, isDarkModeEnabled]);

    // Define the same colors in css variables as rgb components, to allow applying alpha aftherwards. See utils/color.tsx
    const rawColors = React.useMemo(
        () =>
            Object.fromEntries(
                Object.entries(colors).map(([colorName, colorValue]) => {
                    let rawColorValue = '';
                    if (colorValue.startsWith('#')) {
                        const [r, g, b] = fromHexToRgb(colorValue);
                        rawColorValue = `${r}, ${g}, ${b}`;
                    }
                    return [colorName, rawColorValue];
                })
            ) as Colors,
        [colors]
    );

    // TODO: create CSS vars for size and lineHeight (https://jira.tid.es/browse/WEB-1929)
    const textPresetsVars = React.useMemo(() => {
        // Get an object mapping textPresets tokens to objects containing the token's weight
        // For example, {title1: {weight: '700'}}
        const tokenValues = Object.entries(contextTheme.textPresets).map(([token, config]) => {
            // Map light/regular/medium/bold to valid css fontWeight values
            return {[token]: {weight: String(mapToWeight[config.weight])}};
        });

        const textPresetsVars = Object.assign({}, ...tokenValues) as {
            [key in keyof TextPresetsConfig]: {weight: string};
        };

        return textPresetsVars;
    }, [contextTheme]);

    const themeVars = assignInlineVars(vars, {
        textPresets: textPresetsVars,
        colors,
        rawColors,
        borderRadii: theme.skin.borderRadii ?? defaultBorderRadiiConfig,
    });

    return (
        <>
            <TabFocus disabled={!theme.enableTabFocus}>
                <ModalContextProvider>
                    <TooltipContextProvider>
                        <ThemeContext.Provider value={contextTheme}>
                            <TrackingConfig eventFormat={contextTheme.analytics.eventFormat}>
                                <AspectRatioSupportProvider>
                                    <DocumentVisibilityProvider>
                                        <AriaIdGetterContext.Provider value={getAriaId}>
                                            <ScreenSizeContextProvider>
                                                <DialogRoot>
                                                    <SnackbarRoot>
                                                        {process.env.NODE_ENV === 'test' && (
                                                            // Include mistica.css classes in unit tests
                                                            <style>{misticaCss}</style>
                                                        )}
                                                        {as ? (
                                                            React.createElement(
                                                                as,
                                                                {
                                                                    style: {
                                                                        isolation: 'isolate',
                                                                        ...(withoutStyles ? {} : themeVars),
                                                                    },
                                                                },
                                                                children
                                                            )
                                                        ) : (
                                                            <>
                                                                {!withoutStyles &&
                                                                    (process.env.NODE_ENV !== 'test' ||
                                                                        process.env.SSR_TEST) && (
                                                                        <style>{`:root {${themeVars}}`}</style>
                                                                    )}
                                                                {children}
                                                            </>
                                                        )}
                                                    </SnackbarRoot>
                                                </DialogRoot>
                                            </ScreenSizeContextProvider>
                                        </AriaIdGetterContext.Provider>
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
