'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {useTheme} from './hooks';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {createChangeEvent} from './utils/dom';
import {useRifm} from 'rifm';
import {combineRefs} from './utils/common';

import type {Locale} from './utils/locale';
import type {CommonFormFieldProps} from './text-field-base';

const getLocalDecimalChar = (locale: Locale): string => {
    try {
        return (1.1).toLocaleString(locale.replace('_', '-'))[1];
    } catch (e) {
        return '.';
    }
};

const format = (value: any, maxDecimals: number) => {
    // do not make the localDecimalChar replacement here. Instead, keep the one the user typed.
    // Make that replacement in `replace` prost-processor. It is what rifm lib expects.
    const sanitized = String(value ?? '').replace(/[^.,\d]/g, ''); // remove non digits or decimal separator chars;
    const firstSeparator = /[.,]/.exec(sanitized);
    const parts = sanitized.split(/[.,]/);

    if (parts.length === 0) {
        // empty
        return '';
    }

    if (firstSeparator && maxDecimals > 0) {
        // value includes one or more decimal separators, keep the first one
        return parts.shift() + firstSeparator[0] + parts.join('').slice(0, maxDecimals);
    } else {
        // no fractional part, return "as is"
        return parts[0];
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

export const DecimalInput = ({
    inputRef,
    value,
    defaultValue,
    onChange,
    maxDecimals,
    ...rest
}: DecimalInputProps): JSX.Element => {
    const {i18n} = useTheme();
    const localDecimalChar = getLocalDecimalChar(i18n.locale);

    const replace = (value: any) => String(value ?? '').replace(/[.,]/g, localDecimalChar); // use local decimal char

    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;

    const handleChangeValue = React.useCallback(
        (newFormattedValue: string) => {
            if (!isControlledByParent) {
                setSelfValue(newFormattedValue);
            }
            if (ref.current) {
                onChange?.(createChangeEvent(ref.current, newFormattedValue));
            }
        },
        [isControlledByParent, onChange]
    );

    const rifm = useRifm({
        format: (value) => format(value, maxDecimals),
        replace,
        value: controlledValue,
        onChange: handleChangeValue,
        accept: /[\d.,]+/g,
    });

    return (
        <input
            {...rest}
            type="text"
            inputMode="decimal" // shows decimal keypad in Chrome for Android
            // shows regular keypad in iOS < 12.2 (there's no way to show a decimal keypad in those versions)
            // https://bugs.webkit.org/show_bug.cgi?id=183621
            value={rifm.value}
            onChange={rifm.onChange}
            ref={combineRefs(inputRef, ref)}
        />
    );
};

export interface DecimalFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: React.ReactNode;
    /** defaults to Infinity */
    maxDecimals?: number;
}

const DecimalField = ({
    disabled,
    error,
    helperText,
    name,
    label,
    optional,
    validate,
    validateOnBlurInsideForm,
    onChange,
    onChangeValue,
    onBlur,
    value,
    defaultValue,
    maxDecimals = Infinity,
    dataAttributes,
    ...rest
}: DecimalFieldProps): JSX.Element => {
    const processValue = (value: string) => value.trim();

    const fieldProps = useFieldProps({
        name,
        label,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        validateOnBlurInsideForm,
        onChange,
        onChangeValue,
    });

    return (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            inputComponent={DecimalInput}
            inputProps={{maxDecimals}}
            dataAttributes={{'component-name': 'DecimalField', testid: 'DecimalField', ...dataAttributes}}
        />
    );
};

export default DecimalField;
