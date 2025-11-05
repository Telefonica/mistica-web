import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, DateField} from '..';
import {inspect} from 'util';
import {getLocalDateString} from '../utils/time';

export default {
    title: 'Components/Input fields/DateField',
    parameters: {fullScreen: true},
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

interface DateFieldBaseArgs {
    label: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    showOptionalLabel: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
    min: boolean;
    max: boolean;
}

const defaultBaseArgs: DateFieldBaseArgs = {
    label: 'Label',
    error: false,
    inverse: false,
    optional: false,
    showOptionalLabel: true,
    disabled: false,
    readOnly: false,
    preventCopy: false,
    min: false,
    max: false,
};

interface DateFieldControlledArgs extends DateFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<DateFieldControlledArgs> = ({
    inverse,
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
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>
                        ⚠️ Uses browser's native date picker when available. Otherwise renders a React
                        datepicker (eg. Safari Desktop)
                    </Text1>
                </Box>
                <Stack space={16}>
                    <DateField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="date"
                        autoComplete="off"
                        dataAttributes={{testid: 'date-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalDateString(minDate) : '-'} / max: ${max ? getLocalDateString(maxDate) : '-'}`}
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
    initialValue: '2023-10-06',
    ...defaultBaseArgs,
};

interface DateFieldUncontrolledArgs extends DateFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<DateFieldUncontrolledArgs> = ({
    inverse,
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
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Box paddingBottom={8}>
                    <Text1 regular>
                        ⚠️ Uses browser's native date picker when available. Otherwise renders a React
                        datepicker (eg. Safari Desktop)
                    </Text1>
                </Box>
                <Stack space={16}>
                    <DateField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="date"
                        autoComplete="off"
                        dataAttributes={{testid: 'date-field'}}
                        min={min ? minDate : undefined}
                        max={max ? maxDate : undefined}
                        helperText={`min: ${min ? getLocalDateString(minDate) : '-'} / max: ${max ? getLocalDateString(maxDate) : '-'}`}
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
    defaultValue: '2023-10-06',
    ...defaultBaseArgs,
};
