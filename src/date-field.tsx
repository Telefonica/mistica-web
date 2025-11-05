'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {isInputTypeSupported} from './utils/dom';
import {isServerSide} from './utils/environment';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import {getLocalDateString} from './utils/time';
import {useTheme} from './hooks';
import {isFirefox} from './utils/platform';
import * as styles from './date-field.css';
import {iconSize} from './icon-button.css';
import * as tokens from './text-tokens';

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
    label,
    optional,
    validate: validateProp,
    validateOnBlurInsideForm,
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
    const hasNativePicker = React.useMemo(() => {
        if (isFirefox()) {
            // disabled in firefox because it shows a close button over the icon and can't be styled
            return false;
        }
        return isInputTypeSupported('date');
    }, []);
    const {texts, t} = useTheme();

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
            return texts.formDateOutOfRangeError || t(tokens.formDateOutOfRangeError);
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
        label,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        validateOnBlurInsideForm,
        onChange,
        onChangeValue,
    });

    const nativePicker = (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            min={min ? getLocalDateString(min) : undefined}
            max={max ? getLocalDateString(max) : undefined}
            type="date"
            endIconOverlay={
                <div className={styles.iconContainer} data-testid="endIcon">
                    <IconCalendarRegular size={iconSize.default} />
                </div>
            }
            dataAttributes={{'component-name': 'DateField', testid: 'DateField', ...dataAttributes}}
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
                dataAttributes={{'component-name': 'DateField', testid: 'DateField', ...dataAttributes}}
            />
        </React.Suspense>
    );
};

export default DateField;
