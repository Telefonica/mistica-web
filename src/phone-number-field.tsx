'use client';
import * as React from 'react';
import {useRifm} from 'rifm';
import {formatAsYouType, formatToE164, parse, getRegionCodeForCountryCode} from '@telefonica/libphonenumber';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {useTheme} from './hooks';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';

import type {CommonFormFieldProps} from './text-field-base';
import type {RegionCode} from './utils/region-code';

const formatPhone = (regionCode: RegionCode, number: string): string =>
    formatAsYouType(number.replace(/[^\d+*#]/g, ''), regionCode);

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    prefix?: string;
};

const isValidPrefix = (prefix: string): boolean => !!prefix.match(/^\+\d+$/);

const PhoneInput = ({inputRef, value, defaultValue, onChange, prefix, ...other}: InputProps) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);
    const {i18n} = useTheme();

    const regionCode = i18n.phoneNumberFormattingRegionCode;
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

    const format = React.useCallback(
        // The final replacement of "-" to "@" is to workaround a bug in rifm library
        // otherwise the cursor position is incorrectly positioned
        // also note the "@" is replaced back to "-" in `replace` param in `useRifm`
        (value: string): string => {
            let result = '';

            // If a prefix is defined, we format the concatenation of prefix + value and
            // then remove the prefix from the result
            if (prefix && isValidPrefix(prefix)) {
                const prefixedValue = prefix + value;
                result = formatPhone(regionCode, prefixedValue);
                if (result.startsWith(prefix)) {
                    result = result.slice(prefix.length).trim();
                } else {
                    // fallback to regular formatting
                    result = formatPhone(regionCode, value);
                }
            } else {
                result = formatPhone(regionCode, value);
            }
            return result.replace(/-/g, '@');
        },
        [regionCode, prefix]
    );

    const rifm = useRifm({
        format,
        value: controlledValue,
        onChange: handleChangeValue,
        accept: /[\d\-+#*]+/g,
        replace: (s) => s.replace(/@/g, '-'),
    });

    return (
        <input
            {...other}
            value={rifm.value}
            onChange={rifm.onChange}
            type="tel" // shows telephone keypad in Android and iOS
            ref={combineRefs(inputRef, ref)}
        />
    );
};

export interface PhoneNumberFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
    getSuggestions?: (value: string) => Array<string>;
    e164?: boolean;
}

const PhoneNumberField = ({
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
    e164,
    dataAttributes,
    ...rest
}: PhoneNumberFieldProps): JSX.Element => {
    const {i18n} = useTheme();

    const processValue = (value: string) => {
        if (e164) {
            try {
                const numericPrefix = (rest.prefix ?? '').replace(/[^\d]/g, '');
                let regionCode = getRegionCodeForCountryCode(numericPrefix);
                if (!regionCode || regionCode === 'ZZ') {
                    regionCode = i18n.phoneNumberFormattingRegionCode;
                }
                return formatToE164(parse(value, regionCode));
            } catch (e) {
                return '';
            }
        } else {
            // keep only digits
            return value.replace(/[^\d]/g, '');
        }
    };

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
            type="phone"
            inputProps={{prefix: rest.prefix}}
            inputComponent={PhoneInput}
            dataAttributes={{
                'component-name': 'PhoneNumberField',
                testid: 'PhoneNumberField',
                ...dataAttributes,
            }}
        />
    );
};

export default PhoneNumberField;
