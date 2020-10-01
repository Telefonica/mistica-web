import * as React from 'react';
import {useForm} from './form-context';
import {useAriaId, useTheme} from './hooks';
import {DOWN, ENTER, ESC, SPACE, TAB, UP} from './utils/key-codes';
import {FieldContainer, HelperText, Label} from './text-field-components';
import IconArrowDown from './icons/icon-arrow-down';
import TextFieldBase from './text-field-base';
import Overlay from './overlay';
import classNames from 'classnames';
import {isAndroid, isIos} from './utils/platform';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';

const useStyles = createUseStyles((theme) => ({
    selectContainer: {
        cursor: ({disabled}) => (disabled ? 'auto' : 'pointer'),
        position: 'relative',
        outline: 0,
        [theme.mq.mobile]: {
            width: '100%',
        },
        [theme.mq.tabletOrBigger]: {
            width: ({fullWidth}) => (fullWidth ? '100%' : 'fit-content'),
        },
    },
    select: {
        fontFamily: 'inherit',
        backgroundColor: 'white',
        paddingTop: ({label}) => (label ? 24 : 16),
        paddingBottom: ({label}) => (label ? 8 : 16),
        paddingRight: 0,
        paddingLeft: 12,
        border: 0,
        outline: 0,
        fontSize: 16,
        color: theme.colors.textPrimary,
        width: '100%',
        height: '100%',
        textOverflow: 'ellipsis',
        '&:disabled': {
            color: theme.colors.border,
        },
        appearance: 'none',
        cursor: ({disabled}) => (disabled ? 'initial' : 'pointer'),
    },
    arrowDown: {
        position: 'absolute',
        right: 16,
        top: 'calc(50% - 12px)',
        pointerEvents: 'none',
    },
    selectText: {
        position: 'absolute',
        pointerEvents: 'none',
        left: 12,
        top: ({label}) => (label ? 27 : 17),
        fontSize: 16,
        color: ({disabled}) => (disabled ? theme.colors.textInactive : theme.colors.textPrimary),
        maxWidth: '100%',
        textOverflow: 'ellipsis',
    },
    optionsContainer: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        position: 'absolute',
        top: ({optionsComputedProps}) => optionsComputedProps.top,
        left: ({optionsComputedProps}) => optionsComputedProps.left,
        width: ({optionsComputedProps}) => optionsComputedProps.width,
        borderRadius: 4,
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        transformOrigin: ({optionsComputedProps}) => optionsComputedProps.transformOrigin,
        transition: 'opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1) .15s',
        opacity: ({animateShowOptions}) => (animateShowOptions ? 1 : 0),
        transform: ({animateShowOptions}) => (animateShowOptions ? 'scale(1)' : 'scale(0)'),
        maxHeight: ({optionsComputedProps}) => optionsComputedProps.maxHeight ?? '416px',
        overflowY: 'auto',
    },
    menuItemSelected: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
    menuItem: {
        lineHeight: 1.5,
        padding: '6px 16px',
        height: 48,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
}));

export type FormSelectProps = {
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    id?: string;
    label?: string;
    name: string;
    optional?: boolean;
    // use `inputProps` to pass props (as attributes) to the input element, for example a data-testid
    inputProps?: {[prop: string]: string};
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
};

const FormSelect: React.FC<FormSelectProps> = ({
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
    inputProps,
    onBlur,
    autoFocus = false,
}) => {
    const inputRef = React.useRef<HTMLSelectElement | HTMLInputElement>(null);
    const focusableRef = React.useRef<HTMLSelectElement | HTMLDivElement>(null);
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const optionsMenuRef = React.useRef<HTMLUListElement>(null);
    const optionRefs = React.useRef(new Map<string, HTMLLIElement>());
    const [valueState, setValueState] = React.useState<string>();
    const [optionsShown, setOptionsShown] = React.useState(false);
    const [animateShowOptions, setAnimateShowOptions] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [optionsComputedProps, setOptionsComputedProps] = React.useState({});
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
        process.env.NODE_ENV === 'test' || isAndroid(platformOverrides) || isIos(platformOverrides);

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
                const {top: selectTop, width, left, height} = fieldRef.current.getBoundingClientRect();
                const top = selectTop + height;
                const visibleOptions = Math.min(options.length, MAX_OPTIONS);
                const spaceTaken = visibleOptions * 48 + PADDING_SIZE;
                // if it doesn't fit on bottom
                if (top + spaceTaken + MARGIN_TOP_SIZE > window.innerHeight) {
                    const availableSpaceBottom = window.innerHeight - top;
                    if (selectTop /* this is the available space on top */ > availableSpaceBottom) {
                        const newTop = selectTop - spaceTaken;
                        setOptionsComputedProps({
                            width,
                            left,
                            top: Math.max(newTop, MARGIN_TOP_SIZE),
                            maxHeight: selectTop - MARGIN_TOP_SIZE,
                            transformOrigin: 'center bottom',
                        });
                    } else {
                        setOptionsComputedProps({
                            width,
                            top,
                            left,
                            maxHeight: window.innerHeight - top - MARGIN_TOP_SIZE,
                            transformOrigin: 'center top',
                        });
                    }
                } else {
                    // if it fits on bottom
                    setOptionsComputedProps({
                        width,
                        top,
                        left,
                        maxHeight: undefined,
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
        register({
            name,
            field: inputRef.current,
            focusableElement: focusableRef.current,
        });
        return () => {
            register({name, field: null, focusableElement: null});
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

    const classes = useStyles({
        label: label || (optional && !shouldUseNative),
        optionsComputedProps,
        animateShowOptions,
        helperText,
        disabled,
    });

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

    return shouldUseNative ? (
        <FieldContainer
            helperText={<HelperText error={error} leftText={helperText} />}
            fieldRef={fieldRef}
            fullWidth={fullWidth}
        >
            {label && (
                <Label
                    error={error}
                    forId={inputId}
                    inputState={isFocused ? 'focused' : 'filled'}
                    disabled={disabled}
                >
                    {label}
                </Label>
            )}
            <select
                {...inputProps}
                className={classes.select}
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
            >
                {options.map(({value: val, text}) => (
                    <option key={val} value={val}>
                        {text}
                    </option>
                ))}
            </select>
            <div className={classes.arrowDown} aria-hidden>
                <IconArrowDown />
            </div>
        </FieldContainer>
    ) : (
        <>
            <div
                className={classes.selectContainer}
                role="button"
                aria-haspopup="listbox"
                ref={focusableRef as React.Ref<HTMLDivElement>}
                {...(!disabled && containerActiveProps)}
            >
                <TextFieldBase
                    style={{visibility: 'hidden'}}
                    fullWidth={fullWidth}
                    endIcon={<IconArrowDown />}
                    focus={isFocused}
                    label={label}
                    value={value ?? valueState}
                    name={name}
                    helperText={helperText}
                    required={!optional}
                    disabled={disabled}
                    id={inputId}
                    error={error}
                    inputProps={inputProps}
                    inputRef={inputRef}
                    fieldRef={fieldRef}
                />
                <div className={classes.selectText}>{getOptionText(value ?? valueState)}</div>
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
                        onPointerDown={cancelEvent}
                        className={classes.optionsContainer}
                        role="listbox"
                        ref={optionsMenuRef}
                    >
                        {options.map(({value: val, text}) => (
                            <li
                                role="option"
                                aria-selected={val === (valueState ?? value)}
                                key={val}
                                data-value={val}
                                className={classNames(classes.menuItem, {
                                    [classes.menuItemSelected]:
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
                                {text}
                            </li>
                        ))}
                    </ul>
                </Overlay>
            )}
        </>
    );
};

export default FormSelect;
