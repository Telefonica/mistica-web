'use client';
import classNames from 'classnames';
import * as React from 'react';
import Inline from './inline';
import * as textFieldStyles from './text-field-base.css';
import * as styles from './pin-field.css';
import {useTheme} from './hooks';
import ScreenReaderOnly from './screen-reader-only';
import {IntegerInput} from './integer-field';
import {useFieldProps} from './form-context';
import {createChangeEvent, getPrefixedDataAttributes} from './utils/dom';
import {HelperText} from './text-field-components';
import {flushSync} from 'react-dom';
import * as tokens from './text-tokens';
import {vars} from './skins/skin-contract.css';

import type {DataAttributes} from './utils/types';

// Protection for when there is more than one OtpField in the page.
// This should't be a supported use case, but we need it in storybook/playroom, and for some reason
// some Chrome versions crash when using navigator.credentials.get() more than once simultaneously.
let isWaitingForSms = false;

type PinInputProps = {
    length?: number;
    hideCode?: boolean;
    readSms?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: (field: HTMLInputElement | null) => void;
};

const PinInput = ({
    length = 6,
    hideCode = false,
    readSms,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    inputRef,
}: PinInputProps): React.ReactElement => {
    const {texts, t} = useTheme();
    const [selfValue, setSelfValue] = React.useState<string>(defaultValue?.slice(0, length) ?? '');
    const [focusIndex, setFocusIndex] = React.useState<number | undefined>(undefined);

    const inputsList: Array<HTMLInputElement | null> = React.useRef(Array.from({length}, () => null)).current;

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue: string = isControlledByParent ? value : selfValue;

    const changeValue = React.useCallback(
        (newValue: string) => {
            if (newValue === controlledValue) {
                return;
            }
            if (!isControlledByParent) {
                setSelfValue(newValue);
            }
            const firstInput = inputsList[0];
            if (firstInput) {
                onChange?.(createChangeEvent({...firstInput}, newValue));
            }
        },
        [controlledValue, inputsList, isControlledByParent, onChange]
    );

    // sync controlled value if length changes
    React.useEffect(() => {
        changeValue(controlledValue.slice(0, length));
    }, [length, controlledValue, changeValue]);

    React.useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API
        if (readSms && 'OTPCredential' in window && !isWaitingForSms) {
            isWaitingForSms = true;
            const abortController = new AbortController();
            navigator.credentials
                .get({
                    // @ts-expect-error: otp is not in the types yet
                    otp: {transport: ['sms']},
                    signal: abortController.signal,
                })
                .then((otp) => {
                    if (otp) {
                        // @ts-expect-error: otp is not in the types yet
                        const code = otp.code.slice(0, length);
                        changeValue(code);
                    }
                })
                .catch(() => {
                    // ignore;
                })
                .finally(() => {
                    isWaitingForSms = false;
                });
            return () => {
                isWaitingForSms = false;
                abortController.abort();
            };
        }
    }, [changeValue, length, readSms]);

    const createInputChangeHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;

        // digit was deleted
        if (eventValue === '') {
            // case already handled in onKeyDown
            return;
        }

        const currentValue = controlledValue[index];
        let newInputValue: string = eventValue;
        if (!currentValue || currentValue === eventValue) {
            newInputValue = eventValue;
        } else if (currentValue === eventValue[0]) {
            newInputValue = eventValue.slice(1);
        } else if (currentValue === eventValue[eventValue.length - 1]) {
            newInputValue = eventValue.slice(0, -1);
        }

        let indexToFocus = index;
        let newControlledValue = controlledValue;

        // in the case of an autocomplete or copy and paste
        if (newInputValue.length >= 2) {
            const toPaste = newInputValue.slice(0, length - index);
            const prevChars = controlledValue.slice(0, index);

            newControlledValue = prevChars + toPaste;
            indexToFocus = Math.min(index + toPaste.length, length - 1);
        } else {
            newControlledValue =
                controlledValue.slice(0, index) + newInputValue + controlledValue.slice(index + 1);
            indexToFocus = index + 1;
        }

        if (newControlledValue === controlledValue) {
            return;
        }
        // need to flush sync to commit the new values to the dom before changing the focus
        flushSync(() => {
            changeValue(newControlledValue);
        });
        if (indexToFocus !== index && indexToFocus <= length - 1) {
            inputsList[indexToFocus]?.focus();
        }
    };

    return (
        <Inline space={8} wrap verticalSpace={16}>
            {Array.from({length}).map((_, index) => (
                <div
                    key={index}
                    className={
                        readOnly
                            ? styles.readOnlyField
                            : index === focusIndex
                              ? styles.focusedField
                              : styles.field
                    }
                >
                    <IntegerInput
                        aria-label={t(
                            texts.pinFieldInputLabel || tokens.pinFieldInputLabel,
                            index + 1,
                            length
                        )}
                        type={hideCode ? 'password' : 'text'}
                        tabIndex={index > controlledValue.length ? -1 : undefined}
                        required
                        onFocus={() => {
                            const firstIndexWithoutValue =
                                controlledValue.length === length ? -1 : controlledValue.length;
                            if (firstIndexWithoutValue >= 0 && firstIndexWithoutValue < index) {
                                inputsList[firstIndexWithoutValue]?.focus();
                            } else {
                                setFocusIndex(index);
                            }
                        }}
                        onBlur={() => {
                            setFocusIndex(undefined);
                        }}
                        inputRef={(el) => {
                            inputsList[index] = el;

                            if (index === 0) {
                                inputRef(el);
                            }
                        }}
                        className={classNames(textFieldStyles.input, styles.input, {
                            [styles.passwordInput]: hideCode,
                        })}
                        /**
                         * We need to override IntegerField styles because PinField has a different
                         * style than other inputs (less margin, fontSize and height).
                         */
                        style={{
                            lineHeight: styles.pinInputLineHeight,
                            fontSize: styles.pinInputLineHeight,
                            height: `calc(${styles.pinInputLineHeight} * 3 - 2px)`,
                            borderRadius: vars.borderRadii.input,
                        }}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={readSms ? 'one-time-code' : undefined}
                        value={controlledValue[index] ?? ''}
                        onChange={createInputChangeHandler(index)}
                        onKeyDown={(event) => {
                            switch (event.key) {
                                case 'Backspace':
                                case 'Delete':
                                    if (event.currentTarget.value) {
                                        // remove the char independently of caret position
                                        changeValue(
                                            controlledValue.slice(0, index) + controlledValue.slice(index + 1)
                                        );
                                    }
                                    if (index > 0 && index >= controlledValue.length - 1) {
                                        const prevInput = inputsList[index - 1];
                                        prevInput?.focus();
                                    }
                                    break;
                                case 'ArrowLeft':
                                    if (index > 0) {
                                        const prevInput = inputsList[index - 1];
                                        if (prevInput) {
                                            prevInput.focus();
                                        }
                                    }
                                    break;
                                case 'ArrowRight':
                                    if (index < length - 1) {
                                        const nextInput = inputsList[index + 1];
                                        if (nextInput) {
                                            nextInput.focus();
                                        }
                                    }
                                    break;
                                default:
                                // ignore
                            }
                        }}
                    />
                    {hideCode && controlledValue[index] && (
                        <div aria-hidden className={styles.passwordDot}>
                            •
                        </div>
                    )}
                </div>
            ))}
        </Inline>
    );
};

type OtpFieldProps = {
    length?: number;
    /**
     * Whether to hide the input code (password like input), false by default.
     */
    hideCode?: boolean;
    /**
     * Whether to read incoming SMS with OTP codes. It's true by default if hideCode is false, and false otherwise.
     */
    readSms?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    name: string;
    value?: string;
    defaultValue?: string;
    helperText?: string;
    error?: boolean;
    onChangeValue?: (value: string, rawValue: string) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
};

const PinField = ({
    length = 6,
    hideCode = false,
    readSms = !hideCode, // by default, don't read sms if the code is hidden (password input type)
    disabled,
    readOnly,
    name,
    value,
    defaultValue,
    helperText,
    error,
    onChangeValue,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    dataAttributes,
}: OtpFieldProps): React.ReactElement => {
    const fieldProps = useFieldProps({
        name,
        label: ariaLabel ?? '',
        value,
        defaultValue,
        processValue: (s) => s,
        helperText,
        optional: false,
        error,
        disabled,
        onChangeValue,
        onChange,
    });

    const otpLabelId = React.useId();

    return (
        <div
            role="group"
            aria-labelledby={ariaLabelledBy ?? otpLabelId}
            className={classNames(styles.fieldContainer, {[styles.disabled]: disabled})}
            {...getPrefixedDataAttributes(dataAttributes, 'PinField')}
        >
            {ariaLabel && !ariaLabelledBy && (
                <ScreenReaderOnly>
                    <div id={otpLabelId}>{ariaLabel}</div>
                </ScreenReaderOnly>
            )}
            <PinInput
                inputRef={fieldProps.inputRef}
                length={length}
                hideCode={hideCode}
                readSms={readSms}
                value={fieldProps.value}
                defaultValue={fieldProps.defaultValue}
                disabled={fieldProps.disabled}
                onChange={fieldProps.onChange}
                readOnly={readOnly}
            />
            <HelperText error={fieldProps.error} leftText={fieldProps.helperText} />
        </div>
    );
};

export default PinField;
