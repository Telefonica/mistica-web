import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './form';
import TextFieldBase from './text-field-base';
import {Locale} from './utils/locale';

const getLocalDecimalChar = (locale: Locale): string => {
    try {
        return (1.1).toLocaleString(locale.replace('_', '-'))[1];
    } catch (e) {
        return '.';
    }
};

export const DecimalInput = ({inputRef, value, defaultValue, ...rest}: any) => {
    const {i18n} = useTheme();
    const localDecimalChar = getLocalDecimalChar(i18n.locale);

    const format = (value?: string) => {
        const parts = String(value ?? '')
            .replace(/[^.,\d]/g, '') // remove non digits or decimal separator chars
            .replace(/[.,]/g, localDecimalChar) // use local decimal char
            .split(localDecimalChar);

        if (parts.length === 0) {
            // empty
            return '';
        }

        if (parts.length === 1) {
            // no fractional part, return "as is"
            return parts[0];
        }

        // value includes one or more decimal separators, keep the first one
        return parts.shift() + localDecimalChar + parts.join('');
    };

    return (
        <input
            {...rest}
            type="text"
            inputMode="decimal" // shows decimal keypad in Chrome for Android
            // shows regular keypad in iOS < 12.2 (there's no way to show a decimal keypad in those versions)
            // https://bugs.webkit.org/show_bug.cgi?id=183621
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            onInput={(e) => {
                e.currentTarget.value = format(e.currentTarget.value);
            }}
            ref={inputRef}
        />
    );
};

interface FormDecimalFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const FormDecimalField: React.FC<FormDecimalFieldProps> = ({
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

    const processValue = (value: string) => value.trim();

    return (
        <TextFieldBase
            {...rest}
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name]}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                setRawValue({name, value: rawValue});
                setValue({name, value});
                setFormError({name, error: ''});
                onChange?.(event);
                onChangeValue?.(value, rawValue);
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            inputComponent={DecimalInput}
        />
    );
};

export default FormDecimalField;
