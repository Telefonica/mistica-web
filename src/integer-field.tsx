'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';

type IntegerInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'inputMode' | 'pattern' | 'onInput' | 'type'
> & {
    inputRef: React.ForwardedRef<HTMLInputElement>;
    type?: 'text' | 'password';
};

export const IntegerInput = ({
    inputRef,
    value,
    defaultValue,
    type = 'text',
    ...rest
}: IntegerInputProps): React.ReactElement => {
    const format = (v?: unknown) => String(v ?? '').replace(/[^\d]/g, '');

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        // strip all non numeric characters
        e.currentTarget.value = format(e.currentTarget.value);
    };
    return (
        <input
            {...rest}
            inputMode="numeric" // shows numeric keypad in Chrome for Android
            pattern="[0-9]*" // shows numeric keypad in iOS
            onInput={handleInput}
            ref={inputRef}
            type={type}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
        />
    );
};

export interface IntegerFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const IntegerField = ({
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
    ...rest
}: IntegerFieldProps): JSX.Element => {
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
            inputComponent={IntegerInput}
            dataAttributes={{'component-name': 'IntegerField', testid: 'IntegerField', ...dataAttributes}}
        />
    );
};

export default IntegerField;
