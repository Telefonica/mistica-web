import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {ButtonPrimary, Form, IntegerField, Slider, ThemeContextProvider} from '..';
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

test('slider is reactive to changes in min, max and step props', async () => {
    const handleSubmitSpy = jest.fn();

    const SliderWrapper = () => {
        const [min, setMin] = React.useState(0);
        const [max, setMax] = React.useState(10);
        const [step, setStep] = React.useState(1);

        return (
            <>
                <Slider name="slider" min={min} max={max} step={step} onChangeValue={handleSubmitSpy} />
                <IntegerField
                    label="min"
                    name="min"
                    defaultValue={String(min)}
                    onChangeValue={(value) => {
                        if (value !== '') {
                            setMin(+value);
                        }
                    }}
                />
                <IntegerField
                    label="max"
                    name="max"
                    defaultValue={String(max)}
                    onChangeValue={(value) => {
                        if (value !== '') {
                            setMax(+value);
                        }
                    }}
                />
                <IntegerField
                    label="step"
                    name="step"
                    defaultValue={String(step)}
                    onChangeValue={(value) => {
                        if (value !== '') {
                            setStep(+value);
                        }
                    }}
                />
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SliderWrapper />
        </ThemeContextProvider>
    );

    const clearAndType = async (element: Element, value: string) => {
        await userEvent.clear(element);
        await userEvent.type(element, value);
    };

    const slider = screen.getByRole('slider');
    const minField = await screen.findByLabelText('min');
    const maxField = await screen.findByLabelText('max');
    const stepField = await screen.findByLabelText('step');

    expect(slider).toHaveValue('0');

    await clearAndType(minField, '3');
    expect(slider).toHaveValue('3');
    expect(handleSubmitSpy).toHaveBeenCalledWith(3);

    fireEvent.change(slider, {target: {value: 6}});
    expect(slider).toHaveValue('6');
    expect(handleSubmitSpy).toHaveBeenCalledWith(6);

    await clearAndType(stepField, '2');
    expect(slider).toHaveValue('7');
    expect(handleSubmitSpy).toHaveBeenCalledWith(7);

    await clearAndType(maxField, '6');
    expect(slider).toHaveValue('5');
    expect(handleSubmitSpy).toHaveBeenCalledWith(5);

    await clearAndType(stepField, '1');
    expect(slider).toHaveValue('5');
    // onChangeValue should not have been called here
    expect(handleSubmitSpy).toHaveBeenCalledTimes(4);
});
