import * as React from 'react';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {LABEL_LEFT_POSITION, LABEL_SCALE_MOBILE, LABEL_SCALE_DESKTOP} from './text-field-components.css';
import {Text3} from './text';
import {isIos, isRunningAcceptanceTest, isFirefox, isSafari} from './utils/platform';
import {useAriaId, useTheme, useScreenSize, useIsomorphicLayoutEffect} from './hooks';
import classNames from 'classnames';
import {combineRefs} from './utils/common';
import * as styles from './text-field-base.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

import type {InputState} from './text-field-components';
import type {FieldValidator} from './form-context';

/**
 * Incomplete list, add more if needed
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export type AutoComplete =
    | 'on'
    | 'off'
    | 'name' // full name
    | 'given-name' // first name
    | 'additional-name' // middle name
    | 'family-name' // last name
    | 'email'
    | 'tel'
    | 'street-address'
    | 'address-line1' // for two address inputs
    | 'address-line2' // for two address inputs
    | 'address-level1' // state or province
    | 'address-level2' // city
    | 'country'
    | 'postal-code'
    | 'transaction-amount'
    | 'new-password'
    | 'current-password'
    | 'cc-type' // The type of payment instrument (such as "Visa" or "Master Card")
    | 'cc-name' // The full name as printed on or associated with a payment instrument such as a credit card
    | 'cc-number' // A credit card number or other number identifying a payment method, such as an account number
    | 'cc-exp' // A payment method expiration date, typically in the form "MM/YY" or "MM/YYYY"
    | 'cc-csc' // The security code; on credit cards, this is the 3-digit verification number on the back of the card
    | 'username'; // Username or account name, when used with a password field the browser offers to save credentials together

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
    validate?: FieldValidator;
    autoComplete?: AutoComplete;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    fullWidth?: boolean;
    getSuggestions?: (text: string) => ReadonlyArray<string>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: void;
    readOnly?: boolean;
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
    endIconOverlay?: React.ReactNode;
    style?: React.CSSProperties;
    value?: string;
    inputRef?: React.Ref<HTMLInputElement | HTMLSelectElement>;
    getSuggestions?: (value: string) => ReadonlyArray<string>;
    onClick?: (event: React.MouseEvent) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    inputProps?: {[name: string]: string | number | undefined};
    inputComponent?: React.ComponentType<any>;
    shrinkLabel?: boolean;
    focus?: boolean;
    fieldRef?: React.RefObject<HTMLDivElement>;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    inputMode?: string;
    readOnly?: boolean;
    min?: string;
    max?: string;
}

export const TextFieldBase = React.forwardRef<any, TextFieldBaseProps>(
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
            startIcon,
            endIcon,
            endIconOverlay,
            shrinkLabel: shrinkLabelProp,
            multiline = false,
            focus,
            fieldRef,
            maxLength,
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
        const {isTabletOrSmaller} = useScreenSize();
        const [characterCount, setCharacterCount] = React.useState(defaultValue?.length ?? 0);
        const hasLabel = !!label || !rest.required;
        const theme = useTheme();

        // this shrinkLabel override is a workaround because I was unable to find a way to hide date
        // and date-time native placeholders when the input is not required
        const shrinkLabel =
            shrinkLabelProp ||
            ((rest.type === 'date' || rest.type === 'datetime-local' || rest.type === 'month') &&
                !rest.required);

        const [prefixAlignSelf, setPrefixAlignSelf] = React.useState('baseline');
        useIsomorphicLayoutEffect(() => {
            /**
             * Safari check to workaround https://jira.tid.es/browse/WEB-648
             * For some reason it is super hard to align the prefix text with the input text
             * and get the same result in chrome and safari
             *
             * Using an effect to set the style to avoid problems with SSR
             */
            if (isSafari()) {
                setPrefixAlignSelf('initial');
            }
        }, []);

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
                  ref: combineRefs(ref, inputRef),
              };

        const props = {
            ...rest,
            maxLength,
            autoComplete: autoCompleteProp,
            ...inputProps,
        };

        const isShrinked = shrinkLabel || inputState === 'focused' || inputState === 'filled';
        const scale = isShrinked ? (isTabletOrSmaller ? LABEL_SCALE_MOBILE : LABEL_SCALE_DESKTOP) : 1;
        const labelStyle = {
            left: startIcon ? 48 : LABEL_LEFT_POSITION,
            // shrinking means applying a scale transformation, so width will be proportionally reduced.
            // Let's keep the original width.
            width: `calc(((100% - ${
                LABEL_LEFT_POSITION + (startIcon ? 48 : LABEL_LEFT_POSITION)
            }px)) / ${scale})`,
            paddingRight: endIcon && !isShrinked ? 36 : 0,
        };

        const commonStyles = sprinkles({
            paddingRight: endIcon ? 0 : 16,
            paddingLeft: prefix ? 0 : startIcon ? 48 : 12,
        });

        /* Workaround to avoid huge bullets on ios devices (-apple-system font related) */
        const fontFamily =
            rest.type === 'password' &&
            isIos(theme.platformOverrides) &&
            !isRunningAcceptanceTest(theme.platformOverrides)
                ? 'arial'
                : 'inherit';

        return (
            <FieldContainer
                disabled={rest.disabled}
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
                readOnly={rest.readOnly}
            >
                {startIcon && <div className={styles.startIcon}>{startIcon}</div>}

                {prefix && (
                    <div
                        className={classNames(
                            styles.prefix,
                            hasLabel ? styles.prefixWithLabel : styles.prefixWithoutLabel
                        )}
                        style={{
                            opacity: inputState === 'default' ? 0 : 1,
                            alignSelf: prefixAlignSelf,
                        }}
                    >
                        <Text3 color={vars.colors.textSecondary} regular wordBreak={false}>
                            {prefix}
                        </Text3>
                    </div>
                )}
                <div className={styles.fullWidth} style={{alignSelf: prefix ? 'baseline' : 'initial'}}>
                    <Text3 as="div" regular>
                        {React.createElement(inputComponent || defaultInputElement, {
                            ...inputRefProps,
                            ...props,
                            id,
                            style: {...props.style, fontFamily},
                            className: multiline
                                ? classNames(
                                      styles.textArea,
                                      hasLabel ? styles.textAreaWithLabel : styles.textAreaWithoutLabel,
                                      commonStyles
                                  )
                                : classNames(
                                      styles.input,
                                      hasLabel ? styles.inputWithLabel : styles.inputWithoutLabel,
                                      commonStyles,
                                      {[styles.inputFirefoxStyles]: isFirefox()}
                                  ),
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

                                    // Browser's autofill can change the value without focusing
                                    if (event.target.value.length > 0 && inputState !== 'focused') {
                                        setInputState('filled');
                                    }

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
                    </Text3>
                </div>
                {label && (
                    <Label
                        style={labelStyle}
                        error={error}
                        forId={id}
                        inputState={inputState}
                        shrinkLabel={shrinkLabel}
                        optional={!rest.required}
                    >
                        {label}
                    </Label>
                )}
                {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
                {endIconOverlay}
            </FieldContainer>
        );
    }
);

const Autosuggest = React.lazy(() => import(/* webpackChunkName: "react-autosuggest" */ 'react-autosuggest'));

export const TextFieldBaseAutosuggest = React.forwardRef<any, TextFieldBaseProps>(
    ({getSuggestions, id: idProp, ...props}, ref) => {
        const [suggestions, setSuggestions] = React.useState<ReadonlyArray<string>>([]);
        const inputRef = React.useRef<HTMLInputElement>(null);
        const {platformOverrides, texts} = useTheme();
        const id = useAriaId(idProp);
        const autoSuggestId = useAriaId();

        if (getSuggestions && (props.value === undefined || props.defaultValue !== undefined)) {
            throw Error('Fields with suggestions must be used in controlled mode');
        }

        return getSuggestions ? (
            <React.Suspense
                fallback={
                    <TextFieldBase
                        {...props}
                        // This label override while loading is needed in acceptance tests because
                        // while the test is typing, the component could be remounted.
                        // By hiding the label, we ensure that the test selects the loaded component
                        label={isRunningAcceptanceTest(platformOverrides) ? '' : props.label}
                        autoComplete="off"
                        ref={ref}
                        id={id}
                    />
                }
            >
                <Autosuggest
                    id={autoSuggestId}
                    inputProps={{
                        ...props,
                        id,
                        autoComplete: 'off',
                        // @ts-expect-error Autosuggest expects slightly different types
                        onChange: (e: React.ChangeEvent<HTMLInputElement>, {newValue}) => {
                            // hack to mutate event value
                            e.target = {...e.target, value: newValue};
                            e.currentTarget = {...e.currentTarget, value: newValue};
                            props.onChange?.(e);
                        },
                    }}
                    renderInputComponent={(inputProps) => (
                        <TextFieldBase
                            {...(inputProps as TextFieldBaseProps)}
                            inputRef={combineRefs(inputRef, props.inputRef, ref)}
                        />
                    )}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={({value}) => setSuggestions(getSuggestions(value))}
                    onSuggestionsClearRequested={() => setSuggestions([])}
                    getSuggestionValue={(suggestion: any) => suggestion}
                    renderSuggestion={(suggestion: any, {isHighlighted}) => (
                        <div
                            role="menuitem"
                            className={classNames(styles.menuItem, {
                                [styles.menuItemSelected]: isHighlighted,
                            })}
                        >
                            <Text3 regular>{suggestion}</Text3>
                        </div>
                    )}
                    renderSuggestionsContainer={(options) => (
                        <div
                            {...options.containerProps}
                            style={{
                                width: inputRef.current ? inputRef.current.clientWidth + 2 : 0, // +2 due to borders (input)
                            }}
                            className={styles.suggestionsContainer}
                            aria-label={`${props.label} ${texts.menuLabelSuffix}`}
                        >
                            {options.children}
                        </div>
                    )}
                />
            </React.Suspense>
        ) : (
            <TextFieldBase {...props} id={id} ref={ref} />
        );
    }
);
