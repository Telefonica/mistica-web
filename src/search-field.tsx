'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconSearchRegular from './generated/mistica-icons/icon-search-regular';
import {useTheme} from './hooks';
import {iconSize} from './icon-button.css';
import {FieldEndIcon, TextFieldBaseAutosuggest} from './text-field-base';
import * as tokens from './text-tokens';
import {combineRefs} from './utils/common';
import {createChangeEvent} from './utils/dom';

import type {CommonFormFieldProps} from './text-field-base';

export interface SearchFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => ReadonlyArray<string>;
    /**
     * Indicates when suggestions should be shown.
     * - 'focus': Show suggestions when the input is focused.
     * - number: Show suggestions after a certain number of characters have been typed.
     */
    shouldShowSuggestions?: 'focus' | number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    withStartIcon?: boolean;
}

const SearchField = React.forwardRef<any, SearchFieldProps>(
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
            onChange,
            onChangeValue,
            onBlur,
            value,
            defaultValue,
            withStartIcon = true,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        const {texts, t} = useTheme();
        const inputRef = React.useRef<HTMLInputElement>();
        const [searchValue, setSearchValue] = React.useState(defaultValue || '');
        const didClearFieldRef = React.useRef(false);

        const isControlledByParent = typeof value !== 'undefined';

        const controlledValue = isControlledByParent ? value : searchValue;

        const handleChangeValue = React.useCallback(
            (newValue: string, newRawValue: string) => {
                if (!isControlledByParent) {
                    setSearchValue(newValue);
                }
                onChangeValue?.(newValue, newRawValue);
            },
            [isControlledByParent, onChangeValue]
        );

        const clearInput = React.useCallback(() => {
            didClearFieldRef.current = true;
            handleChangeValue('', '');
            if (inputRef.current) {
                onChange?.(createChangeEvent(inputRef.current, ''));
            }
        }, [handleChangeValue, onChange]);

        React.useEffect(() => {
            // When clearing the field, we need to blur and focus again the input to recalculate suggestions after the value is cleared.
            if (didClearFieldRef.current && controlledValue === '') {
                didClearFieldRef.current = false;
                inputRef?.current?.blur();
                inputRef?.current?.focus();
            }
        }, [controlledValue]);

        const fieldProps = useFieldProps({
            name,
            label,
            value: controlledValue,
            defaultValue: undefined,
            processValue: (v: string) => v,
            helperText,
            optional,
            error,
            disabled,
            onBlur,
            validate,
            validateOnBlurInsideForm,
            onChange,
            onChangeValue: handleChangeValue,
        });

        return (
            <TextFieldBaseAutosuggest
                ref={combineRefs(inputRef, ref)}
                startIcon={withStartIcon ? <IconSearchRegular size={iconSize.default} /> : undefined}
                endIcon={
                    controlledValue ? (
                        <FieldEndIcon
                            Icon={IconCloseRegular}
                            aria-label={texts.formSearchClear || t(tokens.formSearchClear)}
                            onPress={clearInput}
                        />
                    ) : undefined
                }
                {...rest}
                {...fieldProps}
                type="search"
                dataAttributes={{'component-name': 'SearchField', testid: 'SearchField', ...dataAttributes}}
            />
        );
    }
);

export default SearchField;
