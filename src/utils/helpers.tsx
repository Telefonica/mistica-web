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

        if (isLeading && options.leading) {
            isLeading = false;
            func(...args);
            return;
        }

        currentArgs = args;

        if (!maxWaitTimeoutId && options.maxWait) {
            maxWaitTimeoutId = setTimeout(() => {
                func(...currentArgs);
                maxWaitTimeoutId = undefined;
                clearTimeout(debounceTimeoutId);
            }, options.maxWait);
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
        return false;
    }

    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === 'function') {
        // no need to check typeof b === 'function' because of the previous check
        return false;
    }

    if (Array.isArray(a) || Array.isArray(b)) {
        if (Array.isArray(a) && Array.isArray(b)) {
            return a.length === b.length && a.every((value, index) => isEqual(value, b[index]));
        }
        return false;
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
