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

let libphonenumber: typeof import('@telefonica/libphonenumber');

type NumberFormatter = (number: string, regionCode: RegionCode) => string;

const formatPhoneDummy: NumberFormatter = (number) => number;

const formatPhoneUsingLibphonenumber: NumberFormatter = (number, regionCode) =>
    libphonenumber.formatAsYouType(number.replace(/[^\d+*#]/g, ''), regionCode);

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    prefix?: string;
    e164?: boolean;
    format?: NumberFormatter;
};

const isValidPrefix = (prefix: string): boolean => !!prefix.match(/^\+\d+$/);

const PhoneInput = ({
    inputRef,
    value,
    defaultValue,
    onChange: onChangeFromProps,
    prefix,
    e164,
    format: formatFromProps,
    ...other
}: InputProps) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);
    const {i18n} = useTheme();
    const formatRef = React.useRef<NumberFormatter>(formatFromProps || formatPhoneDummy);
    /**  this state is used to force a re-render when libphonenumber is loaded */
    const [isLibphonenumberLoaded, setIsLibphonenumberloaded] = React.useState(false);
    const regionCode = i18n.phoneNumberFormattingRegionCode;
    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;
    const onChangeRef = React.useRef(onChangeFromProps);

    React.useEffect(() => {
        onChangeRef.current = onChangeFromProps;
    }, [onChangeFromProps]);

    React.useEffect(() => {
        if (formatFromProps) {
            formatRef.current = formatFromProps;
        } else {
            import('@telefonica/libphonenumber' /* webpackChunkName: "libphonenumber" */).then((lib) => {
                libphonenumber = lib;
                formatRef.current = formatPhoneUsingLibphonenumber;
                setIsLibphonenumberloaded(true);
            });
        }
    }, [formatFromProps]);

    const handleChangeValue = React.useCallback(
        (newFormattedValue: string) => {
            if (!isControlledByParent) {
                setSelfValue(newFormattedValue);
            }
            if (ref.current) {
                onChangeRef.current?.(createChangeEvent(ref.current, newFormattedValue));
            }
        },
        [isControlledByParent]
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
                result = formatRef.current(prefixedValue, regionCode);
                if (result.startsWith(prefix)) {
                    result = result.slice(prefix.length).trim();
                } else {
                    // fallback to regular formatting
                    result = formatRef.current(value, regionCode);
                }
            } else {
                result = formatRef.current(value, regionCode);
            }
            return result.replace(/-/g, '@');
        },
        [regionCode, prefix]
    );

    const rifm = useRifm({
        format,
        value: controlledValue,
        // Instead of calling `handleChangeValue` here, we call it in `useEffect` below.
        // When the formatter changes (libphonenumber is lazy loaded), rifm should call `onChange`
        // with the new formatted value but it doesn't, so we need to call it manually.
        onChange: () => {},
        accept: /[\d\-+#*]+/g,
        replace: (s) => s.replace(/@/g, '-'),
    });

    React.useEffect(() => {
        handleChangeValue(rifm.value);
    }, [rifm.value, handleChangeValue]);

    return (
        <input
            {...other}
            value={rifm.value}
            onChange={rifm.onChange}
            type="tel" // shows telephone keypad in Android and iOS
            ref={combineRefs(inputRef, ref)}
            data-using-libphonenumber={isLibphonenumberLoaded}
        />
    );
};

export interface PhoneNumberFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
    getSuggestions?: (value: string) => Array<string>;
    e164?: boolean;
    format?: NumberFormatter;
}

const PhoneNumberField = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate,
    onChange,
    onChangeValue,
    onBlur,
    value,
    defaultValue,
    dataAttributes,
    /**
     * By default this component will use google's libphonenumber library to format numbers.
     * The component will load libphonenumber on demand, so it won't impact the initial load time.
     * You can opt-out of using libphonenumber by providing a custom formatter.
     */
    format,
    /** enabling e164 is incompatible with custom formatters because this requires libphonenumber  */
    e164,
    ...rest
}: PhoneNumberFieldProps): JSX.Element => {
    const {i18n} = useTheme();

    if (process.env.NODE_ENV !== 'production') {
        if (e164 && format) {
            console.error('[PhoneNumberField] enabling e164 is incompatible with custom formatters');
        }
    }

    const processValue = (value: string) => {
        if (e164 && libphonenumber && !format) {
            try {
                const numericPrefix = (rest.prefix ?? '').replace(/[^\d]/g, '');
                let regionCode = libphonenumber.getRegionCodeForCountryCode(numericPrefix);
                if (!regionCode || regionCode === 'ZZ') {
                    regionCode = i18n.phoneNumberFormattingRegionCode;
                }
                return libphonenumber.formatToE164(libphonenumber.parse(value, regionCode));
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
            inputProps={{prefix: rest.prefix, format}}
            inputComponent={PhoneInput}
            dataAttributes={{
                'component-name': 'PhoneNumberField',
                ...dataAttributes,
            }}
        />
    );
};

export default PhoneNumberField;
