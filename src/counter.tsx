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

import type {DataAttributes} from './utils/types';

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
    min = 0,
    max = 999,
    dataAttributes,
    disabled,
    removeLabel,
    increaseLabel,
    decreaseLabel,
}) => {
    const variant = useThemeVariant();
    const {texts} = useTheme();

    const [currentValue, setCurrentValue] = useCounterState({
        value,
        defaultValue,
        min,
        max,
        onChange,
    });

    const hasTrashIcon = !!onRemove && currentValue === min;

    const getRemoveLabel = () => {
        return removeLabel === undefined ? texts.counterRemoveLabel : removeLabel;
    };

    const getIncreaseLabel = () => {
        return increaseLabel === undefined ? texts.counterIncreaseLabel : increaseLabel;
    };

    const getDecreaseLabel = () => {
        return decreaseLabel === undefined ? texts.counterDecreaseLabel : decreaseLabel;
    };

    return (
        <div
            className={styles.counter}
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
                        [styles.isButtonDisabled]: disabled || (!hasTrashIcon && currentValue === min),
                    })}
                >
                    <div
                        className={
                            hasTrashIcon ? styles.trashButtonBackground : styles.defaultButtonBackground
                        }
                    />
                    <Touchable
                        className={classNames(styles.decreaseButtonIcon)}
                        disabled={hasTrashIcon || currentValue === min || disabled}
                        onPress={() => setCurrentValue(currentValue - 1)}
                        aria-label={getDecreaseLabel()}
                    >
                        <IconSubtractRegular
                            color={
                                (currentValue === min && !hasTrashIcon) || disabled
                                    ? vars.colors.control
                                    : vars.colors.controlActivated
                            }
                        />
                    </Touchable>

                    <Touchable
                        className={classNames(styles.trashButtonIcon)}
                        disabled={!hasTrashIcon || disabled}
                        onPress={() => onRemove?.()}
                        aria-label={getRemoveLabel()}
                    >
                        <IconTrashCanRegular
                            color={disabled ? vars.colors.control : vars.colors.controlError}
                        />
                    </Touchable>
                </div>

                <ThemeVariant variant="default">
                    <Text3 regular color={vars.colors.textPrimary}>
                        {currentValue}
                    </Text3>
                </ThemeVariant>

                <div
                    className={classNames(styles.buttonContainer, {
                        [styles.isButtonDisabled]: disabled || currentValue === max,
                    })}
                >
                    <div className={styles.defaultButtonBackground} />
                    <Touchable
                        className={styles.buttonIcon}
                        disabled={currentValue === max || disabled}
                        onPress={() => setCurrentValue(currentValue + 1)}
                        aria-label={getIncreaseLabel()}
                    >
                        <IconAddMoreRegular
                            color={
                                currentValue === max || disabled
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
