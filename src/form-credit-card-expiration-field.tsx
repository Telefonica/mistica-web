import * as React from 'react';
import {useForm, useFieldProps} from './form-context';
import {useTheme} from './hooks';
import {TextFieldBase} from './text-field-base';

import type {CommonFormFieldProps} from './form';

type ExpirationDateValue = {
    month: number | null;
    year: number | null;
    raw: string;
};

const MonthYearDateInput: React.FC<any> = ({inputRef, defaultValue, value, ...rest}) => {
    const {texts} = useTheme();
    const prevValue = React.useRef(value || '');

    /**
     * 1) characters other than [0-9] and '/' are removed
     * 2) automatically insert "/" as you type
     * 3) the user must be able to remove text (eg: deleting the slash must not automatically insert a new one)
     */
    const format = (s: string) => {
        // remove invalid characters
        let value = s.replace(/[^\d/]/g, '').replace(/\/+/g, '/');

        // remove extra slashes: "01/12/34" => "01/12"
        const [month, year] = value.split('/');
        if (year) {
            value = `${month}/${year}`;
        }

        const isDeleting = String(prevValue.current).length >= value.length;

        if (isDeleting) {
            // do not format when deleting
        } else if (value === '/') {
            value = ''; // missing month, invalid
        } else if (value.length === 1 && parseInt(value) >= 2) {
            value = `0${value}/`; // month is > 1, prepend with "0"
        } else if (value.length === 2) {
            if (value[1] === '/') {
                value = `0${value}`; // prepend "0" to "1/"
            } else if (parseInt(month) > 12 || parseInt(month) < 1) {
                value = value[0]; // if month is invalid remove last character
            } else {
                value = `${value}/`; // append "/" to two-digit size months
            }
        }
        return value;
    };

    return (
        <input
            {...rest}
            placeholder={texts.expirationDatePlaceholder}
            type="text"
            inputMode="decimal"
            maxLength="5" // MM/YY
            onInput={(e) => {
                const nextValue = format(e.currentTarget.value);
                prevValue.current = nextValue;
                e.currentTarget.value = nextValue;
            }}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            ref={inputRef}
        />
    );
};

export interface FormCreditCardExpirationFieldProps extends CommonFormFieldProps {
    validate?: (value: ExpirationDateValue | undefined, rawValue: string) => string | undefined;
    onChangeValue?: (value: ExpirationDateValue) => void;
}

export const FormCreditCardExpirationField: React.FC<FormCreditCardExpirationFieldProps> = ({
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
    autoComplete = 'cc-exp',
    defaultValue,
    ...rest
}) => {
    const {texts} = useTheme();
    const {setFormError, jumpToNext} = useForm();

    const validate = (value: ExpirationDateValue, rawValue: string): string | undefined => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        const {month, year} = value;
        if (!month || !year) {
            return texts.formCreditCardExpirationError;
        }
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (year < currentYear) {
            return texts.formCreditCardExpirationError;
        }
        if (year === currentYear && month < currentMonth) {
            return texts.formCreditCardExpirationError;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (s: any): ExpirationDateValue => {
        const [month, year] = String(s)
            .split('/')
            .map((n) => parseInt(n));

        const fullYear = Number.isInteger(year) ? 2000 + year : null;
        return {month: month || null, year: fullYear, raw: s};
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
        <TextFieldBase
            {...rest}
            {...fieldProps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                fieldProps.onChange(event);
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                if (rawValue.length === 5) {
                    const error = validate?.(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                }
            }}
            autoComplete={autoComplete}
            inputComponent={MonthYearDateInput}
        />
    );
};
