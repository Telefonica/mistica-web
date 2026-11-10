import {test, expect} from '@playwright/test';
import {isEqual} from '../utils/helpers';

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
