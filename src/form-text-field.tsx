import * as React from 'react';
import {useForm} from './form-context';
import TextField from './text-field';

import type {CommonFormFieldProps} from './form';
import type {SimpleTextFieldProps} from './text-field';

export interface SimpleFormTextFieldProps extends CommonFormFieldProps {
    type?: 'text';
    value?: string;
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: boolean;
}
export interface OtherFormTextFieldProps extends CommonFormFieldProps {
    type: 'password' | 'integer' | 'decimal' | 'date';
    value?: string;
    onChangeValue?: (value: string, rawValue: string) => void;
}

export type FormTextFieldProps = SimpleFormTextFieldProps | OtherFormTextFieldProps;

const CustomTextField = TextField as React.FC<SimpleTextFieldProps | OtherFormTextFieldProps>;

const FormTextField: React.FC<FormTextFieldProps> = ({
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
        <CustomTextField
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
            onChangeValue={(value: string, rawValue: string) => {
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
