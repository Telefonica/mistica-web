/**
 * This file implements lodash alternatives used by components
 *
 * Importing the lodash library causes problems when building Mística as an ES module.
 * Importing lodash-es causes problems when running ssr tests (not sure why)
 *
 * Once Mística gets migrated to a proper ES module, we can consider to remove this file and use lodash-es
 */

type Debounced<T> = T & {cancel: () => void};

export const debounce = <T extends (...args: Array<any>) => any>(
    func: T,
    wait: number,
    options: {
        leading?: boolean;
        maxWait?: number;
    } = {}
): Debounced<T> => {
    let debounceTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let maxWaitTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let currentArgs: Parameters<T>;
    let isLeading = true;

    const debounced = (...args: Parameters<T>) => {
        if (debounceTimeoutId) {
            clearTimeout(debounceTimeoutId);
        }

        currentArgs = args;

        if (!maxWaitTimeoutId && options.maxWait) {
            maxWaitTimeoutId = setTimeout(() => {
                func(...currentArgs);
                maxWaitTimeoutId = undefined;
                clearTimeout(debounceTimeoutId);
            }, options.maxWait);
        }

        if (isLeading && options.leading) {
            isLeading = false;
            func(...args);
            return;
        }

        debounceTimeoutId = setTimeout(() => {
            func(...args);
            if (maxWaitTimeoutId) {
                clearTimeout(maxWaitTimeoutId);
            }
            debounceTimeoutId = undefined;
            maxWaitTimeoutId = undefined;
            // eslint-disable-next-line testing-library/await-async-utils
        }, wait);
    };

    debounced.cancel = () => {
        if (debounceTimeoutId) {
            clearTimeout(debounceTimeoutId);
            debounceTimeoutId = undefined;
        }
        if (maxWaitTimeoutId) {
            clearTimeout(maxWaitTimeoutId);
            maxWaitTimeoutId = undefined;
        }
    };

    return debounced as Debounced<T>;
};

const isPrimitive = (v: unknown): v is string | number | undefined | null | boolean | symbol => {
    if (v === null) {
        return true;
    }
    if (typeof v === 'object' || typeof v === 'function') {
        return false;
    }
    return true;
};

export const isEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) {
        return true;
    }

    if (isPrimitive(a) || isPrimitive(b)) {
        return a === b;
    }

    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === 'function') {
        return a === b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((value, index) => isEqual(value, b[index]));
    }

    if (a instanceof Date || b instanceof Date) {
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }
        return false;
    }

    const keysA = Object.keys(a as any);
    const keysB = Object.keys(b as any);
    if (keysA.length === keysB.length) {
        return keysA.every((key) => isEqual((a as any)[key], (b as any)[key]));
    }

    return false;
};
