'use client';
import * as React from 'react';
import {Label, HelperText, FieldContainer} from './text-field-components';
import {LABEL_SCALE_MOBILE, LABEL_SCALE_DESKTOP} from './text-field-components.css';
import {Text3} from './text';
import {isRunningAcceptanceTest, isFirefox} from './utils/platform';
import {useTheme, useScreenSize, useIsomorphicLayoutEffect} from './hooks';
import classNames from 'classnames';
import {combineRefs} from './utils/common';
import * as styles from './text-field-base.css';
import {vars} from './skins/skin-contract.css';
import {InternalIconButton, InternalToggleIconButton} from './icon-button';
import {ThemeVariant} from './theme-variant-context';
import {iconSize} from './icon-button.css';
import * as tokens from './text-tokens';

import type {DataAttributes, IconProps} from './utils/types';
import type {InputState} from './text-field-components';
import type {FieldValidator} from './form-context';
import type {ExclusifyUnion} from './utils/utility-types';

const isValidInputValue = (value?: string, inputType?: React.HTMLInputTypeAttribute) => {
    if (!inputType) {
        return true;
    }

    const input = document.createElement('input');
    input.type = inputType;
    input.value = value || '';
    return input.value !== '';
};

type FieldEndIconProps = {
    /** In date fields, we want the icon's background to stay transparent when hovering/pressing it */
    hasBackgroundColor?: boolean;
    disabled?: boolean;
} & ExclusifyUnion<
    | {
          Icon: (props: IconProps) => JSX.Element;
          'aria-label'?: string;
          onPress: (event: React.MouseEvent<HTMLElement>) => void;
      }
    | {
          checkedProps: {Icon: (props: IconProps) => JSX.Element; 'aria-label'?: string};
          uncheckedProps: {Icon: (props: IconProps) => JSX.Element; 'aria-label'?: string};
          onChange?: (checked: boolean) => void | undefined | Promise<void>;
          checked?: boolean;
      }
>;

export const FieldEndIcon = ({
    hasBackgroundColor = true,
    onPress,
    onChange,
    disabled,
    Icon,
    checkedProps,
    uncheckedProps,
    'aria-label': ariaLabel,
}: FieldEndIconProps): JSX.Element => {
    return (
        <div className={styles.fieldEndIconContainer}>
            {checkedProps ? (
                <InternalToggleIconButton
                    checkedProps={{...checkedProps, 'aria-label': checkedProps['aria-label'] || ''}}
                    uncheckedProps={{...uncheckedProps, 'aria-label': uncheckedProps['aria-label'] || ''}}
                    onChange={onChange}
                    hasOverlay={hasBackgroundColor}
                    disabled={disabled}
                />
            ) : (
                <InternalIconButton
                    Icon={Icon}
                    disabled={disabled}
                    aria-label={ariaLabel || ''}
                    onPress={onPress}
                    hasOverlay={hasBackgroundColor}
                />
            )}
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
    showOptionalLabel?: boolean;
    maxLength?: number;
    validate?: FieldValidator;
    validateOnBlurInsideForm?: boolean;
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
    preventCopy?: boolean;
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
    showOptionalLabel?: boolean;
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
    preventCopy?: boolean;
    min?: string;
    max?: string;
    role?: string;
    dataAttributes?: DataAttributes;
}

const preventCopyHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
};

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
            preventCopy,
            showOptionalLabel = true,
            ...rest
        },
        ref
    ) => {
        const {preventCopyInFormFields, texts, t} = useTheme();
        preventCopy = preventCopy ?? preventCopyInFormFields;
        const reactId = React.useId();
        const id = idProp || reactId;
        const leftHelperTextid = React.useId();
        const rightHelperTextid = React.useId();

        const [inputState, setInputState] = React.useState<InputState>(
            defaultValue?.length || value?.length ? 'filled' : 'default'
        );
        const {isTabletOrSmaller} = useScreenSize();
        const [characterCount, setCharacterCount] = React.useState(defaultValue?.length ?? 0);
        const hasLabel = !!label || !rest.required;

        const isDateInput = rest.type === 'date' || rest.type === 'datetime-local' || rest.type === 'month';
        const valueRef = React.useRef<string | undefined>(undefined);

        useIsomorphicLayoutEffect(() => {
            /**
             * If the date format is invalid, value will be empty in the DOM element. We treat it like the
             * case of an empty input. We have to do this because in some browsers, like Chrome, when the
             * date value is empty it displays a placeholder (mm/dd/yyyy) that can't be removed, so we set
             * it's opacity to 0 to avoid showing it.
             */
            const finalValue = isDateInput && !isValidInputValue(value, rest.type) ? '' : value;

            // if value prop has changed, we need to set the input state to default if the new value is not valid
            if (
                valueRef.current !== value &&
                isDateInput &&
                !finalValue?.length &&
                inputState === 'filled' &&
                focus === undefined
            ) {
                setInputState('default');
            }
            valueRef.current = value;

            if (inputState !== 'focused' && finalValue?.length) {
                setCharacterCount(finalValue.length);
                setInputState('filled');
            }
            if (focus) {
                setInputState('focused');
            }
            if (focus === false && !finalValue?.length) {
                // when textfield is used in selects it doesn't get or lose focus
                setInputState('default');
            }
            if (focus === false && finalValue?.length) {
                setInputState('filled');
            }
        }, [inputState, value, focus, isDateInput, rest.type]);

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

        const startIconWidth = `calc(${iconSize.default} + ${styles.fieldElementsGap}px)`;
        const endIconWidth = `calc(${styles.iconButtonSize} + ${styles.fieldEndIconGap}px)`;

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
                        leftTextId={leftHelperTextid}
                        rightTextId={rightHelperTextid}
                        rightText={multiline && maxLength ? `${characterCount}/${maxLength}` : undefined}
                        rightTextLabel={
                            multiline && maxLength
                                ? t(
                                      texts.formTextMultilineMaxCount || tokens.formTextMultilineMaxCount,
                                      characterCount,
                                      maxLength
                                  )
                                : undefined
                        }
                    />
                }
                multiline={multiline}
                fullWidth={fullWidth}
                fieldRef={fieldRef}
                readOnly={rest.readOnly}
                dataAttributes={dataAttributes}
            >
                <ThemeVariant variant="default">
                    {startIcon && (
                        <div className={styles.startIcon} data-testid="startIcon">
                            {startIcon}
                        </div>
                    )}

                    {prefix && (
                        <div
                            aria-hidden
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
                    {label && (
                        <Label
                            style={labelStyle}
                            error={error}
                            forId={id}
                            inputState={inputState}
                            shrinkLabel={shrinkLabel}
                            showOptional={!rest.required && showOptionalLabel}
                        >
                            {label}
                        </Label>
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
                                          ? endIconWidth
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
                                              // Hide webkit placeholder when label is not shrinked and value is empty
                                              [styles.hiddenDatePlaceholder]:
                                                  isDateInput && inputState === 'default',
                                              // Force height of input when value is empty to avoid field from having height 0 in iOS
                                              [styles.emptyDateValue]: isDateInput && inputState !== 'filled',
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
                                            setInputState(
                                                event.target.value.length > 0 ? 'filled' : 'default'
                                            );
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
                                ...((helperText || (multiline && maxLength)) && {
                                    'aria-describedby': `${leftHelperTextid} ${rightHelperTextid}`,
                                }),
                                ...(preventCopy && {
                                    onCopy: preventCopyHandler,
                                    onCut: preventCopyHandler,
                                }),
                            })}
                        </Text3>
                    </div>
                    {endIcon && (
                        <div className={styles.endIconContainer} data-testid="endIcon">
                            {endIcon}
                        </div>
                    )}
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
        const containerRef = React.useRef<HTMLDivElement>(null);
        const {platformOverrides, texts, t} = useTheme();
        const reactId = React.useId();
        const id = idProp || reactId;
        const autoSuggestId = React.useId();

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
                    renderInputComponent={(inputProps) => {
                        // The `Autosuggest.RenderInputComponentProps` type is missing the `key` property
                        const {key, ...inputPropsWithoutKey} = inputProps as Record<string, any>;
                        // extract key from inputProps to avoid React warning:
                        // "A props object containing a "key" prop is being spread into JSX"
                        return (
                            <TextFieldBase
                                key={key}
                                {...(inputPropsWithoutKey as TextFieldBaseProps)}
                                fieldRef={containerRef}
                                inputRef={combineRefs(inputRef, props.inputRef, ref)}
                            />
                        );
                    }}
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
                    renderSuggestionsContainer={(options) => {
                        // extract key from containerProps to avoid React warning:
                        // "A props object containing a "key" prop is being spread into JSX"
                        const {key, ...containerPropsWithoutKey} = options.containerProps;
                        return (
                            <div
                                {...containerPropsWithoutKey}
                                key={key}
                                style={{
                                    width: containerRef.current ? containerRef.current.clientWidth + 2 : 0, // +2 due to borders (input)
                                }}
                                className={styles.suggestionsContainer}
                                aria-label={`${props.label} ${texts.menuLabelSuffix || t(tokens.menuLabelSuffix)}`}
                            >
                                {options.children}
                            </div>
                        );
                    }}
                />
            </React.Suspense>
        ) : (
            <TextFieldBase {...props} id={id} ref={ref} />
        );
    }
);
