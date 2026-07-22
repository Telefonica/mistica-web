import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, TimeField} from '..';
import {inspect} from './utils';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/TimeField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

interface TimeFieldBaseArgs {
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

const defaultBaseArgs: TimeFieldBaseArgs = {
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

interface TimeFieldControlledArgs extends TimeFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<TimeFieldControlledArgs> = ({
    variantOutside,
    initialValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    const minTime = '08:00';
    const maxTime = '18:00';

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>⚠️ Uses browser's native time picker when available.</Text1>
                </Box>
                <Stack space={16}>
                    <TimeField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="time"
                        autoComplete="off"
                        dataAttributes={{testid: 'time-field'}}
                        min={min ? minTime : undefined}
                        max={max ? maxTime : undefined}
                        helperText={`min: ${min ? minTime : '-'} / max: ${max ? maxTime : '-'}`}
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
    initialValue: '09:00',
    ...defaultBaseArgs,
};

interface TimeFieldUncontrolledArgs extends TimeFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<TimeFieldUncontrolledArgs> = ({
    variantOutside,
    defaultValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    const minTime = '08:00';
    const maxTime = '18:00';

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>⚠️ Uses browser's native time picker when available.</Text1>
                </Box>
                <Stack space={16}>
                    <TimeField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="time"
                        autoComplete="off"
                        dataAttributes={{testid: 'time-field'}}
                        min={min ? minTime : undefined}
                        max={max ? maxTime : undefined}
                        helperText={`min: ${min ? minTime : '-'} / max: ${max ? maxTime : '-'}`}
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
    defaultValue: '09:00',
    ...defaultBaseArgs,
};
