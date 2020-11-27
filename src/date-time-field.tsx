import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';
import {getLocalDateTimeString} from './utils/time';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import {useTheme} from '.';

import type {CommonFormFieldProps} from './text-field-base';

export interface DateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    min?: Date;
    max?: Date;
}

const ReactDateTimePicker = React.lazy(
    () => import(/* webpackChunkName: "date-time-picker" */ './date-time-picker')
);

const FormDateField: React.FC<DateFieldProps> = ({
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
    defaultValue,
    min,
    max,
    ...rest
}) => {
    const hasNativePicker = React.useMemo(() => isInputTypeSupported('datetime-local'), []);
    const processValue = (value: string) => (hasNativePicker ? value : value.replace(/\s/, 'T'));
    const {texts} = useTheme();

    const validate = (value: string, rawValue: string) => {
        if (min && value) {
            if (value < getLocalDateTimeString(min)) {
                return texts.formDateOutOfRangeError;
            }
        }
        if (max && value) {
            if (value > getLocalDateTimeString(max)) {
                return texts.formDateOutOfRangeError;
            }
        }
        return validateProp?.(value, rawValue);
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

    const nativePicker = (
        <TextFieldBase
            {...rest}
            {...fieldProps}
            type="datetime-local"
            endIconOverlay={
                <div style={{position: 'absolute', top: 16, right: 16, pointerEvents: 'none'}}>
                    <IconCalendarRegular />
                </div>
            }
        />
    );

    if (hasNativePicker || isServerSide()) {
        return nativePicker;
    }

    return (
        <React.Suspense fallback={nativePicker}>
            <ReactDateTimePicker {...rest} {...fieldProps} withTime />
        </React.Suspense>
    );
};

export default FormDateField;
