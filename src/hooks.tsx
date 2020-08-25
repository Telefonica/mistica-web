import * as React from 'react';
import ThemeContext from './theme-context';
import ScreenSizeContext from './screen-size-context';

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

export const useElementSize = (elementRef: {
    current: HTMLElement | null;
}): {height: number; width: number} => {
    const [size, setSize] = React.useState({width: 0, height: 0});

    // WARN: don't use a layout effect here, because it breaks page transitions (switch-transition.js)
    React.useEffect(() => {
        const element = elementRef.current;
        if (!element) {
            return () => {};
        }

        const update = () => {
            setSize({height: element.offsetHeight, width: element.offsetWidth});
        };

        let cancel = false;
        const observerPromise = getResizeObserverPromise().then((ResizeObserver) => {
            if (cancel || !ResizeObserver) {
                return null;
            }

            const observer = new ResizeObserver(update);
            observer.observe(element);
            return observer;
        });

        update();

        return () => {
            cancel = true;
            observerPromise.then((observer) => observer?.disconnect());
        };
    }, [elementRef]);

    return size;
};

let nextAriaId = 1;
const getAriaId = (): string => `aria-id-hook-${nextAriaId++}`;
export const useAriaId = (id?: string): string => React.useRef(id || getAriaId()).current;

export const useWindowSize = (): {height: number; width: number} => {
    const [windowHeight, setWindowHeight] = React.useState<number>(
        typeof window !== 'undefined' ? window.innerHeight : 0
    );
    const [windowWidth, setWindowWidth] = React.useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
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

export const usePrevious = <A extends unknown>(value: A, initialValue?: A): A | undefined => {
    const ref = React.useRef(initialValue);
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser
export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
