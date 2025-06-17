'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import {FormContext} from './form-context';
import classnames from 'classnames';
import * as styles from './form.css';
import * as tokens from './text-tokens';
import ScreenReaderOnly from './screen-reader-only';
import {isIos} from './utils/platform';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';
import type {FormStatus, FormErrors, FieldRegistration} from './form-context';

if (
    process.env.NODE_ENV !== 'test' &&
    typeof document !== 'undefined' &&
    !('scrollBehavior' in document.documentElement.style)
) {
    // polyfill for element.scrollIntoView
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    import('scroll-behavior-polyfill').finally(() => {});
}

export type FormValues = {[name: string]: any};

type HTMLFieldElement = HTMLSelectElement | HTMLInputElement;

type FormProps = {
    id?: string;
    onSubmit: (values: FormValues, rawValues: FormValues) => Promise<void> | void;
    initialValues?: FormValues;
    autoJump?: boolean;
    children: React.ReactNode;
    onValidationErrors?: (errors: FormErrors) => void;
    getErrorMessageForScreenReader?: (errors: FormErrors) => string;
    className?: string;
    dataAttributes?: DataAttributes;
};

const Form = ({
    children,
    className,
    onSubmit,
    initialValues = {},
    autoJump = false,
    onValidationErrors,
    getErrorMessageForScreenReader,
    id: idProp,
    dataAttributes,
}: FormProps): JSX.Element => {
    const isMountedRef = React.useRef(true); // https://github.com/facebook/react/issues/14369#issuecomment-468305796
    const [values, setValues] = React.useState(initialValues);
    const [rawValues, setRawValues] = React.useState(initialValues);
    const [formStatus, setFormStatus] = React.useState<FormStatus>('filling');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({});
    const fieldRegistrations = React.useRef(new Map<string, FieldRegistration>());
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const {texts, t, platformOverrides} = useTheme();
    const reactId = React.useId();
    const id = idProp || reactId;

    React.useEffect(() => {
        /**
         * When using React with Strict Mode on, the component's effects are executed twice. If we don't set the ref's value to true
         * the first time the effect is triggered, this value will be set to false forever, preventing handleSubmit()
         * from resetting the formStatus to filling after the submit action is handled.
         * https://react.dev/reference/react/StrictMode#strictmode
         */
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const register = React.useCallback(
        (name: string, {input, validator, focusableElement, label}: FieldRegistration) => {
            if (input || focusableElement) {
                fieldRegistrations.current.set(name, {
                    input,
                    validator,
                    focusableElement,
                    label,
                });
            } else {
                fieldRegistrations.current.delete(name);
            }
        },
        []
    );

    const setFormError = React.useCallback(
        ({name, error}: {name: string; error?: string}) =>
            setFormErrors((formErrors) => ({...formErrors, [name]: error})),
        []
    );

    /**
     * In iOS the pickers/selects are automatically opened when the input is focused
     * This is not what we want so, for some specific elements, we disable the autofocus on error
     */
    const shouldAutofocusFieldOnError = React.useCallback(
        (element: HTMLFieldElement): boolean => {
            if (!isIos(platformOverrides)) {
                return true;
            }
            if (element.tagName === 'SELECT') {
                return false;
            }
            if (['date', 'datetime-local', 'month'].includes(element.type)) {
                return false;
            }
            return true;
        },
        [platformOverrides]
    );

    /**
     * returns true if all fields are ok and focuses the first field with an error
     */
    const validateFields = React.useCallback((): FormErrors => {
        const errors: FormErrors = {};
        for (const [name, {input, validator}] of fieldRegistrations.current) {
            if (input) {
                if (input.disabled) {
                    continue;
                }
                if (input.required && !rawValues[name]?.trim()) {
                    errors[name] = texts.formFieldErrorIsMandatory || t(tokens.formFieldErrorIsMandatory);
                } else {
                    const error = validator?.(values[name], rawValues[name]);
                    if (error) {
                        errors[name] = error;
                    }
                }
            }
        }

        const elementsWithErrors = Object.keys(errors)
            .map((name) => {
                const reg = fieldRegistrations.current.get(name);
                return reg?.focusableElement || reg?.input;
            })
            .filter(Boolean) as Array<HTMLFieldElement>; // casted to remove inferred nulls/undefines

        if (elementsWithErrors.length) {
            elementsWithErrors.sort((a, b) =>
                a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
            );
            const firstElementWithError = elementsWithErrors[0];
            if (shouldAutofocusFieldOnError(firstElementWithError)) {
                firstElementWithError.focus();
            }
            try {
                // polyfilled, see import at the top of this file
                firstElementWithError.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
            } catch (e) {
                // ignore errors
                // element.scrollIntoView not available in unit test environment
            }
        }

        setFormErrors(errors);
        if (onValidationErrors && Object.keys(errors).length > 0) {
            onValidationErrors(errors);
        }
        return errors;
    }, [
        onValidationErrors,
        rawValues,
        texts.formFieldErrorIsMandatory,
        t,
        values,
        shouldAutofocusFieldOnError,
    ]);

    const jumpToNext = React.useCallback(
        (currentName: string) => {
            // jump is delayed because if executed synchronously it happens before react updates states
            // after onChange events and the validators executed onBlur still read from the old state
            setTimeout(() => {
                if (autoJump && formRef.current) {
                    const elements: Array<HTMLElement> = Array.from(
                        formRef.current.querySelectorAll('input, select')
                    );
                    const currentElement = fieldRegistrations.current.get(currentName)?.input;
                    const currentIndex = elements.indexOf(currentElement as HTMLElement);
                    if (currentIndex >= 0) {
                        const nextElement = elements[currentIndex + 1];
                        if (nextElement) {
                            nextElement.focus();
                        } else {
                            currentElement?.blur();
                        }
                    }
                }
            }, 100);
        },
        [autoJump]
    );

    const getNonDisabledValues = (values: {[name: string]: string}) =>
        [...fieldRegistrations.current.keys()].reduce(
            (nonDisabled, name) =>
                fieldRegistrations.current.get(name)?.input?.disabled
                    ? nonDisabled
                    : {...nonDisabled, [name]: values[name]},
            {}
        );

    const handleSubmit = React.useCallback(
        (e?: React.FormEvent<HTMLFormElement>) => {
            e?.preventDefault();
            setFormStatus('sending');
            if (Object.keys(validateFields()).length > 0) {
                setFormStatus('filling');
                return Promise.resolve();
            }
            return Promise.resolve(
                onSubmit(getNonDisabledValues(values), getNonDisabledValues(rawValues))
            ).finally(() => {
                if (isMountedRef.current) {
                    setFormStatus('filling');
                }
            });
        },
        [onSubmit, rawValues, validateFields, values]
    );

    const setValue = React.useCallback(({name, value}: {name: string; value: any}) => {
        setValues((values) => ({...values, [name]: value}));
    }, []);

    const setRawValue = React.useCallback(({name, value}: {name: string; value: any}) => {
        setRawValues((rawValues) => ({...rawValues, [name]: value}));
    }, []);

    const fieldsWithErrorLabels = Object.entries(formErrors)
        .map(([name, errorMessage]) => errorMessage && fieldRegistrations.current.get(name)?.label)
        .filter(Boolean);

    const hasMultipleFormErrors = fieldsWithErrorLabels.length > 1;

    return (
        <FormContext.Provider
            value={{
                formStatus,
                values,
                setValue,
                rawValues,
                setRawValue,
                formErrors,
                setFormError,
                register,
                jumpToNext,
                validate: validateFields,
                submit: handleSubmit,
                formId: id,
            }}
        >
            <form
                id={id}
                onSubmit={handleSubmit}
                ref={formRef}
                className={classnames(styles.form, className)}
                noValidate
                {...getPrefixedDataAttributes(dataAttributes, 'Form')}
            >
                {hasMultipleFormErrors ? (
                    <ScreenReaderOnly>
                        <span role="alert">
                            {getErrorMessageForScreenReader
                                ? getErrorMessageForScreenReader(formErrors)
                                : `${texts.formErrorsAlertMessage || t(tokens.formErrorsAlertMessage)} ${fieldsWithErrorLabels.join(', ')}`}
                        </span>
                    </ScreenReaderOnly>
                ) : null}
                {children}
            </form>
        </FormContext.Provider>
    );
};

export default Form;
