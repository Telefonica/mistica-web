import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, PasswordField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/PasswordField',
    parameters: {fullScreen: true},
};

interface PasswordFieldBaseArgs {
    label: string;
    placeholder: string;
    helperText: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    disabled: boolean;
    readOnly: boolean;
}

const defaultBaseArgs: PasswordFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    disabled: false,
    readOnly: false,
};

interface PasswordFieldControlledArgs extends PasswordFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<PasswordFieldControlledArgs> = ({inverse, initialValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="password-field-wrapper">
                        <PasswordField
                            value={rawValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="password"
                            autoComplete="off"
                            data-testid="password-field"
                            {...rest}
                        />
                    </div>
                    <Stack space={8}>
                        <Text1 regular>
                            onChange:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>

                        <Text1 regular>
                            onChangeValue:{' '}
                            {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
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
                    <div data-testid="password-field-wrapper">
                        <PasswordField
                            defaultValue={defaultValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="password"
                            autoComplete="off"
                            data-testid="password-field"
                            {...rest}
                        />
                    </div>
                    <Stack space={8}>
                        <Text1 regular>
                            onChange:{' '}
                            {typeof rawValue === 'undefined'
                                ? ''
                                : `(${typeof rawValue}) ${inspect(rawValue)}`}
                        </Text1>

                        <Text1 regular>
                            onChangeValue:{' '}
                            {typeof value === 'undefined' ? '' : `(${typeof value}) ${inspect(value)}`}
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
