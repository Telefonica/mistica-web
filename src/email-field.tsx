'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {useTheme} from './hooks';
import {TextFieldBaseAutosuggest} from './text-field-base';
import * as tokens from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';

// matches strings like: "x@x.x" (where "x" is any string without spaces)
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EmailFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => Array<string>;
}

const EmailField = ({
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
    autoComplete = 'email',
    defaultValue,
    dataAttributes,
    ...rest
}: EmailFieldProps): JSX.Element => {
    const {texts, t} = useTheme();

    const validate = (value: string | undefined, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory || t(tokens.formFieldErrorIsMandatory);
        }
        if (!RE_EMAIL.test(value)) {
            return texts.formEmailError || t(tokens.formEmailError);
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (value: string) => value.trim();

    const fieldProps = useFieldProps({
        name,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        onChange,
        onChangeValue,
    });

    return (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            type="email"
            inputMode="email"
            autoComplete={autoComplete}
            dataAttributes={{'component-name': 'EmailField', ...dataAttributes}}
        />
    );
};

export default EmailField;
