import * as React from 'react';
import Visibility from './icons/icon-visibility';
import VisibilityOff from './icons/icon-visibility-off';
import {useAriaId, useTheme, useScreenSize} from './hooks';
import {isRunningAcceptanceTest} from './utils/platform';
import TextFieldBase from './text-field-base';
import IconButton from './icon-button';
import IconCreditcard from './icons/icon-creditcard';
import IconVisa from './icons/icon-visa';
import IconMastercard from './icons/icon-mastercard';
import IconAmex from './icons/icon-amex';
import {createUseStyles} from './jss';
import classNames from 'classnames';
import {useForm} from './form-context';
import {isVisa, isMasterCard, isAmericanExpress} from './utils/credit-card';

import type {PhoneInputType} from './phone-input';
import type {Locale} from './utils/locale';

// Zeplin definition:
// https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a219485e46461be75d

// https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
// https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill

export const DEFAULT_WIDTH = 328;

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

interface CommonTextFieldProps {
    id?: string;
    autoComplete?: AutoComplete;
    autoFocus?: boolean;
    disabled?: boolean;
    error?: boolean;
    pattern?: string;
    required?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    name?: string;
    maxLength?: number;
    prefix?: string;
    endIcon?: React.ReactNode;
    style?: React.CSSProperties;
    value?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    getSuggestions?: (value: string) => Array<string>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    // to pass custom props (eg: data attributes) to input element
    inputProps?: {[prop: string]: string | number};
}

interface SimpleTextFieldProps extends CommonTextFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    multiline?: boolean;
    type?: 'text';
    Input?: undefined;
}

interface OtherTextFieldProps extends CommonTextFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    type:
        | 'email'
        | 'password'
        | 'credit-card-name'
        | 'credit-card-number'
        | 'credit-card-cvv'
        | 'integer'
        | 'decimal'
        | 'date';
    Input?: undefined;
    multiline?: undefined;
}

interface PhoneTextFieldProps extends CommonTextFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    // Phone Input is defined in a different module
    // this way libphonenumber is not imported for all inputs
    type: 'phone';
    Input: PhoneInputType;
    multiline?: undefined;
}

interface CreditCardExpirationTextFieldProps extends CommonTextFieldProps {
    onChangeValue?: (
        value: {
            month: number;
            year: number;
            raw: string;
        },
        rawValue: string
    ) => void;
    type: 'credit-card-expiration';
    Input?: undefined;
    multiline?: undefined;
}

export type TextFieldProps =
    | SimpleTextFieldProps
    | OtherTextFieldProps
    | PhoneTextFieldProps
    | CreditCardExpirationTextFieldProps;

const Autosuggest = React.lazy(() => import(/* webpackChunkName: "react-autosuggest" */ 'react-autosuggest'));

const IntegerInput = ({inputRef, value, defaultValue, ...rest}: any) => {
    const format = (v?: string) => String(v ?? '').replace(/[^\d]/g, '');

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        // strip all non numeric characters
        e.currentTarget.value = format(e.currentTarget.value);
    };
    return (
        <input
            {...rest}
            inputMode="numeric" // shows numeric keypad in Chrome for Android
            pattern="[0-9]*" // shows numeric keypad in iOS
            onInput={handleInput}
            ref={inputRef}
            type="text"
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
        />
    );
};

const getLocalDecimalChar = (locale: Locale): string => {
    try {
        return (1.1).toLocaleString(locale.replace('_', '-'))[1];
    } catch (e) {
        return '.';
    }
};

const DecimalInput = ({inputRef, value, defaultValue, ...rest}: any) => {
    const {i18n} = useTheme();
    const localDecimalChar = getLocalDecimalChar(i18n.locale);

    const format = (value?: string) => {
        const parts = String(value ?? '')
            .replace(/[^.,\d]/g, '') // remove non digits or decimal separator chars
            .replace(/[.,]/g, localDecimalChar) // use local decimal char
            .split(localDecimalChar);

        if (parts.length === 0) {
            // empty
            return '';
        }

        if (parts.length === 1) {
            // no fractional part, return "as is"
            return parts[0];
        }

        // value includes one or more decimal separators, keep the first one
        return parts.shift() + localDecimalChar + parts.join('');
    };

    return (
        <input
            {...rest}
            type="text"
            inputMode="decimal" // shows decimal keypad in Chrome for Android
            // shows regular keypad in iOS (for now there's no way to show a decimal keypad)
            // inputMode will be supported in iOS 12.2 https://bugs.webkit.org/show_bug.cgi?id=183621
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            onInput={(e) => {
                e.currentTarget.value = format(e.currentTarget.value);
            }}
            ref={inputRef}
        />
    );
};

const CreditCardInput = ({inputRef, defaultValue, value, maxLength, onInput, ...rest}: any) => {
    // Naive implementation, some issues in cursor position when editing
    const format = (s?: string) => {
        const chars = String(s ?? '')
            .replace(/[^\d]/g, '')
            .slice(0, 16)
            .split('');

        const result = [];

        // separate in groups of 4 numbers
        while (chars.length) {
            result.push(...chars.splice(0, 4));
            if (chars.length) result.push(' ');
        }

        return result.join('');
    };

    return (
        <input
            {...rest}
            type="text"
            inputMode="decimal"
            maxLength={maxLength ?? '19'} // 16 digits + 3 spaces
            onInput={(e) => {
                e.currentTarget.value = format(e.currentTarget.value);
                onInput?.(e);
            }}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            ref={inputRef}
        />
    );
};

const MonthYearDateInput = ({inputRef, defaultValue, value, ...rest}: any) => {
    const {texts} = useTheme();
    const prevValue = React.useRef(value || '');

    /**
     * 1) characters other than [0-9] and '/' are removed
     * 2) automatically insert "/" as you type
     * 3) the user must be able to remove text (eg: deleting the slash must not automatically insert a new one)
     */
    const format = (s: string) => {
        // remove invalid characters
        let value = s.replace(/[^\d/]/g, '').replace(/\/+/g, '/');

        // remove extra slashes: "01/12/34" => "01/12"
        const [month, year] = value.split('/');
        if (year) {
            value = `${month}/${year}`;
        }

        const isDeleting = String(prevValue.current).length >= value.length;

        if (isDeleting) {
            // do not format when deleting
        } else if (value === '/') {
            value = ''; // missing month, invalid
        } else if (value.length === 1 && parseInt(value) >= 2) {
            value = `0${value}/`; // month is > 1, prepend with "0"
        } else if (value.length === 2) {
            if (value[1] === '/') {
                value = `0${value}`; // prepend "0" to "1/"
            } else if (parseInt(month) > 12 || parseInt(month) < 1) {
                value = value[0]; // if month is invalid remove last character
            } else {
                value = `${value}/`; // append "/" to two-digit size months
            }
        }

        prevValue.current = value;
        return value;
    };

    return (
        <input
            {...rest}
            placeholder={texts.expirationDatePlaceholder}
            type="text"
            inputMode="decimal"
            maxLength="5" // MM/YY
            onInput={(e) => {
                e.currentTarget.value = format(e.currentTarget.value);
            }}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            ref={inputRef}
        />
    );
};

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

const useStylesCCAdornment = createUseStyles(() => ({
    flip: {
        perspective: 1000,
    },
    flipInner: {
        position: 'relative',
        transition: 'transform 0.4s',
        transformStyle: 'preserve-3d',
        '& div': {
            backfaceVisibility: 'hidden',
        },
        transform: ({showBackface}) => (showBackface ? 'rotateY(180deg)' : undefined),
    },
    flipFront: {
        position: 'absolute',
    },
    flipBack: {
        transform: 'rotateY(180deg)',
    },
}));

const getAnimationTarget = (value?: string) => {
    if (isVisa(value)) {
        return <IconVisa />;
    }
    if (isMasterCard(value)) {
        return <IconMastercard />;
    }
    if (isAmericanExpress(value)) {
        return <IconAmex />;
    }
    return null;
};

const initialState = {
    showBackface: false,
    animationTarget: <IconCreditcard />,
    isAnimating: false,
};

const reducer = (
    state: typeof initialState,
    {
        type,
        value,
    }: {
        type: string;
        value?: string;
    }
) => {
    if (type === 'INPUT') {
        const animationTarget = getAnimationTarget(value);
        if (animationTarget && !state.showBackface) {
            return {animationTarget, showBackface: true, isAnimating: true};
        }
        if (!isVisa(value) && !isMasterCard(value) && !isAmericanExpress(value) && state.showBackface) {
            return {animationTarget: state.animationTarget, showBackface: false, isAnimating: true};
        }
        if (animationTarget && state.showBackface) {
            return {
                ...state,
                animationTarget,
            };
        }
    }
    if (type === 'TRANSITION_END') {
        return {...state, isAnimating: false};
    }
    return state;
};

const CreditcardAdornment = ({value}: {value?: string}) => {
    const [{showBackface, animationTarget, isAnimating}, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        dispatch({type: 'INPUT', value});
    }, [value]);

    const classes = useStylesCCAdornment({showBackface});

    return (
        <div className={classes.flip}>
            <div
                className={classes.flipInner}
                onTransitionEnd={() => isAnimating && dispatch({type: 'TRANSITION_END'})}
            >
                <div className={classes.flipFront}>
                    <IconCreditcard />
                </div>
                <div className={classes.flipBack}>{animationTarget}</div>
            </div>
        </div>
    );
};

const useStyles = createUseStyles(() => ({
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
    },
}));

const TextField: React.FC<TextFieldProps> = ({
    onChange,
    onChangeValue,
    Input,
    type = 'text',
    style,
    fullWidth,
    inputProps = {},
    getSuggestions,
    prefix,
    endIcon,
    inputRef: externalInputRef,
    maxLength,
    required,
    disabled,
    ...props
}) => {
    const {formStatus} = useForm();
    const [isPasswordVisible, setPasswordVisibility] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [currentInputValue, setCurrentInputValue] = React.useState(props.value || props.defaultValue);
    const {isMobile} = useScreenSize();
    const classes = useStyles();
    const id = useAriaId(props.id);
    const {texts} = useTheme();

    // in mobile, fullWidth by default
    const isFullWidth = fullWidth ?? isMobile;

    let processValue = (v: string | number): any => v;

    const focus = (goToEnd: boolean) => () => {
        const input = inputRef.current;
        if (input && input.focus) {
            input.focus();
            if (goToEnd && input instanceof HTMLInputElement) {
                setTimeout(
                    (actualValue) => {
                        input.value = '';
                        input.value = actualValue;
                    },
                    0,
                    input.value
                );
            }
        }
    };

    const newProps: Omit<TextFieldProps, 'type'> & {
        inputMode?: string;
        fieldStyle?: React.CSSProperties;
        shrinkLabel?: boolean;
        inputComponent?: React.ReactNode;
        onInput?: React.FormEventHandler<HTMLInputElement>;
        type: string;
        multiline?: boolean;
    } = {
        ...props,
        disabled: !!disabled || formStatus === 'sending',
        maxLength,
        id,
        type,
        inputRef: (actualRef: HTMLInputElement) => {
            [externalInputRef, inputRef].forEach((currentRef) => {
                if (currentRef) {
                    if (typeof currentRef === 'function') {
                        currentRef(actualRef);
                    } else {
                        // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
                        currentRef.current = actualRef;
                    }
                }
            });
        },
        inputMode: undefined,
        inputProps,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(e);
            }
            if (onChangeValue) {
                onChangeValue(processValue(e.currentTarget.value), e.currentTarget.value);
            }
        },
        style,
        fieldStyle: {
            width: isFullWidth ? undefined : DEFAULT_WIDTH,
        },
        required,
        multiline: undefined,
        label: required ? props.label : `${props.label || ''} (${texts.formFieldOptionalLabelSuffix})`,
        prefix: undefined,
        endIcon: undefined,
        shrinkLabel: undefined,
        inputComponent: undefined,
        onInput: undefined,
    };

    switch (type) {
        case 'password':
            newProps.type = isPasswordVisible ? 'text' : 'password';
            newProps.endIcon = (
                <PasswordAdornment
                    focus={focus(true)}
                    isVisible={isPasswordVisible}
                    setVisibility={setPasswordVisibility}
                />
            );
            newProps.autoComplete = newProps.autoComplete || 'off';
            break;

        case 'email':
            newProps.type = 'email';
            newProps.inputMode = 'email';
            newProps.autoComplete = newProps.autoComplete || 'email';
            break;

        case 'date':
            newProps.shrinkLabel = true;
            break;

        case 'phone':
            newProps.inputComponent = Input;
            processValue = (s: any) => String(s).replace(/[^\d]/g, ''); // keep only digits
            break;

        case 'integer':
            newProps.inputComponent = IntegerInput;
            break;

        case 'decimal':
            newProps.inputComponent = DecimalInput;
            // returns a string, this is intended.
            // you shouldn't handle money amounts using floats
            // 0.1 * 0.1 = 0.010000000000000002
            processValue = (s: any) =>
                String(s)
                    .replace(',', '.') // use dot as decimal separator
                    .replace(/^0+/, '') // remove leading zeros
                    .replace(/^\./, '0.') // append zero before dot
                    .replace(/\.$/, '') || '0'; // remove trailing dot
            break;

        case 'credit-card-name':
            newProps.autoComplete = newProps.autoComplete || 'cc-name';
            newProps.type = 'text';
            break;

        case 'credit-card-number':
            newProps.inputComponent = CreditCardInput;
            newProps.autoComplete = newProps.autoComplete || 'cc-number';
            newProps.onInput = (e: React.FormEvent<HTMLInputElement>) => {
                // @ts-expect-error TODO: check this case
                setCurrentInputValue(e.currentTarget.value);
            };
            processValue = (s: any) => String(s).replace(/\s/g, '');
            newProps.endIcon = <CreditcardAdornment value={currentInputValue} />;
            break;

        case 'credit-card-expiration':
            newProps.inputComponent = MonthYearDateInput;
            newProps.autoComplete = newProps.autoComplete || 'cc-exp';
            processValue = (s: any) => {
                const [month, year] = String(s)
                    .split('/')
                    .map((n) => parseInt(n));
                const fullYear = Number.isNaN(year) ? null : 2000 + year;
                return {month: month || null, year: fullYear, raw: s};
            };
            break;

        case 'credit-card-cvv':
            newProps.maxLength = maxLength ?? 4;
            newProps.inputComponent = DecimalInput;
            newProps.type = 'text';
            newProps.autoComplete = newProps.autoComplete || 'cc-csc';
            break;

        default:
            newProps.type = 'text';
            newProps.multiline = !!props.multiline;
            break;
    }

    if (prefix) {
        newProps.prefix = prefix;
    }

    if (endIcon) {
        newProps.endIcon = endIcon;
    }

    const wrapperStyle = {
        width: isFullWidth ? undefined : DEFAULT_WIDTH,
    };

    if (getSuggestions && (newProps.value === undefined || newProps.defaultValue !== undefined)) {
        throw Error('Fields with suggestions must be used in controlled mode');
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <div style={wrapperStyle}>
            <div
                // workaround for iOS where tappable area is very small (just the input)
                // so it is hard to gain focus by tapping the text-field
                onClick={isMobile ? focus(false) : undefined}
            >
                {getSuggestions ? (
                    <React.Suspense
                        fallback={
                            <TextFieldBase
                                {...newProps}
                                // This label override while loading is needed in acceptance tests because
                                // while the test is typing, the component could be remounted.
                                // By hiding the label, we ensure that the test selects the loaded component
                                label={isRunningAcceptanceTest() ? '' : newProps.label}
                                autoComplete="off"
                            />
                        }
                    >
                        <Autosuggest
                            inputProps={{
                                ...newProps,
                                autoComplete: 'off',
                                onChange: (e: React.ChangeEvent<HTMLInputElement>, {newValue}) => {
                                    // hack to mutate event value
                                    e.target = {...e.target, value: newValue};
                                    e.currentTarget = {...e.currentTarget, value: newValue};
                                    newProps.onChange?.(e);
                                },
                            }}
                            renderInputComponent={(inputProps) => (
                                <TextFieldBase
                                    {...inputProps}
                                    inputRef={(actualRef) => {
                                        [externalInputRef, inputRef].forEach((currentRef) => {
                                            if (currentRef) {
                                                if (typeof currentRef === 'function') {
                                                    currentRef(actualRef);
                                                } else {
                                                    // $FlowFixMe
                                                    currentRef.current = actualRef;
                                                }
                                            }
                                        });
                                    }}
                                />
                            )}
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={({value}) => setSuggestions(getSuggestions(value))}
                            onSuggestionsClearRequested={() => setSuggestions([])}
                            getSuggestionValue={(suggestion) => suggestion}
                            renderSuggestion={(suggestion, {isHighlighted}) => (
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
                                        width: inputRef.current
                                            ? inputRef.current.clientWidth + 2
                                            : undefined, // +2 due to borders (input)
                                    }}
                                    className={classes.suggestionsContainer}
                                >
                                    {options.children}
                                </div>
                            )}
                        />
                    </React.Suspense>
                ) : (
                    <TextFieldBase {...newProps} />
                )}
            </div>
        </div>
    );
};

export default TextField;
