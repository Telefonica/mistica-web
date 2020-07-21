import * as React from 'react';
import {createUseStyles} from './jss';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {isIos, isRunningAcceptanceTest} from './utils/platform';

import type {Theme} from './theme';
import type {InputState} from './text-field-components';

/**
 * Incomplete list, add more if needed
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
type AutoComplete =
    | 'on'
    | 'off'
    | 'name'
    | 'email'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'transaction-amount'
    | 'new-password'
    | 'current-password'
    | 'cc-type' // The type of payment instrument (such as "Visa" or "Master Card")
    | 'cc-name' // The full name as printed on or associated with a payment instrument such as a credit card
    | 'cc-number' // A credit card number or other number identifying a payment method, such as an account number
    | 'cc-exp' // A payment method expiration date, typically in the form "MM/YY" or "MM/YYYY"
    | 'cc-csc'; // The security code; on credit cards, this is the 3-digit verification number on the back of the card

interface TextFieldBaseProps {
    id: string;
    type?: string;
    autoComplete?: AutoComplete;
    autoFocus?: boolean;
    disabled?: boolean;
    error?: boolean;
    pattern?: string;
    required?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    name?: string;
    maxLength?: number;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
    style?: React.CSSProperties;
    value?: string;
    inputRef?: React.Ref<HTMLInputElement | HTMLSelectElement>;
    getSuggestions?: (value: string) => Array<string>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    // to pass custom props (eg: data attributes) to input element,
    inputProps?: {[name: string]: string | number};
    inputComponent?: React.ComponentType<any>;
    shrinkLabel?: boolean;
    focus?: boolean;
    fieldClassName?: string;
    fieldRef?: React.RefObject<HTMLDivElement>;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    children?: React.ReactNode;
}

const commonInputStyles = (theme: Theme) => ({
    background: 'none',
    border: 0,
    outline: 0,
    fontSize: 16,
    paddingRight: ({endIcon}: {endIcon: boolean}) => (endIcon ? 0 : 16),
    paddingLeft: ({prefix}: {prefix: boolean}) => (prefix ? 0 : 12),
    /* Workaround to avoid huge bullets on ios devices (-apple-system font related) */
    fontFamily: ({type}: {type: string}) =>
        type === 'password' && isIos() && !isRunningAcceptanceTest() ? 'arial' : 'inherit',
    color: theme.colors.textPrimary,
    caretColor: theme.colors.controlActive,
    width: '100%',
    textOverflow: 'ellipsis',
    '&::placeholder ': {
        opacity: 0,
        transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    '&:focus': {
        '&::placeholder ': {
            opacity: 0.5,
        },
    },
    '&:disabled': {
        color: theme.colors.border,
    },
    '&::-webkit-calendar-picker-indicator': {
        marginTop: ({label}: {label: string}) => (label ? -12 : 'initial'),
    },
});

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 112,
    },
    border: {
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 4,
        height: ({multiline}) => (multiline ? 152 : 56),
        display: 'flex',
        position: 'relative',
    },
    textArea: {
        resize: 'none',
        marginTop: ({label}) => (label ? 24 : 16),
        marginBottom: ({label}) => (label ? 8 : 16),
        ...commonInputStyles(theme),
    },
    input: {
        paddingTop: ({label}) => (label ? 24 : 16),
        paddingBottom: ({label}) => (label ? 8 : 16),
        height: '100%',
        ...commonInputStyles(theme),
    },
    endIcon: {
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
    },
    prefix: {
        paddingTop: ({label}) => (label ? 25 : 16),
        paddingBottom: ({label}) => (label ? 8 : 16),
        paddingLeft: 12,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        color: theme.colors.textSecondary,
        opacity: ({inputState}) => (inputState === 'default' ? 0 : 1),
        transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
}));

const TextFieldBase = React.forwardRef<any, TextFieldBaseProps>(
    (
        {
            error,
            helperText,
            label,
            inputProps,
            inputRef,
            defaultValue,
            value,
            onFocus,
            onBlur,
            inputComponent,
            prefix,
            endIcon,
            shrinkLabel,
            id,
            multiline = false,
            focus,
            fieldClassName,
            fieldRef,
            maxLength,
            children, // unused
            ...rest
        },
        ref
    ) => {
        const [inputState, setInputState] = React.useState<InputState>(
            defaultValue?.length || value?.length ? 'filled' : 'default'
        );
        const [characterCount, setCharacterCount] = React.useState(defaultValue?.length ?? 0);
        const classes = useStyles({
            inputState,
            error,
            endIcon,
            shrinkLabel,
            label,
            prefix,
            multiline,
            type: rest.type,
        });

        React.useEffect(() => {
            if (inputState !== 'focused' && value?.length) {
                setCharacterCount(value.length);
                setInputState('filled');
            }
            if (focus) {
                setInputState('focused');
            }
            if (focus === false && !value?.length) {
                // when textfield is used in selects it doesn't get or lose focus
                setInputState('default');
            }
            if (focus === false && value?.length) {
                setInputState('filled');
            }
        }, [inputState, value, focus]);

        React.useEffect(() => {
            if (rest.autoFocus) {
                setInputState('focused');
            }
        }, [rest.autoFocus]);

        const defaultInputElement = multiline ? 'textarea' : 'input';

        const inputRefProps = !inputComponent
            ? {
                  ref: (actualRef: HTMLInputElement) => {
                      [ref, inputRef].forEach((currentRef) => {
                          if (currentRef) {
                              if (typeof currentRef === 'function') {
                                  currentRef(actualRef);
                              } else {
                                  currentRef.current = actualRef;
                              }
                          }
                      });
                  },
              }
            : {
                  inputRef,
              };

        const props = {
            ...rest,
            maxLength,
            ...inputProps,
        };

        return (
            <FieldContainer
                helperText={
                    <HelperText
                        error={error}
                        leftText={helperText}
                        rightText={multiline && maxLength ? `${characterCount}/${maxLength}` : undefined}
                    />
                }
                multiline={multiline}
                className={fieldClassName}
                fieldRef={fieldRef}
            >
                {prefix && <div className={classes.prefix}>{prefix}</div>}
                {React.createElement(inputComponent || defaultInputElement, {
                    ...inputRefProps,
                    ...props,
                    id,
                    className: multiline ? classes.textArea : classes.input,
                    onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
                        setInputState('focused');
                        onFocus?.(event);
                    },
                    onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
                        if (event.target.value.length > 0) {
                            setInputState('filled');
                        } else {
                            setInputState('default');
                        }
                        onBlur?.(event);
                    },
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        // Workaround for systems where maxlength prop is applied onBlur (https://caniuse.com/#feat=maxlength)
                        if (maxLength === undefined || event.target.value.length <= maxLength) {
                            setCharacterCount(event.target.value.length);
                            props.onChange?.(event);
                        } else {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    },
                    defaultValue,
                    value,
                    ...(error && {'aria-invalid': true}),
                })}
                {label && (
                    <Label
                        error={error}
                        forId={id}
                        inputState={inputState}
                        shrinkLabel={shrinkLabel}
                        disabled={rest.disabled}
                    >
                        {label}
                    </Label>
                )}
                {endIcon && <div className={classes.endIcon}>{endIcon}</div>}
                {children}
            </FieldContainer>
        );
    }
);

export default TextFieldBase;
