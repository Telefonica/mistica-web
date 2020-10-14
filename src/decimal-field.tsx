import * as React from 'react';
import {useFieldProps} from './form-context';
import {useTheme} from './hooks';
import TextFieldBase from './text-field-base';
import {Locale} from './utils/locale';

import type {CommonFormFieldProps} from './text-field-base';

const getLocalDecimalChar = (locale: Locale): string => {
    try {
        return (1.1).toLocaleString(locale.replace('_', '-'))[1];
    } catch (e) {
        return '.';
    }
};

/**
 * typed as `any` because `React.HTMLProps<>` has no equivalent in flowtype
 * not a big problem because this component is not exported to the public API
 *
 * The correct type would be:
 *
 * type DecimalInputProps = React.HTMLProps<HTMLInputElement> & {inputRef: React.Ref<HTMLInputElement>}
 */
type DecimalInputProps = any;

export const DecimalInput: React.FC<DecimalInputProps> = ({inputRef, value, defaultValue, ...rest}) => {
    const {i18n} = useTheme();
    const localDecimalChar = getLocalDecimalChar(i18n.locale);

    const format = (value: any) => {
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

export interface DecimalFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const DecimalField: React.FC<DecimalFieldProps> = ({
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
    defaultValue,
    ...rest
}) => {
    const {texts} = useTheme();

    const validate = (value: string | undefined, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
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

    return <TextFieldBase {...rest} {...fieldProps} inputComponent={DecimalInput} />;
};

export default DecimalField;
