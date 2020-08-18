import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import IconSearch from './icons/icon-search';
import IconClose from './icons/icon-close';
import IconButton from './icon-button';

import type {CommonFormFieldProps} from './text-field-base';
import {useTheme} from './hooks';

export interface FormSearchFieldProps extends CommonFormFieldProps {
    // onChange?: undefined;
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => Array<string>;
}

const FormSearchField: React.FC<FormSearchFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate,
    onChange,
    onChangeValue,
    onBlur,
    value,
    defaultValue,
    ...rest
}) => {
    const theme = useTheme();
    const inputRef = React.useRef<HTMLInputElement>();
    const [searchValue, setSearchValue] = React.useState(defaultValue || '');

    const isControlledByParent = typeof value !== 'undefined';

    const controlledValue = isControlledByParent ? value : searchValue;

    const handleChangeValue = React.useCallback(
        (newValue, newRawValue) => {
            if (!isControlledByParent) {
                setSearchValue(newValue);
            }
            onChangeValue?.(newValue, newRawValue);
        },
        [isControlledByParent, onChangeValue]
    );

    const clearInput = React.useCallback(() => {
        handleChangeValue('', '');
        if (inputRef.current) {
            const el = inputRef.current;
            const event = new Event('change') as any;
            el.value = '';
            onChange?.({...event, target: el, currentTarget: el});
            el.focus();
        }
    }, [handleChangeValue, onChange]);

    const focus = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const fieldProps = useFieldProps({
        name,
        value: controlledValue,
        defaultValue: undefined,
        processValue: (v: string) => v,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        onChange,
        onChangeValue: handleChangeValue,
    });

    return (
        <TextFieldBase
            ref={inputRef}
            startIcon={
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div onClick={focus}>
                    <IconSearch />
                </div>
            }
            endIcon={
                controlledValue ? (
                    <IconButton
                        style={{display: 'flex'}}
                        label={theme.texts.formSearchClear}
                        onPress={clearInput}
                    >
                        <IconClose />
                    </IconButton>
                ) : undefined
            }
            {...rest}
            {...fieldProps}
            type="search"
        />
    );
};

export default FormSearchField;
