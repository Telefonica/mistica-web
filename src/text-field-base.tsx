'use client';
import * as React from 'react';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {LABEL_SCALE_MOBILE, LABEL_SCALE_DESKTOP} from './text-field-components.css';
import {Text3} from './text';
import {isRunningAcceptanceTest, isFirefox} from './utils/platform';
import {useAriaId, useTheme, useScreenSize} from './hooks';
import classNames from 'classnames';
import {combineRefs} from './utils/common';
import * as styles from './text-field-base.css';
import {vars} from './skins/skin-contract.css';
import {BaseIconButton} from './icon-button';
import {ThemeVariant} from './theme-variant-context';

import type {DataAttributes, IconProps} from './utils/types';
import type {InputState} from './text-field-components';
import type {FieldValidator} from './form-context';

interface FieldEndIconProps {
    Icon: React.FC<IconProps>;
    className?: string;
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    'aria-label'?: string;
}

export const FieldEndIcon: React.FC<FieldEndIconProps> = ({
    Icon,
    className,
    onPress,
    disabled,
    'aria-label': ariaLabel,
}) => {
    return (
        /**
         * If we try to add fieldEndIconContainer styles to the BaseIconButton instead,
         * there may be collisions because that component sets margin internally. We
         * create a wrapper around it so that the margin's value won't be overrided.
         */
        <div className={styles.fieldEndIconContainer}>
            <BaseIconButton
                disabled={disabled}
                aria-label={ariaLabel}
                onPress={onPress}
                size={styles.iconButtonSize}
                className={className}
            >
                <Icon size={styles.iconSize} />
            </BaseIconButton>
        </div>
    );
};

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

export interface CommonFormFieldProps<T = HTMLInputElement> {
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
    onFocus?: React.FocusEventHandler<T>;
    onBlur?: React.FocusEventHandler<T>;
    fullWidth?: boolean;
    getSuggestions?: (text: string) => ReadonlyArray<string>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: void;
    readOnly?: boolean;
    dataAttributes?: DataAttributes;
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
    onBlur?: React.FocusEventHandler;
    onFocus?: React.FocusEventHandler;
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
    role?: string;
    dataAttributes?: DataAttributes;
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
            shrinkLabel,
            multiline = false,
            focus,
            fieldRef,
            maxLength,
            id: idProp,
            autoComplete: autoCompleteProp,
            fullWidth,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        const id = useAriaId(idProp);
        const helperTextid = useAriaId();

        const [inputState, setInputState] = React.useState<InputState>(
            defaultValue?.length || value?.length ? 'filled' : 'default'
        );
        const {isTabletOrSmaller} = useScreenSize();
        const [characterCount, setCharacterCount] = React.useState(defaultValue?.length ?? 0);
        const hasLabel = !!label || !rest.required;

        const inputElementRef = React.useRef<HTMLInputElement | HTMLSelectElement>(null);

        /**
         * When date/datefield/month fields introduced value has invalid format, the browser will actually set
         * the element's value to an empty string. We use this to check if we should hide the native
         * placeholder (dd/mm/yyyy) in browsers like Chrome
         */
        const isDateInput = rest.type === 'date' || rest.type === 'datetime-local' || rest.type === 'month';
        const hasEmptyDateValue = isDateInput && inputElementRef.current?.value === '';

        React.useEffect(() => {
            /**
             * If the date format is invalid, value will be empty in the element. We treat it like the
             * case of an empty input.
             */
            if (inputState === 'filled' && hasEmptyDateValue) {
                setInputState('default');
            }

            if (!hasEmptyDateValue) {
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
            }
        }, [inputState, value, focus, hasEmptyDateValue]);

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
                  ref: combineRefs(ref, inputRef, inputElementRef),
              };

        const props = {
            ...rest,
            maxLength,
            autoComplete: autoCompleteProp,
            ...inputProps,
        };

        const startIconWidth = `calc(${styles.iconSize} + ${styles.fieldElementsGap}px)`;
        const endIconWidth = `calc(${styles.iconButtonSize} + ${styles.fieldElementsGap}px)`;

        const isShrinked = shrinkLabel || inputState === 'focused' || inputState === 'filled';
        const scale = isShrinked ? (isTabletOrSmaller ? LABEL_SCALE_MOBILE : LABEL_SCALE_DESKTOP) : 1;
        const labelStyle = {
            left: `calc(${styles.fieldLeftPadding}px + ${startIcon ? startIconWidth : '0px'})`,
            // shrinking means applying a scale transformation, so width will be proportionally reduced.
            // Let's keep the original width.
            width: `calc((100% - ${styles.fieldLeftPadding}px - ${startIcon ? startIconWidth : '0px'} - ${
                endIcon || endIconOverlay ? endIconWidth : `${styles.fieldRightPadding}px`
            }) / ${scale})`,
        };

        /* Workaround to avoid huge bullets on ios devices (-apple-system font related) */
        const fontFamily =
            rest.type === 'password' && characterCount > 0 ? 'Lucida Grande, Arial, sans-serif' : 'inherit';

        return (
            <FieldContainer
                disabled={rest.disabled}
                helperText={
                    <HelperText
                        error={error}
                        leftText={helperText}
                        id={helperTextid}
                        rightText={multiline && maxLength ? `${characterCount}/${maxLength}` : undefined}
                    />
                }
                multiline={multiline}
                fullWidth={fullWidth}
                fieldRef={fieldRef}
                readOnly={rest.readOnly}
                dataAttributes={dataAttributes}
            >
                <ThemeVariant isInverse={false}>
                    {startIcon && <div className={styles.startIcon}>{startIcon}</div>}

                    {prefix && (
                        <div
                            className={classNames(
                                styles.prefix,
                                hasLabel ? styles.inputWithLabel : styles.inputWithoutLabel
                            )}
                            style={{
                                opacity: inputState === 'default' ? 0 : 1,
                            }}
                        >
                            <Text3 color={vars.colors.textSecondary} regular wordBreak={false}>
                                {prefix}
                            </Text3>
                        </div>
                    )}
                    <div className={styles.fullWidth}>
                        <Text3 as="div" regular>
                            {React.createElement(inputComponent || defaultInputElement, {
                                ...inputRefProps,
                                ...props,
                                id,
                                style: {
                                    paddingRight: endIcon
                                        ? 0
                                        : endIconOverlay
                                        ? `calc(${styles.fieldRightPadding}px + ${endIconWidth})`
                                        : styles.fieldRightPadding,
                                    paddingLeft: prefix
                                        ? 0
                                        : startIcon
                                        ? `calc(${startIconWidth} + ${styles.fieldLeftPadding}px)`
                                        : styles.fieldLeftPadding,
                                    ...props.style,
                                    fontFamily,
                                },
                                className: multiline
                                    ? classNames(
                                          styles.textArea,
                                          hasLabel ? styles.textAreaWithLabel : styles.textAreaWithoutLabel
                                      )
                                    : classNames(
                                          styles.input,
                                          hasLabel ? styles.inputWithLabel : styles.inputWithoutLabel,
                                          {
                                              [styles.inputFirefoxStyles]: isFirefox(),
                                              [styles.hiddenDateValue]: hasEmptyDateValue,
                                          }
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
                                ...(helperText && {'aria-describedby': helperTextid}),
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
                    {endIcon && <div className={styles.endIconContainer}>{endIcon}</div>}
                    {endIconOverlay}
                </ThemeVariant>
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
