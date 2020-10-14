import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {PhoneInput} from './phone-input';

import type {CommonFormFieldProps} from './text-field-base';

export interface FormPhoneNumberFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
    getSuggestions?: (value: string) => Array<string>;
}

const PhoneNumberField: React.FC<FormPhoneNumberFieldProps> = ({
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
    ...rest
}) => {
    const processValue = (s: string) => s.replace(/[^\d]/g, ''); // keep only digits

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

    return <TextFieldBase {...rest} {...fieldProps} type="phone" inputComponent={PhoneInput} />;
};

export default PhoneNumberField;
