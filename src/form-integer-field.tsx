import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './form';
import {TextFieldBase} from './text-field-base';

const IntegerInput = ({inputRef, value, defaultValue, ...rest}: any) => {
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

export interface FormIntegerFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

export const FormIntegerField: React.FC<FormIntegerFieldProps> = ({
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
    ...rest
}) => {
    const {texts} = useTheme();
    const {
        rawValues,
        setRawValue,
        values,
        setValue,
        formStatus,
        formErrors,
        setFormError,
        register,
    } = useForm();

    const validate = (value: string | undefined, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (value: string) => value.trim();

    return (
        <TextFieldBase
            {...rest}
            inputRef={(field) => register({name, field, validate, initialValue: value ?? rest.defaultValue})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name] ?? (rest.defaultValue !== undefined ? undefined : '')}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                setRawValue({name, value: rawValue});
                setValue({name, value});
                setFormError({name, error: ''});
                onChange?.(event);
                onChangeValue?.(value, rawValue);
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            inputComponent={IntegerInput}
        />
    );
};
