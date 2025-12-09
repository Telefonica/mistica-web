import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, EmailField} from '..';
import {inspect} from 'util';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/EmailField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

interface EmailFieldBaseArgs {
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

const defaultBaseArgs: EmailFieldBaseArgs = {
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
};

interface EmailFieldControlledArgs extends EmailFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<EmailFieldControlledArgs> = ({
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
                    <EmailField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="email"
                        autoComplete="off"
                        dataAttributes={{testid: 'email-field'}}
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
    initialValue: 'aitor.menta@gmail.com',
    ...defaultBaseArgs,
};

interface EmailFieldUncontrolledArgs extends EmailFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<EmailFieldUncontrolledArgs> = ({
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
                    <EmailField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="email"
                        autoComplete="off"
                        dataAttributes={{testid: 'email-field'}}
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
    defaultValue: 'aitor.menta@gmail.com',
    ...defaultBaseArgs,
};
