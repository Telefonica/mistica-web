import * as React from 'react';
import {useFieldProps} from './form-context';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './form';
import {TextFieldBase} from './text-field-base';

// matches strings like: "x@x.x" (where "x" is any string without spaces)
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface FormEmailFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => Array<string>;
}

export const FormEmailField: React.FC<FormEmailFieldProps> = ({
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
    ...rest
}) => {
    const {texts} = useTheme();

    const validate = (value: string | undefined, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        if (!RE_EMAIL.test(value)) {
            return texts.formEmailError;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (value: string) => value.replace(/\s/g, '');

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
        <TextFieldBase {...rest} {...fieldProps} type="email" inputMode="email" autoComplete={autoComplete} />
    );
};
