// @flow
import * as React from 'react';
import {useForm} from './form-context';
import TextField from './text-field';

import type {CommonFormFieldProps} from './form';

export type FormTextFieldProps =
    | {
          ...CommonFormFieldProps,
          onChangeValue?: (value: string, rawValue: string) => void,
          multiline?: boolean,
          type?: 'text',
      }
    | {
          ...CommonFormFieldProps,
          onChangeValue?: (value: string, rawValue: string) => void,
          type: 'password' | 'integer' | 'decimal' | 'date',
      };

const FormTextField = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    type = 'text',
    validate,
    onChangeValue,
    onBlur,
    value,
    ...rest
}: {
    ...FormTextFieldProps,
    value?: string,
    validate?: (value: string | void, rawValue: string | void) => string | void,
}): React.ReactNode => {
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

    return (
        <TextField
            {...rest}
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            type={type}
            name={name}
            required={!optional}
            value={value ?? rawValues[name] ?? ''}
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

export type FormTextFieldComponent = typeof FormTextField;

export default FormTextField;
