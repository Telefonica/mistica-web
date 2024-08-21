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
import {formSearchClear, translate} from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';

export interface SearchFieldProps extends CommonFormFieldProps {
    onChangeValue?: (value: string, rawValue: string) => void;
    getSuggestions?: (value: string) => ReadonlyArray<string>;
}

const SearchField = React.forwardRef<any, SearchFieldProps>(
    (
        {
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
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        const {
            texts,
            i18n: {locale},
        } = useTheme();
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
            <TextFieldBaseAutosuggest
                ref={combineRefs(inputRef, ref)}
                startIcon={<IconSearchRegular size={iconSize.default} />}
                endIcon={
                    controlledValue ? (
                        <FieldEndIcon
                            Icon={IconCloseRegular}
                            aria-label={texts.formSearchClear || translate(formSearchClear, locale)}
                            onPress={clearInput}
                        />
                    ) : undefined
                }
                {...rest}
                {...fieldProps}
                type="search"
                dataAttributes={{'component-name': 'SearchField', ...dataAttributes}}
            />
        );
    }
);

export default SearchField;
