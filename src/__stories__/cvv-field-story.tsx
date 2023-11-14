import * as React from 'react';
import {Box, Text1, Stack, ResponsiveLayout, CvvField} from '..';
import {inspect} from 'util';

export default {
    title: 'Components/Input fields/CvvField',
    parameters: {fullScreen: true},
};

interface CvvFieldBaseArgs {
    label: string;
    placeholder: string;
    helperText: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    disabled: boolean;
    readOnly: boolean;
}

const defaultBaseArgs: CvvFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    helperText: '',
    error: false,
    inverse: false,
    optional: false,
    disabled: false,
    readOnly: false,
};

interface CvvFieldControlledArgs extends CvvFieldBaseArgs {
    initialValue: string;
}

export const Controlled: StoryComponent<CvvFieldControlledArgs> = ({inverse, initialValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="cvv-field-wrapper">
                        <CvvField
                            value={rawValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="cvv"
                            autoComplete="off"
                            data-testid="cvv-field"
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
    initialValue: '1234',
    ...defaultBaseArgs,
};

interface CvvFieldUncontrolledArgs extends CvvFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<CvvFieldUncontrolledArgs> = ({inverse, defaultValue, ...rest}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <div data-testid="cvv-field-wrapper">
                        <CvvField
                            defaultValue={defaultValue}
                            onChange={(e) => setRawValue(e.target.value)}
                            onChangeValue={(value) => setValue(value)}
                            name="cvv"
                            autoComplete="off"
                            data-testid="cvv-field"
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
    defaultValue: '1234',
    ...defaultBaseArgs,
};
