import {getCssVarValue, getPrefixedDataAttributes} from '../dom';

test('getCssVarValue', () => {
    document.documentElement.style.setProperty('--color-primary', '#FABADA');

    expect(getCssVarValue('--color-primary')).toBe('#FABADA');
    expect(getCssVarValue('var(--color-primary)')).toBe('#FABADA');
    expect(getCssVarValue('var(--non-defined)')).toBe('');
    expect(getCssVarValue('var(--non-defined, #00FFFF)')).toBe('#00FFFF');
    expect(getCssVarValue('var(--non-defined, var(--color-primary))')).toBe('#FABADA');
    expect(getCssVarValue('var(--non-defined, var(--non-defined, #00FFFF))')).toBe('#00FFFF');

    expect(() => getCssVarValue('non-css-var')).toThrow();
});

test('getCssVarValue of element', () => {
    document.documentElement.style.setProperty('--color-primary', '#FABADA');
    const div = document.createElement('div');
    div.style.setProperty('--color-primary', '#ABACAD');

    expect(getCssVarValue('--color-primary', div)).toBe('#ABACAD');
    expect(getCssVarValue('var(--color-primary)', div)).toBe('#ABACAD');
});

test('getPrefixedDataAttributes with testid', () => {
    const result = getPrefixedDataAttributes({testid: 'TestComponent'});
    expect(result).toEqual({'data-testid': 'TestComponent'});
});

test('getPrefixedDataAttributes with empty attrs', () => {
    const result = getPrefixedDataAttributes();
    expect(result).toEqual({});
});

test('getPrefixedDataAttributes with custom attributes', () => {
    const result = getPrefixedDataAttributes({
        testid: 'MyTest',
        foo: 'bar',
        count: 42,
        enabled: true,
    });
    expect(result).toEqual({
        'data-testid': 'MyTest',
        'data-foo': 'bar',
        'data-count': 42,
        'data-enabled': true,
    });
});

test('getPrefixedDataAttributes with testid and other attrs', () => {
    const result = getPrefixedDataAttributes({testid: 'AttrTest', foo: 'baz'});
    expect(result).toEqual({
        'data-testid': 'AttrTest',
        'data-foo': 'baz',
    });
});

test('getPrefixedDataAttributes with undefined values', () => {
    const result = getPrefixedDataAttributes({
        testid: 'Test',
        empty: undefined,
        noValue: undefined,
    });
    expect(result).toEqual({
        'data-testid': 'Test',
        'data-empty': undefined,
        'data-noValue': undefined,
    });
});
