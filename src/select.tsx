import * as React from 'react';
import classnames from 'classnames';
import {useForm} from './form-context';
import {useAriaId, useTheme} from './hooks';
import {DOWN, ENTER, ESC, SPACE, TAB, UP} from './utils/key-codes';
import {FieldContainer, HelperText, Label} from './text-field-components';
import ChevronDownRegular from './generated/mistica-icons/icon-chevron-down-regular';
import {TextFieldBaseAutosuggest} from './text-field-base';
import Overlay from './overlay';
import {isAndroid, isIos} from './utils/platform';
import {cancelEvent} from './utils/dom';
import {Text3} from './text';
import * as styles from './select.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';

export type SelectProps = {
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    id?: string;
    label: string;
    name: string;
    optional?: boolean;
    validate?: (value: string | void, rawValue: string | void) => string | void;
    onChangeValue?: (value: string) => void;
    onBlur?: (event: React.FocusEvent<any>) => void;
    options: ReadonlyArray<{
        readonly value: string;
        readonly text: string;
    }>;
    autoFocus?: boolean;
    value?: string;
    fullWidth?: boolean;
    native?: boolean;
    children?: void;
};

const Select: React.FC<SelectProps> = ({
    id,
    label,
    helperText: helperTextProp,
    value: valueProp,
    onChangeValue: onChangeValueProp,
    name,
    fullWidth,
    options,
    optional,
    disabled: disabledProp,
    error: errorProp,
    onBlur,
    autoFocus = false,
    native,
}) => {
    const inputRef = React.useRef<HTMLSelectElement | HTMLInputElement>(null);
    const focusableRef = React.useRef<HTMLSelectElement | HTMLDivElement>(null);
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const optionsMenuRef = React.useRef<HTMLUListElement>(null);
    const optionRefs = React.useRef(new Map<string, HTMLLIElement>());
    const [isServerSide, setIsServerSide] = React.useState(true);
    const [valueState, setValueState] = React.useState<string>();
    const [optionsShown, setOptionsShown] = React.useState(false);
    const [animateShowOptions, setAnimateShowOptions] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [optionsComputedProps, setOptionsComputedProps] = React.useState<{
        top?: number;
        left?: number;
        maxHeight?: number;
        minWidth?: number;
        transformOrigin?: string;
    }>({});
    const [tentativeValueState, setTentativeValueState] = React.useState<string>();
    const lastElementSelectionScrollTop = React.useRef<number>(null);
    const inputId = useAriaId(id);
    const {
        rawValues,
        setRawValue,
        setValue: formSetValue,
        formStatus,
        formErrors,
        setFormError,
        register,
    } = useForm();
    const {platformOverrides} = useTheme();

    const shouldUseNative =
        native ||
        (process.env.NODE_ENV === 'test' && !process.env.SSR_TEST) ||
        isAndroid(platformOverrides) ||
        isIos(platformOverrides);

    const disabled = disabledProp || formStatus === 'sending';
    const error = errorProp || !!formErrors[name];
    const helperText = formErrors[name] || helperTextProp;
    const value = valueProp ?? rawValues[name];

    const onChangeValue = (value: string) => {
        onChangeValueProp?.(value);
        setFormError({name, error: ''});
        setRawValue({name, value});
        formSetValue({name, value});
    };

    const toggleOptions = (show: boolean) => {
        if (show) {
            if (fieldRef?.current) {
                const MAX_OPTIONS = 8;
                const MARGIN_TOP_SIZE = 12;
                const PADDING_SIZE = 16;
                const {
                    top: availableSpaceTop,
                    width,
                    left,
                    height,
                } = fieldRef.current.getBoundingClientRect();
                const top = availableSpaceTop + height;
                const visibleOptions = Math.min(options.length, MAX_OPTIONS);
                const spaceTaken = visibleOptions * 48 + PADDING_SIZE;
                // if it doesn't fit on bottom
                if (top + spaceTaken + MARGIN_TOP_SIZE > window.innerHeight) {
                    const availableSpaceBottom = window.innerHeight - top;
                    if (availableSpaceTop > availableSpaceBottom) {
                        const newTop = availableSpaceTop - spaceTaken;
                        setOptionsComputedProps({
                            minWidth: width,
                            left,
                            top: Math.max(newTop, MARGIN_TOP_SIZE),
                            maxHeight: Math.min(availableSpaceTop - MARGIN_TOP_SIZE, spaceTaken),
                            transformOrigin: 'center bottom',
                        });
                    } else {
                        setOptionsComputedProps({
                            minWidth: width,
                            top,
                            left,
                            maxHeight: window.innerHeight - top - MARGIN_TOP_SIZE,
                            transformOrigin: 'center top',
                        });
                    }
                } else {
                    // if it fits on bottom
                    setOptionsComputedProps({
                        minWidth: width,
                        top,
                        left,
                        maxHeight: spaceTaken,
                        transformOrigin: 'center top',
                    });
                }
            }
            setOptionsShown(true);
            requestAnimationFrame(() => {
                if (
                    lastElementSelectionScrollTop.current &&
                    optionsMenuRef.current &&
                    'scrollTop' in optionsMenuRef.current
                ) {
                    optionsMenuRef.current.scrollTop = lastElementSelectionScrollTop.current;
                }
                setAnimateShowOptions(true);
            });
            setTentativeValueState(valueState ?? value);
        } else {
            setAnimateShowOptions(false);
            setOptionsShown(false);
            setTentativeValueState(undefined);
        }
    };

    const setValue = (val?: string) => {
        // @ts-expect-error current is typed as read-only
        lastElementSelectionScrollTop.current = optionsMenuRef.current?.scrollTop;
        toggleOptions(false);
        if (onChangeValue && typeof val === 'string') {
            onChangeValue(val);
        }
        if (typeof value === 'undefined') {
            setValueState(val);
        }
    };

    const scrollIntoTargetListElement = (targetValueState: string) => {
        const menuClientRect = optionsMenuRef.current?.getBoundingClientRect();
        if (menuClientRect && targetValueState && optionRefs.current.has(targetValueState)) {
            const itemRef = optionRefs.current.get(targetValueState);
            const clientRect = itemRef?.getBoundingClientRect();
            if (
                clientRect &&
                clientRect.top + clientRect.height / 2 >= menuClientRect.top + menuClientRect.height
            ) {
                itemRef?.scrollIntoView();
                return;
            }
            if (clientRect && clientRect.top + clientRect.height / 2 <= menuClientRect.top) {
                itemRef?.scrollIntoView(false);
            }
        }
    };

    const focusableElement = focusableRef.current;
    const inputElement = inputRef.current;

    React.useEffect(() => {
        setRawValue({name, value});
        formSetValue({name, value});
    }, [name, setRawValue, formSetValue, value]);

    React.useEffect(() => {
        register(name, {
            input: inputRef.current,
            focusableElement: focusableRef.current,
        });
        return () => {
            register(name, {input: null, focusableElement: null});
        };
    }, [name, register, focusableRef, inputRef, focusableElement, inputElement]);

    React.useEffect(() => {
        const updateTentativeValueState = (e: KeyboardEvent) => {
            const keyToOperand: Record<number, 1 | -1 | undefined> = {[UP]: -1, [DOWN]: 1};
            const operand = keyToOperand[e.keyCode];
            if (operand) {
                cancelEvent(e);
                const newTentativeValueState =
                    options[options.findIndex(({value}) => value === tentativeValueState) + operand]?.value ??
                    tentativeValueState;
                setTentativeValueState(newTentativeValueState);
                scrollIntoTargetListElement(newTentativeValueState);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (optionsShown) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ESC) {
                    toggleOptions(false);
                }
                if (e.keyCode === ENTER || e.keyCode === SPACE) {
                    cancelEvent(e);
                    if (
                        options.findIndex(({value}) => value === tentativeValueState) !== -1 &&
                        tentativeValueState !== valueState
                    ) {
                        setValue(tentativeValueState);
                    }
                    toggleOptions(false);
                }
            }
            // so we don't change the tentativeValueState while menu is closing
            if (animateShowOptions) {
                updateTentativeValueState(e);
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    React.useEffect(() => {
        if (autoFocus && focusableRef.current) {
            focusableRef.current.focus();
        }
    }, [autoFocus]);

    React.useEffect(() => {
        // We use this Ref to always use the native variant in the first render, this way we avoid hydration issues when using SSR
        setIsServerSide(false);
    }, []);

    // When the value is null/undefined/'' we assume it's the default empty option and we don't show any label
    const getOptionText = (val?: string) => (val ? options.find(({value}) => value === val)?.text : '');

    const containerActiveProps = {
        tabIndex: 0,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        onClick: () => {
            toggleOptions(true);
            setIsFocused(true);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
            if (!optionsShown && (e.keyCode === SPACE || e.keyCode === ENTER)) {
                cancelEvent(e);
                toggleOptions(true);
            }
        },
    };

    return shouldUseNative || isServerSide ? (
        <FieldContainer
            disabled={disabled}
            helperText={<HelperText error={error} leftText={helperText} />}
            fieldRef={fieldRef}
            fullWidth={fullWidth}
        >
            {label && (
                <Label
                    error={error}
                    forId={inputId}
                    inputState={
                        isFocused
                            ? 'focused'
                            : value ?? valueState ?? inputRef.current?.value
                            ? 'filled'
                            : 'default'
                    }
                    optional={optional}
                >
                    {label}
                </Label>
            )}
            <select
                className={styles.selectVariants[disabled ? 'disabled' : 'default']}
                id={inputId}
                aria-invalid={!!error}
                value={value}
                required={!optional}
                disabled={disabled}
                onChange={(e) => {
                    if (onChangeValue) {
                        onChangeValue(e.target.value);
                    }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    onBlur?.(e);
                }}
                ref={(actualRef) => {
                    [inputRef, focusableRef].forEach((currentRef) => {
                        // @ts-expect-error current is typed as read-only
                        currentRef.current = actualRef;
                    });
                }}
                style={{
                    paddingTop: label ? 24 : 16,
                    paddingBottom: label ? 8 : 16,
                    // Override default browser opacity when disabled. This opacity also affects the label.
                    // Without this fix, the label is invisible when disabled
                    opacity: 1,
                }}
            >
                {options.every(({value}) => !!value) && (
                    // if no "empty" option exists, insert a dummy empty option
                    // this is needed to allow a native select with no selected option
                    <option value="" style={{display: 'none'}} />
                )}
                {options.map(({value: val, text}) => (
                    <option key={val} value={val}>
                        {text}
                    </option>
                ))}
            </select>
            <div className={styles.arrowDown} aria-hidden>
                <ChevronDownRegular size={20} />
            </div>
        </FieldContainer>
    ) : (
        <>
            <div
                className={styles.selectContainerVariants[fullWidth ? 'fullWidth' : 'default']}
                role="button"
                aria-haspopup="listbox"
                ref={focusableRef as React.Ref<HTMLDivElement>}
                {...(!disabled && containerActiveProps)}
            >
                <TextFieldBaseAutosuggest
                    style={{visibility: 'hidden'}}
                    fullWidth={fullWidth}
                    endIcon={<ChevronDownRegular size={20} />}
                    focus={isFocused}
                    label={label}
                    value={value}
                    shrinkLabel={!!(value || valueState)}
                    name={name}
                    helperText={helperText}
                    required={!optional}
                    disabled={disabled}
                    id={inputId}
                    error={error}
                    inputRef={inputRef}
                    fieldRef={fieldRef}
                />

                <div
                    className={styles.selectTextVariants[disabled ? 'disabled' : 'default']}
                    style={{top: label ? 27 : 17}}
                >
                    {getOptionText(value ?? valueState)}
                </div>
            </div>
            {optionsShown && (
                <Overlay
                    onPress={(e) => {
                        toggleOptions(false);
                        cancelEvent(e);
                    }}
                    disableScroll
                >
                    <ul
                        style={assignInlineVars({
                            [styles.vars.top]: optionsComputedProps.top
                                ? `${optionsComputedProps.top}px`
                                : '',
                            [styles.vars.left]: optionsComputedProps.left
                                ? `${optionsComputedProps.left}px`
                                : '',
                            [styles.vars.maxHeight]: optionsComputedProps.maxHeight
                                ? `${optionsComputedProps.maxHeight}px`
                                : '',
                            [styles.vars.minWidth]: optionsComputedProps.minWidth
                                ? `${optionsComputedProps.minWidth}px`
                                : '',
                            [styles.vars.transformOrigin]: optionsComputedProps.transformOrigin ?? '',
                        })}
                        onPointerDown={cancelEvent}
                        className={classnames(
                            styles.optionsContainer,
                            animateShowOptions
                                ? styles.optionsAnimationsVariants.show
                                : styles.optionsAnimationsVariants.hide
                        )}
                        role="listbox"
                        ref={optionsMenuRef}
                    >
                        {options.map(({value: val, text}) => (
                            <li
                                role="option"
                                aria-selected={val === (valueState ?? value)}
                                key={val}
                                data-value={val}
                                className={classnames(styles.menuItem, {
                                    [styles.menuItemSelected]:
                                        val === tentativeValueState || val === (valueState ?? value),
                                })}
                                onPointerDown={cancelEvent}
                                onClick={() => setValue(val)}
                                ref={(liRef) => {
                                    if (liRef) {
                                        optionRefs.current.set(val, liRef);
                                    } else {
                                        optionRefs.current.delete(val);
                                    }
                                }}
                            >
                                <Text3 regular>{text}</Text3>
                            </li>
                        ))}
                    </ul>
                </Overlay>
            )}
        </>
    );
};

export default Select;
