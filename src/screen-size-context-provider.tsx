'use client';
import * as React from 'react';
import ScreenSizeContext from './screen-size-context';
import {useIsomorphicLayoutEffect} from './hooks';
import * as mq from './media-queries.css';

type Props = {
    children: React.ReactNode;
};

const ScreenSizeContextProvider = ({children}: Props): JSX.Element => {
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

    const [isMobile, setIsMobile] = React.useState(
        () => !isServerSide && window.matchMedia(mq.mobile).matches
    );
    const [isTablet, setIsTablet] = React.useState(
        () => !isServerSide && window.matchMedia(mq.tablet).matches
    );
    const [isTabletOrBigger, setIsTabletOrBigger] = React.useState(
        () => !isServerSide && window.matchMedia(mq.tabletOrBigger).matches
    );
    const [isTabletOrSmaller, setIsTabletOrSmaller] = React.useState(
        () => !isServerSide && window.matchMedia(mq.tabletOrSmaller).matches
    );

    const [isLargeDesktop, setIsLargeDesktop] = React.useState(
        () => !isServerSide && window.matchMedia(mq.largeDesktop).matches
    );

    useIsomorphicLayoutEffect(() => {
        if (!window.matchMedia) {
            return;
        }

        const entries: Array<[string, (flag: boolean) => void]> = [
            [mq.mobile, setIsMobile],
            [mq.tablet, setIsTablet],
            [mq.tabletOrBigger, setIsTabletOrBigger],
            [mq.tabletOrSmaller, setIsTabletOrSmaller],
            [mq.largeDesktop, setIsLargeDesktop],
        ];

        const cleanupFunctions = entries.map(([query, setState]) => {
            const mq = window.matchMedia(query);
            const listener = () => {
                setState(mq.matches);
            };
            mq.addEventListener('change', listener);
            listener();
            return () => {
                mq.removeEventListener('change', listener);
            };
        });

        return () => cleanupFunctions.forEach((fn) => fn());
    }, []);

    const value = React.useMemo(
        () => ({
            isMobile,
            isTablet,
            isTabletOrBigger,
            isTabletOrSmaller,
            isDesktopOrBigger: isServerSide ? false : !isTabletOrSmaller,
            isLargeDesktop,
        }),
        [isMobile, isTablet, isTabletOrBigger, isTabletOrSmaller, isLargeDesktop, isServerSide]
    );

    return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
};

export default ScreenSizeContextProvider;
