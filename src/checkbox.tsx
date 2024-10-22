'use client';
import * as React from 'react';
import {SPACE} from './utils/keys';
import {useControlProps} from './form-context';
import Inline from './inline';
import {Text3} from './text';
import {useTheme} from './hooks';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './checkbox.css';
import {vars} from './skins/skin-contract.css';
import {combineRefs} from './utils/common';
import {useIsInverseVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

const IconCheckbox = ({isChecked, disabled}: {isChecked: boolean; disabled?: boolean}) => {
    const {isIos} = useTheme();
    const isInverse = useIsInverseVariant();
    const variant = isChecked ? 'checked' : isIos ? 'ios' : 'rest';

    const icon = isIos ? (
        <svg
            viewBox="0 0 10 8"
            width="10"
            height="8"
            className={classnames(styles.check, {[styles.checkChecked]: isChecked})}
        >
            <path
                d="M2.659 7.724c.33.366.92.368 1.254.005L9.79 1.336A.782.782 0 009.719.202a.858.858 0 00-1.178.069l-5.236 5.72-1.841-2.038a.857.857 0 00-1.177-.078.782.782 0 00-.082 1.133l2.454 2.716z"
                fill={isInverse ? vars.colors.controlKnobInverse : vars.colors.inverse}
            />
        </svg>
    ) : (
        <svg
            viewBox="0 0 14 10"
            width="14"
            height="10"
            className={classnames(styles.check, {[styles.checkChecked]: isChecked})}
        >
            <path
                d="M5 10L0 5.192l1.4-1.346L5 7.308 12.6 0 14 1.346z"
                fill={isInverse ? vars.colors.controlKnobInverse : vars.colors.inverse}
            />
        </svg>
    );

    return (
        <div
            className={classnames(
                isInverse ? styles.inverseBoxVariant[variant] : styles.boxVariant[variant],
                {
                    [styles.disabled]: disabled,
                }
            )}
        >
            {icon}
        </div>
    );
};

type RenderProps = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
    render?: (renderProps: {
        controlElement: React.ReactElement;
        labelId: string;
        disabled: boolean;
        checked: boolean;
    }) => React.ReactElement;
    children?: undefined;
    disabled?: boolean;
    'aria-labelledby'?: string;
    'aria-label'?: string;
    role?: 'checkbox' | 'menuitemcheckbox';
    dataAttributes?: DataAttributes;
};

type ChildrenProps = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
    render?: undefined;
    children: React.ReactNode;
    disabled?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    role?: 'checkbox' | 'menuitemcheckbox';
    dataAttributes?: DataAttributes;
};

const Checkbox = React.forwardRef<HTMLDivElement, RenderProps | ChildrenProps>((props, ref) => {
    const reactId = React.useId();
    const labelId = props['aria-labelledby'] || reactId;
    const ariaLabel = props['aria-label'];
    const hasExternalLabel = ariaLabel || props['aria-labelledby'];

    const {defaultValue, value, onChange, focusableRef, disabled} = useControlProps({
        name: props.name,
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange,
        disabled: props.disabled,
    });

    const [checkedState, setCheckedState] = React.useState(!!defaultValue);

    const handleChange = () => {
        if (value === undefined) {
            setCheckedState(!checkedState);
            onChange(!checkedState);
        } else {
            onChange(!value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const iconCheckbox = <IconCheckbox disabled={disabled} isChecked={value ?? checkedState} />;

    return (
        // When the checkbox is disabled, it shouldn't be focusable
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            id={props.id}
            role={props.role || 'checkbox'}
            aria-checked={value ?? checkedState}
            onKeyDown={disabled ? undefined : handleKeyDown}
            onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                    handleChange();
                }
            }}
            tabIndex={disabled ? undefined : 0}
            ref={combineRefs(ref, focusableRef)}
            className={disabled ? styles.checkboxContainerDisabled : styles.checkboxContainer}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : labelId}
            aria-disabled={disabled}
            {...getPrefixedDataAttributes(props.dataAttributes, 'Checkbox')}
        >
            {props.render ? (
                props.render({
                    controlElement: iconCheckbox,
                    labelId,
                    checked: value ?? checkedState,
                    disabled: !!disabled,
                })
            ) : (
                <Inline space={16}>
                    {/* Text3 wrapper added to have the same line-height and center checkbox with text and -2px to perfect pixel center icon */}
                    <Text3 regular as="div">
                        <div style={{position: 'relative', top: -2}}>{iconCheckbox}</div>
                    </Text3>
                    {props.children && (
                        <Text3
                            regular
                            as="div"
                            id={labelId}
                            role={hasExternalLabel ? 'presentation' : undefined}
                        >
                            <span className={disabled ? styles.disabled : ''}>{props.children}</span>
                        </Text3>
                    )}
                </Inline>
            )}
        </div>
    );
});

export default Checkbox;
