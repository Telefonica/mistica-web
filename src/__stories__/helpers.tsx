import * as React from 'react';
import TextField from '../text-field';
import Select from '../select';
import {useIsInverseVariant} from '../theme-variant-context';

type Props = {
    title: string;
    children: React.ReactNode;
};

export const StorySection: React.FC<Props> = ({title, children}) => {
    const isInverse = useIsInverseVariant();
    return (
        <div style={{marginBottom: 32}}>
            <h1 style={{color: isInverse ? 'white' : '#888', fontSize: 20, margin: '16px 0px'}}>{title}</h1>
            {children}
        </div>
    );
};

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

export const useCheckbox = (label: string, defaultValue = false): [boolean, React.ReactElement<'label'>] => {
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
    defaultValue = '',
    required = false
): [string, React.ReactNode] => {
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
): [string, React.ReactNode] => {
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
