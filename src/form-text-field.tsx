import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';

export interface FormTextFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: boolean;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
    getSuggestions?: (value: string) => Array<string>;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate,
    onChangeValue,
    onChange,
    onBlur,
    value,
    defaultValue,
    ...rest
}) => {
    const processValue = (v: string) => v;

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

    return <TextFieldBase {...rest} {...fieldProps} type="text" />;
};

export default FormTextField;
