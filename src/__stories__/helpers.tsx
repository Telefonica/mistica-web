import * as React from 'react';
import {useIsInverseOrMediaVariant, Select, TextField, Checkbox, skinVars} from '..';
import {isRunningAcceptanceTest} from '../utils/platform';

type Props = {
    title: string;
    children: React.ReactNode;
};

export const StorySection = ({title, children}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    return (
        <div style={{marginBottom: 32}}>
            <h1
                style={{
                    color: isInverse ? skinVars.colors.textSecondaryInverse : skinVars.colors.textSecondary,
                    fontWeight: 'normal',
                    fontSize: 20,
                    margin: '16px 0px',
                }}
            >
                {title}
            </h1>
            {children}
        </div>
    );
};

export const DeprecationWarning = (): JSX.Element => (
    <div
        style={{
            padding: 12,
            fontSize: 20,
            margin: '32px 0',
            color: 'white',
            background: 'red',
        }}
    >
        ⚠️ This component is deprecated and will be removed in the next major Mística release
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

export const phoneNumbersList = [
    '600 00 00 00',
    '611 11 11 11',
    '622 22 22 22',
    '633 33 33 33',
    '644 44 44 44',
    '655 55 55 55',
    '666 66 66 66',
    '677 77 77 77',
    '688 88 88 88',
    '699 99 99 99',
];

export const fruitEntries = [
    ['Orange', 'orange'],
    ['Apple', 'apple'],
    ['Banana', 'banana'],
    ['Pear', 'pear'],
    ['Lemon', 'lemon'],
    ['Pineapple', 'pineapple'],
    ['Strawberry', 'strawberry'],
    ['Watermelon', 'watermelon'],
    ['Grapes', 'grapes'],
    ['Mango', 'mango'],
    ['Peach', 'peach'],
    ['Cherry', 'cherry'],
    ['Raspberry', 'raspberry'],
    ['Blueberry', 'blueberry'],
    ['Kiwi', 'kiwi'],
    ['Pomegranate', 'pomegranate'],
    ['Papaya', 'papaya'],
    ['Coconut', 'coconut'],
    ['Avocado', 'avocado'],
    ['Cantaloupe', 'cantaloupe'],
    ['Mandarin', 'mandarin'],
    ['Melon', 'melon'],
    ['Tangerine', 'tangerine'],
    ['Tomato', 'tomato'],
];

export const useCheckbox = (
    label: string,
    defaultValue = false
): [boolean, React.ReactElement<any, typeof Checkbox>] => {
    const [isEnabled, setIsEnabled] = React.useState(defaultValue);
    const id = React.useId();
    const checkbox = (
        <Checkbox name={'checkbox-' + id} checked={isEnabled} onChange={setIsEnabled}>
            {label}
        </Checkbox>
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
        <TextField name={label} label={label} value={text} onChangeValue={setText} optional={!required} />
    );
    return [text, textField];
};

export const useSelect = (
    label: string,
    defaultValue: string,
    values: Array<string>
): [string, React.ReactNode] => {
    const [value, setValue] = React.useState(defaultValue);
    const id = React.useId();
    const select = (
        <Select
            name={id}
            value={value}
            onChangeValue={setValue}
            label={label}
            options={values.map((type) => ({value: type, text: type}))}
            native={isRunningAcceptanceTest()}
        />
    );
    return [value, select];
};
