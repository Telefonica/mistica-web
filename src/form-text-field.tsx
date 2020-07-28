import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBase} from './text-field-base';

import type {CommonFormFieldProps} from './form';

export interface SimpleFormTextFieldProps extends CommonFormFieldProps {
    type?: 'text'; // @deprecated, this will be the only allowed type for FormTextFields
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: boolean;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
    getSuggestions?: (value: string) => Array<string>;
}

/**
 * @deprecated
 */
export interface OtherFormTextFieldProps extends CommonFormFieldProps {
    type?: 'password' | 'integer' | 'decimal' | 'date';
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: undefined;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export type FormTextFieldProps = SimpleFormTextFieldProps | OtherFormTextFieldProps;

export const FormTextField: React.FC<FormTextFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    type = 'text',
    validate,
    onChangeValue,
    onChange,
    onBlur,
    value,
    defaultValue,
    ...rest
}) => {
    // TODO Remove: APPS-XXXX
    React.useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (type !== 'text') {
                console.error(
                    'FormTextFields with a type different than "text" are deprecated. Please use another FormField component.' +
                        '\nSee: https://mistica-web.now.sh/?path=/story/components-forms-formfields--types-uncontrolled'
                );
            }
        }
    }, [type]);

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

    return <TextFieldBase {...rest} {...fieldProps} type={type /*deprecated*/} />;
};
