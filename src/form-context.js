// @flow
import * as React from 'react';

export type FormStatus = 'filling' | 'sending';
export type FormErrors = {[string]: string | void, ...};
export type FieldValidator = (value: any | void, rawValue: string | void) => string | void;

type FieldRegistration = {
    name: string,
    field?: HTMLInputElement | HTMLSelectElement | null,
    validate?: FieldValidator,
    focusableElement?: HTMLDivElement | HTMLSelectElement | null,
};

type Context = {
    // raw values are the real input values
    rawValues: {[string]: string, ...},
    setRawValue: ({
        +name: string,
        +value: string,
    }) => void,
    // these values can have some kind of postprocessing. For example, remove spaces from credit card numbers
    values: {[string]: any, ...},
    setValue: ({
        +name: string,
        +value: any,
    }) => void,
    formStatus: FormStatus,
    register: (FieldRegistration) => void,
    formErrors: FormErrors,
    setFormError: ({
        +name: string,
        +error: string | void,
    }) => void,
    jumpToNext: (currentName: string) => void,
};

export const FormContext: React.Context<Context> = React.createContext({
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
