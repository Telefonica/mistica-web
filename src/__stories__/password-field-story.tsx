import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PasswordField} from '..';
import {inspect} from './utils';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/PasswordField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

interface PasswordFieldBaseArgs {
    label: string;
    placeholder: string;
    helperText: string;
    error: boolean;
    variantOutside: Variant;
    optional: boolean;
    showOptionalLabel: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
}

const defaultBaseArgs: PasswordFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    helperText: '',
    error: false,
    variantOutside: 'default',
    optional: false,
    showOptionalLabel: true,
    disabled: false,
    readOnly: false,
    preventCopy: false,
} as const;

interface PasswordFieldControlledArgs extends PasswordFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<PasswordFieldControlledArgs> = ({
    variantOutside,
    initialValue,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <PasswordField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="password"
                        autoComplete="off"
                        dataAttributes={{testid: 'password-field'}}
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
    initialValue: 'password123',
    ...defaultBaseArgs,
};

interface PasswordFieldUncontrolledArgs extends PasswordFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<PasswordFieldUncontrolledArgs> = ({
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
                    <PasswordField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="password"
                        autoComplete="off"
                        dataAttributes={{testid: 'password-field'}}
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
    defaultValue: 'password123',
    ...defaultBaseArgs,
};
