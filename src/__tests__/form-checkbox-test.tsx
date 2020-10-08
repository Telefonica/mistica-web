// @flow
import * as React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import {ButtonPrimary, Form, FormCheckbox} from '..';
import userEvent from '@testing-library/user-event';

test('renders accesible checkbox', () => {
    render(<FormCheckbox name="checkbox" defaultChecked={false} />);

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement).toBeInTheDocument();
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return <FormCheckbox name="checkbox" onChange={setChecked} checked={checked} />;
    };

    render(<Component />);

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', () => {
    render(<FormCheckbox name="checkbox" defaultChecked />);

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(<FormCheckbox name="checkbox" onChange={onChangeSpy} defaultChecked />);

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');

    await waitFor(() => expect(onChangeSpy).toHaveBeenCalledWith(false));
});

test('form controlled mode', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy} initialValues={{checkbox: true}}>
            <FormCheckbox name="checkbox" />
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({checkbox: false}, {checkbox: false}));
});

test('form uncontrolled mode', async () => {
    const handleSubmitSpy = jest.fn();

    const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return <FormCheckbox checked={checked} onChange={setChecked} name="checkbox" />;
    };

    render(
        <Form onSubmit={handleSubmitSpy} initialValues={{switch: true}}>
            <ControlledSwitch />
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({checkbox: true}, {checkbox: true}));
});
