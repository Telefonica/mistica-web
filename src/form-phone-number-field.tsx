// @flow
import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import TextField from './text-field';
import PhoneInput from './phone-input';

import type {CommonFormFieldProps} from './form';

const FormPhoneNumberField = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChangeValue,
    onBlur,
    ...rest
}: {
    ...CommonFormFieldProps,
    prefix?: string,
    validate?: (value: string | void, rawValue: string | void) => string | void,
    onChangeValue?: (string, string) => void,
}): React.ReactNode => {
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

    const validate = (value: string | void, rawValue) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        return validateProp?.(value, rawValue);
    };

    return (
        <TextField
            {...rest}
            type="phone"
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={rawValues[name] ?? ''}
            onChange={(event) => setRawValue({name, value: event.currentTarget.value})}
            onChangeValue={(value, rawValue) => {
                setValue({name, value});
                onChangeValue?.(value, rawValue);
                setFormError({name, error: ''});
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            Input={PhoneInput}
        />
    );
};

export default FormPhoneNumberField;
