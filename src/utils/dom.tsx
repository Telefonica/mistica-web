import {isServerSide} from './environment';
import {DataAttributes} from './types';

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
 * @see passiveeventlisteners.js at https://github.com/Modernizr/Modernizr/
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
