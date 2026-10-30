import * as React from 'react';
import {render, screen} from '@testing-library/react';

/**
 * A federated remote that does not share @telefonica/mistica/icon-runtime evaluates the context
 * modules a second time, but it shares react. Each isolated registry below plays one of those copies.
 */
const loadIsolatedCopy = <T,>(modulePath: string): T => {
    let loadedModule: T | undefined;
    jest.isolateModules(() => {
        jest.doMock('react', () => React);
        loadedModule = require(modulePath);
    });
    return loadedModule as T;
};

test('two copies of the theme context module share one context', () => {
    const first = loadIsolatedCopy<typeof import('../../theme-context')>('../../theme-context');
    const second = loadIsolatedCopy<typeof import('../../theme-context')>('../../theme-context');

    expect(second.default).toBe(first.default);
});

test('two copies of the theme variant module read one provider', () => {
    const first = loadIsolatedCopy<typeof import('../../theme-variant-context')>(
        '../../theme-variant-context'
    );
    const second = loadIsolatedCopy<typeof import('../../theme-variant-context')>(
        '../../theme-variant-context'
    );

    const VariantName = () => <span>{second.useThemeVariant()}</span>;

    render(
        <first.ThemeVariant variant="brand">
            <VariantName />
        </first.ThemeVariant>
    );

    expect(screen.getByText('brand')).toBeInTheDocument();
});

test('different contexts keep their own identity', () => {
    const themeContext = loadIsolatedCopy<typeof import('../../theme-context')>('../../theme-context');
    const {getSharedContext} = loadIsolatedCopy<typeof import('../shared-context')>('../shared-context');

    expect(getSharedContext('another-context', null)).not.toBe(themeContext.default);
});
