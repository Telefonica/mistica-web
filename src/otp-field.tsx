import classNames from 'classnames';
import * as React from 'react';
import Inline from './inline';
import * as textFieldStyles from './text-field-base.css';
import * as styles from './otp-field.css';
import {useAriaId} from './hooks';
import ScreenReaderOnly from './screen-reader-only';
import {IntegerInput} from './integer-field';

type OtpFieldProps = {
    length?: number;
    disabled?: boolean;
    readOnly?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
};

const OtpField = ({
    length = 6,
    disabled,
    readOnly,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: OtpFieldProps): React.ReactElement => {
    const [inputValues, setInputValues] = React.useState<Array<string>>(Array.from({length}, () => ''));
    const [focusIndex, setFocusIndex] = React.useState<number | undefined>(undefined);

    const inputsMap = React.useRef(new Map<number, HTMLInputElement>()).current;
    const otpLabelId = useAriaId();

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
                        const code = otp.code;
                        const codeArray = code.split('').slice(0, length);
                        setInputValues(codeArray);
                    }
                })
                .catch(() => {
                    // ignore;
                });
            return () => {
                abortController.abort();
            };
        }
    }, [length]);

    const createInputChangeHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;

        // digit was deleted
        if (eventValue === '') {
            setInputValues((currentValues) => {
                const newValues = [...currentValues];
                newValues[index] = '';
                return newValues;
            });
            return;
        }

        let indexToFocus = index;
        const currentValue = inputValues[index];
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
            setInputValues((currentValues) => {
                const prevValues = currentValues.slice(0, index);
                const newValues = [...prevValues, ...toPaste];
                return newValues;
            });

            indexToFocus = index + toPaste.length;
        } else if (newValue.match(/^[0-9]$/)) {
            setInputValues((currentValues) => {
                const newValues = [...currentValues];
                newValues[index] = newValue;
                return newValues;
            });
            indexToFocus = index + 1;
        }

        if (indexToFocus !== index && indexToFocus <= length - 1) {
            inputsMap.get(indexToFocus)?.focus();
        }
    };
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
                            onFocus={() => {
                                setFocusIndex(index);
                            }}
                            onBlur={() => {
                                setFocusIndex(undefined);
                            }}
                            inputRef={(el) => {
                                if (el) {
                                    inputsMap.set(index, el);
                                } else {
                                    inputsMap.delete(index);
                                }
                            }}
                            className={classNames(
                                textFieldStyles.input,
                                textFieldStyles.inputWithoutLabel,
                                styles.input
                            )}
                            disabled={disabled}
                            readOnly={readOnly}
                            autoComplete="one-time-code"
                            value={inputValues[index]}
                            onChange={createInputChangeHandler(index)}
                            onKeyDown={(event) => {
                                // focus previous input if we are deleting and the current one is empty
                                if (
                                    event.key === 'Backspace' &&
                                    event.currentTarget.value === '' &&
                                    index > 0
                                ) {
                                    const prevInput = inputsMap.get(index - 1);
                                    if (prevInput) {
                                        prevInput.focus();
                                    }
                                }
                            }}
                        />
                    </div>
                ))}
            </Inline>
        </div>
    );
};

export default OtpField;
