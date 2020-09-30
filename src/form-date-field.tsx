import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';

import type {CommonFormFieldProps} from './text-field-base';

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
    const hasNativePicker = React.useMemo(() => isInputTypeSupported('date'), []);

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

    if (hasNativePicker || isServerSide()) {
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
