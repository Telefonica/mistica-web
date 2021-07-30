import * as React from 'react';
import {useFieldProps} from './form-context';
import {useTheme} from './hooks';
import TextFieldBase from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';

export const IntegerInput: React.FC<any> = ({inputRef, value, defaultValue, ...rest}: any) => {
    const format = (v?: string) => String(v ?? '').replace(/[^\d]/g, '');

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        // strip all non numeric characters
        e.currentTarget.value = format(e.currentTarget.value);
    };
    return (
        <input
            {...rest}
            inputMode="numeric" // shows numeric keypad in Chrome for Android
            pattern="[0-9]*" // shows numeric keypad in iOS
            onInput={handleInput}
            ref={inputRef}
            type="text"
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
        />
    );
};

export interface IntegerFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const IntegerField: React.FC<IntegerFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChange,
    onChangeValue,
    onBlur,
    value,
    defaultValue,
    ...rest
}) => {
    const {texts} = useTheme();

    const validate = (value: string | undefined, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (value: string) => value.trim();

    const fieldProps = useFieldProps({
        name,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        onChange,
        onChangeValue,
    });

    return <TextFieldBase {...rest} {...fieldProps} inputComponent={IntegerInput} />;
};

export default IntegerField;
