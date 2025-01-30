import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Chip from '../chip';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('Chip can be closed', async () => {
    const closeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onClose={closeSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const closeButton = screen.getByRole('button', {name: 'Cerrar'});

    await userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('Chip can be closed when using custom close label', async () => {
    const closeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onClose={closeSpy} closeButtonLabel="custom close label">
                some text
            </Chip>
        </ThemeContextProvider>
    );

    const closeButton = screen.getByRole('button', {name: 'custom close label'});

    await userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('Chip can be clicked', async () => {
    const clickSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onPress={clickSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const chip = screen.getByText('some text');

    await userEvent.click(chip);

    expect(clickSpy).toHaveBeenCalledTimes(1);
});

test('Chip with href calls onNavigate', async () => {
    const onNavigate = jest.fn();

    Object.defineProperty(window, 'location', {
        writable: true,
        value: {assign: jest.fn()},
    });

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip href="https://example.com" onNavigate={onNavigate}>
                some text
            </Chip>
        </ThemeContextProvider>
    );

    const chip = screen.getByText('some text');
    expect(chip.closest('a')).toHaveAttribute('href', 'https://example.com');

    await userEvent.click(chip);

    expect(onNavigate).toHaveBeenCalledTimes(1);
});
