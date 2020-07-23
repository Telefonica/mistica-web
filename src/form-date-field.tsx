import * as React from 'react';
import {useForm} from './form-context';
import {TextFieldBase} from './text-field-base';

import type {CommonFormFieldProps} from './form';

export interface FormDateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

export const FormDateField: React.FC<FormDateFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate,
    onChange,
    onChangeValue,
    onBlur,
    value,
    ...rest
}) => {
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

    const processValue = (value: string) => value;

    return (
        <TextFieldBase
            {...rest}
            shrinkLabel
            type="date"
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
        />
    );
};
