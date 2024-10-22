import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PhoneNumberFieldLite, Boxed} from '..';
import {inspect} from 'util';
import {phoneNumbersList} from './helpers';

export default {
    title: 'Components/Input fields/PhoneNumberFieldLite',
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
    preventCopy: boolean;
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
    preventCopy: false,
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
        <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <Boxed>
                        <Box padding={16}>
                            <Stack space={16}>
                                <div>
                                    This is a "light" version of the PhoneNumberField component. It does not
                                    use google's libphonenumber library to reduce bundle size.
                                </div>
                                <Stack space={8}>
                                    <div>- Only supported countries are formatted</div>
                                    <div>- Not all phone number types are formatted</div>
                                    <div>- Numbers in E164 are returned unformatted</div>
                                    <div>
                                        - A custom formatter can be provided via props and the formatter used
                                        by this component is exported as `formatPhoneLite`
                                    </div>
                                </Stack>
                            </Stack>
                        </Box>
                    </Boxed>
                    <PhoneNumberFieldLite
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
                    <PhoneNumberFieldLite
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
