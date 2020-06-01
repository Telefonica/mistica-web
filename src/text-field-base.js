// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {isIos, isRunningAcceptanceTest} from './utils/platform';

import type {PhoneInputType} from './phone-input';

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

type CommonProps = {
    id: string,
    autoComplete?: AutoComplete,
    autoFocus?: boolean,
    disabled?: boolean,
    error?: boolean,
    pattern?: string,
    required?: boolean,
    fullWidth?: boolean,
    helperText?: string,
    label?: string,
    placeholder?: string,
    defaultValue?: string,
    name?: string,
    maxLength?: number,
    prefix?: React.Node,
    endIcon?: React.Node,
    style?: Object,
    value?: string,
    inputRef?: React.Ref<'input'>,
    getSuggestions?: (value: string) => Array<string>,
    onChange?: (event: SyntheticInputEvent<*>) => void,
    onBlur?: (event: SyntheticEvent<*>) => void,
    onFocus?: (event: SyntheticEvent<*>) => void,
    onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
    // to pass custom props (eg: data attributes) to input element,
    inputProps?: {[string]: string, ...},
    inputComponent?: React.ComponentType<any>,
    shrinkLabel?: boolean,
    focus?: boolean,
    fieldStyle?: Object,
    fieldRef?: React.Ref<'div'>,
    children: React.Node,
    onInput?: (event: SyntheticInputEvent<*>) => void,
};

type Props =
    | {
          ...CommonProps,
          onChangeValue?: (string) => void,
          multiline?: boolean,
          type?: 'text',
      }
    | {
          ...CommonProps,
          onChangeValue?: (string) => void,
          type:
              | 'email'
              | 'password'
              | 'credit-card-name'
              | 'credit-card-number'
              | 'credit-card-cvv'
              | 'integer'
              | 'decimal'
              | 'date',
      }
    | {
          ...CommonProps,
          onChangeValue?: (string) => void,
          // Phone Input is defined in a different module
          // this way libphonenumber is not imported for all inputs
          Input: PhoneInputType,
          type: 'phone',
      }
    | {
          ...CommonProps,
          onChangeValue?: ({
              month: number,
              year: number,
              raw: string,
          }) => void,
          type: 'credit-card-expiration',
      };

const commonInputStyles = (theme) => ({
    background: 'none',
    border: 0,
    outline: 0,
    fontSize: 16,
    paddingRight: ({endIcon}) => (endIcon ? 0 : 16),
    paddingLeft: ({prefix}) => (prefix ? 0 : 12),
    /* Workaround to avoid huge bullets on ios devices (-apple-system font related) */
    fontFamily: ({type}) =>
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
        marginTop: ({label}) => (label ? -12 : undefined),
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

const TextFieldBase: React.ComponentType<Props> = React.forwardRef(
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
            fieldStyle,
            fieldRef,
            children,
            maxLength,
            ...rest
        }: Props,
        ref
    ) => {
        const [inputState, setInputState] = React.useState(
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
                  ref: (actualRef) => {
                      [ref, inputRef].forEach((currentRef) => {
                          if (currentRef) {
                              if (typeof currentRef === 'function') {
                                  currentRef(actualRef);
                              } else {
                                  // $FlowFixMe
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
            // $FlowFixMe
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
                style={fieldStyle}
                fieldRef={fieldRef}
            >
                {prefix && <div className={classes.prefix}>{prefix}</div>}
                {React.createElement(inputComponent || defaultInputElement, {
                    ...inputRefProps,
                    ...props,
                    id,
                    className: multiline ? classes.textArea : classes.input,
                    onFocus: (event) => {
                        setInputState('focused');
                        onFocus?.(event);
                    },
                    onBlur: (event) => {
                        if (event.target.value.length > 0) {
                            setInputState('filled');
                        } else {
                            setInputState('default');
                        }
                        onBlur?.(event);
                    },
                    onChange: (event) => {
                        // Workaround for systems where maxlength prop is applied onBlur (https://caniuse.com/#feat=maxlength)
                        if (maxLength === undefined || event.target.value.length <= maxLength) {
                            setCharacterCount(event.target.value.length);
                            props.onChange(event);
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
