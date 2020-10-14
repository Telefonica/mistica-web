import * as React from 'react';
import {useTheme} from './hooks';
import {FormContext} from './form-context';
import {createUseStyles} from './jss';
import classnames from 'classnames';

import type {FormStatus, FormErrors, FieldValidator, FieldRegistration} from './form-context';

type FormValues = {[name: string]: any};

const useStyles = createUseStyles(() => ({
    form: {
        width: '100%',
    },
}));

type FieldRefs = {
    input?: HTMLInputElement | HTMLSelectElement | null;
    validator?: FieldValidator;
    focusableElement?: HTMLDivElement | HTMLSelectElement | null;
};

type FormProps = {
    id?: string;
    onSubmit: (values: FormValues, rawValues: FormValues) => Promise<void> | void;
    initialValues?: FormValues;
    autoJump?: boolean;
    children: React.ReactNode;
    className?: string;
};

const Form: React.FC<FormProps> = ({
    children,
    className,
    onSubmit,
    initialValues = {},
    autoJump = false,
    id,
}) => {
    const isMountedRef = React.useRef(true); // https://github.com/facebook/react/issues/14369#issuecomment-468305796
    const [values, setValues] = React.useState(initialValues);
    const [rawValues, setRawValues] = React.useState(initialValues);
    const [formStatus, setFormStatus] = React.useState<FormStatus>('filling');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({});
    const fieldRefs = React.useRef(new Map<string, FieldRefs>());
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const {texts} = useTheme();
    const classes = useStyles();

    React.useEffect(
        () => () => {
            isMountedRef.current = false;
        },
        []
    );

    const register = React.useCallback(({name, field, validate, focusableElement}: FieldRegistration) => {
        if (field || focusableElement) {
            fieldRefs.current.set(name, {
                input: field,
                validator: validate,
                focusableElement,
            });
        } else {
            fieldRefs.current.delete(name);
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
        for (const [name, {input, validator, focusableElement}] of fieldRefs.current) {
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
        return errors;
    }, [rawValues, texts, values]);

    const jumpToNext = React.useCallback(
        (currentName: string) => {
            // jump is delayed because if executed synchronously it happens before react updates states
            // after onChange events and the validators executed onBlur still read from the old state
            setTimeout(() => {
                if (autoJump && formRef.current) {
                    const elements: Array<HTMLElement> = Array.from(
                        formRef.current.querySelectorAll('input, select')
                    );
                    const currentElement = fieldRefs.current.get(currentName)?.input;
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
        [...fieldRefs.current.keys()].reduce(
            (nonDisabled, name) =>
                fieldRefs.current.get(name)?.input?.disabled
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
