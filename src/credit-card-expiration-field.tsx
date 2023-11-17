import * as React from 'react';
import {useForm, useFieldProps} from './form-context';
import {useTheme} from './hooks';
import {TextFieldBaseAutosuggest} from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';

type ExpirationDateValue = {
    month: number | null;
    year: number | null;
    raw: string;
};

const MonthYearDateInput: React.FC<any> = ({inputRef, defaultValue, value, ...rest}) => {
    const {texts} = useTheme();

    /**
     * 1) characters other than [0-9] and '/' are removed
     * 2) automatically insert "/" as you type
     * 3) the user must be able to remove text
     */
    const format = (s: string) => {
        /**
         * format after adding characters one by one in order to prevent unwanted results when
         * writing multiple characters at the same time (for example, by using copy/paste)
         */
        let value = '';
        [...s].forEach((c) => {
            value = (value + c)
                .replace(
                    /[^0-9]/g,
                    '' // allow only numbers
                )
                .replace(
                    /^([2-9])$/g,
                    '0$1' // 3 -> 03
                )
                .replace(
                    /^(1{1})([3-9]{1})$/g,
                    '0$1/$2' // 13 -> 01/3
                )
                .replace(
                    /^0{1,}/g,
                    '0' // 00 -> 0
                )
                .replace(
                    /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
                    '$1/$2' // 113 > 11/3
                );
        });

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
                e.currentTarget.value = nextValue;
            }}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            ref={inputRef}
        />
    );
};

export interface CreditCardExpirationFieldProps extends CommonFormFieldProps {
    validate?: (value: ExpirationDateValue | undefined, rawValue: string) => string | undefined;
    onChangeValue?: (value: ExpirationDateValue) => void;
}

const CreditCardExpirationField: React.FC<CreditCardExpirationFieldProps> = ({
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
        if (!rawValue) {
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
        <TextFieldBaseAutosuggest
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

export default CreditCardExpirationField;
