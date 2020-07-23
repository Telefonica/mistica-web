import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Form} from '../form';
import {FormTextField} from '../form-text-field';
import {ButtonPrimary} from '../button';

test('happy case', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField label="Username" name="username" />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    await userEvent.type(screen.getByLabelText('Username'), 'pepito');
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({username: 'pepito'}, {username: 'pepito'})
    );
});

test('not submitting if required field is empty', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField label="Username" name="username" />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    expect(screen.queryByText('Este campo es obligatorio')).toBeNull();

    userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
    expect(handleSubmitSpy).not.toHaveBeenCalled();
});

test('custom validator', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField
                label="Password"
                name="password"
                validate={(value) => (value === 'letmein' ? '' : 'wrong password')}
            />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    // validation fail
    await userEvent.type(screen.getByLabelText('Password'), '1234');
    userEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('wrong password')).toBeInTheDocument();
    expect(handleSubmitSpy).not.toHaveBeenCalled();

    // validation success
    userEvent.clear(screen.getByLabelText('Password'));
    await userEvent.type(screen.getByLabelText('Password'), 'letmein');
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({password: 'letmein'}, {password: 'letmein'})
    );
});

test('fields are disabled during submit', async () => {
    let resolveSubmitPromise = () => {};
    const submitPromise = new Promise((r) => {
        resolveSubmitPromise = r;
    });

    const handleSubmitSpy = jest.fn().mockImplementation(() => submitPromise);

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField inputProps={{'data-testid': 'username'}} label="Username" name="username" />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    await userEvent.type(screen.getByTestId('username'), 'pepito');
    userEvent.click(screen.getByText('Submit'));

    expect(screen.getByTestId('username')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();

    resolveSubmitPromise();

    await waitFor(() => {
        expect(screen.getByTestId('username')).not.toBeDisabled();
        expect(screen.getByText('Submit')).not.toBeDisabled();
    });
});
