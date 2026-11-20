import {debounce, isEqual} from '../helpers';

beforeEach(() => {
    jest.useFakeTimers();
});

test('debounce without leading and with trailing', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000);

    debounced(1);
    jest.advanceTimersByTime(4500);
    debounced(2);
    jest.advanceTimersByTime(4500);
    debounced(3);
    expect(fn).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(fn.mock.calls).toEqual([[3]]);
});

test('debounce with leading and trailing', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000, {leading: true});

    debounced(1);
    expect(fn.mock.calls).toEqual([[1]]);

    debounced(2);
    debounced(3);
    expect(fn.mock.calls).toEqual([[1]]);

    jest.runAllTimers();
    expect(fn.mock.calls).toEqual([[1], [3]]);
});

test('debounce with leading and without trailing', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000, {leading: true, trailing: false});

    debounced(1);
    expect(fn.mock.calls).toEqual([[1]]);

    debounced(2);
    debounced(3);
    expect(fn.mock.calls).toEqual([[1]]);

    jest.runAllTimers();
    expect(fn.mock.calls).toEqual([[1]]);
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

test("debounce with leading and maxWait don't gets called twice", () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 2500, {maxWait: 1000, leading: true});

    debounced(1);
    jest.runAllTimers();

    expect(fn.mock.calls).toEqual([[1]]);
});

test('debounce calls the function when maxWait expires', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 1000, {maxWait: 2000});

    debounced(1);
    jest.advanceTimersByTime(500);
    debounced(2);
    jest.advanceTimersByTime(500);
    debounced(3);
    jest.advanceTimersByTime(500);
    debounced(4);
    jest.advanceTimersByTime(500);

    expect(fn.mock.calls).toEqual([[4]]);
    jest.runAllTimers();
    expect(fn.mock.calls).toEqual([[4]]);
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

test('debounce flush', () => {
    const fn = jest.fn().mockImplementation((a) => a);
    const debounced = debounce(fn, 5000);

    debounced(1);
    debounced(2);
    debounced(3);

    debounced.flush();

    jest.runAllTimers();
    expect(fn.mock.calls).toEqual([[3]]);
});

test('isEqual happy case', () => {
    const symbol = Symbol('abc');

    const a = {
        n: 123,
        s: 'abc',
        b: true,
        nan: NaN,
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
        nan: NaN,
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
