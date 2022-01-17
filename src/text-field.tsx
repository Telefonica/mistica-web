import * as React from 'react';
import {useFieldProps} from './form-context';
import TextFieldBase from './text-field-base';
import {combineRefs} from './utils/common';

import type {CommonFormFieldProps} from './text-field-base';

export interface TextFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    onPress?: (event: React.MouseEvent) => void;
    multiline?: boolean;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
    getSuggestions?: (value: string) => Array<string>;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            disabled,
            error,
            helperText,
            name,
            optional,
            validate,
            onChangeValue,
            onChange,
            value,
            defaultValue,
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            onPress,
            ...rest
        },
        ref
    ) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const processValue = (v: string) => v;

        const onBlur = (event: React.FocusEvent<Element>) => {
            if (rest.multiline && inputRef.current) {
                // scroll to start
                inputRef.current.scrollTop = 0;
            }
            onBlurProp?.(event);
        };

        const onFocus = (event: React.FocusEvent<Element>) => {
            if (rest.multiline) {
                setTimeout(() => {
                    if (inputRef.current) {
                        // place caret to the end
                        const value = inputRef.current.value;
                        inputRef.current.value = '';
                        inputRef.current.value = value;
                        // scroll to end
                        inputRef.current.scrollTop = inputRef.current.scrollHeight;
                    }
                }, 0);
            }
            onFocusProp?.(event);
        };

        const fieldProps = useFieldProps({
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
        });

        return (
            <TextFieldBase
                {...rest}
                {...fieldProps}
                onClick={onPress}
                inputRef={combineRefs(inputRef, fieldProps.inputRef, ref)}
                onFocus={onFocus}
                type="text"
            />
        );
    }
);

export default TextField;
