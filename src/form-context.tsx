import * as React from 'react';

export type FormStatus = 'filling' | 'sending';
export type FormErrors = {[name: string]: string | undefined};
export type FieldValidator = (value: any, rawValue: string) => string | undefined;

export type FieldRegistration = {
    name: string;
    field?: HTMLInputElement | HTMLSelectElement | null;
    validate?: FieldValidator;
    focusableElement?: HTMLDivElement | HTMLSelectElement | null;
};

type Context = {
    // raw values are the real input values
    rawValues: {[name: string]: string};
    setRawValue: (param: {readonly name: string; readonly value: string}) => void;
    // these values can have some kind of postprocessing. For example, remove spaces from credit card numbers
    values: {[name: string]: any};
    setValue: (param: {readonly name: string; readonly value: any}) => void;
    formStatus: FormStatus;
    register: (ref: FieldRegistration) => void;
    formErrors: FormErrors;
    setFormError: (param: {readonly name: string; readonly error?: string}) => void;
    jumpToNext: (currentName: string) => void;
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
});

export const useForm = (): Context => React.useContext(FormContext);

export const useFieldProps = ({
    name,
    value,
    defaultValue,
    processValue,
    helperText,
    optional,
    error,
    disabled,
    onBlur,
    validate,
    onChange,
    onChangeValue,
}: {
    name: string;
    value: string | undefined;
    defaultValue: string | undefined;
    processValue: (value: string) => unknown;
    helperText: string | undefined;
    optional: boolean | undefined;
    error: boolean | undefined;
    disabled: boolean | undefined;
    onBlur: undefined | ((event: React.FocusEvent<Element>) => void);
    validate: undefined | ((value: any, rawValue: string) => string | undefined);
    onChange: undefined | ((event: React.ChangeEvent<HTMLInputElement>) => void);
    onChangeValue: undefined | ((value: any, rawValue: string) => void);
}): {
    value?: string;
    defaultValue?: string;
    name: string;
    helperText?: string;
    required: boolean;
    error: boolean;
    disabled: boolean;
    onBlur: (event: React.FocusEvent<Element>) => void;
    inputRef: (field: HTMLInputElement | null) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} => {
    const {
        setRawValue,
        setValue,
        rawValues,
        values,
        formErrors,
        formStatus,
        setFormError,
        register,
    } = useForm();
    const rawValue = value ?? defaultValue ?? rawValues[name] ?? '';
    const processValueRef = React.useRef(processValue);

    React.useEffect(() => {
        setRawValue({name, value: rawValue});
        setValue({name, value: processValueRef.current(rawValue)});
    }, [name, rawValue, setRawValue, setValue]);

    return {
        value,
        defaultValue: defaultValue ?? (value === undefined ? rawValues[name] ?? '' : undefined),
        name,
        helperText: helperText ?? formErrors[name],
        required: !optional,
        error: error || !!formErrors[name],
        disabled: disabled || formStatus === 'sending',
        onBlur: (e: React.FocusEvent) => {
            setFormError({name, error: validate?.(values[name], rawValues[name])});
            onBlur?.(e);
        },
        inputRef: (field: HTMLInputElement | null) => register({name, field, validate}),
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
