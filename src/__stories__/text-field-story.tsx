import * as React from 'react';
import {PhoneInput, ThemeVariant, useTheme, TextField} from '..';
import Box from '../box';
import {inspect} from 'util';
import Icon from '../icons/icon-visibility';
import {StorySection, countriesList, phoneNumbersList} from './helpers';

export default {
    title: 'Components|Forms/TextField (deprecated)',
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
                <TextField required name="text" label="Normal field" />
            </StorySection>

            <StorySection title="Multiline">
                <TextField required name="text" label="Multiline" multiline />
            </StorySection>

            <StorySection title="Multiline with character limit">
                <TextField
                    required
                    name="text"
                    label="Multiline"
                    multiline
                    maxLength={200}
                    helperText="Helper Text"
                />
            </StorySection>

            <StorySection title="With label">
                <TextField required name="text" label="Label" />
            </StorySection>

            <StorySection title="With label and placeholder">
                <TextField required name="text" label="Label" placeholder="Placeholder" />
            </StorySection>

            <StorySection title="With label and default value">
                <TextField required name="text" label="Label" defaultValue="Default value" />
            </StorySection>

            <StorySection title="With helper text">
                <TextField
                    required
                    name="text"
                    label="Label"
                    defaultValue="Default value"
                    helperText="Helper Text"
                />
            </StorySection>

            <StorySection title="With Error">
                <TextField
                    required
                    name="text"
                    error
                    label="Label"
                    defaultValue="Default value"
                    helperText="I'm a descriptive error"
                />
            </StorySection>

            <StorySection title="With prefix">
                <TextField required name="text" label="Label" defaultValue="Default value" prefix="$" />
            </StorySection>

            <StorySection title="With icon at the end">
                <TextField
                    required
                    name="text"
                    label="Label"
                    defaultValue="Default value"
                    endIcon={<Icon />}
                />
            </StorySection>

            <StorySection title="Disabled">
                <TextField required name="text" disabled label="Disabled" defaultValue="Default value" />
            </StorySection>

            <div style={{backgroundColor: colors.textLink}}>
                <ThemeVariant isInverse>
                    <Box padding={16}>
                        <StorySection title="Inverse with helper text">
                            <TextField
                                required
                                name="text"
                                label="Label"
                                defaultValue="Default value"
                                helperText="Helper Text"
                            />
                        </StorySection>

                        <StorySection title="Inverse with Error">
                            <TextField
                                required
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
        <Uncontrolled title="TextField">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    name="text"
                    label="Text"
                    defaultValue="Some text"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type email">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="email"
                    label="Email"
                    defaultValue="aitor.menta@gmail.com"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type integer">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="integer"
                    label="Integer"
                    defaultValue="123"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type decimal">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="decimal"
                    label="Decimal"
                    defaultValue="123.45"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type credit-card-number">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="credit-card-number"
                    label="Credit card"
                    defaultValue="1234567890123456"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type credit-card-expiration">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="credit-card-expiration"
                    label="Expiration"
                    defaultValue="14/24"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type credit-card-cvv">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="credit-card-cvv"
                    label="CVV"
                    defaultValue="1234"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type password">
            {(handleChange, handleChangeValue) => (
                <form>
                    <TextField
                        required
                        type="password"
                        label="Password"
                        defaultValue="password123"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type date">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="date"
                    label="Date"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type phone">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="phone"
                    label="Phone"
                    defaultValue="654834455"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    Input={PhoneInput}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="TextField type phone (with prefix)">
            {(handleChange, handleChangeValue) => (
                <TextField
                    required
                    type="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    defaultValue="654834455"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    Input={PhoneInput}
                />
            )}
        </Uncontrolled>
    </>
);

TypesUncontrolled.story = {name: 'Types (uncontrolled)'};

export const TypesControlled = (): React.ReactNode => (
    <>
        <Controlled title="TextField" initialValue="Some text">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    name="text"
                    label="Text"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField with suggestions" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
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

        <Controlled title="TextField type email" initialValue="aitor.menta@gmail.com">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type integer" initialValue="123">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="integer"
                    label="Integer"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type decimal" initialValue="123.456">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    type="decimal"
                    value={value}
                    name="decimal"
                    label="Decimal"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type credit-card-number" initialValue="1234567812345678">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="credit-card-number"
                    label="Credit card"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type creadit-card-expiration" initialValue="13/21">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="credit-card-expiration"
                    label="Expiration"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type credit-card-cvv" initialValue="1234">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="credit-card-cvv"
                    label="CVV"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type password" initialValue="password123">
            {(handleChange, handleChangeValue, value) => (
                <form>
                    <TextField
                        required
                        value={value}
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        onChangeValue={handleChangeValue}
                    />
                </form>
            )}
        </Controlled>

        <Controlled title="TextField type password" initialValue="1980-10-06">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="date"
                    label="Date"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="TextField type phone" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="phone"
                    label="Phone"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    Input={PhoneInput}
                />
            )}
        </Controlled>

        <Controlled title="TextField type phone (with suggestions)" initialValue="">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="phone"
                    label="Phone with suggestions"
                    placeholder="Enter phone (start with 6)"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    getSuggestions={getPhoneNumberSuggestions}
                    Input={PhoneInput}
                />
            )}
        </Controlled>

        <Controlled title="TextField type phone (with prefix)" initialValue="654834455">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    required
                    value={value}
                    type="phone"
                    label="Phone with prefix"
                    prefix="+34"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                    Input={PhoneInput}
                />
            )}
        </Controlled>
    </>
);

TypesControlled.story = {name: 'Types (controlled)'};
