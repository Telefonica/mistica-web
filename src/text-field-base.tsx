import * as React from 'react';
import {createUseStyles} from './jss';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {isIos, isRunningAcceptanceTest, isChrome} from './utils/platform';
import {useAriaId, useTheme} from './hooks';
import classNames from 'classnames';

import type {Theme} from './theme';
import type {InputState} from './text-field-components';
import type {FieldValidator} from './form-context';

/**
 * Incomplete list, add more if needed
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export type AutoComplete =
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

export interface CommonFormFieldProps {
    autoFocus?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    id?: string;
    label: string;
    name: string;
    optional?: boolean;
    maxLength?: number;
    // use `inputProps` to pass props (as attributes) to the input element, for example a data-testid
    inputProps?: {[prop: string]: string | number};
    validate?: FieldValidator;
    autoComplete?: AutoComplete;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    fullWidth?: boolean;
    getSuggestions?: (text: string) => Array<string>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextFieldBaseProps {
    id?: string;
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
    startIcon?: React.ReactNode;
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
    fieldRef?: React.RefObject<HTMLDivElement>;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    children?: React.ReactNode;
    inputMode?: string;
}

const commonInputStyles = (theme: Theme) => ({
    background: 'none',
    border: 0,
    outline: 0,
    fontSize: 16,
    paddingRight: ({endIcon}: {endIcon: boolean}) => (endIcon ? 0 : 16),
    paddingLeft: ({prefix, startIcon}: {prefix: boolean; startIcon: boolean}) => {
        if (prefix) {
            return 0;
        }
        if (startIcon) {
            return 48;
        }
        return 12;
    },
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
        WebkitAppearance: 'none',
        '&::-webkit-search-cancel-button': {
            WebkitAppearance: 'none',
        },
        '&::-webkit-search-decoration': {
            WebkitAppearance: 'none',
        },
    },
    endIcon: {
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
    },
    startIcon: {
        pointerEvents: 'none', // passthrough click events to the input
        paddingLeft: 12,
        paddingRight: 12,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        position: 'absolute',
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

// Chrome ignores 'off': https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164
const fixAutoComplete = (autoComplete?: AutoComplete) =>
    autoComplete === 'off' && isChrome() ? 'nope' : autoComplete;

const updateRef = (ref: React.Ref<any> | undefined, refValue: any) => {
    if (ref) {
        if (typeof ref === 'function') {
            ref(refValue);
        } else {
            // @ts-expect-error - current is typed as read-only
            ref.current = refValue;
        }
    }
};

const TextFieldBaseComponent = React.forwardRef<any, TextFieldBaseProps>(
    (
        {
            error,
            helperText,
            label: labelProp,
            inputProps,
            inputRef,
            defaultValue,
            value,
            onFocus,
            onBlur,
            inputComponent,
            prefix,
            startIcon,
            endIcon,
            shrinkLabel,
            multiline = false,
            focus,
            fieldRef,
            maxLength,
            children,
            id: idProp,
            autoComplete: autoCompleteProp,
            fullWidth,
            ...rest
        },
        ref
    ) => {
        const id = useAriaId(idProp);
        const [inputState, setInputState] = React.useState<InputState>(
            defaultValue?.length || value?.length ? 'filled' : 'default'
        );
        const {texts} = useTheme();
        const [characterCount, setCharacterCount] = React.useState(defaultValue?.length ?? 0);
        const label = rest.required
            ? labelProp
            : `${labelProp || ''} (${texts.formFieldOptionalLabelSuffix})`;

        const classes = useStyles({
            inputState,
            error,
            endIcon,
            startIcon,
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

        // FIXME it should be enough to forward refs. inputRef could be removed
        const inputRefProps = inputComponent
            ? {inputRef}
            : {
                  ref: (refValue: HTMLInputElement) => {
                      updateRef(ref, refValue);
                      updateRef(inputRef, refValue);
                  },
              };

        const props = {
            ...rest,
            maxLength,
            autoComplete: fixAutoComplete(autoCompleteProp),
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
                fullWidth={fullWidth}
                fieldRef={fieldRef}
            >
                {startIcon && <div className={classes.startIcon}>{startIcon}</div>}
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
                        style={startIcon ? {marginLeft: 48, left: 0} : {}}
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

const useSuggestionsStyles = createUseStyles(() => ({
    menuItem: {
        lineHeight: 1.5,
        padding: '6px 16px',
        height: 48,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '& hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    menuItemSelected: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
    suggestionsContainer: {
        boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 2, // one more than TextField label
        '& > ul': {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
    },
}));

const Autosuggest = React.lazy(() => import(/* webpackChunkName: "react-autosuggest" */ 'react-autosuggest'));

const TextFieldBase = React.forwardRef<any, TextFieldBaseProps>(({getSuggestions, ...props}, ref) => {
    const [suggestions, setSuggestions] = React.useState<Array<string>>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const classes = useSuggestionsStyles();

    if (getSuggestions && (props.value === undefined || props.defaultValue !== undefined)) {
        throw Error('Fields with suggestions must be used in controlled mode');
    }

    return getSuggestions ? (
        <React.Suspense
            fallback={
                <TextFieldBaseComponent
                    {...props}
                    // This label override while loading is needed in acceptance tests because
                    // while the test is typing, the component could be remounted.
                    // By hiding the label, we ensure that the test selects the loaded component
                    label={isRunningAcceptanceTest() ? '' : props.label}
                    autoComplete={fixAutoComplete('off') as AutoComplete}
                    ref={ref}
                />
            }
        >
            <Autosuggest
                // @ts-expect-error Autosuggest expects slightly different types
                inputProps={{
                    ...props,
                    autoComplete: fixAutoComplete('off'),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>, {newValue}) => {
                        // hack to mutate event value
                        e.target = {...e.target, value: newValue};
                        e.currentTarget = {...e.currentTarget, value: newValue};
                        props.onChange?.(e);
                    },
                }}
                renderInputComponent={(inputProps) => (
                    <TextFieldBaseComponent
                        {...(inputProps as TextFieldBaseProps)}
                        inputRef={(refValue) => {
                            updateRef(inputRef, refValue);
                            updateRef(props.inputRef, refValue);
                            updateRef(ref, refValue);
                        }}
                    />
                )}
                suggestions={suggestions}
                onSuggestionsFetchRequested={({value}) => setSuggestions(getSuggestions(value))}
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={(suggestion: any) => suggestion}
                renderSuggestion={(suggestion: any, {isHighlighted}) => (
                    <div
                        role="menuitem"
                        className={classNames(classes.menuItem, {
                            [classes.menuItemSelected]: isHighlighted,
                        })}
                    >
                        {suggestion}
                    </div>
                )}
                renderSuggestionsContainer={(options) => (
                    <div
                        {...options.containerProps}
                        style={{
                            width: inputRef.current ? inputRef.current.clientWidth + 2 : 0, // +2 due to borders (input)
                        }}
                        className={classes.suggestionsContainer}
                    >
                        {options.children}
                    </div>
                )}
            />
        </React.Suspense>
    ) : (
        <TextFieldBaseComponent {...props} ref={ref} />
    );
});

export default TextFieldBase;
