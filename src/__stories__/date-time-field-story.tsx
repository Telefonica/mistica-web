import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, DateTimeField} from '..';
import {inspect} from './utils';
import {getLocalDateTimeString} from '../utils/time';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/DateTimeField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

interface DateTimeFieldBaseArgs {
    label: string;
    error: boolean;
    variantOutside: Variant;
    optional: boolean;
    showOptionalLabel: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
    min: boolean;
    max: boolean;
}

const defaultBaseArgs: DateTimeFieldBaseArgs = {
    label: 'Label',
    error: false,
    variantOutside: 'default',
    optional: false,
    showOptionalLabel: true,
    disabled: false,
    readOnly: false,
    preventCopy: false,
    min: false,
    max: false,
} as const;

interface DateTimeFieldControlledArgs extends DateTimeFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<DateTimeFieldControlledArgs> = ({
    variantOutside,
    initialValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    const minDate = new Date(Date.now() - 7 * ONE_DAY_IN_MS);
    const maxDate = new Date(Date.now() + 7 * ONE_DAY_IN_MS);

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>
                        ⚠️ Uses browser's native date picker when available. Otherwise renders a React
                        datepicker (eg. Safari Desktop)
                    </Text1>
                </Box>
                <Stack space={16}>
                    <DateTimeField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="datetime"
                        autoComplete="off"
                        dataAttributes={{testid: 'datetime-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalDateTimeString(minDate) : '-'} / max: ${max ? getLocalDateTimeString(maxDate) : '-'}`}
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
    initialValue: '2023-10-06 13:14',
    ...defaultBaseArgs,
};

interface DateTimeFieldUncontrolledArgs extends DateTimeFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<DateTimeFieldUncontrolledArgs> = ({
    variantOutside,
    defaultValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    const minDate = new Date(Date.now() - 7 * ONE_DAY_IN_MS);
    const maxDate = new Date(Date.now() + 7 * ONE_DAY_IN_MS);

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>
                        ⚠️ Uses browser's native date picker when available. Otherwise renders a React
                        datepicker (eg. Safari Desktop)
                    </Text1>
                </Box>
                <Stack space={16}>
                    <DateTimeField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="datetime"
                        autoComplete="off"
                        dataAttributes={{testid: 'datetime-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalDateTimeString(minDate) : '-'} / max: ${max ? getLocalDateTimeString(maxDate) : '-'}`}
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
    defaultValue: '2023-10-06 13:14',
    ...defaultBaseArgs,
};
