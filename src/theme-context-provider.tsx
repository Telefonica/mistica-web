import * as React from 'react';
import {JssProvider} from 'react-jss';
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

import type {Colors} from './skins/types';
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
let jssInstanceId = 0;

type Props = {
    theme: ThemeConfig;
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

const ThemeContextProvider: React.FC<Props> = ({theme, children}) => {
    const classNamePrefix = React.useMemo(
        // Always start the counter in 0 in server side, otherwise every new request to the server will inclrement the counter and
        // we'll have missmatches when rendering client side. The disadvantage of this is that we can only have one instance of
        // ThemeContextProvider in apps with ssr.
        () =>
            process.env.NODE_ENV === 'test'
                ? ''
                : `mistica-${PACKAGE_VERSION.replace(/\./g, '-')}-${isServerSide() ? 0 : jssInstanceId++}-`,
        []
    );

    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const isOsDarkModeEnabled = useIsOsDarkModeEnabled();

    const contextTheme: Theme = React.useMemo(() => {
        // TODO: In next major version we could change this to "auto" by default
        const colorScheme = theme.colorScheme ?? 'light';
        const lightColors: Colors = theme.skin.colors;
        const darkColors: Colors = {...theme.skin.colors, ...theme.skin.darkModeColors};
        const isDarkModeEnabled = (colorScheme === 'auto' && isOsDarkModeEnabled) || colorScheme === 'dark';
        const colors: Colors = isDarkModeEnabled ? darkColors : lightColors;

        return {
            skinName: theme.skin.name,
            i18n: theme.i18n,
            platformOverrides: {
                platform: getPlatform(),
                insideNovumNativeApp: isInsideNovumNativeApp(),
                ...theme.platformOverrides,
            },
            texts: {
                ...getTexts(theme.i18n.locale),
                ...theme.texts,
            },
            analytics: {
                logEvent: () => Promise.resolve(),
                ...theme.analytics,
            },
            dimensions: {
                ...dimensions,
                ...theme.dimensions,
            },
            mq: theme.mediaQueries
                ? createMediaQueries(theme.mediaQueries)
                : createMediaQueries(mediaQueriesConfig),
            colors,
            Link: theme.Link ?? AnchorLink,
            isDarkMode: isDarkModeEnabled,
        };
    }, [theme, isOsDarkModeEnabled]);

    return (
        <JssProvider jss={getJss()} classNamePrefix={classNamePrefix} generateId={generateId}>
            <ThemeContext.Provider value={contextTheme}>
                <AriaIdGetterContext.Provider value={getAriaId}>
                    <ScreenSizeContextProvider>
                        <DialogRoot>{children}</DialogRoot>
                    </ScreenSizeContextProvider>
                </AriaIdGetterContext.Provider>
            </ThemeContext.Provider>
        </JssProvider>
    );
};

export default ThemeContextProvider;
