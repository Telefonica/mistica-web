/** These functions are copies of the ones located in webapp packages */

type Debounced<T> = T & {cancel: () => void; flush: () => void};

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked. The debounced function
 * comes with a cancel method to cancel delayed func invocations and a flush method to immediately
 * invoke them. The func is invoked with the last arguments provided to the debounced function.
 * Subsequent calls to the debounced function return the result of the last func invocation.
 */
export const debounce = <T extends (...args: Array<any>) => any>(
    func: T,
    wait: number,
    options: {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    } = {}
): Debounced<T> => {
    const waitTime = wait;
    const leading = options.leading ?? false;
    const trailing = options.trailing ?? true;
    const maxWait = options.maxWait !== undefined ? Math.max(options.maxWait, waitTime) : undefined;

    let currentArgs: Parameters<T> | undefined;
    let lastInvokeTime = 0;
    let lastCallTime = -1;
    let result: any;

    let timerId: ReturnType<typeof setTimeout> | undefined;

    const invokeFunction = (time: number): any => {
        lastInvokeTime = time;
        if (currentArgs) {
            result = func(...currentArgs);
        }
        currentArgs = undefined;
        return result;
    };

    const shouldInvoke = (time: number): boolean => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        return (
            lastCallTime < 0 ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
        );
    };

    const remainingWait = (time: number): number => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;
        return maxWait !== undefined ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    };

    const trailingEdge = (time: number): any => {
        timerId = undefined;

        if (trailing && currentArgs) {
            return invokeFunction(time);
        }

        currentArgs = undefined;
        return result;
    };

    const timerExpired = (): any => {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
    };

    const leadingEdge = (time: number): any => {
        lastInvokeTime = time;

        timerId = setTimeout(timerExpired, waitTime);
        return leading ? invokeFunction(time) : result;
    };

    const debounced = (...args: Parameters<T>) => {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        currentArgs = args;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxWait !== undefined) {
                timerId = setTimeout(timerExpired, waitTime);
                return invokeFunction(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, waitTime);
        }
        return result;
    };

    debounced.cancel = (): void => {
        if (timerId !== undefined) {
            clearTimeout(timerId);
            timerId = undefined;
        }
        lastInvokeTime = 0;
        lastCallTime = -1;
        currentArgs = undefined;
    };

    debounced.flush = (): any => {
        return timerId === undefined ? result : trailingEdge(Date.now());
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

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) {
        return true;
    }

    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
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
