import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import TextField from './text-field';

import type {CommonFormFieldProps} from './form';

type ExpirationDateValue = {
    month: number;
    year: number;
    raw: string;
};

export interface FormCreditCardExpirationFieldProps extends CommonFormFieldProps {
    // validate?: (value: ExpirationDateValue | void, rawValue: string | void) => string | void;
    value?: string;
    onChangeValue?: (value: ExpirationDateValue) => void;
}

const FormCreditCardExpirationField: React.FC<FormCreditCardExpirationFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
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
        jumpToNext,
    } = useForm();

    const validate = (value: ExpirationDateValue, rawValue: string): string | undefined => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        const {month, year} = value;
        if (!month || !year) {
            return texts.formCreditCardExpirationError;
        }
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (year < currentYear) {
            return texts.formCreditCardExpirationError;
        }
        if (year === currentYear && month < currentMonth) {
            return texts.formCreditCardExpirationError;
        }
        return validateProp?.(value, rawValue);
    };

    return (
        <TextField
            {...rest}
            type="credit-card-expiration"
            inputRef={(field: HTMLInputElement | null) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name] ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setRawValue({name, value: event.currentTarget.value})
            }
            onChangeValue={(value, rawValue) => {
                setValue({name, value});
                onChangeValue?.(value);
                setFormError({name, error: ''});
                if (rawValue.length === 5) {
                    const error = validate?.(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                }
            }}
            onBlur={(e: React.FocusEvent) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
        />
    );
};

export default FormCreditCardExpirationField;
