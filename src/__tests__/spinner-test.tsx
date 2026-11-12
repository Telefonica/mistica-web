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
});

test('spinner with aria-hidden is not visible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Spinner aria-hidden />
        </ThemeContextProvider>
    );

    const spinner = screen.queryByRole('progressbar');

    expect(spinner).not.toBeInTheDocument();
});
