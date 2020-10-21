// @flow
import * as React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import {ButtonPrimary, Form, ThemeContextProvider, Switch} from '..';
import userEvent from '@testing-library/user-event';
import {makeTheme} from './test-utils';

test('renders accesible switch', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch name="switch" defaultChecked={false} />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return <Switch name="switch" onChange={setChecked} checked={checked} />;
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch name="switch" defaultChecked />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Switch name="switch" onChange={onChangeSpy} defaultChecked />
        </ThemeContextProvider>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');

    await waitFor(() => expect(onChangeSpy).toHaveBeenCalledWith(false));
});

test('form controlled mode', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy} initialValues={{switch: true}}>
            <Switch name="switch" />
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({switch: false}, {switch: false}));
});

test('form uncontrolled mode', async () => {
    const handleSubmitSpy = jest.fn();

    const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return <Switch checked={checked} onChange={setChecked} name="switch" />;
    };

    render(
        <Form onSubmit={handleSubmitSpy} initialValues={{switch: true}}>
            <ControlledSwitch />
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({switch: true}, {switch: true}));
});
