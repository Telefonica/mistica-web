'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import IconTimeRegular from './generated/mistica-icons/icon-time-regular';
import {useTheme} from './hooks';
import * as dateStyles from './date-field.css';
import {iconSize} from './icon-button.css';
import * as tokens from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';

export interface TimeFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    min?: string;
    max?: string;
}

const TimeField = ({
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
}: TimeFieldProps): JSX.Element => {
    const processValue = (value: string) => value;
    const {texts, t} = useTheme();

    const isInRange = (value: string): boolean => {
        if (min && value && value < min) {
            return false;
        }
        if (max && value && value > max) {
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

    return (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            min={min}
            max={max}
            type="time"
            endIconOverlay={
                <div className={dateStyles.iconContainer} data-testid="endIcon">
                    <IconTimeRegular size={iconSize.small} />
                </div>
            }
            dataAttributes={{'component-name': 'TimeField', testid: 'TimeField', ...dataAttributes}}
        />
    );
};

export default TimeField;
