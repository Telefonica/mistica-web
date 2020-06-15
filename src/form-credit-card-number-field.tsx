// @flow
import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import TextField from './text-field';
import {
    getCreditCardNumberLength,
    isAmericanExpress,
    isVisa,
    isMasterCard,
    isValidCreditCardNumber,
} from './utils/credit-card';

import type {CommonFormFieldProps} from './form';
import type {CardOptions} from './utils/credit-card';

const FormCreditCardNumberField = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChangeValue,
    onBlur,
    acceptedCards = {americanExpress: true, visa: true, masterCard: true},
    ...rest
}: {
    ...CommonFormFieldProps,
    acceptedCards?: CardOptions,
    validate?: (value: string | void, rawValue: string | void) => string | void,
    onChangeValue?: (value: string, rawValue: string) => void,
}): React.Node => {
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

    const validate = (value: string | void, rawValue) => {
        const error = texts.formCreditCardNumberError;
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        if (isAmericanExpress(value) && !acceptedCards.americanExpress) {
            return error;
        }
        if (isVisa(value) && !acceptedCards.visa) {
            return error;
        }
        if (isMasterCard(value) && !acceptedCards.masterCard) {
            return error;
        }
        if (!isValidCreditCardNumber(value)) {
            return error;
        }
        if (getCreditCardNumberLength(value) !== value.length) {
            return error;
        }
        return validateProp?.(value, rawValue);
    };

    return (
        <TextField
            {...rest}
            type="credit-card-number"
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={rawValues[name] ?? ''}
            maxLength={getCreditCardNumberLength(values[name]) + 3} // We have to take in account formatting spaces
            onChange={(event) => setRawValue({name, value: event.currentTarget.value})}
            onChangeValue={(value, rawValue) => {
                setValue({name, value});
                onChangeValue?.(value, rawValue);
                if (value.length >= getCreditCardNumberLength(value)) {
                    const error = validate?.(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                } else {
                    setFormError({name, error: ''});
                }
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
        />
    );
};

export default FormCreditCardNumberField;
