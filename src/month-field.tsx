'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import {getLocalYearMonthString} from './utils/time';
import {useTheme} from './hooks';
import * as dateStyles from './date-field.css';
import {iconSize} from './icon-button.css';

import type {CommonFormFieldProps} from './text-field-base';

export interface DateFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    min?: Date;
    max?: Date;
}

const ReactDateTimePicker = React.lazy(
    () => import(/* webpackChunkName: "date-time-picker" */ './date-time-picker')
);

const DateField = ({
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
    dataAttributes,
    ...rest
}: DateFieldProps): JSX.Element => {
    const processValue = (value: string) => value;
    const hasNativePicker = React.useMemo(() => isInputTypeSupported('month'), []);
    const {texts} = useTheme();

    const isInRange = (value: string): boolean => {
        if (min && value && value < getLocalYearMonthString(min)) {
            return false;
        }
        if (max && value && value > getLocalYearMonthString(max)) {
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
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            min={min ? getLocalYearMonthString(min) : undefined}
            max={max ? getLocalYearMonthString(max) : undefined}
            type="month"
            endIconOverlay={
                <div className={dateStyles.iconContainer}>
                    <IconCalendarRegular size={iconSize.default} />
                </div>
            }
            dataAttributes={{'component-name': 'MonthField', ...dataAttributes}}
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
                isValidDate={(currentDate) => isInRange(getLocalYearMonthString(currentDate.toDate()))}
                mode="year-month"
                dataAttributes={{'component-name': 'MonthField', ...dataAttributes}}
            />
        </React.Suspense>
    );
};

export default DateField;
