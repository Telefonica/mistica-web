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

const COUNTRY_CODE_TO_REGION_CODE: Record<string, RegionCode> = {
    '+34': 'ES',
    '+55': 'BR',
    '+49': 'DE',
    '+44': 'GB',
};

const REGION_CODE_TO_COUNTRY_CODE: Record<string, string> = Object.fromEntries(
    Object.entries(COUNTRY_CODE_TO_REGION_CODE).map(([k, v]) => [v, k])
);

const clean = (number: string): string => {
    return number.trim().replace(/[^\d\+]/g, ''); // keep digits and "+"
};

const asE164 = (number: string, regionCode: RegionCode): string => {
    if (number.startsWith('+')) {
        return number;
    }

    switch (regionCode) {
        case 'ES':
            return `${REGION_CODE_TO_COUNTRY_CODE[regionCode]} ${number}`;
        case 'BR':
            return `${REGION_CODE_TO_COUNTRY_CODE[regionCode]} ${number.replace(/[\(\)]/g, '')}`;
        case 'DE':
            return `${REGION_CODE_TO_COUNTRY_CODE[regionCode]} ${number.replace(/^0/, '')}`;
        case 'GB':
            return `${REGION_CODE_TO_COUNTRY_CODE[regionCode]} ${number.replace(/^0/, '')}`;
        default:
            return number;
    }
};

/**
 * Simple phone formatter for a few countries and a subset of phone numbers
 *
 * Formatting conditions have been adapted to exactly match libphonenumber's as you type formatting
 * Not all formatting rules are implemented, only the most common ones. For a more complete solution, use PhoneNumberField
 */
export const formatPhoneLite = (regionCode: RegionCode, number: string): string => {
    const cleanNumber = clean(number);
    const isE164 = cleanNumber.startsWith('+');
    let digits = cleanNumber.replace(/\D/g, ''); // keep digits only
    let countryCode = '';
    let formattingRegionCode = regionCode;

    if (isE164) {
        // check if the number matches a known country code
        countryCode =
            Object.keys(COUNTRY_CODE_TO_REGION_CODE).find((code) => cleanNumber.startsWith(code)) || '';

        if (countryCode) {
            digits = cleanNumber.slice(countryCode.length); // remove country code
            formattingRegionCode = COUNTRY_CODE_TO_REGION_CODE[countryCode]; // override region code, the country code has precedence
        } else {
            // unknown E164 is returned without formatting
            return '+' + digits;
        }
    }

    if (formattingRegionCode === 'ES') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Spain
        // Example mobile: 654 83 44 55
        // Example landline: 914 44 10 25
        if (digits.length <= 9) {
            return `${countryCode} ${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`.trim();
        }
    } else if (formattingRegionCode === 'BR') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Brazil
        // Example mobile: (xx) (6..9)xxxx-xxxx
        // Example landline: (xx) xxxx-xxxx
        let national: string | undefined;
        if (digits.length === 11) {
            national = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`.replace(/\D+$/, '');
        } else if (digits.length > 2 && digits.length <= 11 && digits[2] <= '5') {
            national = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`.replace(/\D+$/, '');
        }
        if (national) {
            return isE164 ? asE164(national, formattingRegionCode) : national;
        }
    } else if (formattingRegionCode === 'DE') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany
        // Only formatting mobile numbers, landline numbers have a lot of variations:
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany#/media/File:Karte_Telefonvorwahlen_Deutschland.png
        // Example mobile: 0157 89012345
        // Example E164: +49 1578 9012345
        const zeroPadded = isE164 ? '0' + digits : digits;
        if (zeroPadded.length >= 4 && zeroPadded.match(/^(015|016|017)/)) {
            let national: string | undefined;
            if (zeroPadded.length <= 12 && zeroPadded.startsWith('015')) {
                national = `${zeroPadded.slice(0, 5)} ${zeroPadded.slice(5)}`.trim();
            } else {
                national = `${countryCode} ${zeroPadded.slice(0, 4)} ${zeroPadded.slice(4)}`.trim();
            }
            return isE164 ? asE164(national, formattingRegionCode) : national;
        }
    } else if (formattingRegionCode === 'GB') {
        // https://en.wikipedia.org/wiki/Telephone_numbers_in_the_United_Kingdom#Mobile_telephones
        // Like in DE, only mobile numbers are formatted
        // Example mobile: 07xxx xxxxxx
        const zeroPadded = isE164 ? '0' + digits : digits;
        if (zeroPadded.length <= 11 && zeroPadded.startsWith('07')) {
            const national = `${zeroPadded.slice(0, 5)} ${zeroPadded.slice(5)}`.trim();
            return isE164 ? asE164(national, formattingRegionCode) : national;
        }
    }
    return isE164 ? `${countryCode} ${digits}` : digits;
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
    const {
        i18n: {phoneNumberFormattingRegionCode: regionCode},
    } = useTheme();

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
    e164?: boolean;
}

const PhoneNumberFieldLite = ({
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
    dataAttributes,
    e164,
    ...rest
}: PhoneNumberFieldProps): JSX.Element => {
    const {
        i18n: {phoneNumberFormattingRegionCode},
    } = useTheme();

    const processValue = (value: string) => {
        return e164 ? clean(asE164(value, phoneNumberFormattingRegionCode)) : clean(value);
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
            dataAttributes={{'component-name': 'PhoneNumberFieldLite', ...dataAttributes}}
        />
    );
};

export default PhoneNumberFieldLite;
