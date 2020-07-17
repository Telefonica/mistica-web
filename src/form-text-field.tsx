import * as React from 'react';
import {useForm} from './form-context';
import {TextFieldBase} from './text-field-base';

import type {CommonFormFieldProps} from './form';

export interface SimpleFormTextFieldProps extends CommonFormFieldProps {
    type?: 'text'; // @deprecated, this will be the only allowed type for FormTextFields
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: boolean;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
}

/**
 * @deprecated
 */
export interface OtherFormTextFieldProps extends CommonFormFieldProps {
    type?: 'password' | 'integer' | 'decimal' | 'date';
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: undefined;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export type FormTextFieldProps = SimpleFormTextFieldProps | OtherFormTextFieldProps;

export const FormTextField: React.FC<FormTextFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    type = 'text',
    validate,
    onChangeValue,
    onChange,
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

    // TODO Remove: APPS-XXXX
    React.useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (type !== 'text') {
                console.error(
                    'FormTextFields with a type different than "text" are deprecated. Please use another FormField component.' +
                        '\nSee: https://mistica-web.now.sh/?path=/story/components-forms-formfields--types-uncontrolled'
                );
            }
        }
    }, [type]);

    return (
        <TextFieldBase
            {...rest}
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            type={type}
            name={name}
            required={!optional}
            value={value ?? rawValues[name]}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = rawValue;
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
        />
    );
};
