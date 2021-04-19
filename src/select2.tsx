import * as React from 'react';
import {useForm} from './form-context';
import {useAriaId, useTheme} from './hooks';
import {DOWN, ENTER, SPACE, TAB, UP} from './utils/key-codes';
import {FieldContainer, HelperText, Label} from './text-field-components';
import IconArrowDown from './icons/icon-arrow-down';
import TextFieldBase from './text-field-base';
import classNames from 'classnames';
import {isAndroid, isIos} from './utils/platform';
import {createUseStyles} from './jss';
import {cancelEvent} from './utils/dom';
import Menu, {useMenu, MenuProvider} from './menu';

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
        backgroundColor: theme.colors.backgroundContainer,
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
        color: ({disabled}) => (disabled ? theme.colors.textDisabled : theme.colors.textPrimary),
        maxWidth: '100%',
        textOverflow: 'ellipsis',
    },
    menuItemSelected: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
    menuItem: {
        color: theme.colors.textPrimary,
        lineHeight: 1.5,
        padding: '6px 16px',
        minHeight: 48,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
}));

export type SelectProps = {
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    id?: string;
    label: string;
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
    native?: boolean;
    renderOption?: (text: string) => React.ReactNode;
};

const SelectInput: React.FC<SelectProps> = ({
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
    native,
    renderOption,
}) => {
    const inputRef = React.useRef<HTMLSelectElement | HTMLInputElement>(null);
    const focusableRef = React.useRef<HTMLSelectElement | HTMLDivElement>(null);
    const [valueState, setValueState] = React.useState<string>();
    const [isFocused, setIsFocused] = React.useState(false);
    const [cursorIndex, setCursorIndex] = React.useState<number | null>(
        valueProp ? options.findIndex(({value}) => value === valueProp) : null
    );
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
    const {
        isOpen,
        closeMenu,
        targetProps: {onPress: onPressTarget, ref: targetRef},
        menuProps,
    } = useMenu();

    const shouldUseNative =
        native || process.env.NODE_ENV === 'test' || isAndroid(platformOverrides) || isIos(platformOverrides);

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

    const setValue = (val?: string) => {
        closeMenu();
        if (onChangeValue && typeof val === 'string') {
            onChangeValue(val);
        }
        if (typeof value === 'undefined') {
            setValueState(val);
        }
    };

    const focusableElement = focusableRef.current;
    const inputElement = inputRef.current;

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
        const updateCursorIndex = (e: KeyboardEvent) => {
            const keyToOperand: Record<number, 1 | -1 | undefined> = {[UP]: -1, [DOWN]: 1};
            const operand = keyToOperand[e.keyCode];
            if (operand) {
                cancelEvent(e);
                const newIndex = cursorIndex !== null ? cursorIndex + operand : 0;

                if (newIndex < 0 || newIndex > options.length - 1) {
                    return;
                }

                setCursorIndex(newIndex);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen) {
                if (e.keyCode === TAB) {
                    cancelEvent(e);
                }
                if (e.keyCode === ENTER || e.keyCode === SPACE) {
                    cancelEvent(e);
                    if (cursorIndex !== null && options[cursorIndex].value !== valueState) {
                        setValue(options[cursorIndex].value);
                    }
                    closeMenu();
                }
            }
            // so we don't change the cursorIndex while menu is closing
            if (isOpen) {
                updateCursorIndex(e);
            }
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    React.useEffect(() => {
        if (autoFocus && focusableRef) {
            focusableRef.current?.focus();
        }
    }, [autoFocus]);

    const classes = useStyles({
        label: label || (optional && !shouldUseNative),
        helperText,
        disabled,
        fullWidth,
    });

    // When the value is null/undefined/'' we assume it's the default empty option and we don't show any label
    const getOptionText = (val?: string) => (val ? options.find(({value}) => value === val)?.text : '');

    const containerActiveProps = {
        tabIndex: 0,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        onClick: (event: React.MouseEvent) => {
            setIsFocused(true);
            onPressTarget(event);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
            if (!isOpen && (e.keyCode === SPACE || e.keyCode === ENTER)) {
                cancelEvent(e);
                onPressTarget(e);
            }
        },
    };

    return shouldUseNative ? (
        <FieldContainer helperText={<HelperText error={error} leftText={helperText} />} fullWidth={fullWidth}>
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
                style={{
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
                    value={value}
                    shrinkLabel={!!(value || valueState)}
                    name={name}
                    helperText={helperText}
                    required={!optional}
                    disabled={disabled}
                    id={inputId}
                    error={error}
                    inputProps={inputProps}
                    fieldRef={targetRef}
                    inputRef={inputRef}
                />
                <div className={classes.selectText}>{getOptionText(value ?? valueState)}</div>
            </div>
            <Menu>
                <ul {...menuProps} onPointerDown={cancelEvent} role="listbox">
                    {options.map(({value: val, text}, index) => (
                        <li
                            role="option"
                            aria-selected={val === (valueState ?? value)}
                            key={val}
                            data-value={val}
                            className={classNames(classes.menuItem, {
                                [classes.menuItemSelected]:
                                    cursorIndex === index || val === (valueState ?? value),
                            })}
                            onPointerDown={cancelEvent}
                            onClick={() => setValue(val)}
                        >
                            {renderOption ? renderOption(text) : text}
                        </li>
                    ))}
                </ul>
            </Menu>
        </>
    );
};

const Select: React.FC<SelectProps> = (props) => (
    <MenuProvider>
        <SelectInput {...props} />
    </MenuProvider>
);

export default Select;
