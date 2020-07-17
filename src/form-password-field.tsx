import * as React from 'react';
import {useForm} from './form-context';
import TextFieldBase from './text-field-base';
import {useTheme} from './hooks';
import IconButton from './icon-button';
import Visibility from './icons/icon-visibility';
import VisibilityOff from './icons/icon-visibility-off';

import type {CommonFormFieldProps} from './form';
import {createUseStyles} from './jss';

interface FormPasswordFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
}

const usePasswordAdornmentStyles = createUseStyles(() => ({
    shadow: {
        ['@media (hover: hover)']: {
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
            label={texts.togglePasswordVisibilityLabel}
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

const FormEmailField: React.FC<FormPasswordFieldProps> = ({
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
    ...rest
}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const {
        rawValues,
        setRawValue,
        values,
        setValue,
        formStatus,
        formErrors,
        setFormError,
        register,
    } = useForm();

    const processValue = (value: string) => value;

    const focus = () => {
        const input = inputRef.current;
        if (input) {
            input.focus();
            // neeeded to place the caret at the end
            setTimeout(() => {
                const v = input.value;
                input.value = '';
                input.value = v;
            }, 0);
        }
    };

    return (
        <TextFieldBase
            {...rest}
            type={isVisible ? 'text' : 'password'}
            inputRef={(field) => {
                register({name, field, validate});
                // @ts-expect-error - current is typed as read-only
                inputRef.current = field;
            }}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name]}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                setRawValue({name, value: rawValue});
                setValue({name, value});
                setFormError({name, error: ''});
                onChange?.(event);
                onChangeValue?.(value, rawValue);
            }}
            onBlur={(e) => {
                setFormError({name, error: validate?.(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            autoComplete={autoComplete}
            endIcon={<PasswordAdornment focus={focus} isVisible={isVisible} setVisibility={setIsVisible} />}
        />
    );
};

export default FormEmailField;
