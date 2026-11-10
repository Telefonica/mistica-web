import * as React from 'react';
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
    TimeField,
    Select,
    MonthField,
} from '..';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';

export const Scenario1 = ({
    handleSubmitSpy,
}: {
    handleSubmitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario2 = ({
    handleSubmitSpy,
}: {
    handleSubmitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario3 = ({
    handleSubmitSpy,
}: {
    handleSubmitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
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
};
export const Scenario4 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={() => {}}>
                <TextField label="Name" name="name" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario5 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={() => {}}>
                <TextField label="Name" name="name" validateOnBlurInsideForm={false} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario6 = ({
    handleSubmitSpy,
}: {
    handleSubmitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <TextField label="Password" name="password" validate={() => 'wrong password'} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario7 = ({
    handleSubmitSpy,
}: {
    handleSubmitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy}>
                <TextField label="Username" name="username" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario8 = ({
    handleSubmit,
}: {
    handleSubmit: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit}>
                <EmailField label="email" name="email" defaultValue="foo@bar.com" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario9 = ({
    handleSubmit,
}: {
    handleSubmit: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
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
    return <MyForm onSubmit={handleSubmit} />;
};
export const Scenario10 = ({
    handleSubmit,
}: {
    handleSubmit: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit} initialValues={{email: 'foo@bar.com', password: 'password'}}>
                <EmailField optional label="email" name="email" />
                <PasswordField optional label="password" name="password" defaultValue="12345678" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario11 = ({
    handleSubmit,
    onValidate,
}: {
    handleSubmit: (...args: Array<unknown>) => void | Promise<void>;
    onValidate: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    const validate = () => {
        onValidate();
        return 'errorazo';
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmit} initialValues={{email: 'foo@bar.com'}}>
                <EmailField disabled label="email" name="email" validate={validate} />
                <PasswordField label="password" name="password" />
                <ButtonPrimary submit>Send</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario12 = ({
    onValidationErrorsSpy,
}: {
    onValidationErrorsSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onValidationErrors={onValidationErrorsSpy} onSubmit={() => {}}>
                <TextField name="name" label="Name" />
                <TextField name="surname" label="Surname" />
                <EmailField name="email" label="Email" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario13 = ({
    submitSpy,
}: {
    submitSpy: (...args: Array<unknown>) => void | Promise<void>;
}): JSX.Element => {
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
    return <MyComponent />;
};
export const Autofocus = ({platform, type}: {platform: 'ios' | 'android'; type: string}): JSX.Element => (
    <ThemeContextProvider theme={makeTheme({platformOverrides: {platform}})}>
        <Form onSubmit={() => {}}>
            {type === 'date' && <DateField label="Field" name="field" />}
            {type === 'datetime-local' && <DateTimeField label="Field" name="field" />}
            {type === 'time' && <TimeField label="Field" name="field" />}
            {type === 'month' && <MonthField label="Field" name="field" />}
            {type === 'select' && <Select name="field" label="Field" options={[{value: '1', text: '1'}]} />}
            {type === 'text' && <TextField label="Field" name="field" />}
            <ButtonPrimary submit>Submit</ButtonPrimary>
        </Form>
    </ThemeContextProvider>
);
