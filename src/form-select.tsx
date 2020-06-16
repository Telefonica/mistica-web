// @flow
import * as React from 'react';
import {useForm} from './form-context';
import Select from './select';

export type FormSelectProps = {
    disabled?: boolean,
    error?: boolean,
    helperText?: string,
    id?: string,
    label?: string,
    name: string,
    optional?: boolean,
    // use `inputProps` to pass props (as attributes) to the input element, for example a data-testid
    inputProps?: {[prop: string]: string, ...},
    validate?: (value: string | void, rawValue: string | void) => string | void,
    onChangeValue?: (string) => void,
    onBlur?: (event: SyntheticEvent<*>) => void,
    options: $ReadOnlyArray<{value: string, text: string}>,
    autoFocus?: boolean,
    value?: string,
    fullWidth?: boolean,
};

const FormSelect = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChangeValue,
    value,
    ...rest
}: FormSelectProps): React.ReactNode => {
    const {rawValues, setRawValue, setValue, formStatus, formErrors, setFormError, register} = useForm();
    const focusableRef = React.useRef<?HTMLDivElement | HTMLSelectElement>();
    const inputRef = React.useRef();

    const focusableElement = focusableRef.current;
    const inputElement = inputRef.current;

    React.useEffect(() => {
        register({name, field: inputRef.current, focusableElement: focusableRef.current});
        return () => {
            register({name, field: null, focusableElement: null});
        };
    }, [name, register, focusableRef, inputRef, focusableElement, inputElement]);

    return (
        <Select
            {...rest}
            focusableRef={focusableRef}
            inputRef={inputRef}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name] ?? ''}
            onChange={(event) => {
                setRawValue({name, value: event.currentTarget.value});
            }}
            onChangeValue={(value) => {
                onChangeValue?.(value);
                setFormError({name, error: ''});
                setRawValue({name, value});
                setValue({name, value});
            }}
        />
    );
};

export default FormSelect;
