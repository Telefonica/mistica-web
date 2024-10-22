'use client';
import * as React from 'react';
import {useRifm} from 'rifm';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {useTheme} from './hooks';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';

import type {CommonFormFieldProps} from './text-field-base';
import type {RegionCode} from './utils/region-code';

/**
 * Simple phone formatter for a few countries and a subset of phone numbers
 *
 * Formatting conditions have been adapted to exactly match libphonenumber's as you type formatting
 * Not all formatting rules are implemented, only the most common ones. For a more complete solution, use PhoneNumberField
 */
export const formatPhoneLite = (regionCode: RegionCode, number: string): string => {
    const digits = number.replace(/\D/g, ''); // strip non-digits
    if (number.startsWith('+')) {
        // E164 returned without formatting
        return '+' + digits;
    }
    if (regionCode === 'ES') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Spain
        // Example mobile: 654 83 44 55
        // Example landline: 914 44 10 25
        if (digits.length <= 9) {
            return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`.trim();
        }
        return digits;
    } else if (regionCode === 'BR') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Brazil
        // Example mobile: (xx) (6..9)xxxx-xxxx
        // Example landline: (xx) xxxx-xxxx
        if (digits.length === 11) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`.replace(/\D+$/, '');
        } else if (digits.length > 2 && digits.length <= 11 && digits[2] <= '5') {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`.replace(/\D+$/, '');
        }
    } else if (regionCode === 'DE') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany
        // Only formatting mobile numbers, landline numbers have a lot of variations:
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany#/media/File:Karte_Telefonvorwahlen_Deutschland.png
        if (digits.length >= 4 && digits.match(/^(015|016|017)/)) {
            if (digits.length <= 12 && digits.startsWith('015')) {
                return `${digits.slice(0, 5)} ${digits.slice(5)}`.trim();
            } else {
                return `${digits.slice(0, 4)} ${digits.slice(4)}`.trim();
            }
        }
    } else if (regionCode === 'GB') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_the_United_Kingdom#Mobile_telephones
        // Like in DE, only mobile numbers are formatted
        // Example mobile: 07xxx xxxxxx
        if (digits.length <= 11 && digits.startsWith('07')) {
            return `${digits.slice(0, 5)} ${digits.slice(5)}`.trim();
        }
    }
    return digits;
};

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    prefix?: string;
    format?: (number: string) => string;
};

const PhoneInput = ({
    inputRef,
    value,
    defaultValue,
    onChange,
    prefix,
    format: formatFromProps,
    ...other
}: InputProps) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue || '');
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
        (number: string): string => {
            if (formatFromProps) {
                return formatFromProps(number);
            }
            return formatPhoneLite(regionCode, number);
        },
        [formatFromProps, regionCode]
    );

    const rifm = useRifm({
        format,
        value: controlledValue,
        accept: /[\d\+]+/g,
        onChange: handleChangeValue,
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
    format?: (number: string) => string;
}

const PhoneNumberFieldLite = ({
    disabled,
    error,
    helperText,
    name,
    label,
    optional,
    validate,
    onChange,
    onChangeValue,
    onBlur,
    value,
    defaultValue,
    dataAttributes,
    ...rest
}: PhoneNumberFieldProps): JSX.Element => {
    const processValue = (value: string) => {
        // keep only digits
        return value.startsWith('+') ? value : value.replace(/\D/g, '');
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
            dataAttributes={{'component-name': 'PhoneNumberFieldLite', ...dataAttributes}}
        />
    );
};

export default PhoneNumberFieldLite;
