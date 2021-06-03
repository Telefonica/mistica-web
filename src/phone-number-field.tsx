import * as React from 'react';
import {useRifm} from 'rifm';
import {formatAsYouType} from '@telefonica/libphonenumber';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './text-field-base';
import type {RegionCode} from './utils/region-code';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';

const formatPhone = (regionCode: RegionCode, number: string): string =>
    formatAsYouType(number.replace(/[^\d+*#]/g, ''), regionCode);

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

const PhoneInput: React.FC<Props> = ({inputRef, value, defaultValue, onChange, ...other}) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;

    const handleChangeValue = React.useCallback(
        (newFormattedValue) => {
            if (!isControlledByParent) {
                setSelfValue(newFormattedValue);
            }
            if (ref.current) {
                onChange?.(createChangeEvent(ref.current, newFormattedValue));
            }
        },
        [isControlledByParent, onChange]
    );

    const {i18n} = useTheme();
    const format = React.useCallback(
        // The final replacement of "-" to "@" is to workaround a bug in rifm library
        // otherwise the cursor position is incorrectly positioned
        // also note the "@" is replaced back to "-" in `replace` param in `useRifm`
        (val: string): string => formatPhone(i18n.phoneNumberFormattingRegionCode, val).replace(/-/g, '@'),
        [i18n.phoneNumberFormattingRegionCode]
    );

    const rifm = useRifm({
        format,
        value: controlledValue,
        onChange: handleChangeValue,
        accept: /[\d\-()+#*]+/g,
        replace: (s) => s.replace(/@/g, '-'),
    });

    return (
        <input
            {...other}
            value={rifm.value}
            onChange={rifm.onChange}
            type="tel" // shows telephone keypad in Android and iOS
            ref={combineRefs(inputRef, ref)}
        />
    );
};

export interface PhoneNumberFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    prefix?: string;
    getSuggestions?: (value: string) => Array<string>;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
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
    const processValue = (s: string) => s.replace(/[^\d]/g, ''); // keep only digits

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

    return <TextFieldBase {...rest} {...fieldProps} type="phone" inputComponent={PhoneInput} />;
};

export default PhoneNumberField;
