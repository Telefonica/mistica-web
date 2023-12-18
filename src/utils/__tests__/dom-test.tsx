import {getCssVarValue} from '../dom';

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
