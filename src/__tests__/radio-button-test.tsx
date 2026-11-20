import * as React from 'react';
import RadioButton, {RadioGroup} from '../radio-button';
import {render, screen, within, fireEvent, waitFor} from '@testing-library/react';
import {ButtonPrimary, Form, ThemeContextProvider, Title1} from '..';
import userEvent from '@testing-library/user-event';
import {makeTheme} from './test-utils';
import {DOWN, SPACE, UP} from '../utils/keys';

test('RadioGroup (uncontrolled)', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Title1 id="label">Choose a fruit</Title1>
            <RadioGroup name="radio-group" aria-labelledby="label" defaultValue="banana">
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </ThemeContextProvider>
    );

    const group = screen.getByLabelText('Choose a fruit');

    expect(group).toBeInTheDocument();
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    fireEvent.click(radios[1]);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
});

test('RadioGroup (uncontrolled, no default value)', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Title1 id="label">Choose a fruit</Title1>
            <RadioGroup name="radio-group" aria-labelledby="label">
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </ThemeContextProvider>
    );

    const group = screen.getByLabelText('Choose a fruit');

    expect(group).toBeInTheDocument();
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).not.toBeChecked();

    fireEvent.click(radios[1]);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
});

test('RadioGroup (controlled)', () => {
    const Component = () => {
        const [fruit, setFruit] = React.useState('apple');
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Title1 id="label">Choose a fruit</Title1>
                <RadioGroup name="radio-group" aria-labelledby="label" value={fruit} onChange={setFruit}>
                    <RadioButton value="banana" />
                    <RadioButton value="apple" />
                </RadioGroup>
                <div>you have selected {fruit}</div>
            </ThemeContextProvider>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    expect(screen.getByText('you have selected apple')).toBeInTheDocument();

    const group = screen.getByLabelText('Choose a fruit');
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();

    fireEvent.click(radios[0]);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    expect(screen.getByText('you have selected banana')).toBeInTheDocument();
});

test('RadioGroup (controlled) with a immutable value', () => {
    const spyOnChange = jest.fn();
    const Component = () => {
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Title1 id="label">Choose a fruit</Title1>
                <RadioGroup name="radio-group" aria-labelledby="label" value="banana" onChange={spyOnChange}>
                    <RadioButton value="banana" />
                    <RadioButton value="apple" />
                </RadioGroup>
            </ThemeContextProvider>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const group = screen.getByLabelText('Choose a fruit');
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    fireEvent.click(radios[1]);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    expect(spyOnChange).toHaveBeenCalledWith('apple');
});

test('RadioGroup (disabled)', () => {
    const setFruit = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Title1 id="label">Choose a fruit</Title1>
            <RadioGroup
                disabled
                name="radio-group"
                aria-labelledby="label"
                defaultValue="apple"
                onChange={setFruit}
            >
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </ThemeContextProvider>
    );

    const group = screen.getByLabelText('Choose a fruit');
    const radios = within(group).getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();

    fireEvent.click(radios[0]);

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(setFruit).not.toHaveBeenCalled();
    fireEvent.keyDown(radios[0], {key: SPACE});
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(setFruit).not.toHaveBeenCalled();
    fireEvent.keyDown(radios[1], {key: UP});
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(setFruit).not.toHaveBeenCalled();
    fireEvent.keyDown(radios[1], {key: DOWN});
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(setFruit).not.toHaveBeenCalled();
});

test('Radio custom render', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Title1 id="label">Choose a fruit</Title1>
            <RadioGroup name="radio-group" aria-labelledby="label" defaultValue="banana">
                <RadioButton
                    value="banana"
                    render={({controlElement}) => <div>banana {controlElement}</div>}
                />
                <RadioButton value="apple" render={({controlElement}) => <div>apple {controlElement}</div>} />
            </RadioGroup>
        </ThemeContextProvider>
    );

    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();

    expect(screen.getByRole('radio', {name: 'banana'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).not.toBeChecked();

    fireEvent.click(screen.getByRole('radio', {name: 'apple'}));

    expect(screen.getByRole('radio', {name: 'banana'})).not.toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).toBeChecked();
});

test('form controlled mode', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy} initialValues={{'radio-group': 'apple'}}>
                <RadioGroup name="radio-group" aria-labelledby="label">
                    <RadioButton
                        value="banana"
                        render={({controlElement}) => <div>banana {controlElement}</div>}
                    />
                    <RadioButton
                        value="apple"
                        render={({controlElement}) => <div>apple {controlElement}</div>}
                    />
                </RadioGroup>
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('radio', {name: 'banana'})).not.toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).toBeChecked();

    fireEvent.click(screen.getByRole('radio', {name: 'banana'}));

    expect(screen.getByRole('radio', {name: 'banana'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).not.toBeChecked();

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({'radio-group': 'banana'}, {'radio-group': 'banana'})
    );
});

test('form uncontrolled mode', async () => {
    const handleSubmitSpy = jest.fn();

    const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState('banana');
        return (
            <RadioGroup value={value} onChange={setValue} name="radio-group" aria-labelledby="label">
                <RadioButton
                    value="banana"
                    render={({controlElement}) => <div>banana {controlElement}</div>}
                />
                <RadioButton value="apple" render={({controlElement}) => <div>apple {controlElement}</div>} />
            </RadioGroup>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <ControlledRadioGroup />
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('radio', {name: 'banana'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).not.toBeChecked();

    fireEvent.click(screen.getByRole('radio', {name: 'apple'}));

    expect(screen.getByRole('radio', {name: 'banana'})).not.toBeChecked();
    expect(screen.getByRole('radio', {name: 'apple'})).toBeChecked();

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({'radio-group': 'apple'}, {'radio-group': 'apple'})
    );
});

test('Radio onClick event is not propagated', async () => {
    const onPressHandler = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <button onClick={onPressHandler}>
                <RadioGroup name="radio-group" aria-labelledby="label">
                    <RadioButton value="banana" />
                </RadioGroup>
            </button>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(onPressHandler).not.toHaveBeenCalled();
});

test('Radiogroup with no radio selected gets focus on first radio using TAB navigation', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}}>Focus me first</ButtonPrimary>
            <RadioGroup name="radio-group" aria-labelledby="label">
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </ThemeContextProvider>
    );

    const button = screen.getByRole('button', {name: 'Focus me first'});
    await userEvent.click(button);
    expect(button).toHaveFocus();

    await userEvent.tab();

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveFocus();
});

test('Radiogroup with selected radio gets focus on selected radio using TAB navigation', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}}>Focus me first</ButtonPrimary>
            <RadioGroup name="radio-group" aria-labelledby="label" defaultValue="apple">
                <RadioButton value="banana" />
                <RadioButton value="apple" />
            </RadioGroup>
        </ThemeContextProvider>
    );

    const button = screen.getByRole('button', {name: 'Focus me first'});
    await userEvent.click(button);
    expect(button).toHaveFocus();

    await userEvent.tab();

    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveFocus();
});
