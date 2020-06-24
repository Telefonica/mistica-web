// @flow
import * as React from 'react';
import TextField from '../text-field';
import Select from '../select';

type Props = {
    title: string,
    children: React.Node,
};

export const StorySection = ({title, children}: Props): React.Element<'div'> => (
    <div style={{marginBottom: 32}}>
        <h1 style={{color: '#888', fontSize: 20, margin: '16px 0px'}}>{title}</h1>
        {children}
    </div>
);

export const countriesList = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
];

export const fruitEntries = [
    ['- None -', ''],
    ['Orange', 'orange'],
    ['Apple', 'apple'],
    ['Banana', 'banana'],
    ['Pear', 'pear'],
    ['Lemon', 'lemon'],
];

export const useCheckbox = (
    label: string,
    defaultValue: boolean = false
): [boolean, React.Element<'label'>] => {
    const [isEnabled, setIsEnabled] = React.useState(defaultValue);
    const checkbox = (
        <label style={{margin: 8}}>
            <input type="checkbox" checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} /> {label}
        </label>
    );
    return [isEnabled, checkbox];
};

export const useTextField = (
    label: string,
    defaultValue: string = '',
    required: boolean = false
): [string, React.Node] => {
    const [text, setText] = React.useState(defaultValue);
    const textField = (
        <TextField type="text" label={label} value={text} onChangeValue={setText} required={required} />
    );
    return [text, textField];
};

export const useSelect = (
    label: string,
    defaultValue: string,
    values: Array<string>
): [string, React.Node] => {
    const [value, setValue] = React.useState(defaultValue);
    const select = (
        <Select
            required
            value={value}
            onChangeValue={setValue}
            label={label}
            options={values.map((type) => ({value: type, text: type}))}
        />
    );
    return [value, select];
};
