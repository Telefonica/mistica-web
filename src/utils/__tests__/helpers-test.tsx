import {debounce, isEqual} from '../helpers';

beforeEach(() => {
    jest.useFakeTimers();
});

test('debounce happy case', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000);

    debounced(1);
    jest.advanceTimersByTime(4500);
    debounced(2);
    jest.advanceTimersByTime(4500);
    debounced(3);
    expect(fn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls).toEqual([[3]]);
});

test('debounce with leading', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000, {leading: true});

    debounced(1);
    expect(fn.mock.calls).toEqual([[1]]);

    debounced(2);
    debounced(3);
    expect(fn.mock.calls).toEqual([[1]]);

    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls).toEqual([[1], [3]]);
});

test('debounce with maxWait', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 2500, {maxWait: 3000});

    debounced(1);
    jest.advanceTimersByTime(2000);

    debounced(2);
    debounced(3);
    jest.advanceTimersByTime(2000);
    expect(fn.mock.calls).toEqual([[3]]);

    debounced(4);
    jest.runAllTimers();

    expect(fn.mock.calls).toEqual([[3], [4]]);
});

test('debounce cancel', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000);

    debounced(1);
    debounced(2);
    debounced(3);

    debounced.cancel();

    jest.runAllTimers();

    expect(fn).not.toHaveBeenCalled();
});

test('isEqual happy case', () => {
    const symbol = Symbol('abc');

    const a = {
        n: 123,
        s: 'abc',
        b: true,
        nul: null,
        und: undefined,
        arr: [1, false, null, undefined, new Date(1234567890), {a: 1, b: 2, c: 3}],
        date: new Date(1234567890),
        obj: {a: 1, b: 2, c: 3},
        symbol,
    };

    const b = {
        n: 123,
        s: 'abc',
        b: true,
        nul: null,
        und: undefined,
        arr: [1, false, null, undefined, new Date(1234567890), {a: 1, b: 2, c: 3}],
        date: new Date(1234567890),
        obj: {a: 1, b: 2, c: 3},
        symbol,
    };

    expect(isEqual(a, b)).toBe(true);
});

test('isEqual with different primitives', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('a', 'b')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(Symbol('abc'), Symbol('abc'))).toBe(false);
    expect(isEqual(new Date(1234567890), new Date(1234567891))).toBe(false);
});
