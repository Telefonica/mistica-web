import * as React from 'react';
import ThemeContext from './theme-context';
import ScreenSizeContext from './screen-size-context';
import AriaIdGetterContext from './aria-id-getter-context';

import type {ScreenSizeContextType} from './screen-size-context';
import type {Theme} from './theme';

export const useTheme = (): Theme => {
    const theme = React.useContext(ThemeContext);
    if (!theme) {
        throw Error(
            `To use @telefonica/mistica components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }
    return theme;
};

export const useDisableBodyScroll = (disable: boolean): void => {
    React.useEffect(() => {
        if (disable) {
            let bodyStyles = '';
            let bodyScrollTop = 0;
            let disableBodyDepth = 0;
            const scrollContainer = document.scrollingElement || document.documentElement;

            const disableBodyScroll = () => {
                disableBodyDepth++;
                if (disableBodyDepth > 1) {
                    return;
                }
                bodyScrollTop = scrollContainer?.scrollTop ?? 0;
                bodyStyles = document.body?.style.cssText ?? '';
                if (document.body) {
                    const hasScrollbar =
                        window.innerWidth > (scrollContainer?.clientWidth ?? window.innerWidth);

                    // if the scrollbar is visible, we don't want to hide it because content will be resized
                    const overflowY = hasScrollbar ? 'scroll' : 'hidden';

                    document.body.style.cssText = `overflow:hidden;overflow-y:${overflowY};position:fixed;top:${-bodyScrollTop}px;left:0px;right:0px;bottom:0px`;
                }
            };
            const enableBodyScroll = () => {
                disableBodyDepth--;
                if (disableBodyDepth > 0) {
                    return;
                }
                if (document.body) {
                    document.body.style.cssText = bodyStyles;
                }
                if (scrollContainer) {
                    scrollContainer.scrollTop = bodyScrollTop;
                }
            };
            disableBodyScroll();
            return enableBodyScroll;
        }
        return () => {};
    }, [disable]);
};

export const useScreenSize = (): ScreenSizeContextType => React.useContext(ScreenSizeContext);

const getResizeObserverPromise = (): Promise<typeof window.ResizeObserver | null> => {
    if (typeof window === 'undefined') {
        return Promise.resolve(null);
    }

    return window.ResizeObserver
        ? Promise.resolve(ResizeObserver)
        : import(/* webpackChunkName: "@juggle/resize-observer" */ '@juggle/resize-observer').then(
              (m: any) => m.ResizeObserver
          );
};

export const useElementDimensions = (): {
    width: number;
    height: number;
    ref: (node: HTMLElement | null) => void;
} => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [element, setElement] = React.useState<HTMLElement | null>(null);

    const updateSize = React.useCallback((entries) => {
        if (!entries) {
            setWidth(0);
            setHeight(0);
            return;
        }

        const {width, height} = entries[0].contentRect;
        setWidth(width);
        setHeight(height);
    }, []);

    const ref = React.useCallback((node: HTMLElement | null) => {
        setElement(node);

        if (node) {
            const rect = node.getBoundingClientRect();
            setWidth(rect.width);
            setHeight(rect.height);
        }
    }, []);

    React.useEffect(() => {
        if (!element) {
            return;
        }

        let cancel = false;
        const observerPromise = getResizeObserverPromise().then((ResizeObserver) => {
            if (cancel || !ResizeObserver || !element) {
                return null;
            }

            const observer = new ResizeObserver(updateSize);
            observer.observe(element);
            return observer;
        });

        return () => {
            cancel = true;
            observerPromise.then((observer) => observer?.disconnect());
        };
    }, [element, updateSize]);

    return {width, height, ref};
};

export const useAriaId = (id?: string): string => {
    const getAriaId = React.useContext(AriaIdGetterContext);
    return React.useRef(id || getAriaId()).current;
};

export const useWindowSize = (): {height: number; width: number} => {
    const [windowHeight, setWindowHeight] = React.useState<number>(
        typeof window !== 'undefined' ? window.innerHeight : 1200 // Best guess
    );
    const [windowWidth, setWindowWidth] = React.useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 800 // Best guess
    );

    React.useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // do not create new result instances if values don't change
    return React.useMemo(() => ({height: windowHeight, width: windowWidth}), [windowHeight, windowWidth]);
};

export const useWindowHeight = (): number => {
    const {height} = useWindowSize();
    return height;
};

export const useWindowWidth = (): number => {
    const {width} = useWindowSize();
    return width;
};

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser
export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
