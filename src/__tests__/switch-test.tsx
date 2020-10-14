// @flow
import * as React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import {ButtonPrimary, Form, Switch} from '..';
import userEvent from '@testing-library/user-event';

test('renders accesible switch', () => {
    render(<Switch name="switch" defaultChecked={false} />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return <Switch name="switch" onChange={setChecked} checked={checked} />;
    };

    render(<Component />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', () => {
    render(<Switch name="switch" defaultChecked />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(<Switch name="switch" onChange={onChangeSpy} defaultChecked />);

    const switchElement = screen.getByRole('checkbox');

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

    const switchElement = screen.getByRole('checkbox');

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

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({switch: true}, {switch: true}));
});
