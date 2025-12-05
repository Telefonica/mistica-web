import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, MonthField} from '..';
import {inspect} from './utils';
import {getLocalYearMonthString} from '../utils/time';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Input fields/MonthField',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

const ONE_MONTH_IN_MS = 31 * 24 * 60 * 60 * 1000;

interface MonthFieldBaseArgs {
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

const defaultBaseArgs: MonthFieldBaseArgs = {
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

interface MonthFieldControlledArgs extends MonthFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<MonthFieldControlledArgs> = ({
    variantOutside,
    initialValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    const minDate = new Date(Date.now() - 4 * ONE_MONTH_IN_MS);
    const maxDate = new Date(Date.now() + 4 * ONE_MONTH_IN_MS);

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
                    <MonthField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="month"
                        autoComplete="off"
                        dataAttributes={{testid: 'month-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalYearMonthString(minDate) : '-'} / max: ${max ? getLocalYearMonthString(maxDate) : '-'}`}
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
    initialValue: '2023-10',
    ...defaultBaseArgs,
};

interface MonthFieldUncontrolledArgs extends MonthFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<MonthFieldUncontrolledArgs> = ({
    variantOutside,
    defaultValue,
    min,
    max,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    const minDate = new Date(Date.now() - 4 * ONE_MONTH_IN_MS);
    const maxDate = new Date(Date.now() + 4 * ONE_MONTH_IN_MS);

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
                    <MonthField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="month"
                        autoComplete="off"
                        dataAttributes={{testid: 'month-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalYearMonthString(minDate) : '-'} / max: ${max ? getLocalYearMonthString(maxDate) : '-'}`}
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
    defaultValue: '2023-10',
    ...defaultBaseArgs,
};
