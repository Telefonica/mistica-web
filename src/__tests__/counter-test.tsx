import * as React from 'react';
import {screen, render} from '@testing-library/react';
import {Counter, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

test('Counter starts with min value', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Counter min={3} max={5} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
});

test('Counter with default value', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Counter min={3} max={5} defaultValue={4} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('4')).toBeInTheDocument();

    const increaseButton = screen.getByRole('button', {name: 'Aumentar valor'});
    expect(increaseButton).toBeInTheDocument();

    const decreaseButton = screen.getByRole('button', {name: 'Disminuir valor'});
    expect(decreaseButton).toBeInTheDocument();

    await userEvent.click(increaseButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    await userEvent.click(increaseButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    await userEvent.click(decreaseButton);
    expect(screen.getByText('4')).toBeInTheDocument();
});

test('Counter with controlled value', async () => {
    const CounterWrapper = () => {
        const [value, setValue] = React.useState<number>(3);

        return <Counter min={3} max={5} value={value} onChangeValue={(newValue) => setValue(newValue)} />;
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <CounterWrapper />
        </ThemeContextProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();

    const increaseButton = screen.getByRole('button', {name: 'Aumentar valor'});
    expect(increaseButton).toBeInTheDocument();

    const decreaseButton = screen.getByRole('button', {name: 'Disminuir valor'});
    expect(decreaseButton).toBeInTheDocument();

    await userEvent.click(increaseButton);
    expect(screen.getByText('4')).toBeInTheDocument();

    await userEvent.click(increaseButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    await userEvent.click(decreaseButton);
    expect(screen.getByText('4')).toBeInTheDocument();
});

test('Counter with default value greater than max is updated to max', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Counter min={3} max={5} defaultValue={20} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
});

test('Counter with default value lower than min is updated to min', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Counter min={3} max={5} defaultValue={1} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
});

test('Counter with onRemove has remove button and callback is executed on press', async () => {
    const removeFn = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Counter min={3} max={5} defaultValue={4} onRemove={removeFn} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Disminuir valor'}));

    expect(screen.queryByRole('button', {name: 'Disminuir valor'})).not.toBeInTheDocument();

    const removeButton = screen.getByRole('button', {name: 'Borrar elemento'});
    expect(removeButton).toBeInTheDocument();

    await userEvent.click(removeButton);
    expect(removeFn).toHaveBeenCalled();
});
