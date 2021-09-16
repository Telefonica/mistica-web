import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {useTheme} from './hooks';
import IconButton from './icon-button';
import Visibility from './icons/icon-visibility';
import VisibilityOff from './icons/icon-visibility-off';
import {createUseStyles} from './jss';

import type {CommonFormFieldProps} from './text-field-base';

export interface PasswordFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const usePasswordAdornmentStyles = createUseStyles(() => ({
    shadow: {
        // Only apply hover effect to user agents using fine pointer devices (a mouse, for example)
        // Also enabled for (pointer: none) for acceptance tests, where (pointer: fine) doesn't match.
        // WARNING: you may be tempted to use @media (hover: hover) instead, but that doesn't work as expected in some android browsers.
        // See: https://hover-pointer-media-query.glitch.me/ and https://github.com/mui-org/material-ui/issues/15736
        ['@media (pointer: fine), (pointer: none)']: {
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
        },
    },
}));

const PasswordAdornment: React.FC<{
    isVisible: boolean;
    setVisibility: (isVisible: boolean) => void;
    focus: () => void;
}> = ({isVisible, setVisibility, focus}) => {
    const {texts} = useTheme();
    const classes = usePasswordAdornmentStyles();
    const style = {
        backgroundSize: '200%',
        padding: 12,
        margin: -12,
        borderRadius: '50%',
        backgroundColor: undefined,
    };
    return (
        <IconButton
            aria-label={texts.togglePasswordVisibilityLabel}
            onPress={() => {
                setVisibility(!isVisible);
                focus();
            }}
            size={48}
            className={classes.shadow}
            style={style}
        >
            {isVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
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
    const inputRef = React.useRef<HTMLInputElement>(null);

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
            input.selectionStart = caretPositionRef.current;
            input.selectionEnd = caretPositionRef.current;
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
        <TextFieldBase
            {...rest}
            {...fieldProps}
            type={isVisible ? 'text' : 'password'}
            inputRef={(field) => {
                fieldProps.inputRef(field as HTMLInputElement);
                // @ts-expect-error - current is typed as read-only
                inputRef.current = field;
            }}
            autoComplete={autoComplete}
            endIcon={<PasswordAdornment focus={focus} isVisible={isVisible} setVisibility={setIsVisible} />}
        />
    );
};

export default PasswordField;
