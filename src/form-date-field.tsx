import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';

import type {CommonFormFieldProps} from './text-field-base';
import {isInputTypeSupported} from './utils/dom';

export interface FormDateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const ReactDateTimePicker = React.lazy(() =>
    import(/* webpackChunkName: "date-time-picker" */ './date-time-picker')
);

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
    const {current: hasNativePicker} = React.useRef(isInputTypeSupported('date'));

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

    if (hasNativePicker) {
        return <TextFieldBase {...rest} {...fieldProps} shrinkLabel type="date" />;
    }

    return (
        <React.Suspense
            fallback={<TextFieldBase {...rest} {...fieldProps} disabled shrinkLabel type="date" />}
        >
            <ReactDateTimePicker {...rest} {...fieldProps} />
        </React.Suspense>
    );
};

export default FormDateField;
