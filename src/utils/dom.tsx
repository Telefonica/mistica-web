import {isServerSide} from './environment';

import type {DataAttributes} from './types';

/**
 * Returns true if provided type is supported <input> type
 */
export const isInputTypeSupported = (type: string): boolean => {
    if (isServerSide()) {
        return false;
    }
    const input = document.createElement('input');
    input.setAttribute('type', type);
    return input.type === type;
};

export const cancelEvent = (event: Event | React.SyntheticEvent): void => {
    event.stopPropagation();
    event.preventDefault();
};

export const createChangeEvent = (
    target: HTMLInputElement,
    value: string
): React.ChangeEvent<HTMLInputElement> => {
    const event = new Event('change') as any;
    target.value = value;
    return {...event, target, currentTarget: target};
};

/**
 * Detect passive event listeners support
 * See passiveeventlisteners.js at https://github.com/Modernizr/Modernizr/
 */
let supportsPassive = false;
try {
    const options = Object.defineProperty({}, 'passive', {
        get() {
            supportsPassive = true;
            return undefined;
        },
    });
    window.addEventListener('test' as any, () => {}, options);
} catch (e) {
    // does not support passive event listeners :(
}

export const addPassiveEventListener = (
    el: EventTarget,
    eventName: string,
    listener: (e: any) => void
): void => el.addEventListener(eventName, listener, supportsPassive ? {passive: true} : false);

export const removePassiveEventListener = (
    el: EventTarget,
    eventName: string,
    listener: (e: any) => void
): void => el.removeEventListener(eventName, listener, false);

/**
 * Prefixes given attributes with `data-`
 *
 * For example: `{foo: 'bar'}` => `{data-foo: 'bar'}`
 */
export const getPrefixedDataAttributes = (attrs?: DataAttributes): DataAttributes => {
    const result: DataAttributes = {};
    if (attrs) {
        Object.keys(attrs).forEach((key) => {
            result['data-' + key] = attrs[key];
        });
    }
    return result;
};

type ScrollAxis = 'X' | 'Y';

const isScrollable = (el: Element, axis: ScrollAxis): boolean => {
    const overflowKey: 'overflowX' | 'overflowY' = `overflow${axis}`;
    const overflowValue = window.getComputedStyle(el)[overflowKey];
    return ['auto', 'scroll', 'overlay'].includes(overflowValue);
};

export const getScrollableParentElement = (el?: HTMLElement | null, axis: ScrollAxis = 'Y'): HTMLElement => {
    let result = el?.parentElement;
    while (result && !isScrollable(result, axis)) {
        result = result.parentElement;
    }
    return result || document.documentElement;
};

export const getScrollDistanceToBottom = (el: HTMLElement): number =>
    el.scrollHeight - el.scrollTop - el.clientHeight;

export const hasScroll = (el: HTMLElement): boolean => el.scrollHeight > el.clientHeight;

type ResizeListener = (entries: Array<ResizeObserverEntry>, observer: ResizeObserver) => void;
export const listenResize = (element: Element, handler: ResizeListener): (() => void) => {
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
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    getResizeObserverPromise().then((ResizeObserver) => {
        if (!cancelled && ResizeObserver) {
            resizeObserver = new ResizeObserver(handler);
            resizeObserver.observe(element);
        }
    });

    return () => {
        cancelled = true;
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
    };
};
