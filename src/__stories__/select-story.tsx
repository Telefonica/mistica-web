import * as React from 'react';
import {fruitEntries} from './helpers';
import {Select} from '..';

export default {
    title: 'Components/Select',
    component: Select,
};

type Args = {
    label: string;
    helperText: string;
    disabled: boolean;
    error: boolean;
    native: boolean;
    optional: boolean;
};

const defaultArgs = {
    label: 'Select a fruit',
    helperText: '',
    disabled: false,
    error: false,
    native: false,
    optional: false,
};

export const Controlled: StoryComponent<Args> = ({label, helperText, disabled, error, native, optional}) => {
    const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
    fruitOptions.push({value: 'longValue', text: 'A very very long text value for this option'});

    const [value, setValue] = React.useState('');

    return (
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
}) => {
    const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
    fruitOptions.push({value: 'longValue', text: 'A very very long text value for this option'});

    return (
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
    );
};

Uncontrolled.storyName = 'uncontrolled';
Uncontrolled.args = defaultArgs;
