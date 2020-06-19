import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import TextField from './text-field';

import type {CommonFormFieldProps} from './form';

// matches strings like: "x@x.x" (where "x" is any string without spaces)
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormEmailFieldProps extends CommonFormFieldProps {
    value?: string;
    onChangeValue?: (value: string, rawValue: string) => void;
}

const FormEmailField: React.FC<FormEmailFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChangeValue,
    onBlur,
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
        if (!RE_EMAIL.test(value)) {
            return texts.formEmailError;
        }
        return validateProp?.(value, rawValue);
    };

    return (
        <TextField
            {...rest}
            type="email"
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
        />
    );
};

export default FormEmailField;
