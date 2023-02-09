import * as React from 'react';
import {useRifm} from 'rifm';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './text-field-base';

const ibanLengthByCountry = {
    ES: 24,
    GB: 22,
    DE: 22,
    BR: 29,
};

const MAX_IBAN_LENGTH = 32; // The max allowed length is 32 chars, for IBANs from Saint Lucia

/**
 * Big int implementation of module
 */
const mod = (num: string, div: number) => {
    let res = 0;
    for (let i = 0; i < num.length; i++) {
        res = (res * 10 + Number(num[i])) % div;
    }
    return res;
};

const isValidCountryCode = (code: string) => /^[A-Z]{2}$/.test(code);
const isValidCheckDigits = (digits: string) => /^\d{2}$/.test(digits);

const isValidIbanChecksum = (iban: string): boolean => {
    // move first 4 digits to the end
    let tmp = iban.substr(4) + iban.substr(0, 4);
    // replace all letters A-Z to numbers from 10 to 35
    const charCodeOfA = 'A'.charCodeAt(0);
    tmp = Array.from(tmp)
        .map((char) => {
            if (Number.isNaN(Number(char))) {
                const charCode = char.charCodeAt(0);
                return String(10 + charCode - charCodeOfA);
            }
            return char;
        })
        .join('');
    // Iban is valid if tmp % 97 === 1
    return mod(tmp, 97) === 1;
};

const isValidIban = (iban: string): boolean => {
    const countryCode = iban.substr(0, 2);
    const checkDigits = iban.substr(2, 2);

    if (!isValidCountryCode(countryCode)) {
        return false;
    }

    if (!isValidCheckDigits(checkDigits)) {
        return false;
    }

    const expectedLength = (ibanLengthByCountry as any)[countryCode];
    if (expectedLength && expectedLength !== iban.length) {
        return false;
    }

    if (!isValidIbanChecksum(iban)) {
        return false;
    }

    return true;
};

const formatIban = (number: string): string => {
    const sanitizedNumber = number.replace(/[^\dA-Za-z]/g, '');
    return sanitizedNumber.match(/.{1,4}/g)?.join(' ') ?? sanitizedNumber;
};

const getInputMaxLength = (currentValue: string) => {
    const countryCode = currentValue.substr(0, 2);
    let expectedLength = MAX_IBAN_LENGTH;
    if (countryCode && isValidCountryCode(countryCode)) {
        const knownCountryLength = (ibanLengthByCountry as any)[countryCode];
        if (knownCountryLength) {
            expectedLength = knownCountryLength;
        }
    }
    // IBAN is formatted in groups of 4 chars separated by a space,
    // so we need to add the spaces count to the allowed max length
    const numSpaces = Math.ceil(expectedLength / 4) - 1;
    return expectedLength + numSpaces;
};

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

const IbanInput: React.FC<Props> = ({inputRef, value, defaultValue, onChange, ...other}) => {
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
        format: formatIban,
        value: controlledValue,
        onChange: handleChangeValue,
        replace: (s) => s.toUpperCase(),
        accept: /[\dA-Za-z]+/g,
    });

    return (
        <input
            {...other}
            maxLength={getInputMaxLength(rifm.value)}
            value={rifm.value}
            onChange={(e) => {
                const newValue = e.target.value;
                const prevValue = rifm.value;
                if (
                    newValue.length - prevValue.length > 1 &&
                    (e.nativeEvent as InputEvent)?.inputType === 'insertText'
                ) {
                    // Google Android virtual keyboard (GBoard) have some buggy behavior with autosuggestions
                    // and some times repeats the previously inserted caracters. If we detect that, revert
                    // the input value to the previous one
                    e.target.value = prevValue;
                }
                return rifm.onChange(e);
            }}
            type="text"
            ref={combineRefs(inputRef, ref)}
        />
    );
};

export interface IbanFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
    getSuggestions?: (value: string) => Array<string>;
}

const IbanField: React.FC<IbanFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: customValidate,
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
        if (!isValidIban(value)) {
            return texts.formIbanError;
        }
        return customValidate?.(value, rawValue);
    };

    const processValue = (s: string) => s.replace(/[^\dA-Za-z]/g, '');

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

    return <TextFieldBaseAutosuggest {...rest} {...fieldProps} inputComponent={IbanInput} />;
};

export default IbanField;
