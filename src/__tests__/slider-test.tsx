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

test('uncontrolled slider', () => {
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

test('controlled slider', () => {
    const SliderWrapper = () => {
        const [value, setValue] = React.useState(0);

        return <Slider value={value} onChangeValue={(value) => setValue(value)} />;
    };
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SliderWrapper />
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

test('slider with values array', () => {
    const fn = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider values={[12, 3, 4]} value={3} onChangeValue={fn} />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, {target: {value: 1}});
    expect(fn).not.toHaveBeenCalled();

    fireEvent.change(slider, {target: {value: 0}});
    expect(fn).toHaveBeenCalledWith(12);
});
