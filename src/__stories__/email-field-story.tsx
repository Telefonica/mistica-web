import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, EmailField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/EmailField',
    parameters: {fullScreen: true},
};

interface EmailFieldBaseArgs {
    label: string;
    placeholder: string;
    helperText: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    disabled: boolean;
    readOnly: boolean;
}

const defaultBaseArgs: EmailFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    disabled: false,
    readOnly: false,
};

interface EmailFieldControlledArgs extends EmailFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<EmailFieldControlledArgs> = ({inverse, initialValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="email-field-wrapper">
                        <EmailField
                            value={rawValue}
                            onChangeValue={(value, rawValue) => {
                                setValue(value);
                                setRawValue(rawValue);
                            }}
                            name="email"
                            autoComplete="off"
                            data-testid="email-field"
                            {...rest}
                        />
                    </div>
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
                    <div data-testid="email-field-wrapper">
                        <EmailField
                            defaultValue={defaultValue}
                            onChangeValue={(value, rawValue) => {
                                setValue(value);
                                setRawValue(rawValue);
                            }}
                            name="email"
                            autoComplete="off"
                            data-testid="email-field"
                            {...rest}
                        />
                    </div>
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
