import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import {getLocalDateString} from './utils/time';
import {useTheme} from './hooks';
import {isFirefox} from './utils/platform';

import type {CommonFormFieldProps} from './text-field-base';

export interface DateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    min?: Date;
    max?: Date;
}

const ReactDateTimePicker = React.lazy(
    () => import(/* webpackChunkName: "date-time-picker" */ './date-time-picker')
);

const DateField: React.FC<DateFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChange,
    onChangeValue: onChangeValueProp,
    onBlur,
    value,
    defaultValue,
    min,
    max,
    ...rest
}) => {
    const processValue = (value: string) => value;
    const hasNativePicker = React.useMemo(() => {
        if (isFirefox()) {
            // disabled in firefox because it shows a close button over the icon and can't be styled
            return false;
        }
        return isInputTypeSupported('date');
    }, []);
    const {texts} = useTheme();

    const isInRange = (value: string): boolean => {
        if (min && value && value < getLocalDateString(min)) {
            return false;
        }
        if (max && value && value > getLocalDateString(max)) {
            return false;
        }
        return true;
    };

    const validate = (value: string, rawValue: string) => {
        if (!isInRange(value)) {
            return texts.formDateOutOfRangeError;
        }
        return validateProp?.(value, rawValue);
    };

    const onChangeValue = (value: string, rawValue: string) => {
        if (isInRange(value)) {
            onChangeValueProp?.(value, rawValue);
        }
        // if not in range, onChangeValue is not called
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
            min={min ? getLocalDateString(min) : undefined}
            max={max ? getLocalDateString(max) : undefined}
            type="date"
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
            <ReactDateTimePicker
                {...rest}
                {...fieldProps}
                optional={optional}
                isValidDate={(currentDate) => isInRange(getLocalDateString(currentDate.toDate()))}
            />
        </React.Suspense>
    );
};

export default DateField;
