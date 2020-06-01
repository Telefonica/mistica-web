// @flow
import * as React from 'react';
import ThemeContext from './theme-context';
import ScreenSizeContext from './screen-size-context';

import type {ScreenSizeContextType} from './screen-size-context';
import type {Theme} from './theme';

export const useTheme = (): Theme => {
    const theme = React.useContext(ThemeContext);
    if (!theme) {
        throw Error(
            `To use @telefonica/mistica-web components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }
    return theme;
};

export const useDisableBodyScroll = (disable: boolean) => {
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
                    document.body.style.cssText = `overflow:hidden;position:fixed;height:100%;width:100%;top:${-bodyScrollTop}px`;
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

const resizeObserverPromise = window.ResizeObserver
    ? Promise.resolve(ResizeObserver)
    : import(/* webpackChunkName: "@juggle/resize-observer" */ '@juggle/resize-observer').then(
          (m) => (m.ResizeObserver: typeof ResizeObserver)
      );

export const useElementSize = (elementRef: {current: ?HTMLElement}): {height: number, width: number} => {
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
        const observerPromise = resizeObserverPromise.then((ResizeObserver) => {
            if (cancel) {
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

export const useWindowSize = (): {height: number, width: number} => {
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
