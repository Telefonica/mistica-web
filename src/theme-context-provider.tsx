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

import type {Colors} from './skins/types';
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

        mq.addListener(listener);
        listener();

        return () => mq.removeListener(listener);
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

const ThemeContextProvider: React.FC<Props> = ({theme, children, as, withoutStyles = false}) => {
    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const colorScheme = theme.colorScheme ?? 'auto';
    const lightColors: Colors = theme.skin.colors;
    const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
    const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
    const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

    const ref = React.useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        // Set isolation: isolate to the parent of the provider. This way, we avoid content inside portals
        // from being rendered under content that is inside the provider (in case it has z-index defined).
        const root = ref.current?.parentElement;
        if (root) {
            root.style.isolation = 'isolate';
        }
    }, []);

    const contextTheme = React.useMemo((): Theme => {
        const platformOverrides = {
            platform: getPlatform(),
            insideNovumNativeApp: isInsideNovumNativeApp(),
            ...theme.platformOverrides,
        };
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
            textPresets: {
                text5: {...defaultTextPresetsConfig.text5, ...theme.skin.textPresets?.text5},
                text6: {...defaultTextPresetsConfig.text6, ...theme.skin.textPresets?.text6},
                text7: {...defaultTextPresetsConfig.text7, ...theme.skin.textPresets?.text7},
                text8: {...defaultTextPresetsConfig.text8, ...theme.skin.textPresets?.text8},
                text9: {...defaultTextPresetsConfig.text9, ...theme.skin.textPresets?.text9},
                text10: {...defaultTextPresetsConfig.text10, ...theme.skin.textPresets?.text10},
                cardTitle: {...defaultTextPresetsConfig.cardTitle, ...theme.skin.textPresets?.cardTitle},
                button: {...defaultTextPresetsConfig.button, ...theme.skin.textPresets?.button},
                link: {...defaultTextPresetsConfig.link, ...theme.skin.textPresets?.link},
                title1: {...defaultTextPresetsConfig.title1, ...theme.skin.textPresets?.title1},
                title2: {...defaultTextPresetsConfig.title2, ...theme.skin.textPresets?.title2},
                navigationBar: {
                    ...defaultTextPresetsConfig.navigationBar,
                    ...theme.skin.textPresets?.navigationBar,
                },
                indicator: {...defaultTextPresetsConfig.indicator, ...theme.skin.textPresets?.indicator},
                tabsLabel: {...defaultTextPresetsConfig.tabsLabel, ...theme.skin.textPresets?.tabsLabel},
            },
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

    const themeVars = assignInlineVars(vars, {
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
                                                        {as ? (
                                                            React.createElement(
                                                                as,
                                                                {
                                                                    style: withoutStyles
                                                                        ? undefined
                                                                        : themeVars,
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
            <div ref={ref} style={{display: 'none'}} />
        </>
    );
};

export default ThemeContextProvider;
