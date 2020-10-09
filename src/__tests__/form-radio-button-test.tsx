import * as React from 'react';
import FormRadioButton, {FormRadioGroup} from '../form-radio-button';
import SectionTitle from '../section-title';
import {render, screen, within, fireEvent, waitFor} from '@testing-library/react';
import {ButtonPrimary, Form} from '../index';
import userEvent from '@testing-library/user-event';

test('FormRadioGroup (uncontrolled)', () => {
    render(
        <div>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <FormRadioGroup name="radio-group" aria-labelledby="label" defaultValue="banana">
                <FormRadioButton value="banana" />
                <FormRadioButton value="apple" />
            </FormRadioGroup>
        </div>
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

test('FormRadioGroup (controlled)', () => {
    const Component = () => {
        const [fruit, setFruit] = React.useState('apple');
        return (
            <div>
                <SectionTitle id="label">Choose a fruit</SectionTitle>
                <FormRadioGroup name="radio-group" aria-labelledby="label" value={fruit} onChange={setFruit}>
                    <FormRadioButton value="banana" />
                    <FormRadioButton value="apple" />
                </FormRadioGroup>
                <div>you have selected {fruit}</div>
            </div>
        );
    };

    render(<Component />);

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

test('Radio custom render', () => {
    render(
        <div>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <FormRadioGroup name="radio-group" aria-labelledby="label" defaultValue="banana">
                <FormRadioButton value="banana" render={(radio) => <div>banana {radio}</div>} />
                <FormRadioButton value="apple" render={(radio) => <div>apple {radio}</div>} />
            </FormRadioGroup>
        </div>
    );

    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();

    expect(screen.getByText('banana').parentElement).toBeChecked();
    expect(screen.getByText('apple').parentElement).not.toBeChecked();

    fireEvent.click(screen.getByText('apple'));

    expect(screen.getByText('banana').parentElement).not.toBeChecked();
    expect(screen.getByText('apple').parentElement).toBeChecked();
});

test('form controlled mode', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy} initialValues={{'radio-group': 'apple'}}>
            <FormRadioGroup name="radio-group" aria-labelledby="label">
                <FormRadioButton value="banana" render={(radio) => <div>banana {radio}</div>} />
                <FormRadioButton value="apple" render={(radio) => <div>apple {radio}</div>} />
            </FormRadioGroup>
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    expect(screen.getByText('banana').parentElement).not.toBeChecked();
    expect(screen.getByText('apple').parentElement).toBeChecked();

    fireEvent.click(screen.getByText('banana'));

    expect(screen.getByText('banana').parentElement).toBeChecked();
    expect(screen.getByText('apple').parentElement).not.toBeChecked();

    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({'radio-group': 'banana'}, {'radio-group': 'banana'})
    );
});

test('form uncontrolled mode', async () => {
    const handleSubmitSpy = jest.fn();

    const ControlledRadioGroup = () => {
        const [value, setValue] = React.useState('banana');
        return (
            <FormRadioGroup value={value} onChange={setValue} name="radio-group" aria-labelledby="label">
                <FormRadioButton value="banana" render={(radio) => <div>banana {radio}</div>} />
                <FormRadioButton value="apple" render={(radio) => <div>apple {radio}</div>} />
            </FormRadioGroup>
        );
    };

    render(
        <Form onSubmit={handleSubmitSpy}>
            <ControlledRadioGroup />
            <ButtonPrimary submit>done!</ButtonPrimary>
        </Form>
    );

    expect(screen.getByText('banana').parentElement).toBeChecked();
    expect(screen.getByText('apple').parentElement).not.toBeChecked();

    fireEvent.click(screen.getByText('apple'));

    expect(screen.getByText('banana').parentElement).not.toBeChecked();
    expect(screen.getByText('apple').parentElement).toBeChecked();

    userEvent.click(screen.getByRole('button'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({'radio-group': 'apple'}, {'radio-group': 'apple'})
    );
});
