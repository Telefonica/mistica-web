import * as React from 'react';
import ScreenSizeContext from './screen-size-context';
import {useTheme, useIsomorphicLayoutEffect} from './hooks';

type Props = {
    children: React.ReactNode;
};

const stripMedia = (s: string) => s.replace(/^@media /, '');

const ScreenSizeContextProvider: React.FC<Props> = ({children}) => {
    /**
     * To avoid problems with react hydrate, the server rendered content and the first client render should
     * be equal. To achieve that, we always do a first render in client with isServerSide state at true, and
     * then calc media queries and re-render in a second pass. Note that useIsomorphicLayoutEffect only runs
     * in client side.
     */
    const [isServerSide, setIsServerSide] = React.useState(true);
    useIsomorphicLayoutEffect(() => {
        setIsServerSide(false);
    }, []);

    const theme = useTheme();
    const mediaQueries = React.useMemo(
        () => ({
            mobile: stripMedia(theme.mq.mobile),
            tablet: stripMedia(theme.mq.tablet),
            tabletOrBigger: stripMedia(theme.mq.tabletOrBigger),
            tabletOrSmaller: stripMedia(theme.mq.tabletOrSmaller),
            largueDesktop: stripMedia(theme.mq.largeDesktop),
        }),
        [
            theme.mq.mobile,
            theme.mq.tablet,
            theme.mq.tabletOrBigger,
            theme.mq.tabletOrSmaller,
            theme.mq.largeDesktop,
        ]
    );

    const [isMobile, setIsMobile] = React.useState(
        () => !isServerSide && window.matchMedia(mediaQueries.mobile).matches
    );
    const [isTablet, setIsTablet] = React.useState(
        () => !isServerSide && window.matchMedia(mediaQueries.tablet).matches
    );
    const [isTabletOrBigger, setIsTabletOrBigger] = React.useState(
        () => !isServerSide && window.matchMedia(mediaQueries.tabletOrBigger).matches
    );
    const [isTabletOrSmaller, setIsTabletOrSmaller] = React.useState(
        () => !isServerSide && window.matchMedia(mediaQueries.tabletOrSmaller).matches
    );

    const [isLargeDesktop, setIsLargeDesktop] = React.useState(
        () => !isServerSide && window.matchMedia(mediaQueries.largueDesktop).matches
    );

    useIsomorphicLayoutEffect(() => {
        if (!window.matchMedia) {
            return;
        }

        const entries: Array<[string, (flag: boolean) => void]> = [
            [mediaQueries.mobile, setIsMobile],
            [mediaQueries.tablet, setIsTablet],
            [mediaQueries.tabletOrBigger, setIsTabletOrBigger],
            [mediaQueries.tabletOrSmaller, setIsTabletOrSmaller],
            [mediaQueries.largueDesktop, setIsLargeDesktop],
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
    }, [
        mediaQueries.mobile,
        mediaQueries.tablet,
        mediaQueries.tabletOrBigger,
        mediaQueries.tabletOrSmaller,
        mediaQueries.largueDesktop,
    ]);

    const value = React.useMemo(
        () => ({
            isMobile,
            isTablet,
            isTabletOrBigger,
            isTabletOrSmaller,
            isDesktopOrBigger: !isTabletOrSmaller,
            isLargeDesktop,
        }),
        [isMobile, isTablet, isTabletOrBigger, isTabletOrSmaller, isLargeDesktop]
    );

    return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
};

export default ScreenSizeContextProvider;
