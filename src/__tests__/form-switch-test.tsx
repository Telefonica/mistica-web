// @flow
import * as React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import {FormSwitch} from '..';

test('renders accesible switch', () => {
    render(<FormSwitch name="switch" defaultChecked={false} />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return <FormSwitch name="switch" onChange={setChecked} checked={checked} />;
    };

    render(<Component />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', () => {
    render(<FormSwitch name="switch" defaultChecked />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(<FormSwitch name="switch" onChange={onChangeSpy} defaultChecked />);

    const switchElement = screen.getByRole('checkbox');

    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(switchElement);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');

    await waitFor(() => expect(onChangeSpy).toHaveBeenCalledWith(false));
});
