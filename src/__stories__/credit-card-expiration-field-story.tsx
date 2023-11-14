import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, CreditCardExpirationField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/CreditCardExpirationField',
    parameters: {fullScreen: true},
};

interface CreditCardExpirationFieldBaseArgs {
    label: string;
    helperText: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    disabled: boolean;
    readOnly: boolean;
}

const defaultBaseArgs: CreditCardExpirationFieldBaseArgs = {
    label: 'Label',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    disabled: false,
    readOnly: false,
};

interface CreditCardExpirationFieldControlledArgs extends CreditCardExpirationFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<CreditCardExpirationFieldControlledArgs> = ({
    inverse,
    initialValue,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="credit-card-expiration-field-wrapper">
                        <CreditCardExpirationField
                            value={rawValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="creditCardExpiration"
                            autoComplete="off"
                            data-testid="credit-card-expiration-field"
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
    initialValue: '13/21',
    ...defaultBaseArgs,
};

interface CreditCardExpirationFieldUncontrolledArgs extends CreditCardExpirationFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<CreditCardExpirationFieldUncontrolledArgs> = ({
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
                    <div data-testid="credit-card-expiration-field-wrapper">
                        <CreditCardExpirationField
                            defaultValue={defaultValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="creditCardExpiration"
                            autoComplete="off"
                            data-testid="credit-card-expiration-field"
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
    defaultValue: '13/21',
    ...defaultBaseArgs,
};
