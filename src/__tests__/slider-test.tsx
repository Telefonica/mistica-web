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
    const tooltip = screen.getByText(/90/);

    expect(tooltip).toBeInTheDocument();
    expect(slider).toHaveValue('90');
});

test('change slider value and show on input', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 90}});

    const field = screen.getByRole('textbox');

    expect(field).toHaveValue('90');
});

test('change input value and show on slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field />
        </ThemeContextProvider>
    );

    const field = screen.getByRole('textbox');

    fireEvent.change(field, {target: {value: 90}});

    const slider = screen.getByRole('slider');
    fireEvent.focus(slider);
    const tooltip = screen.getByText(/90/);

    expect(tooltip).toBeInTheDocument();
    expect(slider).toHaveValue('90');
});

test('change input to invalid value and show error message', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field min={20} />
        </ThemeContextProvider>
    );

    const field = screen.getByRole('textbox');

    fireEvent.change(field, {target: {value: 101}});

    const slider = screen.getByRole('slider');

    let text = screen.getByText(/Max: 100/i);
    fireEvent.focus(slider);
    let tooltip = screen.getByText('100');

    expect(tooltip).toBeInTheDocument();
    expect(slider).not.toHaveValue('101');
    expect(slider).toHaveValue('100');
    expect(text).toBeInTheDocument();

    fireEvent.change(field, {target: {value: 0}});

    text = screen.getByText(/Min: 20/i);
    fireEvent.focus(slider);
    tooltip = screen.getByText('20');

    expect(tooltip).toBeInTheDocument();
    expect(slider).not.toHaveValue('0');
    expect(slider).toHaveValue('20');
    expect(text).toBeInTheDocument();
});

test('change slider value with array steps and show on input', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field steps={[0, 8, 12, 16, 24, 40]} />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, {target: {value: 3}});

    const field = screen.getByRole('textbox');
    fireEvent.focus(slider);
    const tooltip = screen.getByText(/16/);

    expect(tooltip).toBeInTheDocument();
    expect(field).toHaveValue('16');
});

test('change input value with array steps and show on slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field steps={[0, 8, 12, 16, 24, 40]} />
        </ThemeContextProvider>
    );

    const field = screen.getByRole('textbox');

    fireEvent.change(field, {target: {value: 16}});

    const slider = screen.getByRole('slider');
    fireEvent.focus(slider);
    const tooltip = screen.getByText(/16/);

    expect(tooltip).toBeInTheDocument();
    expect(slider).toHaveValue('3');
});

test('change input value with invalid value', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field steps={10} invalidText="Invalid" />
        </ThemeContextProvider>
    );

    const field = screen.getByRole('textbox');

    fireEvent.change(field, {target: {value: 16}});

    const slider = screen.getByRole('slider');
    fireEvent.focus(slider);

    const tooltip = screen.getByText(/10/);
    const text = screen.getByText(/invalid/im);

    expect(tooltip).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(slider).toHaveValue('10');
});

test('disabled slider and input', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider field disabled />
        </ThemeContextProvider>
    );

    const field = screen.getByRole('textbox');
    const slider = screen.getByRole('slider');

    expect(field).toBeDisabled();
    expect(slider).toBeDisabled();
});
