import * as React from 'react';
import {Spinner} from '..';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('spinner is accessible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Spinner />
        </ThemeContextProvider>
    );

    const spinner = screen.getByRole('progressbar', {name: 'Cargando'});

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-busy');
});

test('spinner with role presentation is accessible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Spinner rolePresentation />
        </ThemeContextProvider>
    );

    const spinner = screen.getByRole('progressbar');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-busy');
});
