'use client';
import * as React from 'react';
import {useFieldProps} from './form-context';
import {FieldEndIcon, TextFieldBaseAutosuggest} from './text-field-base';
import IconSearchRegular from './generated/mistica-icons/icon-search-regular';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {useTheme} from './hooks';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';
import {iconSize} from './icon-button.css';
import * as tokens from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';

export interface SearchFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => ReadonlyArray<string>;
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
            handleChangeValue('', '');
            if (inputRef.current) {
                onChange?.(createChangeEvent(inputRef.current, ''));
                inputRef.current.focus();
            }
        }, [handleChangeValue, onChange]);

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
