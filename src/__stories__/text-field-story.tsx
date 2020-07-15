import * as React from 'react';
import {TextField, PhoneInput, ThemeVariant, useTheme} from '..';
import Stack from '../stack';
import Box from '../box';
import {inspect} from 'util';
import Icon from '../icons/icon-visibility';
import {StorySection, countriesList} from './helpers';
import FormEmailField from '../form-email-field';
import FormIntegerField from '../form-integer-field';
import FormDecimalField from '../form-decimal-field';
import FormCreditCardNumberField from '../form-credit-card-number-field';

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

const getSuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

export const Variants: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <>
            <StorySection title="Default">
                <TextField label="Normal field" />
            </StorySection>

            <StorySection title="Multiline with character limit">
                <TextField label="Multiline" multiline maxLength={200} />
            </StorySection>

            <StorySection title="Multiline">
                <Stack space={16}>
                    <TextField label="Multiline" multiline />
                    <TextField label="Multiline" multiline />
                </Stack>
            </StorySection>

            <StorySection title="With label">
                <TextField label="Label" />
            </StorySection>

            <StorySection title="With label and placeholder">
                <TextField label="Label" placeholder="Placeholder" />
            </StorySection>

            <StorySection title="With label and default value">
                <TextField label="Label" defaultValue="Default value" />
            </StorySection>

            <StorySection title="With helper text">
                <TextField label="Label" defaultValue="Default value" helperText="Helper Text" />
            </StorySection>

            <StorySection title="With Error">
                <TextField
                    error
                    label="Label"
                    defaultValue="Default value"
                    helperText="I'm a descriptive error"
                />
            </StorySection>

            <StorySection title="With prefix">
                <TextField label="Label" defaultValue="Default value" prefix="$" />
            </StorySection>

            <StorySection title="With icon at the end">
                <TextField label="Label" defaultValue="Default value" endIcon={<Icon />} />
            </StorySection>

            <StorySection title="Disabled">
                <TextField disabled label="Disabled" defaultValue="Default value" />
            </StorySection>

            <div style={{backgroundColor: colors.textLink}}>
                <ThemeVariant isInverse>
                    <Box padding={16}>
                        <StorySection title="Inverse with helper text">
                            <TextField label="Label" defaultValue="Default value" helperText="Helper Text" />
                        </StorySection>

                        <StorySection title="Inverse with Error">
                            <TextField
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

        <Uncontrolled title="Type credit card expiration">
            {(handleChange, handleChangeValue) => (
                <FormCreditCardExpirationField
                    name="credit-card-expiration"
                    label="Expiration"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type password">
            {(handleChange, handleChangeValue) => (
                <form>
                    <TextField
                        type="password"
                        label="Password"
                        defaultValue="password123"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Uncontrolled>

        <Uncontrolled title="Type date">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="date"
                    label="Date"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type phone">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="phone"
                    label="Phone"
                    defaultValue="654834455"
                    Input={PhoneInput}
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type phone (with prefix)">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    defaultValue="654834455"
                    Input={PhoneInput}
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
        <Controlled title="Type text + autocomplete" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    label="Text with autocomplete"
                    placeholder="Country name (start with 'A')"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    getSuggestions={getSuggestions}
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

        <Controlled title="Type credit card expiration" initialValue="13/21">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="credit-card-expiration"
                    label="Expiration"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="Type password" initialValue="password123">
            {(handleChange, handleChangeValue, value) => (
                <form>
                    <TextField
                        value={value}
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Controlled>

        <Controlled title="Type date" initialValue="1980-10-06">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="date"
                    label="Date"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="Type phone" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="phone"
                    label="Phone"
                    Input={PhoneInput}
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="Type phone (with prefix)" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    Input={PhoneInput}
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>
    </>
);

TypesControlled.story = {name: 'Types (controlled)'};
