'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import * as tokens from './text-tokens';

export type FormStatus = 'filling' | 'sending';
export type FormErrors = {[name: string]: string | undefined};
export type FieldValidator = (value: any, rawValue: string) => string | undefined;

export type FieldRegistration = {
    input?: HTMLInputElement | HTMLSelectElement | null;
    validator?: FieldValidator;
    focusableElement?: HTMLDivElement | HTMLSelectElement | null;
    label?: string;
};

type Context = {
    // raw values are the real input values
    rawValues: {[name: string]: any};
    setRawValue: (param: {readonly name: string; readonly value: any}) => void;
    // these values can have some kind of postprocessing. For example, remove spaces from credit card numbers
    values: {[name: string]: any};
    setValue: (param: {readonly name: string; readonly value: any}) => void;
    formStatus: FormStatus;
    register: (name: string, ref: FieldRegistration) => void;
    formErrors: FormErrors;
    setFormError: (param: {readonly name: string; readonly error?: string}) => void;
    jumpToNext: (currentName: string) => void;
    submit: () => void;
    validate: () => FormErrors;
    formId: string;
};

export const FormContext = React.createContext<Context>({
    values: {},
    setValue: () => {},
    rawValues: {},
    setRawValue: () => {},
    formStatus: 'filling',
    register: () => {},
    formErrors: {},
    setFormError: () => {},
    jumpToNext: () => {},
    submit: () => {},
    validate: () => ({}),
    formId: '',
});

export const useForm = (): Context => React.useContext(FormContext);

export const useControlProps = <T,>({
    name,
    label,
    value,
    defaultValue,
    onChange,
    disabled,
}: {
    name: string;
    label?: string;
    value: undefined | T;
    defaultValue: undefined | T;
    onChange: undefined | ((value: T) => void);
    disabled?: boolean;
}): {
    name: string;
    label?: string;
    value?: T;
    defaultValue?: T;
    onChange: (value: T) => void;
    focusableRef: (focusableElement: HTMLDivElement | null) => void;
    disabled: boolean | undefined;
} => {
    const {setRawValue, setValue, rawValues, setFormError, register, formStatus} = useForm();

    React.useEffect(() => {
        if (rawValues[name] === undefined) {
            const initialValue = value ?? defaultValue ?? false;
            setValue({name, value: initialValue});
            setRawValue({name, value: initialValue});
        }
    }, [value, name, defaultValue, rawValues, setValue, setRawValue]);

    return {
        name,
        label,
        value,
        defaultValue: defaultValue ?? (value === undefined ? rawValues[name] ?? false : undefined),
        focusableRef: (focusableElement: HTMLDivElement | null) =>
            register(name, {
                focusableElement,
                label,
            }),
        onChange: (value: T) => {
            setRawValue({name, value});
            setValue({name, value});
            setFormError({name, error: ''});
            onChange?.(value);
        },
        disabled: formStatus === 'sending' || disabled,
    };
};

export const useFieldProps = ({
    name,
    label,
    value,
    defaultValue,
    processValue,
    helperText,
    optional,
    error,
    disabled,
    onBlur,
    validate,
    validateOnBlurInsideForm = true,
    onChange,
    onChangeValue,
}: {
    name: string;
    label: string;
    value?: string;
    defaultValue?: string;
    processValue: (value: string) => unknown;
    helperText?: string;
    optional?: boolean;
    error?: boolean;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler;
    validate?: (value: any, rawValue: string) => string | undefined;
    validateOnBlurInsideForm?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeValue?: (value: any, rawValue: string) => void;
}): {
    value?: string;
    defaultValue?: string;
    name: string;
    label: string;
    helperText?: string;
    required: boolean;
    error: boolean;
    disabled: boolean;
    onBlur: React.FocusEventHandler | undefined;
    inputRef: (field: HTMLInputElement | null) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} => {
    const {texts, t} = useTheme();
    const {setRawValue, setValue, rawValues, values, formErrors, formStatus, setFormError, register} =
        useForm();
    const rawValue = value ?? defaultValue ?? rawValues[name] ?? '';
    const processValueRef = React.useRef(processValue);

    React.useEffect(() => {
        setRawValue({name, value: rawValue});
        setValue({name, value: processValueRef.current(rawValue)});
    }, [name, rawValue, setRawValue, setValue]);

    React.useEffect(() => {
        if (disabled) {
            setFormError({name, error: undefined});
        }
    }, [disabled, name, setFormError]);

    return {
        value,
        defaultValue: defaultValue ?? (value === undefined ? rawValues[name] ?? '' : undefined),
        name,
        label,
        helperText: formErrors[name] || helperText,
        required: !optional,
        error: error || !!formErrors[name],
        disabled: disabled || formStatus === 'sending',
        onBlur: validateOnBlurInsideForm
            ? (e: React.FocusEvent) => {
                  let error: string | undefined;
                  if (!rawValues[name] && !optional) {
                      error = texts.formFieldErrorIsMandatory || t(tokens.formFieldErrorIsMandatory);
                  } else if (validate) {
                      error = validate(values[name], rawValues[name]);
                  }
                  setFormError({name, error});
                  onBlur?.(e);
              }
            : onBlur,
        inputRef: (input: HTMLInputElement | null) => register(name, {input, validator: validate, label}),
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = event.currentTarget.value;
            const value = processValue(rawValue);
            setRawValue({name, value: rawValue});
            setValue({name, value});
            setFormError({name, error: ''});
            onChange?.(event);
            onChangeValue?.(value, rawValue);
        },
    };
};
