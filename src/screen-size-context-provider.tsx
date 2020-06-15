// @flow
import * as React from 'react';
import ScreenSizeContext from './screen-size-context';
import {useTheme} from './hooks';

type Props = {
    children: React.Node,
};

const stripMedia = (s) => s.replace(/^@media /, '');

const ScreenSizeContextProvider = ({children}: Props): React.Node => {
    const theme = useTheme();
    const mediaQueries = React.useMemo(
        () => ({
            mobile: stripMedia(theme.mq.mobile),
            tablet: stripMedia(theme.mq.tablet),
            tabletOrBigger: stripMedia(theme.mq.tabletOrBigger),
            tabletOrSmaller: stripMedia(theme.mq.tabletOrSmaller),
        }),
        [theme.mq.mobile, theme.mq.tablet, theme.mq.tabletOrBigger, theme.mq.tabletOrSmaller]
    );

    const [isMobile, setIsMobile] = React.useState(() => window.matchMedia(mediaQueries.mobile).matches);
    const [isTablet, setIsTablet] = React.useState(() => window.matchMedia(mediaQueries.tablet).matches);
    const [isTabletOrBigger, setIsTabletOrBigger] = React.useState(
        () => window.matchMedia(mediaQueries.tabletOrBigger).matches
    );
    const [isTabletOrSmaller, setIsTabletOrSmaller] = React.useState(
        () => window.matchMedia(mediaQueries.tabletOrSmaller).matches
    );

    React.useLayoutEffect(() => {
        const entries = [
            [mediaQueries.mobile, setIsMobile],
            [mediaQueries.tablet, setIsTablet],
            [mediaQueries.tabletOrBigger, setIsTabletOrBigger],
            [mediaQueries.tabletOrSmaller, setIsTabletOrSmaller],
        ];

        const cleanupFunctions = entries.map(([query, setState]) => {
            const mq = window.matchMedia(query);
            const listener = () => {
                setState(mq.matches);
            };
            mq.addListener(listener);
            listener();
            return () => mq.removeListener(listener);
        });

        return () => cleanupFunctions.forEach((fn) => fn());
    }, [mediaQueries.mobile, mediaQueries.tablet, mediaQueries.tabletOrBigger, mediaQueries.tabletOrSmaller]);

    const value = React.useMemo(
        () => ({
            isMobile,
            isTablet,
            isTabletOrBigger,
            isTabletOrSmaller,
        }),
        [isMobile, isTablet, isTabletOrBigger, isTabletOrSmaller]
    );

    return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
};

export default ScreenSizeContextProvider;
