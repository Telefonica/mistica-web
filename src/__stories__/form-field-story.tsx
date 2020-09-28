import * as React from 'react';
import {
    ThemeVariant,
    useTheme,
    FormEmailField,
    FormIntegerField,
    FormDecimalField,
    FormCreditCardNumberField,
    FormCreditCardExpirationField,
    FormCvvField,
    FormTextField,
    FormSearchField,
    FormPasswordField,
    FormDateField,
    FormPhoneNumberField,
    Box,
    FormDateTimeField,
    Text7,
} from '..';
import {inspect} from 'util';
import Icon from '../icons/icon-visibility';
import {StorySection, countriesList, phoneNumbersList} from './helpers';

export default {
    title: 'Components|Forms/FormFields',
};

type UncontrolledProps = {
    title: string;
    children: (
        onChange: (e: React.ChangeEvent<any>) => void,
        onChangeValue: (v: any) => void
    ) => React.ReactNode;
};

const Uncontrolled: React.FC<UncontrolledProps> = ({title, children}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    const onChange = (e: React.ChangeEvent<any>) => setRawValue(e.target.value);
    const onChangeValue = (v: any) => setValue(v);

    return (
        <StorySection title={title}>
            {children(onChange, onChangeValue)}
            <div style={{fontSize: 10, marginTop: 16}}>
                onChange: {typeof rawValue === 'undefined' ? '' : `(${typeof rawValue}) ${inspect(rawValue)}`}
            </div>
            <div style={{fontSize: 10, marginTop: 8}}>
                onChangeValue: {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
            </div>
        </StorySection>
    );
};

type ControlledProps = {
    title: string;
    initialValue: string;
    children: (
        onChange: (e: React.ChangeEvent<any>) => void,
        onChangeValue: (v: any) => void,
        value: string
    ) => React.ReactNode;
};

const Controlled: React.FC<ControlledProps> = ({title, initialValue, children}) => {
    const [rawValue, setRawValue] = React.useState(initialValue);
    const [value, setValue] = React.useState(undefined);

    const onChange = (e: React.ChangeEvent<any>) => setRawValue(e.target.value);
    const onChangeValue = (v: any) => setValue(v);

    return (
        <StorySection title={title}>
            {children(onChange, onChangeValue, rawValue)}
            <div style={{fontSize: 10, marginTop: 16}}>
                onChange: {typeof rawValue === 'undefined' ? '' : `(${typeof rawValue}) ${inspect(rawValue)}`}
            </div>
            <div style={{fontSize: 10, marginTop: 8}}>
                onChangeValue: {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
            </div>
        </StorySection>
    );
};

const getCountrySuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

const getPhoneNumberSuggestions = (value: string) =>
    phoneNumbersList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

export const Variants: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <>
            <StorySection title="Default">
                <div data-testid="normal-field">
                    <FormTextField optional name="text" label="Normal field" />
                </div>
            </StorySection>

            <StorySection title="Multiline">
                <FormTextField optional name="text" label="Multiline" multiline />
            </StorySection>

            <StorySection title="Multiline with maxLength">
                <div data-testid="multiline-max-length">
                    <FormTextField
                        name="text"
                        label="Multiline with maxLength"
                        multiline
                        maxLength={200}
                        helperText="Helper Text"
                    />
                </div>
            </StorySection>

            <StorySection title="With label">
                <FormTextField name="text" label="Label" />
            </StorySection>

            <StorySection title="With label and placeholder">
                <FormTextField name="text" label="Label" placeholder="Placeholder" />
            </StorySection>

            <StorySection title="With label and default value">
                <FormTextField name="text" label="Label" defaultValue="Default value" />
            </StorySection>

            <StorySection title="With helper text">
                <FormTextField
                    name="text"
                    label="Label"
                    defaultValue="Default value"
                    helperText="Helper Text"
                />
            </StorySection>

            <StorySection title="With Error">
                <FormTextField
                    name="text"
                    error
                    label="Label"
                    defaultValue="Default value"
                    helperText="I'm a descriptive error"
                />
            </StorySection>

            <StorySection title="With prefix">
                <FormTextField name="text" label="Label" defaultValue="Default value" prefix="$" />
            </StorySection>

            <StorySection title="With icon at the end">
                <FormTextField name="text" label="Label" defaultValue="Default value" endIcon={<Icon />} />
            </StorySection>

            <StorySection title="Disabled">
                <FormTextField name="text" disabled label="Disabled" defaultValue="Default value" />
            </StorySection>

            <div style={{backgroundColor: colors.textLink}}>
                <ThemeVariant isInverse>
                    <Box padding={16}>
                        <StorySection title="Inverse with helper text">
                            <FormTextField
                                name="text"
                                label="Label"
                                defaultValue="Default value"
                                helperText="Helper Text"
                            />
                        </StorySection>

                        <StorySection title="Inverse with Error">
                            <FormTextField
                                name="text"
                                error
                                label="Label"
                                defaultValue="Default value"
                                helperText="I'm a descriptive error"
                            />
                        </StorySection>
                    </Box>
                </ThemeVariant>
            </div>
        </>
    );
};

export const TypesUncontrolled: StoryComponent = () => (
    <>
        <Uncontrolled title="FormTextField">
            {(handleChange, handleChangeValue) => (
                <FormTextField
                    name="text"
                    label="Text"
                    defaultValue="Some text"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormEmailField">
            {(handleChange, handleChangeValue) => (
                <FormEmailField
                    name="email"
                    label="Email"
                    defaultValue="aitor.menta@gmail.com"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormIntegerField">
            {(handleChange, handleChangeValue) => (
                <FormIntegerField
                    name="integer"
                    label="Integer"
                    defaultValue="123"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormDecimalField">
            {(handleChange, handleChangeValue) => (
                <FormDecimalField
                    name="decimal"
                    label="Decimal"
                    defaultValue="123.45"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormCreditCardNumberField">
            {(handleChange, handleChangeValue) => (
                <FormCreditCardNumberField
                    name="credit-card-number"
                    label="Credit card"
                    defaultValue="1234567890123456"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormCreditCardExpirationField">
            {(handleChange, handleChangeValue) => (
                <FormCreditCardExpirationField
                    name="credit-card-expiration"
                    label="Expiration"
                    defaultValue="14/24"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormCvvField">
            {(handleChange, handleChangeValue) => (
                <FormCvvField
                    name="cvv"
                    label="CVV"
                    defaultValue="1234"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormPasswordField">
            {(handleChange, handleChangeValue) => (
                <form>
                    <FormPasswordField
                        name="password"
                        label="Password"
                        defaultValue="password123"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Uncontrolled>

        <Uncontrolled title="FormDateField">
            {(handleChange, handleChangeValue) => (
                <>
                    <Text7 regular>
                        Renders a React picker in browsers that don't implement a Native picker (Safari
                        Desktop)
                    </Text7>
                    <div data-testid="date">
                        <FormDateField
                            name="date"
                            label="Date"
                            onChange={handleChange}
                            onChangeValue={handleChangeValue}
                        />
                    </div>
                </>
            )}
        </Uncontrolled>

        <Uncontrolled title="FormDateTimeField">
            {(handleChange, handleChangeValue) => (
                <>
                    <Text7 regular>
                        Renders a React picker in browsers that don't implement a Native picker (Safari
                        Desktop)
                    </Text7>
                    <div data-testid="datetime">
                        <FormDateTimeField
                            name="datetime"
                            label="DateTime"
                            onChange={handleChange}
                            onChangeValue={handleChangeValue}
                        />
                    </div>
                </>
            )}
        </Uncontrolled>

        <Uncontrolled title="FormPhoneNumberField">
            {(handleChange, handleChangeValue) => (
                <FormPhoneNumberField
                    name="phone"
                    label="Phone"
                    defaultValue="654834455"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormPhoneNumberField (with prefix)">
            {(handleChange, handleChangeValue) => (
                <FormPhoneNumberField
                    name="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    defaultValue="654834455"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="FormSearchField">
            {(handleChange, handleChangeValue) => (
                <FormSearchField
                    name="search"
                    label="Search"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>
    </>
);

TypesUncontrolled.story = {name: 'Types (uncontrolled)'};

export const TypesControlled = (): React.ReactNode => (
    <>
        <Controlled title="FormTextField" initialValue="Some text">
            {(handleChange, handleChangeValue, value) => (
                <FormTextField
                    value={value}
                    name="text"
                    label="Text"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormTextField with suggestions" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <FormTextField
                    autoComplete="off"
                    value={value}
                    name="country"
                    label="Text with suggestions"
                    placeholder="Country name (start with 'A')"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    getSuggestions={getCountrySuggestions}
                />
            )}
        </Controlled>

        <Controlled title="FormEmailField" initialValue="aitor.menta@gmail.com">
            {(handleChange, handleChangeValue, value) => (
                <FormEmailField
                    value={value}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormIntegerField" initialValue="123">
            {(handleChange, handleChangeValue, value) => (
                <FormIntegerField
                    value={value}
                    name="integer"
                    label="Integer"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormDecimalField" initialValue="123.456">
            {(handleChange, handleChangeValue, value) => (
                <FormDecimalField
                    value={value}
                    name="decimal"
                    label="Decimal"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormCreditCardNumberField" initialValue="1234567812345678">
            {(handleChange, handleChangeValue, value) => (
                <FormCreditCardNumberField
                    value={value}
                    name="credit-card-number"
                    label="Credit card"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormCreditCardExpirationField" initialValue="13/21">
            {(handleChange, handleChangeValue, value) => (
                <FormCreditCardExpirationField
                    value={value}
                    name="credit-card-expiration"
                    label="Expiration"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormCvvField" initialValue="1234">
            {(handleChange, handleChangeValue, value) => (
                <FormCvvField
                    value={value}
                    name="cvv"
                    label="CVV"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormPasswordField" initialValue="password123">
            {(handleChange, handleChangeValue, value) => (
                <form>
                    <FormPasswordField
                        name="password"
                        value={value}
                        label="Password"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Controlled>

        <Controlled title="FormDateField" initialValue="1980-10-06">
            {(handleChange, handleChangeValue, value) => (
                <FormDateField
                    value={value}
                    name="date"
                    label="Date"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormDateTimeField" initialValue="1980-10-06T13:14">
            {(handleChange, handleChangeValue, value) => (
                <FormDateTimeField
                    value={value}
                    name="datetime"
                    label="DateTime"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormPhoneNumberField" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <FormPhoneNumberField
                    value={value}
                    name="phone"
                    label="Phone"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormPhoneNumberField (with suggestions)" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <FormPhoneNumberField
                    value={value}
                    name="phone"
                    label="Phone with suggestions"
                    placeholder="Enter phone (start with 6)"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    getSuggestions={getPhoneNumberSuggestions}
                />
            )}
        </Controlled>

        <Controlled title="FormPhoneNumberField (with prefix)" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <FormPhoneNumberField
                    value={value}
                    name="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="FormSearchField" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <div data-testid="search">
                    <FormSearchField
                        name="search"
                        label="Search"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                        value={value}
                    />
                </div>
            )}
        </Controlled>

        <Controlled title="FormSearchField with suggestions" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <FormSearchField
                    autoComplete="off"
                    name="searchCountry"
                    label="Search country"
                    placeholder="Country name (start with 'A')"
                    value={value}
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    getSuggestions={getCountrySuggestions}
                />
            )}
        </Controlled>
    </>
);

TypesControlled.story = {name: 'Types (controlled)'};
