import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Chip from '../chip';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('Chip can be closed', () => {
    const closeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onClose={closeSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const closeButton = screen.getByRole('button', {name: 'Cerrar'});

    userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('Chip can work as a controlled checkbox', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return (
            <Chip checked={checked} onChange={setChecked}>
                some text
            </Chip>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const chip = screen.getByRole('checkbox');

    expect(chip).not.toBeChecked();
    userEvent.click(chip);
    expect(chip).toBeChecked();
    userEvent.click(chip);
    expect(chip).not.toBeChecked();
});

test('Chip can work as an uncontrolled checkbox', () => {
    const onChangeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onChange={onChangeSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const chip = screen.getByRole('checkbox');

    expect(chip).not.toBeChecked();
    userEvent.click(chip);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(chip).toBeChecked();
    userEvent.click(chip);
    expect(onChangeSpy).toHaveBeenCalledWith(false);
    expect(chip).not.toBeChecked();
});
