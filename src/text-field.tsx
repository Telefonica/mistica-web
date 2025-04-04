'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {combineRefs} from './utils/common';
import {createChangeEvent} from './utils/dom';
import {useIsomorphicLayoutEffect} from './hooks';

import type {CommonFormFieldProps} from './text-field-base';

const useKeepMaxLength = (
    input: HTMLInputElement | null,
    value?: string,
    maxLength?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
    useIsomorphicLayoutEffect(() => {
        if (input && value && maxLength && value.length > maxLength && onChange) {
            onChange(createChangeEvent(input, value.slice(0, maxLength)));
        }
    }, [onChange, value, maxLength, input]);
};

export interface TextFieldProps extends CommonFormFieldProps<HTMLInputElement | HTMLTextAreaElement> {
    onChangeValue?: (value: string, rawValue: string) => void;
    onPress?: (event: React.MouseEvent) => void;
    multiline?: boolean;
    prefix?: React.ReactNode;
    endIcon?: React.ReactNode;
    getSuggestions?: (value: string) => ReadonlyArray<string>;
    role?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            disabled,
            error,
            helperText,
            name,
            label,
            optional,
            validate,
            validateOnBlurInsideForm,
            onChangeValue,
            onChange,
            value,
            defaultValue,
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            onPress,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const processValue = (v: string) => v;

        const onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (rest.multiline && inputRef.current) {
                // scroll to start
                inputRef.current.scrollTop = 0;
            }
            onBlurProp?.(event);
        };

        const onFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            validateOnBlurInsideForm,
            onChange,
            onChangeValue,
        });

        useKeepMaxLength(inputRef.current, fieldProps.value, rest.maxLength, fieldProps.onChange);

        return (
            <TextFieldBaseAutosuggest
                {...rest}
                {...fieldProps}
                onClick={onPress}
                inputRef={combineRefs(inputRef, fieldProps.inputRef, ref)}
                onFocus={onFocus}
                type="text"
                dataAttributes={{'component-name': 'TextField', testid: 'TextField', ...dataAttributes}}
            />
        );
    }
);

export default TextField;
