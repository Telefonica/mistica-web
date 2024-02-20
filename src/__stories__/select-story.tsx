import * as React from 'react';
import {fruitEntries} from './helpers';
import {Box, ResponsiveLayout, Select} from '..';

export default {
    title: 'Components/Select',
    component: Select,
    parameters: {fullScreen: true},
};

type Args = {
    label: string;
    helperText: string;
    disabled: boolean;
    error: boolean;
    native: boolean;
    optional: boolean;
    inverse: boolean;
};

const defaultArgs = {
    label: 'Select a fruit',
    helperText: '',
    disabled: false,
    error: false,
    native: false,
    optional: false,
    inverse: false,
};

export const Controlled: StoryComponent<Args> = ({
    label,
    helperText,
    disabled,
    error,
    native,
    optional,
    inverse,
}) => {
    const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
    fruitOptions.push({value: 'longValue', text: 'A very very long text value for this option'});

    const [value, setValue] = React.useState('');

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <div data-testid="select-field-wrapper" style={{width: 'fit-content'}}>
                    <Select
                        name="select-field"
                        native={native}
                        error={error}
                        disabled={disabled}
                        optional={optional}
                        value={value}
                        onChangeValue={setValue}
                        label={label}
                        helperText={helperText}
                        options={fruitOptions}
                    />
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Controlled.storyName = 'controlled';
Controlled.args = defaultArgs;

export const Uncontrolled: StoryComponent<Args> = ({
    label,
    helperText,
    disabled,
    error,
    native,
    optional,
    inverse,
}) => {
    const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
    fruitOptions.push({value: 'longValue', text: 'A very very long text value for this option'});

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <div data-testid="select-field-wrapper" style={{width: 'fit-content'}}>
                    <Select
                        name="select-field"
                        native={native}
                        error={error}
                        disabled={disabled}
                        optional={optional}
                        label={label}
                        helperText={helperText}
                        options={fruitOptions}
                    />
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = defaultArgs;
