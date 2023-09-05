import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';
import {getLocalDateTimeString} from './utils/time';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import {isFirefox} from './utils/platform';
import {useTheme} from './hooks';

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
    onChangeValue: onChangeValueProp,
    onBlur,
    value,
    defaultValue,
    min,
    /**
     * When typing a datetime value into the input field (inside a test for example), some browsers like Chrome
     * force the year to have exactly 6 digits. In order to prevent this, in case max value was not provided we
     * set it so that it only accepts datetime values with years having up to 4 digits.
     */
    max = new Date('9999-12-31T23:59'),
    ...rest
}) => {
    const hasNativePicker = React.useMemo(() => {
        if (isFirefox()) {
            // disabled for firefox because the picker has no option to select time
            return false;
        }
        return isInputTypeSupported('datetime-local');
    }, []);
    const processValue = (value: string) => (hasNativePicker ? value : value.replace(/\s/, 'T'));
    const {texts} = useTheme();

    const isInRange = (value: string): boolean => {
        const isoValue = processValue(value);
        if (min && isoValue && isoValue < getLocalDateTimeString(min)) {
            return false;
        }
        if (max && isoValue && isoValue > getLocalDateTimeString(max)) {
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
            min={min ? getLocalDateTimeString(min) : undefined}
            max={max ? getLocalDateTimeString(max) : undefined}
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
            <ReactDateTimePicker
                {...rest}
                {...fieldProps}
                optional={optional}
                withTime
                isValidDate={(currentDate) => isInRange(getLocalDateTimeString(currentDate.toDate()))}
            />
        </React.Suspense>
    );
};

export default FormDateField;
