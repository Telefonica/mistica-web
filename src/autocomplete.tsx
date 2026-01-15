'use client';

import * as React from 'react';
import TextField from './text-field';
import * as styles from './autocomplete.css';
import {Text3} from './text';
import {combineRefs} from './utils/common';
import {DOWN, ENTER, ESC, TAB, UP} from './utils/keys';
import {cancelEvent} from './utils/dom';
import classnames from 'classnames';
import {vars} from './skins/skin-contract.css';
import * as tokens from './text-tokens';
import {useTheme} from './hooks';

import type {CommonFormFieldProps} from './text-field-base';

const mod = (n: number, m: number) => ((n % m) + m) % m;

const getOptionId = (baseId: string, index: number) => `${baseId}-option-${index}`;

export interface AutocompleteProps extends CommonFormFieldProps {
    autoComplete?: never;
    defaultValue?: never;
    suggestionEmptyCase?: string;
    getSuggestions: (value: string) => ReadonlyArray<string>;
    value: string;
    onChangeValue: (value: string, rawValue: string) => void;
}

const Autocomplete = React.forwardRef<any, AutocompleteProps>(
    ({getSuggestions, onChangeValue, suggestionEmptyCase, ...rest}, refProp) => {
        const [showOptions, setShowOptions] = React.useState(false);
        const menuId = React.useId();
        const statusId = React.useId();
        const containerRef = React.useRef<HTMLDivElement | null>(null);
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const menuRef = React.useRef<HTMLUListElement | null>(null);
        const [focusIndex, setFocusIndex] = React.useState<number>(-1);
        const [top, setTop] = React.useState<number | undefined>(undefined);
        const {texts, t} = useTheme();

        const options = getSuggestions(rest.value);

        React.useLayoutEffect(() => {
            if (showOptions) {
                const {height: menuHeight = 0} = menuRef.current?.getBoundingClientRect() || {};
                const {
                    top: comboboxTop = 0,
                    bottom: comboboxBottom = 0,
                    height: comboboxHeight = 0,
                } = containerRef.current?.getBoundingClientRect() || {};

                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                const menuSpacing = 8;

                if (
                    comboboxBottom + menuHeight + menuSpacing > viewportHeight &&
                    comboboxTop - menuHeight - menuSpacing >= 0
                ) {
                    setTop(-menuHeight - menuSpacing);
                    return;
                }
                setTop(comboboxHeight + menuSpacing);
            }
        }, [showOptions, rest.value]);

        const showOptionsList = () => {
            setShowOptions(true);
        };

        const hideOptionsList = () => {
            setShowOptions(false);
            setFocusIndex(-1);
        };

        const updateTextFieldValue = React.useCallback(
            (val: string, rawVal: string) => {
                onChangeValue(val, rawVal);
                setFocusIndex(-1);
            },
            [onChangeValue]
        );

        const validateFieldValue = React.useCallback(() => {
            if (!options.includes(rest.value)) {
                updateTextFieldValue('', '');
            }
        }, [options, rest.value, updateTextFieldValue]);

        React.useEffect(() => {
            if (focusIndex !== -1) {
                containerRef.current
                    ?.querySelectorAll('li')
                    ?.[focusIndex]?.scrollIntoView({block: 'nearest'});
            }
        }, [focusIndex]);

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (!containerRef.current?.contains(event.target as Node)) {
                    hideOptionsList();
                    validateFieldValue();
                }
            };

            document.addEventListener('pointerup', handleClickOutside);
            return () => {
                document.removeEventListener('pointerup', handleClickOutside);
            };
        }, [options, rest.value, validateFieldValue]);

        return (
            <div
                tabIndex={-1}
                className={styles.autocompleteContainer}
                ref={containerRef}
                onKeyDown={(e) => {
                    switch (e.key) {
                        case DOWN:
                        case UP: {
                            const dir = e.key === DOWN ? 1 : -1;
                            const initialFocusIndex = e.key === DOWN ? 0 : options.length - 1;
                            cancelEvent(e);
                            if (!showOptions) {
                                showOptionsList();
                            }
                            if (!options.length) {
                                return;
                            }
                            const nextIndex =
                                focusIndex === -1 ? initialFocusIndex : mod(focusIndex + dir, options.length);
                            setFocusIndex(nextIndex);
                            break;
                        }
                        case ENTER: {
                            const option = options[focusIndex];
                            if (option) {
                                cancelEvent(e);
                                updateTextFieldValue(option, option);
                                hideOptionsList();
                            }
                            break;
                        }
                        case ESC: {
                            cancelEvent(e);
                            if (!showOptions) {
                                updateTextFieldValue('', '');
                                return;
                            }
                            hideOptionsList();
                            break;
                        }
                        case TAB: {
                            hideOptionsList();
                            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role#tab
                            const option = options[focusIndex];
                            if (!option) {
                                validateFieldValue();
                                return;
                            }
                            updateTextFieldValue(option, option);
                            break;
                        }
                        default:
                    }
                }}
            >
                <TextField
                    {...rest}
                    ref={combineRefs(inputRef, refProp)}
                    autoComplete="off"
                    role="combobox"
                    aria-controls={menuId}
                    aria-expanded={showOptions}
                    aria-autocomplete="list"
                    aria-activedescendant={focusIndex > -1 ? getOptionId(menuId, focusIndex) : undefined}
                    onChangeValue={(val, rawVal) => {
                        showOptionsList();
                        updateTextFieldValue(val, rawVal);
                    }}
                    onFocus={() => {
                        showOptionsList();
                    }}
                />
                <ul
                    ref={menuRef}
                    id={menuId}
                    role="listbox"
                    aria-label={rest.label}
                    className={styles.optionsList}
                    style={{display: showOptions && options.length !== 0 ? 'block' : 'none', top}}
                >
                    {options.map((option, index) => (
                        <li
                            id={getOptionId(menuId, index)}
                            key={index}
                            role="option"
                            aria-selected={focusIndex === index}
                            className={classnames(styles.optionItem, {
                                [styles.optionItemSelected]: focusIndex === index,
                            })}
                            onMouseDown={(e) => {
                                // Prevent blur and lost input focus
                                e.preventDefault();
                            }}
                            onClick={() => {
                                updateTextFieldValue(option, option);
                                hideOptionsList();
                            }}
                        >
                            <Text3 regular>{option}</Text3>
                        </li>
                    ))}
                </ul>
                <div role="status" aria-labelledby={statusId}>
                    <div
                        className={styles.optionsList}
                        style={{display: showOptions && options.length === 0 ? 'block' : 'none', top}}
                    >
                        {options.length === 0 && showOptions && (
                            <div className={styles.optionBaseItem}>
                                <Text3 regular color={vars.colors.textSecondary} id={statusId}>
                                    {suggestionEmptyCase ||
                                        texts.autocompleteEmptyCase ||
                                        t(tokens.autocompleteEmptyCase)}
                                </Text3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default Autocomplete;
