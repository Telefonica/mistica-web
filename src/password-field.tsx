import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {useTheme} from './hooks';
import IconButton from './icon-button';
import { IconAccesibilityRegular } from '../playroom/components';
import { IconEyeRegular } from '../playroom/components';
import { createUseStyles } from './jss';

import type {CommonFormFieldProps} from './text-field-base';

export interface PasswordFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const usePasswordAdornmentStyles = createUseStyles((theme) => ({
    shadow: {
        [theme.mq.supportsHover]: {
            '&:hover': {
                backgroundColor: theme.colors.backgroundAlternative,
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
        padding: 8,
        margin: -8,
        borderRadius: '50%',
        backgroundColor: undefined,
        transition: 'background-color 0.2s ease-in-out',
    };
    return (
        <IconButton
            aria-label={texts.togglePasswordVisibilityLabel}
            onPress={() => {
                setVisibility(!isVisible);
                focus();
            }}
            size={40}
            className={classes.shadow}
            style={style}
        >
                {isVisible ? <IconAccesibilityRegular /> : <IconEyeRegular />}
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
        <TextFieldBaseAutosuggest
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
