import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';

export interface FormDateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const FormDateField: React.FC<FormDateFieldProps> = ({
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
    const processValue = (value: string) => value;

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

    return <TextFieldBase {...rest} {...fieldProps} shrinkLabel type="datetime-local" />;
};

export default FormDateField;
