import * as React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ButtonPrimary,
    Form,
    TextField,
    EmailField,
    PasswordField,
    Switch,
    PhoneNumberField,
    DateField,
    DateTimeField,
    Select,
    MonthField,
} from '..';
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

test('validation errors are shown onBlur by default', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={() => {}}>
                <TextField label="Name" name="name" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const nameField = screen.getByLabelText('Name');
    act(() => nameField.focus());
    act(() => nameField.blur());

    expect(await screen.findByText('Este campo es obligatorio')).toBeInTheDocument();
});

test('validation errors are only shown onSubmit if validatieOnBlurInsideForm is false', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={() => {}}>
                <TextField label="Name" name="name" validateOnBlurInsideForm={false} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const nameField = screen.getByLabelText('Name');
    act(() => nameField.focus());
    act(() => nameField.blur());

    expect(screen.queryByText('Este campo es obligatorio')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Este campo es obligatorio')).toBeInTheDocument();
});

test('when there are multiple errors on submit, the fields with error are anounced by screen reader', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <TextField label="Password" name="password" validate={() => 'wrong password'} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    await userEvent.type(screen.getByLabelText('Password'), 'letmein');
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('wrong password')).toBeInTheDocument();
    const liveRegion = screen.getByRole('alert');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveTextContent('Revisa los siguientes errores: Username, Password');
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

test('Disabling a field removes the error state and disabled fields are not submitted', async () => {
    const submitSpy = jest.fn();

    const MyComponent = () => {
        const [isEmailSelected, setIsEmailSelected] = React.useState(true);
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Form onSubmit={submitSpy}>
                    <PhoneNumberField disabled={isEmailSelected} name="phone" label="Phone" />
                    <EmailField disabled={!isEmailSelected} name="email" label="Email" />
                    <Switch
                        name="switch"
                        checked={isEmailSelected}
                        onChange={() => setIsEmailSelected(!isEmailSelected)}
                    />
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Form>
            </ThemeContextProvider>
        );
    };

    render(<MyComponent />);

    const submitButton = await screen.findByRole('button', {name: 'Submit'});
    const emailField = await screen.findByLabelText('Email');
    const phoneField = await screen.findByLabelText('Phone');

    await userEvent.type(emailField, 'bad-email');
    await userEvent.click(submitButton);

    await screen.findByText('Email incorrecto');
    expect(submitSpy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('switch'));
    expect(emailField).toBeDisabled();
    expect(screen.queryByText('Email incorrecto')).not.toBeInTheDocument();

    await userEvent.type(phoneField, '654834455');
    await userEvent.click(submitButton);

    expect(submitSpy).toHaveBeenCalledWith(
        {phone: '654834455', switch: false},
        {phone: '654 83 44 55', switch: false}
    );
});

test.each`
    platform     | type                | expectedFocus
    ${'ios'}     | ${'date'}           | ${false}
    ${'ios'}     | ${'datetime-local'} | ${false}
    ${'ios'}     | ${'month'}          | ${false}
    ${'ios'}     | ${'select'}         | ${false}
    ${'ios'}     | ${'text'}           | ${true}
    ${'android'} | ${'date'}           | ${true}
    ${'android'} | ${'datetime-local'} | ${true}
    ${'android'} | ${'month'}          | ${true}
    ${'android'} | ${'select'}         | ${true}
    ${'android'} | ${'text'}           | ${true}
`('autofocus on error - $platform $type $expectedFocus', async ({platform, type, expectedFocus}) => {
    const FormComponent = () => {
        return (
            <ThemeContextProvider theme={makeTheme({platformOverrides: {platform}})}>
                <Form onSubmit={() => {}}>
                    {type === 'date' && <DateField label="Field" name="field" />}
                    {type === 'datetime-local' && <DateTimeField label="Field" name="field" />}
                    {type === 'month' && <MonthField label="Field" name="field" />}
                    {type === 'select' && (
                        <Select name="field" label="Field" options={[{value: '1', text: '1'}]} />
                    )}
                    {type === 'text' && <TextField label="Field" name="field" />}
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Form>
            </ThemeContextProvider>
        );
    };

    render(<FormComponent />);

    const submitButton = await screen.findByRole('button', {name: 'Submit'});
    await userEvent.click(submitButton);

    const input = await screen.findByLabelText('Field');
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement === input).toBe(expectedFocus);
});
