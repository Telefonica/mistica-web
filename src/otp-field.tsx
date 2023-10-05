import classNames from 'classnames';
import * as React from 'react';
import Inline from './inline';
import * as textFieldStyles from './text-field-base.css';
import * as styles from './otp-field.css';
import {useAriaId} from './hooks';
import ScreenReaderOnly from './screen-reader-only';
import {IntegerInput} from './integer-field';
import {useFieldProps} from './form-context';
import {createChangeEvent} from './utils/dom';
import {HelperText} from './text-field-components';

type OtpInputProps = {
    length?: number;
    hideCode?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: (field: HTMLInputElement | null) => void;
};

const OtpInput = ({
    length = 6,
    hideCode = false,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    inputRef,
}: OtpInputProps): React.ReactElement => {
    const [selfValue, setSelfValue] = React.useState<string>(defaultValue?.slice(0, length) ?? '');
    const [focusIndex, setFocusIndex] = React.useState<number | undefined>(undefined);

    const inputsList: Array<HTMLInputElement | null> = React.useRef(Array.from({length}, () => null)).current;

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue: string = isControlledByParent ? value.slice(0, length) : selfValue;

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
                onChange?.(createChangeEvent(firstInput, newValue));
            }
        },
        [controlledValue, inputsList, isControlledByParent, onChange]
    );

    React.useEffect(() => {
        if ('OTPCredential' in window) {
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
                });
            return () => {
                abortController.abort();
            };
        }
    }, [changeValue, length]);

    const createInputChangeHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;

        // digit was deleted
        if (eventValue === '') {
            // remove the char:
            changeValue(controlledValue.slice(0, index) + controlledValue.slice(index + 1));
            if (index > 0) {
                const prevInput = inputsList[index - 1];
                prevInput?.focus();
                requestAnimationFrame(() => {
                    prevInput?.setSelectionRange(1, 1);
                });
            }
            return;
        }

        let indexToFocus = index;
        const currentValue = controlledValue[index];
        let newValue: string = eventValue;
        if (!currentValue || currentValue === eventValue) {
            newValue = eventValue;
        } else if (currentValue === eventValue[0]) {
            newValue = eventValue.slice(1);
        } else if (currentValue === eventValue[eventValue.length - 1]) {
            newValue = eventValue.slice(0, -1);
        }

        // in the case of an autocomplete or copy and paste
        if (newValue.length >= 2) {
            const toPaste = newValue.slice(0, length - index);
            const prevChars = controlledValue.slice(0, index);
            changeValue(prevChars + toPaste);

            indexToFocus = index + toPaste.length;
        } else {
            changeValue(controlledValue.slice(0, index) + newValue + controlledValue.slice(index + 1));
            indexToFocus = index + 1;
        }

        if (indexToFocus !== index && indexToFocus <= length - 1) {
            inputsList[indexToFocus]?.focus();
        }
    };
    const firstIndexWithoutValue = inputsList.findIndex((input) => !input?.value);

    return (
        <Inline space={8}>
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
                        type={hideCode ? 'password' : 'text'}
                        tabIndex={index > firstIndexWithoutValue ? -1 : undefined}
                        required
                        onFocus={() => {
                            const firstIndexWithoutValue = inputsList.findIndex((input) => !input?.value);
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
                        className={classNames(
                            textFieldStyles.input,
                            textFieldStyles.inputWithoutLabel,
                            styles.input,
                            {
                                [styles.passwordInput]: hideCode,
                            }
                        )}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete="one-time-code"
                        value={controlledValue[index] ?? ''}
                        onChange={createInputChangeHandler(index)}
                        onKeyDown={(event) => {
                            switch (event.key) {
                                case 'ArrowLeft':
                                    if (index > 0) {
                                        const prevInput = inputsList[index - 1];
                                        if (prevInput) {
                                            prevInput.focus();
                                            requestAnimationFrame(() => {
                                                prevInput.setSelectionRange(1, 1);
                                            });
                                        }
                                    }
                                    break;
                                case 'ArrowRight':
                                    if (index < length - 1) {
                                        const nextInput = inputsList[index + 1];
                                        if (nextInput) {
                                            nextInput.focus();
                                            requestAnimationFrame(() => {
                                                nextInput.setSelectionRange(0, 0);
                                            });
                                        }
                                    }
                                    break;
                                default:
                                // ignore
                            }
                        }}
                    />
                    {hideCode && controlledValue[index] && <div className={styles.passwordDot}>•</div>}
                </div>
            ))}
        </Inline>
    );
};

type OtpFieldProps = {
    length?: number;
    hideCode?: boolean;
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
};

const OtpField = ({
    length = 6,
    hideCode = false,
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
}: OtpFieldProps): React.ReactElement => {
    const fieldProps = useFieldProps({
        name,
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

    const otpLabelId = useAriaId();

    return (
        <div
            role="group"
            aria-labelledby={ariaLabelledBy ?? otpLabelId}
            className={disabled ? styles.disabled : undefined}
        >
            {ariaLabel && !ariaLabelledBy && (
                <ScreenReaderOnly>
                    <div id={otpLabelId}>{ariaLabel}</div>
                </ScreenReaderOnly>
            )}
            <OtpInput
                inputRef={fieldProps.inputRef}
                length={length}
                hideCode={hideCode}
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

export default OtpField;
