import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PhoneNumberField} from '..';
import {inspect} from './utils';
import {phoneNumbersList} from './helpers';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/PhoneNumberField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

const getPhoneNumberSuggestions = (value: string) =>
    phoneNumbersList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

interface PhoneNumberFieldBaseArgs {
    label: string;
    placeholder: string;
    prefix: string;
    helperText: string;
    error: boolean;
    variantOutside: Variant;
    optional: boolean;
    showOptionalLabel: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
    e164: boolean;
}

const defaultBaseArgs: PhoneNumberFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    prefix: '',
    helperText: '',
    error: false,
    variantOutside: 'default',
    optional: false,
    showOptionalLabel: true,
    disabled: false,
    readOnly: false,
    preventCopy: false,
    e164: true,
} as const;

interface PhoneNumberFieldControlledArgs extends PhoneNumberFieldBaseArgs {
    initialValue: string;
    suggestions: boolean;
}

export const Controlled: StoryComponent<PhoneNumberFieldControlledArgs> = ({
    variantOutside,
    initialValue,
    suggestions,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <PhoneNumberField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="phoneNumber"
                        autoComplete="off"
                        dataAttributes={{testid: 'phone-number-field'}}
                        getSuggestions={suggestions ? getPhoneNumberSuggestions : undefined}
                        {...rest}
                    />
                    <Stack space={8}>
                        <Text1 regular>
                            value: {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
                        </Text1>
                        <Text1 regular>
                            rawValue:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = {
    initialValue: '654834455',
    ...defaultBaseArgs,
    suggestions: false,
};

interface PhoneNumberFieldUncontrolledArgs extends PhoneNumberFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<PhoneNumberFieldUncontrolledArgs> = ({
    variantOutside,
    defaultValue,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <PhoneNumberField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="phoneNumber"
                        autoComplete="off"
                        dataAttributes={{testid: 'phone-number-field'}}
                        {...rest}
                    />
                    <Stack space={8}>
                        <Text1 regular>
                            value: {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
                        </Text1>
                        <Text1 regular>
                            rawValue:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = {
    defaultValue: '654834455',
    ...defaultBaseArgs,
};
