import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {ButtonPrimary, Form, Slider, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

test('renders slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider" />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
});

test('uncontrolled slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider" />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 90}});

    expect(slider).toHaveValue('90');
});

test('uncontrolled slider with defaultValue', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider" defaultValue={3} />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('3');

    fireEvent.change(slider, {target: {value: 90}});

    expect(slider).toHaveValue('90');
});

test('controlled slider', () => {
    const SliderWrapper = () => {
        const [value, setValue] = React.useState(0);

        return <Slider name="slider" value={value} onChangeValue={(value) => setValue(value)} />;
    };
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SliderWrapper />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 90}});

    expect(slider).toHaveValue('90');
});

test('disabled slider', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider" disabled />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    expect(slider).toBeDisabled();
});

test('slider with values array', () => {
    const fn = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider" values={[12, 3, 4]} value={3} onChangeValue={fn} />
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, {target: {value: 1}});
    expect(fn).not.toHaveBeenCalled();

    fireEvent.change(slider, {target: {value: 0}});
    expect(fn).toHaveBeenCalledWith(12);
});

test('slider inside form', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy} initialValues={{slider: 0}}>
                <Slider name="slider" />
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, {target: {value: 1}});

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({slider: 1}, {slider: 1}));
});

test('slider is accessible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Slider name="slider1" aria-label="slider1" />

            <label htmlFor="slider2">slider2</label>
            <Slider name="slider2" id="slider2" />

            <div id="slider3">slider3</div>
            <Slider name="slider3" aria-labelledby="slider3" />
        </ThemeContextProvider>
    );

    expect(screen.getByLabelText('slider1')).toBeInTheDocument();
    expect(screen.getByLabelText('slider2')).toBeInTheDocument();
    expect(screen.getByLabelText('slider3')).toBeInTheDocument();
});
