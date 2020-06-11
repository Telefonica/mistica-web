import * as React from 'react';

export type FormStatus = 'filling' | 'sending';
export type FormErrors = {[name: string]: string | undefined};
export type FieldValidator = (value?: any, rawValue?: string) => string | undefined;

type FieldRegistration = {
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
