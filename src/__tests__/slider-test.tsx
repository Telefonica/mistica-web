import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Slider, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

test('renders slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
});

test('change slider value', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 90}});

    fireEvent.focus(slider);
    expect(slider).toHaveValue('90');
});

test('disabled slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider disabled />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    expect(slider).toBeDisabled();
});
