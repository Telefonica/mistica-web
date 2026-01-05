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
    autoComplete?: undefined;
    defaultValue?: undefined;
    getSuggestions: (value: string) => ReadonlyArray<string>;
    value: string;
    onChangeValue: (value: string, rawValue: string) => void;
}

const Autocomplete = React.forwardRef<any, AutocompleteProps>(
    ({getSuggestions, onChangeValue, ...rest}, refProp) => {
        const [showOptions, setShowOptions] = React.useState(false);
        const id = React.useId();
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
        }, [showOptions]);

        const showOptionsList = () => {
            setShowOptions(true);
        };

        const hideOptionsList = () => {
            setShowOptions(false);
            setFocusIndex(-1);
        };

        const updateTextFieldValue = (val: string, rawVal: string) => {
            onChangeValue(val, rawVal);
            setFocusIndex(-1);
        };

        // TODO: Remove the other misticalabs autocomplete

        React.useEffect(() => {
            if (focusIndex !== -1) {
                containerRef.current
                    ?.querySelectorAll('li')
                    ?.[focusIndex]?.scrollIntoView({block: 'nearest'});
            }
        }, [focusIndex]);

        return (
            <div
                tabIndex={-1}
                className={styles.autocompleteContainer}
                ref={containerRef}
                onBlur={(event) => {
                    if (!containerRef.current?.contains(event.relatedTarget)) {
                        hideOptionsList();
                        if (!options.includes(rest.value)) {
                            updateTextFieldValue('', '');
                        }
                    }
                }}
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
                            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role#tab
                            const option = options[focusIndex];
                            if (option) {
                                updateTextFieldValue(option, option);
                                hideOptionsList();
                            }
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
                    aria-controls={id}
                    aria-expanded={showOptions}
                    aria-autocomplete="list"
                    aria-activedescendant={focusIndex > -1 ? getOptionId(id, focusIndex) : undefined}
                    onChangeValue={(val, rawVal) => {
                        showOptionsList();
                        updateTextFieldValue(val, rawVal);
                    }}
                    onPress={() => {
                        // TODO: When tabbing to the input element suggestions are not shown automatically
                        showOptionsList();
                    }}
                />
                <ul
                    ref={menuRef}
                    id={id}
                    role="listbox"
                    aria-label={rest.label}
                    className={styles.optionsList}
                    style={{display: showOptions ? 'block' : 'none', top}}
                >
                    {options.map((option, index) => (
                        <li
                            id={getOptionId(id, index)}
                            key={index}
                            role="option"
                            aria-selected={focusIndex === index}
                            className={classnames(styles.optionItem, {
                                [styles.optionItemSelected]: focusIndex === index,
                            })}
                            onClick={() => {
                                updateTextFieldValue(option, option);
                                hideOptionsList();
                                inputRef.current?.focus();
                            }}
                        >
                            <Text3 regular>{option}</Text3>
                        </li>
                    ))}
                </ul>
                {/* TODO: This is announced correctly multiple times in iOS. Test Android. */}
                <div aria-live="polite">
                    <div
                        className={styles.optionsList}
                        style={{display: showOptions && options.length === 0 ? 'block' : 'none'}}
                    >
                        {options.length === 0 && showOptions && (
                            <div className={styles.optionBaseItem}>
                                <Text3 regular color={vars.colors.textSecondary}>
                                    {texts.autocompleteEmptyCase || t(tokens.autocompleteEmptyCase)}
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
