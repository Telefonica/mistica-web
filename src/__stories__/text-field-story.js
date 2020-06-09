// @flow
import * as React from 'react';
import {TextField, PhoneInput, ThemeVariant, useTheme} from '..';
import Stack from '../stack';
import Box from '../box';
import {inspect} from 'util';
import Icon from '../icons/icn-visibility';
import {StorySection, countriesList} from './helpers';

export default {
    title: 'Components|Forms/TextField',
    component: TextField,
};

const Uncontrolled = ({title, children}: any) => {
    const [rawValue, setRawValue] = React.useState(undefined);
    const [value, setValue] = React.useState(undefined);

    const onChange = (e) => setRawValue(e.target.value);
    const onChangeValue = (v) => setValue(v);

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

const Controlled = ({title, initialValue, children}: any) => {
    const [rawValue, setRawValue] = React.useState(initialValue);
    const [value, setValue] = React.useState(undefined);

    const onChange = (e) => setRawValue(e.target.value);
    const onChangeValue = (v) => setValue(v);

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

const getSuggestions = (value) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

export const Variants = (): React.Node => {
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
                <Stack space={32}>
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

export const TypesUncontrolled = (): React.Node => (
    <>
        <Uncontrolled title="Type integer">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="integer"
                    label="Integer"
                    defaultValue="123"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type decimal">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="decimal"
                    label="Decimal"
                    defaultValue="123.45"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type credit card number">
            {(handleChange, handleChangeValue) => (
                <TextField
                    type="credit-card-number"
                    label="Credit card"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Uncontrolled>

        <Uncontrolled title="Type credit card expiration">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="credit-card-expiration"
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

export const TypesControlled = (): React.Node => (
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

        <Controlled title="Type integer" initialValue="123">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="integer"
                    label="Integer"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="Type decimal" initialValue="123.456">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="decimal"
                    label="Decimal"
                    onChange={handleChange}
                    onChangeValue={handleChangeValue}
                />
            )}
        </Controlled>

        <Controlled title="Type credit card" initialValue="1234567812345678">
            {(handleChange, handleChangeValue, value) => (
                <TextField
                    value={value}
                    type="credit-card-number"
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
