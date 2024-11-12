'use client';
import * as React from 'react';
import * as styles from './slider.css';
import {vars} from './skins/skin-contract.css';
import {isTouchableDevice} from './utils/environment';
import classNames from 'classnames';
import {cancelEvent} from './utils/dom';
import {useTheme} from './hooks';
import Tooltip from './tooltip';
import Box from './box';
import {useControlProps} from './form-context';
import {combineRefs} from './utils/common';
import {useIsInverseVariant} from './theme-variant-context';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

const MOBILE_TOUCHABLE_AREA = 48;
const DEFAULT_THUMB_SIZE = 20;
const IOS_THUMB_SIZE = 28;

interface BaseSliderProps {
    disabled?: boolean;
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    tooltip?: boolean;
    dataAttributes?: DataAttributes;
    name: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    id?: string;
}

interface SliderWithValuesProps {
    values: ReadonlyArray<number>;
}

interface SliderWithStepProps {
    step?: number;
    min?: number;
    max?: number;
}

type SliderProps = BaseSliderProps & ExclusifyUnion<SliderWithStepProps | SliderWithValuesProps>;

const getSliderValueAsPercentage = (value: number, min: number, max: number) => {
    return min >= max ? 0 : (value - min) / (max - min);
};

const getValueInRange = (isPercentage: boolean, min: number, max: number, step: number, value?: number) => {
    const getRealValue = (value?: number) => {
        if (value === undefined) {
            return min;
        }
        const realValue = isPercentage ? min + (max - min) * value : value;
        return Math.max(min, Math.min(max, realValue));
    };

    if (min >= max) {
        return min;
    }

    const currentValue = getRealValue(value);
    const valueRoundedDown = min + Math.floor((currentValue - min) / step) * step;
    const valueRoundedUp = min + Math.ceil((currentValue - min) / step) * step;

    return valueRoundedUp <= max && valueRoundedUp - currentValue <= currentValue - valueRoundedDown
        ? valueRoundedUp
        : valueRoundedDown;
};

const getClosestValidValue = (min: number, value?: number, values?: ReadonlyArray<number>) => {
    if (!values) {
        return value;
    }
    if (value === undefined) {
        return min;
    }

    let closestIndex = 0;
    values.forEach((currentValue, index) => {
        if (values && Math.abs(currentValue - value) <= Math.abs(values[closestIndex] - value)) {
            closestIndex = index;
        }
    });
    return closestIndex;
};

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            values,
            step = 1,
            min = 0,
            max = 100,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            id,
            dataAttributes,
            tooltip,
            ...props
        },
        ref
    ) => {
        if (values) {
            if (values.length === 0) {
                values = undefined;
            } else {
                max = values.length - 1;
            }
        }

        step = step | 0;
        step = step <= 0 ? 1 : step;

        const {
            defaultValue,
            value,
            onChange: onChangeValue,
            focusableRef,
            disabled,
            name,
        } = useControlProps({
            name: props.name,
            label: ariaLabel,
            value:
                props.value !== undefined
                    ? getValueInRange(false, min, max, step, getClosestValidValue(min, props.value, values))
                    : undefined,
            defaultValue:
                props.defaultValue !== undefined
                    ? getValueInRange(
                          false,
                          min,
                          max,
                          step,
                          getClosestValidValue(min, props.defaultValue, values)
                      )
                    : undefined,
            onChange: props.onChangeValue,
            disabled: props.disabled,
        });

        const [currentValue, setCurrentValue] = React.useState(
            value ?? getValueInRange(false, min, max, step, getClosestValidValue(min, defaultValue, values))
        );

        const finalValue = value ?? currentValue;

        const prevValueRef = React.useRef(finalValue);

        const handleChange = React.useCallback(
            (value: number, isPercentage: boolean) => {
                const realValue = getValueInRange(isPercentage, min, max, step, value);
                if (prevValueRef.current !== realValue) {
                    onChangeValue(values ? values[realValue] : realValue);
                    setCurrentValue(realValue);
                    prevValueRef.current = realValue;
                }
            },
            [min, max, step, values, onChangeValue]
        );

        /**
         * HandleChange will trigger this useEffect whenever min/max/step props change.
         * This allows the slider to be reactive to changes in these props.
         */
        React.useEffect(() => {
            handleChange(prevValueRef.current, false);
        }, [handleChange]);

        const trackRef = React.useRef<HTMLDivElement>(null);
        const thumbRef = React.useRef<HTMLDivElement>(null);
        const sliderRef = React.useRef<HTMLDivElement>(null);
        const inputRef = React.useRef<HTMLInputElement>(null);

        const [isPointerDown, setIsPointerDown] = React.useState(false);
        const [isThumbHovered, setIsThumbHovered] = React.useState(false);
        const [isFocused, setIsFocused] = React.useState(false);
        const {isIos} = useTheme();
        const isInverse = useIsInverseVariant();
        const thumbVariant = isInverse ? 'inverse' : 'default';

        const isPointerOverElement = (element: HTMLElement | null, x: number, y: number) => {
            const box = element?.getBoundingClientRect();
            return !!box && box.left <= x && x <= box.right && box.top <= y && y <= box.bottom;
        };

        const isTouchable = isTouchableDevice();

        const thumbSize = isIos ? IOS_THUMB_SIZE : DEFAULT_THUMB_SIZE;
        const touchableArea = isTouchable ? MOBILE_TOUCHABLE_AREA : thumbSize;

        const updateCurrentValue = (pointerPosition: number) => {
            const track = trackRef.current;
            if (track) {
                const leftBorder = track.getBoundingClientRect().left + thumbSize / 2;
                const rightBorder = track.getBoundingClientRect().right - thumbSize / 2;
                handleChange((pointerPosition - leftBorder) / (rightBorder - leftBorder), true);
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            cancelEvent(e);
            updateCurrentValue(e.clientX);
        };

        const capturePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
            const thumb = thumbRef.current;
            if (thumb) {
                thumb.onpointermove = onPointerMove;
                /**
                 * There is a known firefox bug caused by using setPointerCapture().
                 * If you press the slider, drag the pointer on top of a button and then release it,
                 * the button will be clicked. The issue doesn't happen in Chrome or Safari, and it
                 * can be reproduced by using basic HTML (https://codepen.io/Marcos-Kolodny/pen/oNmdMxM).
                 *
                 * This was reported to firefox a long time ago and many users mention different scenarios
                 * where it happens, but it seems they are not working on it
                 * (https://bugzilla.mozilla.org/show_bug.cgi?id=1648893).
                 */
                thumb.setPointerCapture(e.pointerId);
            }
        };

        const releasePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
            const thumb = thumbRef.current;
            if (thumb) {
                thumb.onpointermove = null;
                thumb.releasePointerCapture(e.pointerId);
            }
        };

        const progress = getSliderValueAsPercentage(finalValue, min, max);
        const thumbPosition = `calc(${progress} * (100% - ${thumbSize}px) - ${(touchableArea - thumbSize) / 2}px)`;
        const trackProgressPosition = `calc(${thumbPosition} + ${touchableArea / 2}px)`;

        const thumb = (
            <div
                className={classNames(isIos ? styles.iosThumb : styles.defaultThumb[thumbVariant], {
                    [styles.thumbHover[thumbVariant]]: !isIos && isThumbHovered && !isPointerDown,
                    [styles.thumbActive[thumbVariant]]: !isIos && isPointerDown,
                })}
            />
        );

        return (
            <Box paddingY={8} dataAttributes={{'component-name': 'Slider', ...dataAttributes}}>
                <div
                    className={classNames(styles.container, {[styles.disabled]: disabled})}
                    style={{height: touchableArea}}
                    ref={sliderRef}
                    onPointerDown={(e) => {
                        const x = e.clientX;
                        const y = e.clientY;
                        if (!isTouchable && isPointerOverElement(sliderRef.current, x, y)) {
                            if (!isPointerOverElement(thumbRef.current, x, y)) {
                                updateCurrentValue(x);
                            }
                            setIsPointerDown(true);
                            capturePointerMove(e);
                        } else {
                            cancelEvent(e);
                        }
                    }}
                    onPointerUp={(e) => {
                        if (!isTouchable) {
                            setIsPointerDown(false);
                            releasePointerMove(e);
                        }
                    }}
                    onTouchStart={(e) => {
                        cancelEvent(e);
                        if (isTouchable) {
                            const x = e.nativeEvent.touches[0].clientX;
                            const y = e.nativeEvent.touches[0].clientY;
                            if (!isPointerOverElement(thumbRef.current, x, y)) {
                                updateCurrentValue(x);
                            }
                            setIsPointerDown(true);
                        }
                    }}
                    onTouchEnd={(e) => {
                        cancelEvent(e);
                        if (isTouchable) {
                            setIsPointerDown(false);
                        }
                    }}
                    onTouchMove={(e) => {
                        cancelEvent(e);
                        if (isTouchable) {
                            updateCurrentValue(e.nativeEvent.touches[0].clientX);
                        }
                    }}
                >
                    <div
                        className={styles.track}
                        ref={trackRef}
                        style={{
                            background: `linear-gradient(to right, ${isInverse ? vars.colors.controlActivatedInverse : vars.colors.controlActivated} ${trackProgressPosition}, ${isInverse ? vars.colors.barTrackInverse : vars.colors.barTrack} ${trackProgressPosition}`,
                        }}
                    />
                    <div
                        className={styles.thumbContainer}
                        ref={thumbRef}
                        style={{
                            cursor: isPointerDown ? 'grabbing' : isThumbHovered ? 'grab' : 'auto',
                            left: thumbPosition,
                            width: touchableArea,
                            height: touchableArea,
                        }}
                        onPointerEnter={() => {
                            if (!isTouchable) {
                                setIsThumbHovered(true);
                            }
                        }}
                        onPointerLeave={() => {
                            if (!isTouchable) {
                                setIsThumbHovered(false);
                            }
                        }}
                    >
                        {tooltip ? (
                            <Tooltip
                                target={thumb}
                                open={isPointerDown || isFocused || isThumbHovered ? true : undefined}
                                description={String(values ? values[finalValue] : finalValue)}
                                centerContent
                                delay={false}
                            />
                        ) : (
                            thumb
                        )}
                    </div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        ref={combineRefs(ref, inputRef, focusableRef)}
                        step={step}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        id={id}
                        className={styles.input}
                        aria-valuetext={String(values ? values[finalValue] : finalValue)}
                        style={{
                            left: thumbPosition,
                            width: touchableArea,
                            height: touchableArea,
                        }}
                        name={name}
                        value={finalValue}
                        disabled={disabled}
                        onChange={(e) => handleChange(+e.target.value, false)}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                    />
                </div>
            </Box>
        );
    }
);

export default Slider;
