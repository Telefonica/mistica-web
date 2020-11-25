import * as React from 'react';
import {useAriaId, useTheme} from './hooks';
import {FormContext} from './form-context';
import {createUseStyles} from './jss';
import classnames from 'classnames';

import type {FormStatus, FormErrors, FieldRegistration} from './form-context';

type FormValues = {[name: string]: any};

const useStyles = createUseStyles(() => ({
    form: {
        width: '100%',
    },
}));

/**
 * This TrackingEvent is not like the one in utils/types, because here the action attribute is optional and
 * it has a default value of 'inline_error'
 */
type TrackingEvent = {
    readonly [key: string]: unknown;
    readonly category: string;
    readonly action?: string;
    readonly label?: string;
    readonly value?: number;
};

type FormProps = {
    id?: string;
    onSubmit: (values: FormValues, rawValues: FormValues) => Promise<void> | void;
    initialValues?: FormValues;
    autoJump?: boolean;
    children: React.ReactNode;
    errorTrackingEvent?: TrackingEvent;
    className?: string;
};

const Form: React.FC<FormProps> = ({
    children,
    className,
    onSubmit,
    initialValues = {},
    autoJump = false,
    errorTrackingEvent,
    id: idProp,
}) => {
    const isMountedRef = React.useRef(true); // https://github.com/facebook/react/issues/14369#issuecomment-468305796
    const [values, setValues] = React.useState(initialValues);
    const [rawValues, setRawValues] = React.useState(initialValues);
    const [formStatus, setFormStatus] = React.useState<FormStatus>('filling');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({});
    const fieldRegistrations = React.useRef(new Map<string, FieldRegistration>());
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const {texts, analytics} = useTheme();
    const classes = useStyles();
    const id = useAriaId(idProp);

    React.useEffect(
        () => () => {
            isMountedRef.current = false;
        },
        []
    );

    const register = React.useCallback((name, {input, validator, focusableElement}: FieldRegistration) => {
        if (input || focusableElement) {
            fieldRegistrations.current.set(name, {
                input,
                validator,
                focusableElement,
            });
        } else {
            fieldRegistrations.current.delete(name);
        }
    }, []);

    const setFormError = ({name, error}: {name: string; error?: string}) =>
        setFormErrors((formErrors) => ({...formErrors, [name]: error}));

    /**
     * returns true if all fields are ok and focuses the first field with an error
     */
    const validateFields = React.useCallback((): FormErrors => {
        const errors: FormErrors = {};
        let didFocus = false;
        for (const [name, {input, validator, focusableElement}] of fieldRegistrations.current) {
            if (input) {
                if (input.disabled) {
                    continue;
                }
                if (input.required && !input.value.trim()) {
                    errors[name] = texts.formFieldErrorIsMandatory;
                } else {
                    const error = validator?.(values[name], rawValues[name]);
                    if (error) {
                        errors[name] = error;
                    }
                }
                if (errors[name] && !didFocus) {
                    didFocus = true;
                    if (focusableElement) {
                        focusableElement.focus();
                    } else {
                        input.focus();
                    }
                }
            }
        }
        setFormErrors(errors);
        if (errorTrackingEvent) {
            Object.keys(errors).forEach((fieldName) => {
                analytics.logEvent({
                    action: 'inline_error',
                    label: fieldName,
                    ...errorTrackingEvent,
                });
            });
        }
        return errors;
    }, [analytics, errorTrackingEvent, rawValues, texts, values]);

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

    const setValue = React.useCallback(({name, value}) => {
        setValues((values) => ({...values, [name]: value}));
    }, []);

    const setRawValue = React.useCallback(({name, value}) => {
        setRawValues((rawValues) => ({...rawValues, [name]: value}));
    }, []);

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
                className={classnames(classes.form, className)}
                noValidate
            >
                {children}
            </form>
        </FormContext.Provider>
    );
};

export default Form;
