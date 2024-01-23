// this is a false positive, because there isn't any component in this module
/* eslint-disable mistica-local-rules/use-client */
import * as React from 'react';
import ThemeContext from './theme-context';
import ScreenSizeContext from './screen-size-context';
import AriaIdGetterContext from './aria-id-getter-context';
import {listenResize} from './utils/dom';
import {isClientSide} from './utils/environment';
import {isEqual} from './utils/helpers';

import type {Theme} from './theme';
import type {ScreenSizeContextType} from './screen-size-context';

export const useTheme = (): Theme => {
    const theme = React.useContext(ThemeContext);
    if (!theme) {
        throw Error(
            `To use @telefonica/mistica components you must instantiate <ThemeContextProvider> as their parent.`
        );
    }
    return theme;
};

let bodyStyles = '';
let bodyScrollTop = 0;
let disableBodyDepth = 0;

export const useDisableBodyScroll = (disable: boolean): void => {
    React.useEffect(() => {
        if (disable) {
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

                    document.body.style.cssText =
                        bodyStyles +
                        (bodyStyles.endsWith(';') ? '' : ';') +
                        [
                            'overflow: hidden;',
                            `overflow-y: ${overflowY};`,
                            'position: fixed;',
                            `top: ${-bodyScrollTop}px;`,
                            'left: 0px;',
                            'right: 0px;',
                            'bottom: 0px;',
                            'overscroll-behavior-y: contain;', // disable overscroll
                        ].join('');
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

export const useElementDimensions = (): {
    width: number;
    height: number;
    ref: (node: HTMLElement | null) => void;
} => {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [element, setElement] = React.useState<HTMLElement | null>(null);

    const updateSize = React.useCallback((entries: Array<ResizeObserverEntry>) => {
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
    }, []);

    React.useEffect(() => {
        if (!element) {
            setWidth(0);
            setHeight(0);
            return;
        }

        return listenResize(element, updateSize);
    }, [element, updateSize]);

    return {width, height, ref};
};

export const useAriaId = (id?: string): string => {
    const {useId} = useTheme();
    // This useId should be stable, so the rules-of-hooks still apply
    if (useId) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const generatedId = useId();
        return id || generatedId;
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const getAriaId = React.useContext(AriaIdGetterContext);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return React.useRef(id || getAriaId()).current;
    }
};

export const useWindowSize = (): {
    height: number;
    width: number;
    screenHeight: number;
    screenWidth: number;
} => {
    const [windowHeight, setWindowHeight] = React.useState<number>(
        isClientSide() ? window.innerHeight : 1200 // Best guess
    );
    const [windowWidth, setWindowWidth] = React.useState<number>(
        isClientSide() ? window.innerWidth : 800 // Best guess
    );

    const [screenHeight, setScreenHeight] = React.useState<number>(
        isClientSide() ? window.screen.availHeight : 1200
    );
    const [screenWidth, setScreenWidth] = React.useState<number>(
        isClientSide() ? window.screen.availWidth : 800
    );

    React.useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
            setScreenHeight(window.screen.availHeight);
            setScreenWidth(window.screen.availWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // do not create new result instances if values don't change
    return React.useMemo(
        () => ({height: windowHeight, width: windowWidth, screenHeight, screenWidth}),
        [windowHeight, windowWidth, screenHeight, screenWidth]
    );
};

export const useWindowHeight = (): number => {
    const {height} = useWindowSize();
    return height;
};

export const useWindowWidth = (): number => {
    const {width} = useWindowSize();
    return width;
};

export const useScreenHeight = (): number => {
    const {screenHeight} = useWindowSize();
    return screenHeight;
};

export const useIsWithinIFrame = (): boolean => {
    return isClientSide() && window.top !== window.self;
};

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser
export const useIsomorphicLayoutEffect = isClientSide() ? React.useLayoutEffect : React.useEffect;

type IntersectionObserverOptions = {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | Array<number>;
};

export const useIsInViewport = (
    ref: React.RefObject<Element>,
    defaultValue: boolean,
    options?: IntersectionObserverOptions
): boolean => {
    const [isInViewport, setIsInViewport] = React.useState<boolean>(defaultValue);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (typeof window.IntersectionObserver === 'undefined') {
            return () => {};
        }

        const observer = new IntersectionObserver(
            (entries) => {
                setIsInViewport(entries[0].isIntersecting);
            },
            {root: options?.root, rootMargin: options?.rootMargin, threshold: options?.threshold}
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, options?.root, options?.rootMargin, options?.threshold]);

    return isInViewport;
};

export type BoundingRect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
    x: number;
    y: number;
};

const getBoundingClientRect = (element: Element): BoundingRect => {
    const {top, right, bottom, left, width, height, x, y} = element.getBoundingClientRect();
    return {top, right, bottom, left, width, height, x, y};
};

export const useBoundingRect = (
    ref: React.RefObject<Element>,
    computeOnEveryFrame = true,
    trackIfNotVisible = false
): BoundingRect | undefined => {
    const [rect, setRect] = React.useState<BoundingRect>();
    const isVisible = useIsInViewport(ref, false);

    React.useEffect(() => {
        let id: number;

        const check = () => {
            if (ref.current && (isVisible || trackIfNotVisible)) {
                const current = getBoundingClientRect(ref.current);
                if (!isEqual(rect, current)) {
                    setRect(current);
                }

                if (computeOnEveryFrame) {
                    id = requestAnimationFrame(check);
                }
            } else {
                setRect(undefined);
            }
        };

        id = requestAnimationFrame(check);

        return () => {
            cancelAnimationFrame(id);
        };
    }, [ref, rect, isVisible, computeOnEveryFrame, trackIfNotVisible]);

    return rect;
};
