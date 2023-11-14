import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PhoneNumberField} from '..';
import {inspect} from 'util';
import {phoneNumbersList} from './helpers';

export default {
    title: 'Components/Input fields/PhoneNumberField',
    parameters: {fullScreen: true},
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
    inverse: boolean;
    optional: boolean;
    disabled: boolean;
    readOnly: boolean;
    e164: boolean;
}

const defaultBaseArgs: PhoneNumberFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    prefix: '',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    disabled: false,
    readOnly: false,
    e164: true,
};

interface PhoneNumberFieldControlledArgs extends PhoneNumberFieldBaseArgs {
    initialValue: string;
    suggestions: boolean;
}

export const Controlled: StoryComponent<PhoneNumberFieldControlledArgs> = ({
    inverse,
    initialValue,
    suggestions,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="phone-number-field-wrapper">
                        <PhoneNumberField
                            value={rawValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="phoneNumber"
                            autoComplete="off"
                            data-testid="phone-number-field"
                            getSuggestions={suggestions ? getPhoneNumberSuggestions : undefined}
                            {...rest}
                        />
                    </div>
                    <Stack space={8}>
                        <Text1 regular>
                            onChange:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>

                        <Text1 regular>
                            onChangeValue:{' '}
                            {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
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
    inverse,
    defaultValue,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="phone-number-field-wrapper">
                        <PhoneNumberField
                            defaultValue={defaultValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="phoneNumber"
                            autoComplete="off"
                            data-testid="phone-number-field"
                            {...rest}
                        />
                    </div>
                    <Stack space={8}>
                        <Text1 regular>
                            onChange:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>

                        <Text1 regular>
                            onChangeValue:{' '}
                            {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
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
