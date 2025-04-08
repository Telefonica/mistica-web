import * as React from 'react';
import {TextField, Box, Text1, Stack, ResponsiveLayout} from '..';
import {inspect} from 'util';
import IconMusicRegular from '../generated/mistica-icons/icon-music-regular';
import {countriesList} from './helpers';
import {iconSize} from '../icon-button.css';

export default {
    title: 'Components/Input fields/TextField',
    parameters: {fullScreen: true},
};

const getCountrySuggestions = (value: string) =>
    countriesList
        .filter((s) => String(s).toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);

interface TextFieldBaseArgs {
    label: string;
    placeholder: string;
    helperText: string;
    prefix: string;
    error: boolean;
    inverse: boolean;
    optional: boolean;
    showOptionalLabel: boolean;
    multiline: boolean;
    maxLength: boolean;
    icon: boolean;
    disabled: boolean;
    readOnly: boolean;
    preventCopy: boolean;
}

const defaultBaseArgs: TextFieldBaseArgs = {
    label: 'Label',
    placeholder: '',
    helperText: '',
    prefix: '',
    error: false,
    inverse: false,
    optional: false,
    showOptionalLabel: true,
    multiline: false,
    maxLength: false,
    icon: false,
    disabled: false,
    readOnly: false,
    preventCopy: false,
};

interface TextFieldControlledArgs extends TextFieldBaseArgs {
    initialValue: string;
    suggestions: boolean;
}

export const Controlled: StoryComponent<TextFieldControlledArgs> = ({
    inverse,
    initialValue,
    maxLength,
    icon,
    suggestions,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(initialValue);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <TextField
                        value={rawValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="text"
                        autoComplete="off"
                        dataAttributes={{testid: 'text-field'}}
                        maxLength={maxLength ? 200 : undefined}
                        endIcon={icon ? <IconMusicRegular size={iconSize.default} /> : undefined}
                        getSuggestions={suggestions ? getCountrySuggestions : undefined}
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
    initialValue: 'Some text',
    ...defaultBaseArgs,
    suggestions: false,
};

interface TextFieldUncontrolledArgs extends TextFieldBaseArgs {
    defaultValue: string;
}

export const Uncontrolled: StoryComponent<TextFieldUncontrolledArgs> = ({
    inverse,
    defaultValue,
    maxLength,
    icon,
    ...rest
}) => {
    const [rawValue, setRawValue] = React.useState<any>(undefined);
    const [value, setValue] = React.useState<any>(undefined);

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Stack space={16}>
                    <TextField
                        defaultValue={defaultValue}
                        onChangeValue={(value, rawValue) => {
                            setValue(value);
                            setRawValue(rawValue);
                        }}
                        name="text"
                        autoComplete="off"
                        dataAttributes={{testid: 'text-field'}}
                        maxLength={maxLength ? 200 : undefined}
                        endIcon={icon ? <IconMusicRegular size={iconSize.default} /> : undefined}
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
    defaultValue: 'Some text',
    ...defaultBaseArgs,
};
