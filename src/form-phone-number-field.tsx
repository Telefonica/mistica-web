import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import {TextFieldBase} from './text-field-base';
import {PhoneInput} from './phone-input';

import type {CommonFormFieldProps} from './form';

interface FormPhoneNumberFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
}

export const FormPhoneNumberField: React.FC<FormPhoneNumberFieldProps> = ({
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

    return (
        <TextFieldBase
            {...rest}
            type="phone"
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name]}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = rawValue; // FIXME
                setRawValue({name, value: rawValue});
                setValue({name, value});

                onChange?.(event);
                onChangeValue?.(value, rawValue);
                setFormError({name, error: ''});
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            inputComponent={PhoneInput}
        />
    );
};
