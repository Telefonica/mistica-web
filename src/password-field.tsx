'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {useTheme} from './hooks';
import {BaseIconButton} from './icon-button';
import IconEyeOffRegular from './generated/mistica-icons/icon-eye-off-regular';
import IconEyeRegular from './generated/mistica-icons/icon-eye-regular';
import * as styles from './password-field.css';
import {pxToRem} from './utils/css';

import type {CommonFormFieldProps} from './text-field-base';

export interface PasswordFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const PasswordAdornment: React.FC<{
    isVisible: boolean;
    setVisibility: (isVisible: boolean) => void;
    focus: () => void;
}> = ({isVisible, setVisibility, focus}) => {
    const {texts} = useTheme();
    return (
        <BaseIconButton
            aria-label={texts.togglePasswordVisibilityLabel}
            onPress={() => {
                setVisibility(!isVisible);
                focus();
            }}
            size={pxToRem(40)}
            className={styles.shadow}
        >
            {isVisible ? <IconEyeOffRegular size={pxToRem(24)} /> : <IconEyeRegular size={pxToRem(24)} />}
        </BaseIconButton>
    );
};

const PasswordField: React.FC<PasswordFieldProps> = ({
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
    autoComplete = 'current-password',
    defaultValue,
    ...rest
}) => {
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
        />
    );
};

export default PasswordField;
