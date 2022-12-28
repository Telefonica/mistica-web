import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import DialogRoot from './dialog';
import ScreenSizeContextProvider from './screen-size-context-provider';
import {createMediaQueries} from './utils/media-queries';
import AriaIdGetterContext from './aria-id-getter-context';
import {AnchorLink, mediaQueriesConfig, dimensions, getTexts, NAVBAR_HEIGHT_MOBILE} from './theme';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';
import ThemeContext from './theme-context';
import {useIsomorphicLayoutEffect} from './hooks';
import TabFocus from './tab-focus';
import ModalContextProvider from './modal-context-provider';
import {DocumentVisibilityProvider} from './utils/document-visibility';
import {AspectRatioSupportProvider} from './utils/aspect-ratio-support';
import {TrackingConfig} from './utils/analytics';
import {vars} from './skins/skin-contract.css';
import {fromHexToRgb} from './utils/color';

import type {Colors, TextPresetsConfig} from './skins/types';
import type {Theme, ThemeConfig} from './theme';

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
    children?: React.ReactNode;
};

const useDefaultHrefDecorator = () => {
    return (href: string) => href;
};

const defaultTextPresetsConfig: TextPresetsConfig = {
    text5: {weight: 'light'},
    text6: {weight: 'light'},
    text7: {weight: 'light'},
    text8: {weight: 'light'},
    text9: {weight: 'light'},
    text10: {weight: 'light'},
};

const sanitizeDimensions = (dimensions: ThemeConfig['dimensions']): Partial<Theme['dimensions']> => {
    return {
        headerMobileHeight:
            dimensions?.headerMobileHeight === 'mistica'
                ? NAVBAR_HEIGHT_MOBILE
                : dimensions?.headerMobileHeight,
    };
};

const ThemeContextProvider: React.FC<Props> = ({theme, children, as}) => {
    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const colorScheme = theme.colorScheme ?? 'auto';
    const lightColors: Colors = theme.skin.colors;
    const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
    const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
    const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

    const contextTheme = React.useMemo<Theme>(() => {
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
            dimensions: {
                ...dimensions,
                ...sanitizeDimensions(theme.dimensions),
            },
            mq: createMediaQueries(theme.mediaQueries ?? mediaQueriesConfig),
            textPresets: {
                text5: {...defaultTextPresetsConfig.text5, ...theme.skin.textPresets?.text5},
                text6: {...defaultTextPresetsConfig.text6, ...theme.skin.textPresets?.text6},
                text7: {...defaultTextPresetsConfig.text7, ...theme.skin.textPresets?.text7},
                text8: {...defaultTextPresetsConfig.text8, ...theme.skin.textPresets?.text8},
                text9: {...defaultTextPresetsConfig.text9, ...theme.skin.textPresets?.text9},
                text10: {...defaultTextPresetsConfig.text10, ...theme.skin.textPresets?.text10},
            },
            Link: theme.Link ?? AnchorLink,
            isDarkMode: isDarkModeEnabled,
            isIos: getPlatform(platformOverrides) === 'ios',
            useHrefDecorator: theme.useHrefDecorator ?? useDefaultHrefDecorator,
        };
    }, [theme, isDarkModeEnabled]);

    // Define the same colors in css variables as rgb components, to allow applying alpha aftherwards. See utils/color.tsx
    const rawColors = Object.fromEntries(
        Object.entries(colors).map(([colorName, colorValue]) => {
            let rawColorValue = '';
            if (colorValue.startsWith('#')) {
                const [r, g, b] = fromHexToRgb(colorValue);
                rawColorValue = `${r}, ${g}, ${b}`;
            }
            return [colorName, rawColorValue];
        })
    ) as Colors;
    const themeVars = assignInlineVars(vars, {colors, rawColors});

    return (
        <TabFocus disabled={!theme.enableTabFocus}>
            <ModalContextProvider>
                <ThemeContext.Provider value={contextTheme}>
                    <TrackingConfig eventFormat={contextTheme.analytics.eventFormat}>
                        <AspectRatioSupportProvider>
                            <DocumentVisibilityProvider>
                                <AriaIdGetterContext.Provider value={getAriaId}>
                                    <ScreenSizeContextProvider>
                                        <DialogRoot>
                                            {as ? (
                                                React.createElement(as, {style: themeVars}, children)
                                            ) : (
                                                <>
                                                    {(process.env.NODE_ENV !== 'test' ||
                                                        process.env.SSR_TEST) && (
                                                        <style>{`:root {${themeVars}}`}</style>
                                                    )}
                                                    {children}
                                                </>
                                            )}
                                        </DialogRoot>
                                    </ScreenSizeContextProvider>
                                </AriaIdGetterContext.Provider>
                            </DocumentVisibilityProvider>
                        </AspectRatioSupportProvider>
                    </TrackingConfig>
                </ThemeContext.Provider>
            </ModalContextProvider>
        </TabFocus>
    );
};

export default ThemeContextProvider;
