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
import {AnchorLink, mediaQueriesConfig, dimensions, texts} from './theme';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';

import type {Theme, ThemeConfig} from './theme';

export const ThemeContext = React.createContext<Theme | null>(null);

// This counter will increment with every new instance of ThemeContextProvider in the app. In a typical app we don't need more than
// one instance of ThemeContextProvider. But some apps may depend on libs that use Mistica too, so there may be more than one instance
// in those cases. We use this counter to avoid class name collisions in those cases.
let jssInstanceId = 0;

type Props = {
    theme: ThemeConfig;
    children?: React.ReactNode;
};

const generateId = isServerSide() ? undefined : createGenerateId();
const ThemeContextProvider: React.FC<Props> = ({theme, children}) => {
    const classNamePrefix = React.useMemo(
        // Always start the counter in 0 in server side, otherwise every new request to the server will inclrement the counter and
        // we'll have missmatches when rendering client side. The disadvantage of this is that we can only have one instance of
        // ThemeContextProvider in apps with ssr.
        () => `mistica-${PACKAGE_VERSION.replace(/\./g, '-')}-${isServerSide() ? 0 : jssInstanceId++}-`,
        []
    );

    const nextAriaId = React.useRef(1);
    const getAriaId = React.useCallback((): string => `aria-id-hook-${nextAriaId.current++}`, []);

    const contextTheme: Theme = React.useMemo(
        () => ({
            skinName: theme.skin.name,
            i18n: theme.i18n,
            platformOverrides: {
                platform: getPlatform(),
                insideNovumNativeApp: isInsideNovumNativeApp(),
                ...theme.platformOverrides,
            },
            texts: {
                ...texts,
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
            colors: theme.skin.colors,
            Link: theme.Link ?? AnchorLink,
        }),
        [theme]
    );

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
