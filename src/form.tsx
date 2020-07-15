import * as React from 'react';
import {useTheme} from './hooks';
import {FormContext} from './form-context';
import {createUseStyles} from './jss';
import classnames from 'classnames';

import type {AutoComplete} from './text-field';
import type {FormStatus, FormErrors, FieldValidator} from './form-context';

type FormValues = {[name: string]: any};

type FieldRegistration = {
    name: string;
    field?: HTMLInputElement | HTMLSelectElement | null;
    validate?: FieldValidator;
    focusableElement?: HTMLDivElement | HTMLSelectElement | null;
};

const useStyles = createUseStyles(() => ({
    form: {
        width: '100%',
    },
}));

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
    const fieldRefs = React.useRef(new Map<string, HTMLInputElement | HTMLSelectElement>());
    const fieldValidators = React.useRef(new Map<string, FieldValidator>());
    const fieldFocusableRefs = React.useRef(new Map<string, HTMLDivElement | HTMLSelectElement>());
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const {texts} = useTheme();
    const classes = useStyles();

    React.useLayoutEffect(
        () => () => {
            isMountedRef.current = false;
        },
        []
    );

    const register = React.useCallback(({name, field, validate, focusableElement}: FieldRegistration) => {
        if (field) {
            fieldRefs.current.set(name, field);
            if (validate) {
                fieldValidators.current.set(name, validate);
            }
            if (focusableElement) {
                fieldFocusableRefs.current.set(name, focusableElement);
            }
        } else {
            fieldRefs.current.delete(name);
            fieldValidators.current.delete(name);
            fieldFocusableRefs.current.delete(name);
        }
    }, []);

    const setFormError = ({name, error}: {name: string; error?: string}) =>
        setFormErrors((formErrors) => ({...formErrors, [name]: error}));

    /**
     * returns true if all fields are ok and focuses the first field with an error
     */
    const validateFields = (): boolean => {
        const errors: FormErrors = {};
        let didFocus = false;
        for (const [name, input] of fieldRefs.current) {
            if (input.required && !input.value.trim()) {
                errors[name] = texts.formFieldErrorIsMandatory;
            } else {
                const error = fieldValidators.current.get(name)?.(values[name], rawValues[name]);
                if (error) {
                    errors[name] = error;
                }
            }
            if (errors[name] && !didFocus) {
                didFocus = true;
                if (fieldFocusableRefs.current.has(name)) {
                    fieldFocusableRefs.current.get(name)?.focus();
                } else {
                    input.focus();
                }
            }
        }
        setFormErrors(errors);
        return !Object.keys(errors).length;
    };

    const jumpToNext = React.useCallback(
        (currentName: string) => {
            // jump is delayed because if executed synchronously it happens before react updates states
            // after onChange events and the validators executed onBlur still read from the old state
            setTimeout(() => {
                if (autoJump && formRef.current) {
                    const elements: Array<HTMLElement> = Array.from(
                        formRef.current.querySelectorAll('input, select')
                    );
                    const currentElement = fieldRefs.current.get(currentName);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        if (!validateFields()) {
            setFormStatus('filling');
            return Promise.resolve();
        }
        return Promise.resolve(onSubmit(values, rawValues)).finally(() => {
            if (isMountedRef.current) {
                setFormStatus('filling');
            }
        });
    };

    const setValue = React.useCallback(
        ({name, value}) => {
            setValues({...values, [name]: value});
        },
        [values]
    );

    const setRawValue = React.useCallback(
        ({name, value}) => {
            setRawValues({...rawValues, [name]: value});
        },
        [rawValues]
    );

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

export interface CommonFormFieldProps {
    autoFocus?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    id?: string;
    label: string;
    name: string;
    optional?: boolean;
    maxLength?: number;
    // use `inputProps` to pass props (as attributes) to the input element, for example a data-testid
    inputProps?: {[prop: string]: string | number};
    validate?: FieldValidator;
    autoComplete?: AutoComplete;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    fullWidth?: boolean;
    getSuggestions?: (text: string) => Array<string>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default Form;
