import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, CreditCardExpirationField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/CreditCardExpirationField',
    parameters: {fullScreen: true},
};

interface CreditCardExpirationFieldBaseArgs {
    label: string;
    helperText: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    showOptionalLabel: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
}

const defaultBaseArgs: CreditCardExpirationFieldBaseArgs = {
    label: 'Label',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    showOptionalLabel: true,
    disabled: false,
    readOnly: false,
    preventCopy: false,
};

interface CreditCardExpirationFieldControlledArgs extends CreditCardExpirationFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<CreditCardExpirationFieldControlledArgs> = ({
    inverse,
    initialValue,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <CreditCardExpirationField
                        value={rawValue}
                        onChangeValue={(value) => {
                            setValue(value);
                            setRawValue(value.raw);
                        }}
                        name="creditCardExpiration"
                        autoComplete="off"
                        dataAttributes={{testid: 'credit-card-expiration-field'}}
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
    initialValue: '12/21',
    ...defaultBaseArgs,
};

interface CreditCardExpirationFieldUncontrolledArgs extends CreditCardExpirationFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<CreditCardExpirationFieldUncontrolledArgs> = ({
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
                    <CreditCardExpirationField
                        defaultValue={defaultValue}
                        onChangeValue={(value) => {
                            setValue(value);
                            setRawValue(value.raw);
                        }}
                        name="creditCardExpiration"
                        autoComplete="off"
                        dataAttributes={{testid: 'credit-card-expiration-field'}}
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
    defaultValue: '12/21',
    ...defaultBaseArgs,
};
