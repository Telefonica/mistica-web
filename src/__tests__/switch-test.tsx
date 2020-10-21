// @flow
import * as React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import {Switch, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

test('renders accesible switch', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch defaultChecked={false} />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return <Switch onChange={setChecked} checked={checked} />;
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch defaultChecked />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch onChange={onChangeSpy} defaultChecked />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');

    await waitFor(() => expect(onChangeSpy).toHaveBeenCalledWith(false));
});
