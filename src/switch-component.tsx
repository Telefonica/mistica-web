/*
This file is named "switch-component.tsx" instead of "switch.tsx" to workaround
this storybook bug:
https://github.com/storybookjs/storybook/issues/11980
*/

'use client';
import * as React from 'react';
import {debounce} from './utils/helpers';
import {SPACE} from './utils/keys';
import {useControlProps} from './form-context';
import {Text3} from './text';
import Inline from './inline';
import {useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './switch-component.css';
import {useIsInverseVariant} from './theme-variant-context';

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
    'aria-label'?: string;
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
    'aria-label'?: string;
    dataAttributes?: DataAttributes;
};

const Switch = (props: PropsRender | PropsChildren): JSX.Element => {
    const {isIos, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();
    const reactId = React.useId();
    const labelId = props['aria-labelledby'] || reactId;
    const {defaultValue, value, onChange, focusableRef, disabled} = useControlProps({
        name: props.name,
        label: props['aria-label'],
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
        if (event.key === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const barVariant = isIos
        ? isChecked
            ? 'checkedIos'
            : isDarkMode
              ? 'iosDark'
              : 'ios'
        : isChecked
          ? 'checked'
          : 'default';

    const ballVariant = isIos ? (isChecked ? 'checkedIos' : 'ios') : isChecked ? 'checked' : 'default';

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
                            isInverse ? styles.inverseBarVariants[barVariant] : styles.barVariants[barVariant]
                        }
                    />
                    <span
                        className={
                            isInverse
                                ? styles.inverseBallVariants[ballVariant]
                                : styles.ballVariants[ballVariant]
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
            aria-label={props['aria-label']}
            aria-labelledby={props['aria-label'] ? undefined : labelId}
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
                <Inline space={16} alignItems="center" className={styles.interactiveArea}>
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
