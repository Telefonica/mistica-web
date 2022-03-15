import * as React from 'react';
import {useAriaId, useIsInverseVariant, Select, TextField, Checkbox} from '..';
import {isRunningAcceptanceTest} from '../utils/platform';

type Props = {
    title: string;
    children: React.ReactNode;
    id?: string;
};

export const StorySection: React.FC<Props> = ({title, children, id}) => {
    const isInverse = useIsInverseVariant();
    return (
        <div style={{marginBottom: 32}}>
            <h1
                id={id}
                style={{
                    color: isInverse ? 'white' : '#888',
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

export const DeprecationWarning: React.FC = () => (
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
];

export const useCheckbox = (
    label: string,
    defaultValue = false
): [boolean, React.ReactElement<any, typeof Checkbox>] => {
    const [isEnabled, setIsEnabled] = React.useState(defaultValue);
    const id = useAriaId();
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
    const ariaId = useAriaId();
    const select = (
        <Select
            name={ariaId}
            value={value}
            onChangeValue={setValue}
            label={label}
            options={values.map((type) => ({value: type, text: type}))}
            native={isRunningAcceptanceTest()}
        />
    );
    return [value, select];
};
