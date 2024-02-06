import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PinField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/PinField',
    parameters: {fullScreen: true},
    argTypes: {
        length: {
            control: {type: 'range', min: 1, max: 7, step: 1},
        },
    },
};

interface PinFieldBaseArgs {
    length: number;
    helperText: string;
    error: boolean;
    inverse: boolean;
    disabled: boolean;
    readOnly: boolean;
    hideCode: boolean;
}

const defaultBaseArgs: PinFieldBaseArgs = {
    length: 6,
    helperText: '',
    error: false,
    inverse: false,
    disabled: false,
    readOnly: false,
    hideCode: false,
};

interface PinFieldControlledArgs extends PinFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<PinFieldControlledArgs> = ({inverse, initialValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <PinField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="pin"
                        aria-label={rest.hideCode ? 'PIN' : 'OTP'}
                        dataAttributes={{testid: 'pin-field'}}
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
    initialValue: '',
    ...defaultBaseArgs,
};

interface PinFieldUncontrolledArgs extends PinFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<PinFieldUncontrolledArgs> = ({inverse, defaultValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <PinField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="pin"
                        aria-label={rest.hideCode ? 'PIN' : 'OTP'}
                        dataAttributes={{testid: 'pin-field'}}
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
    defaultValue: '',
    ...defaultBaseArgs,
};
