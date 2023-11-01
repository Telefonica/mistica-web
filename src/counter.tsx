import * as React from 'react';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './counter.css';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import {Text3} from './text';
import Touchable from './touchable';
import IconSubtractRegular from './generated/mistica-icons/icon-subtract-regular';
import IconAddMoreRegular from './generated/mistica-icons/icon-add-more-regular';
import IconTrashCanRegular from './generated/mistica-icons/icon-trash-can-regular';
import {useTheme} from './hooks';
import classNames from 'classnames';
import ScreenReaderOnly from './screen-reader-only';

import type {DataAttributes} from './utils/types';

const ICON_SIZE = 20;

const useCounterState = ({
    value,
    defaultValue,
    min,
    max,
    onChange,
}: {
    value?: number;
    defaultValue?: number;
    min: number;
    max: number;
    onChange?: (value: number) => void;
}): [number, (value: number) => void] => {
    const isControlledByParent = value !== undefined;

    const getValueInRange = React.useCallback(
        (value?: number) => {
            return value === undefined ? min : Math.max(min, Math.min(max, value));
        },
        [min, max]
    );

    const [currentValue, setCurrentValue] = React.useState<number>(getValueInRange(defaultValue));

    React.useEffect(() => setCurrentValue(getValueInRange(defaultValue)), [defaultValue, getValueInRange]);

    const updateValue = (newValue: number) => {
        if (!isControlledByParent) {
            setCurrentValue(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
    };

    return [isControlledByParent ? getValueInRange(value) : currentValue, updateValue];
};

type Props = {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    onRemove?: () => void;
    children?: void;
    disabled?: boolean;
    dataAttributes?: DataAttributes;
    removeLabel?: string;
    increaseLabel?: string;
    decreaseLabel?: string;
    valueLabel?: string;
};

const Counter: React.FC<Props> = ({
    value,
    defaultValue,
    onChange,
    onRemove,
    min,
    max,
    dataAttributes,
    disabled,
    removeLabel,
    increaseLabel,
    decreaseLabel,
    valueLabel,
}) => {
    const variant = useThemeVariant();
    const {texts} = useTheme();

    const minValue = min === undefined ? 0 : min;
    const maxValue = Math.max(minValue, max === undefined ? 999 : max);

    const [currentValue, setCurrentValue] = useCounterState({
        value,
        defaultValue,
        min: minValue,
        max: maxValue,
        onChange,
    });

    const hasTrashIcon = !!onRemove && currentValue === minValue;

    const getRemoveLabel = () => {
        return removeLabel === undefined ? texts.counterRemoveLabel : removeLabel;
    };

    const getIncreaseLabel = () => {
        return increaseLabel === undefined ? texts.counterIncreaseLabel : increaseLabel;
    };

    const getDecreaseLabel = () => {
        return decreaseLabel === undefined ? texts.counterDecreaseLabel : decreaseLabel;
    };

    const getValueLabel = () => {
        return `${currentValue}, ${valueLabel === undefined ? texts.counterQuantity : valueLabel}${
            min !== undefined ? `, ${texts.counterMinValue} ${min}` : ''
        }${max !== undefined ? `, ${texts.counterMaxValue} ${max}` : ''}`;
    };

    return (
        <div
            className={classNames(styles.counter, {[styles.disabled]: disabled})}
            {...getPrefixedDataAttributes(dataAttributes, 'Counter')}
            style={{
                border: `1px solid ${
                    variant === 'inverse' ? vars.colors.backgroundContainer : vars.colors.border
                }`,
            }}
        >
            <Inline space={8} alignItems="center">
                <div
                    className={classNames(styles.buttonContainer, {
                        [styles.isTrashIconVisible]: hasTrashIcon,
                        [styles.isButtonDisabled]: disabled || (!hasTrashIcon && currentValue === minValue),
                        [styles.disabled]: !disabled && !hasTrashIcon && currentValue === minValue,
                    })}
                >
                    <div
                        className={
                            hasTrashIcon ? styles.trashButtonBackground : styles.defaultButtonBackground
                        }
                    />
                    <Touchable
                        className={styles.decreaseButtonIcon}
                        disabled={hasTrashIcon || currentValue === minValue || disabled}
                        onPress={() => setCurrentValue(currentValue - 1)}
                        aria-label={getDecreaseLabel()}
                        aria-hidden={hasTrashIcon}
                        style={{
                            pointerEvents: hasTrashIcon ? 'none' : 'auto',
                        }}
                    >
                        <IconSubtractRegular
                            size={ICON_SIZE}
                            color={
                                (currentValue === minValue && !hasTrashIcon) || disabled
                                    ? vars.colors.control
                                    : vars.colors.controlActivated
                            }
                        />
                    </Touchable>

                    <Touchable
                        className={styles.trashButtonIcon}
                        disabled={!hasTrashIcon || disabled}
                        onPress={() => onRemove?.()}
                        aria-label={getRemoveLabel()}
                        aria-hidden={!hasTrashIcon}
                        style={{
                            pointerEvents: hasTrashIcon ? 'auto' : 'none',
                        }}
                    >
                        <IconTrashCanRegular size={ICON_SIZE} color={vars.colors.controlError} />
                    </Touchable>
                </div>

                <ThemeVariant variant="default">
                    <div
                        className={styles.valueContainer}
                        /**
                         * Hack to avoid counter's width from changing because of some characters
                         * having different widths. Using fontVariantNumeric tabular-nums is not supported
                         * for new Vivo font.
                         * */
                        style={{width: `${Math.max(3, String(maxValue).length) * 1.25}ch`}}
                    >
                        <div aria-hidden>
                            <Text3 regular color={vars.colors.textPrimary}>
                                {currentValue}
                            </Text3>
                        </div>
                        <ScreenReaderOnly>
                            <span>{getValueLabel()}</span>
                        </ScreenReaderOnly>
                    </div>
                </ThemeVariant>

                <div
                    className={classNames(styles.buttonContainer, {
                        [styles.isButtonDisabled]: disabled || currentValue === maxValue,
                        [styles.disabled]: !disabled && currentValue === maxValue,
                    })}
                >
                    <div className={styles.defaultButtonBackground} />
                    <Touchable
                        className={styles.buttonIcon}
                        disabled={currentValue === maxValue || disabled}
                        onPress={() => setCurrentValue(currentValue + 1)}
                        aria-label={getIncreaseLabel()}
                    >
                        <IconAddMoreRegular
                            size={ICON_SIZE}
                            color={
                                currentValue === maxValue || disabled
                                    ? vars.colors.control
                                    : vars.colors.controlActivated
                            }
                        />
                    </Touchable>
                </div>
            </Inline>
        </div>
    );
};

export default Counter;
