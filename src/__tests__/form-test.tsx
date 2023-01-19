import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ButtonPrimary, Form, TextField, EmailField, PasswordField} from '..';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('happy case', async () => {
    const handleSubmitSpy: any = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.type(screen.getByLabelText('Username'), 'pepito');
    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({username: 'pepito'}, {username: 'pepito'})
    );
});

test('not submitting if required field is empty', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    expect(screen.queryByText('Este campo es obligatorio')).toBeNull();

    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
    expect(handleSubmitSpy).not.toHaveBeenCalled();
});

test('custom validator', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField
                    label="Password"
                    name="password"
                    validate={(value) => (value === 'letmein' ? '' : 'wrong password')}
                />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    // validation fail
    await userEvent.type(screen.getByLabelText('Password'), '1234');
    await userEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('wrong password')).toBeInTheDocument();
    expect(handleSubmitSpy).not.toHaveBeenCalled();

    // validation success
    await userEvent.clear(screen.getByLabelText('Password'));
    await userEvent.type(screen.getByLabelText('Password'), 'letmein');
    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
        expect(handleSubmitSpy).toHaveBeenCalledWith({password: 'letmein'}, {password: 'letmein'})
    );
});

test('fields are disabled during submit', async () => {
    let resolveSubmitPromise: (value?: unknown) => void = () => {};
    const submitPromise = new Promise((r) => {
        resolveSubmitPromise = r;
    });

    const handleSubmitSpy = jest.fn().mockImplementation(() => submitPromise);

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.type(screen.getByLabelText('Username'), 'pepito');
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByLabelText('Username')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Submit')).not.toBeVisible();

    resolveSubmitPromise();

    await waitFor(() => {
        expect(screen.getByLabelText('Username')).not.toBeDisabled();
        expect(screen.getByText('Submit')).not.toBeDisabled();
    });
});

test('form with defaultValue in field', async () => {
    const handleSubmit = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit}>
                <EmailField label="email" name="email" defaultValue="foo@bar.com" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({email: 'foo@bar.com'}, {email: 'foo@bar.com'});
    });
});

test('form with controlled field', async () => {
    const handleSubmit = jest.fn();

    const MyForm = ({onSubmit}: any) => {
        const [value, setValue] = React.useState('foo');
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Form onSubmit={onSubmit}>
                    <EmailField label="email1" name="email1" value={value} onChangeValue={setValue} />
                    <EmailField label="email2" name="email2" value={value} />
                    <ButtonPrimary submit>Send</ButtonPrimary>
                </Form>
            </ThemeContextProvider>
        );
    };

    render(<MyForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText('email1'), '@bar.com');
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
            {email1: 'foo@bar.com', email2: 'foo@bar.com'},
            {email1: 'foo@bar.com', email2: 'foo@bar.com'}
        );
    });
});

test('defaultValue in Field takes precedence over Form initialValues', async () => {
    const handleSubmit = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit} initialValues={{email: 'foo@bar.com', password: 'password'}}>
                <EmailField optional label="email" name="email" />
                <PasswordField optional label="password" name="password" defaultValue="12345678" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
            {email: 'foo@bar.com', password: '12345678'},
            {email: 'foo@bar.com', password: '12345678'}
        );
    });
});

test("if a Field is disabled we skip its validation and don't submit its value", async () => {
    const handleSubmit = jest.fn();
    const validate = jest.fn().mockReturnValue('errorazo');

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit} initialValues={{email: 'foo@bar.com'}}>
                <EmailField disabled label="email" name="email" validate={validate} />
                <PasswordField label="password" name="password" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.type(screen.getByLabelText('password'), '123456');
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({password: '123456'}, {password: '123456'});
    });
    expect(validate).not.toHaveBeenCalled();
});

test('can listen to form validation errors', async () => {
    const onValidationErrorsSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onValidationErrors={onValidationErrorsSpy} onSubmit={() => {}}>
                <TextField name="name" label="Name" />
                <TextField name="surname" label="Surname" />
                <EmailField name="email" label="Email" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.type(screen.getByLabelText('Name'), 'Pepe');
    await userEvent.type(screen.getByLabelText('Email'), 'invalidemail');
    await userEvent.click(screen.getByText('Submit'));

    expect(onValidationErrorsSpy).toHaveBeenCalledWith({
        email: 'Email incorrecto',
        surname: 'Este campo es obligatorio',
    });
});
