'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {FieldEndIcon, TextFieldBaseAutosuggest} from './text-field-base';
import {useTheme} from './hooks';
import IconEyeOffRegular from './generated/mistica-icons/icon-eye-off-regular';
import IconEyeRegular from './generated/mistica-icons/icon-eye-regular';
import * as tokens from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';

export interface PasswordFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const PasswordAdornment = ({
    isVisible,
    setVisibility,
    focus,
}: {
    isVisible: boolean;
    setVisibility: (isVisible: boolean) => void;
    focus: () => void;
}) => {
    const {texts, t} = useTheme();
    return (
        <FieldEndIcon
            checkedProps={{
                Icon: IconEyeOffRegular,
                'aria-label': texts.disablePasswordVisibility || t(tokens.disablePasswordVisibility),
            }}
            uncheckedProps={{
                Icon: IconEyeRegular,
                'aria-label': texts.enablePasswordVisibility || t(tokens.enablePasswordVisibility),
            }}
            checked={isVisible}
            onChange={(visible) => {
                setVisibility(visible);
                focus();
            }}
        />
    );
};

const PasswordField = ({
    disabled,
    error,
    helperText,
    name,
    label,
    optional,
    validate,
    validateOnBlurInsideForm,
    onChange,
    onChangeValue,
    onBlur,
    value,
    autoComplete = 'current-password',
    defaultValue,
    dataAttributes,
    ...rest
}: PasswordFieldProps): JSX.Element => {
    const [isVisible, setIsVisible] = React.useState(false);
    const caretPositionRef = React.useRef<number>(0);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const processValue = (value: string) => value;

    const focus = () => {
        const input = inputRef.current;
        if (input) {
            if (input.selectionStart !== null) {
                caretPositionRef.current = input.selectionStart;
            }
            input.focus();
        }
    };

    React.useEffect(() => {
        const input = inputRef.current;
        if (input) {
            const rafId = requestAnimationFrame(() => {
                input.selectionStart = caretPositionRef.current;
                input.selectionEnd = caretPositionRef.current;
            });

            return () => {
                cancelAnimationFrame(rafId);
            };
        }
    }, [isVisible, caretPositionRef, inputRef]);

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
            type={isVisible ? 'text' : 'password'}
            inputRef={(field: HTMLInputElement | null) => {
                fieldProps.inputRef(field);
                inputRef.current = field;
            }}
            autoComplete={autoComplete}
            endIcon={<PasswordAdornment focus={focus} isVisible={isVisible} setVisibility={setIsVisible} />}
            dataAttributes={{'component-name': 'PasswordField', testid: 'PasswordField', ...dataAttributes}}
        />
    );
};

export default PasswordField;
