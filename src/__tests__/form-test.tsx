// @flow
import * as React from 'react';
import {render, act, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form';
import FormTextField from '../form-text-field';
import {ButtonPrimary} from '../button';

test('happy case', async () => {
    const handleSubmitSpy = jest.fn().mockResolvedValue();

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField label="Username" name="username" />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    await act(async () => {
        await userEvent.type(screen.getByLabelText('Username'), 'pepito');
        userEvent.click(screen.getByText('Submit'));
    });

    expect(handleSubmitSpy).toHaveBeenCalledWith({username: 'pepito'}, {username: 'pepito'});
});

test('not submitting if required field is empty', async () => {
    const handleSubmitSpy = jest.fn().mockResolvedValue();

    render(
        <Form onSubmit={handleSubmitSpy}>
            <FormTextField label="Username" name="username" />
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    );

    await act(async () => {
        userEvent.click(screen.getByText('Submit'));
    });

    expect(handleSubmitSpy).not.toHaveBeenCalled();
    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
});

test('custom validator', async () => {
    const handleSubmitSpy = jest.fn().mockResolvedValue();

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
    await act(async () => {
        await userEvent.type(screen.getByLabelText('Password'), '1234');
        userEvent.click(screen.getByText('Submit'));
    });

    expect(handleSubmitSpy).not.toHaveBeenCalled();
    expect(screen.getByText('wrong password')).toBeInTheDocument();

    // validation success
    await act(async () => {
        userEvent.clear(screen.getByLabelText('Password'));
        await userEvent.type(screen.getByLabelText('Password'), 'letmein');
        userEvent.click(screen.getByText('Submit'));
    });

    expect(handleSubmitSpy).toHaveBeenCalledWith({password: 'letmein'}, {password: 'letmein'});
});

test('fields are disabled during submit', async () => {
    let resolveSubmitPromise;
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

    await act(async () => {
        await userEvent.type(screen.getByTestId('username'), 'pepito');
        userEvent.click(screen.getByText('Submit'));
    });

    expect(screen.getByTestId('username')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();

    await act(async () => {
        resolveSubmitPromise();
    });

    expect(screen.getByTestId('username')).not.toBeDisabled();
    expect(screen.getByText('Submit')).not.toBeDisabled();
});
