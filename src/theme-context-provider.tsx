import * as React from 'react';
import {JssProvider} from 'react-jss';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {createGenerateId} from 'jss';
import {getJss} from './jss';
import DialogRoot from './dialog';
import ScreenSizeContextProvider from './screen-size-context-provider';
import {createMediaQueries} from './utils/media-queries';
import {PACKAGE_VERSION} from './package-version';
import AriaIdGetterContext from './aria-id-getter-context';
import {isServerSide} from './utils/environment';
import {AnchorLink, mediaQueriesConfig, dimensions, getTexts} from './theme';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';
import ThemeContext from './theme-context';
import {useIsomorphicLayoutEffect} from './hooks';
import TabFocus from './tab-focus';
import ModalContextProvider from './modal-context-provider';
import {DocumentVisibilityProvider} from './utils/document-visibility';
import {AspectRatioSupportProvider} from './utils/aspect-ratio-support';
import {TrackingConfig} from './utils/analytics';
import {vars} from './skins/skin-contract.css';

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

// This counter will increment with every new instance of ThemeContextProvider in the app. In a typical app we don't need more than
// one instance of ThemeContextProvider. But some apps may depend on libs that use Mistica too, so there may be more than one instance
// in those cases. We use this counter to avoid class name collisions in those cases.
let nextJssInstanceId = 0;

type Props = {
    theme: ThemeConfig;
    /**
     * You should use this prop if you use Strict Mode and Server Side Rendering together.
     * This identifier will be used to generate unique class names for each instance of ThemeContextProvider.
     * If no identifier is provided, this will fallback to an auto-incremented id, which will cause
     * problems in SSR + Strict Mode because the class names from client and server won't match.
     * More info: https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
     *
     * Once we migrate to React18, we could remove this prop and use the useId hook instead.
     */
    providerId?: string;
    children?: React.ReactNode;
};

const generateId = (() => {
    if (process.env.NODE_ENV === 'test') {
        // in tests classnames are just the classame, whithout ids
        return (r: any) => r.key;
    }
    if (isServerSide()) {
        // this makes jss to create a new generator in each jss instance
        return undefined;
    }
    // in frontend, use the same generator for all JssProvider renders, this way we avoid classname collisions
    return createGenerateId();
})();

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

const ThemeContextProvider: React.FC<Props> = ({theme, children, providerId}) => {
    const [instanceId] = React.useState(() => {
        if (providerId) {
            return providerId;
        } else {
            return isServerSide() ? 0 : nextJssInstanceId++;
        }
    });

    const classNamePrefix = React.useMemo(
        () =>
            process.env.NODE_ENV === 'test'
                ? ''
                : `mistica-${PACKAGE_VERSION.replace(/\./g, '-')}_${instanceId}_`,
        [instanceId]
    );

    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const contextTheme = React.useMemo<Theme>(() => {
        // TODO: In next major version we could change this to "auto" by default
        const colorScheme = theme.colorScheme ?? 'light';
        const lightColors: Colors = theme.skin.colors;
        const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
        const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
        const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

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
                ...theme.dimensions,
            },
            mq: createMediaQueries(theme.mediaQueries ?? mediaQueriesConfig),
            colors,
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
    }, [theme, isOsDarkModeEnabled]);

    const themeStyle = `:root {${assignInlineVars(vars, {colors: contextTheme.colors})}}`;

    return (
        <JssProvider jss={getJss()} classNamePrefix={classNamePrefix} generateId={generateId}>
            <TabFocus disabled={!theme.enableTabFocus}>
                <ModalContextProvider>
                    <ThemeContext.Provider value={contextTheme}>
                        <TrackingConfig eventFormat={contextTheme.analytics.eventFormat}>
                            <AspectRatioSupportProvider>
                                <DocumentVisibilityProvider>
                                    <AriaIdGetterContext.Provider value={getAriaId}>
                                        <ScreenSizeContextProvider>
                                            <DialogRoot>
                                                {process.env.NODE_ENV !== 'test' && (
                                                    <style>{themeStyle}</style>
                                                )}
                                                {children}
                                            </DialogRoot>
                                        </ScreenSizeContextProvider>
                                    </AriaIdGetterContext.Provider>
                                </DocumentVisibilityProvider>
                            </AspectRatioSupportProvider>
                        </TrackingConfig>
                    </ThemeContext.Provider>
                </ModalContextProvider>
            </TabFocus>
        </JssProvider>
    );
};

export default ThemeContextProvider;
