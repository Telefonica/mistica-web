/*
This file is named "switch-component.tsx" instead of "switch.tsx" to workaround
this storybook bug:
https://github.com/storybookjs/storybook/issues/11980
*/
import * as React from 'react';
import {debounce} from './utils/helpers';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import {Text3} from './text';
import Inline from './inline';
import {useAriaId, useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './switch-component.css';

import type {DataAttributes} from './utils/types';

type RenderSwitch = (renderProps: {
    controlElement: React.ReactElement;
    labelId: string;
    checked: boolean;
    disabled: boolean;
}) => React.ReactNode;

type PropsRender = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    render: RenderSwitch;
    children?: undefined;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
};

type PropsChildren = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    render?: undefined;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
};

const Switch: React.FC<PropsRender | PropsChildren> = (props) => {
    const {isIos} = useTheme();
    const labelId = useAriaId(props['aria-labelledby']);
    const {defaultValue, value, onChange, focusableRef, disabled} = useControlProps({
        name: props.name,
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange,
        disabled: props.disabled,
    });

    const [checkedState, setCheckedState] = React.useState(!!defaultValue);
    const isChecked = value ?? checkedState;

    const notifyChange = React.useMemo(() => {
        if (process.env.NODE_ENV === 'test') {
            return (value: boolean) => onChange?.(value);
        } else {
            return debounce((value: boolean) => {
                onChange?.(value);
            }, 300);
        }
    }, [onChange]);

    const handleChange = () => {
        if (value !== undefined) {
            onChange?.(!value);
        } else {
            setCheckedState(!checkedState);
            notifyChange(!checkedState);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const switchEl = (
        <div
            className={
                styles.checkboxVariants[
                    isIos ? (disabled ? 'disabledIos' : 'ios') : disabled ? 'disabled' : 'default'
                ]
            }
        >
            <div className={styles.switchCheckboxContainerVariants[isIos ? 'ios' : 'default']}>
                <div className={styles.switchCheckboxLabel}>
                    <span
                        className={
                            styles.barVariants[
                                isIos ? (isChecked ? 'checkedIos' : 'ios') : isChecked ? 'checked' : 'default'
                            ]
                        }
                    />
                    <span
                        className={
                            styles.ballVariants[
                                isIos ? (isChecked ? 'checkedIos' : 'ios') : isChecked ? 'checked' : 'default'
                            ]
                        }
                    />
                </div>
            </div>
        </div>
    );

    return (
        // When the switch is disabled, it shouldn't be focusable
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span
            role="switch"
            aria-checked={value ?? checkedState}
            onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                    handleChange();
                }
            }}
            onKeyDown={disabled ? undefined : handleKeyDown}
            tabIndex={disabled ? undefined : 0}
            ref={focusableRef}
            className={disabled ? styles.containerDisabled : styles.container}
            aria-disabled={disabled}
            aria-labelledby={labelId}
            {...getPrefixedDataAttributes(props.dataAttributes, 'Switch')}
        >
            {props.render ? (
                <>
                    {props.render({
                        controlElement: switchEl,
                        labelId,
                        disabled: !!disabled,
                        checked: value ?? checkedState,
                    })}
                </>
            ) : (
                <Inline space={16} alignItems="center">
                    {switchEl}
                    {props.children && (
                        <Text3 regular as="div" id={labelId}>
                            <span className={disabled ? styles.disabled : ''}>{props.children}</span>
                        </Text3>
                    )}
                </Inline>
            )}
        </span>
    );
};

export default Switch;
