import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, IntegerField} from '..';
import {inspect} from 'util';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/IntegerField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

interface IntegerFieldBaseArgs {
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

const defaultBaseArgs: IntegerFieldBaseArgs = {
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

interface IntegerFieldControlledArgs extends IntegerFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<IntegerFieldControlledArgs> = ({
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
                    <IntegerField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="integer"
                        autoComplete="off"
                        dataAttributes={{testid: 'integer-field'}}
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
    initialValue: '123',
    ...defaultBaseArgs,
};

interface IntegerFieldUncontrolledArgs extends IntegerFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<IntegerFieldUncontrolledArgs> = ({
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
                    <IntegerField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="integer"
                        autoComplete="off"
                        dataAttributes={{testid: 'integer-field'}}
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
    defaultValue: '123',
    ...defaultBaseArgs,
};
