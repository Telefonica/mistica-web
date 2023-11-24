import * as React from 'react';
import * as styles from './slider.css';
import {vars} from './skins/skin-contract.css';
import {DOWN, END, ESC, HOME, LEFT, RIGHT, TAB, UP} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import classNames from 'classnames';
import {cancelEvent} from './utils/dom';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';
import Tooltip from './tooltip';
import Box from './box';
import {useControlProps} from './form-context';
import {combineRefs} from './utils/common';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

const DESKTOP_TOUCHABLE_AREA = 20;
const MOBILE_TOUCHABLE_AREA = 48;
const IOS_TOUCHABLE_AREA = 28;

const DEFAULT_THUMB_SIZE = 20;
const IOS_THUMB_SIZE = 28;

const useSliderState = ({
    value,
    defaultValue,
    min,
    max,
    step,
    values,
    onChangeValue,
}: {
    value?: number;
    defaultValue?: number;
    min: number;
    max: number;
    step: number;
    values?: Array<number>;
    onChangeValue?: (value: number) => void;
}): [number, (value: number) => void] => {
    const getClosestArrayValue = React.useCallback(
        (value: number) => {
            if (!values) {
                return value;
            }

            let closestIndex = 0;
            values.forEach((currentValue, index) => {
                if (Math.abs(currentValue - value) <= Math.abs(values[closestIndex] - value)) {
                    closestIndex = index;
                }
            });
            return closestIndex;
        },
        [values]
    );

    const getValueInRange = React.useCallback(
        (isPercentage: boolean, value?: number) => {
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
        },
        [min, max, step]
    );

    const [currentValue, setCurrentValue] = React.useState<number>(getValueInRange(false, defaultValue));

    const isControlledByParent = value !== undefined;
    const controlledValue =
        values && value !== undefined ? getClosestArrayValue(value) : getValueInRange(false, value);

    /**
     * We use a ref to avoid race conditions caused by re-renders
     */
    const prevValueRef = React.useRef(isControlledByParent ? controlledValue : currentValue);

    const updateValue = (newValue: number) => {
        newValue = getValueInRange(true, newValue);
        if (!isControlledByParent) {
            setCurrentValue(newValue);
        }
        if (newValue !== prevValueRef.current) {
            onChangeValue?.(values ? values[newValue] : newValue);
        }
        prevValueRef.current = newValue;
    };

    return [isControlledByParent ? controlledValue : currentValue, updateValue];
};

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
    /**
     * @deprecated This field is deprecated, please use step or values instead.
     */
    steps?: number | Array<number>;
    /**
     * @deprecated This field is deprecated.
     */
    getStepArrayIndex?: (value: number) => void;
}

interface SliderWithValuesProps {
    values: Array<number>;
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

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            disabled,
            values,
            step = 1,
            min = 0,
            max = 100,
            value,
            defaultValue,
            onChangeValue,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            name,
            id,
            dataAttributes,
            tooltip,
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

        step = step <= 0 ? 1 : step;

        const [currentValue, setCurrentValue] = useSliderState({
            value,
            defaultValue,
            min,
            max,
            step,
            values,
            onChangeValue,
        });

        const trackRef = React.useRef<HTMLDivElement>(null);
        const thumbRef = React.useRef<HTMLDivElement>(null);
        const sliderRef = React.useRef<HTMLDivElement>(null);

        const [isPointerDown, setIsPointerDown] = React.useState(false);
        const [isThumbHovered, setIsThumbHovered] = React.useState(false);
        const [isFocused, setIsFocused] = React.useState(false);
        const {isIos} = useTheme();
        const isTabKeyDownRef = React.useRef(false);

        const fieldProps = useControlProps({
            name,
            value: currentValue,
            defaultValue: undefined,
            disabled,
            onChange: (value) => setCurrentValue(getSliderValueAsPercentage(value, min, max)),
        });

        React.useEffect(() => {
            setCurrentValue(getSliderValueAsPercentage(currentValue, min, max));
        }, [min, max, step, currentValue, setCurrentValue]);

        const isPointerOverElement = (element: HTMLElement | null, x: number, y: number) => {
            const box = element?.getBoundingClientRect();
            return box !== undefined && box.left <= x && x <= box.right && box.top <= y && y <= box.bottom;
        };

        React.useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!isFocused && e.keyCode === TAB) {
                    isTabKeyDownRef.current = true;
                } else if (isFocused) {
                    switch (e.keyCode) {
                        case RIGHT:
                        case UP:
                            cancelEvent(e);
                            setCurrentValue(getSliderValueAsPercentage(currentValue + step, min, max));
                            break;
                        case LEFT:
                        case DOWN:
                            cancelEvent(e);
                            setCurrentValue(getSliderValueAsPercentage(currentValue - step, min, max));
                            break;
                        case HOME:
                            cancelEvent(e);
                            setCurrentValue(getSliderValueAsPercentage(min, min, max));
                            break;
                        case END:
                            cancelEvent(e);
                            setCurrentValue(getSliderValueAsPercentage(max, min, max));
                            break;
                        case ESC:
                            cancelEvent(e);
                            thumbRef.current?.blur();
                            break;

                        default:
                        // do nothing
                    }
                }
            };

            const handleKeyUp = () => (isTabKeyDownRef.current = false);

            document.addEventListener('keydown', handleKeyDown, false);
            document.addEventListener('keyup', handleKeyUp, false);
            return () => {
                document.removeEventListener('keydown', handleKeyDown, false);
                document.removeEventListener('keyup', handleKeyUp, false);
            };
        }, [isFocused, currentValue, step, min, max, setCurrentValue]);

        const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;
        const thumbSize = isIos ? IOS_THUMB_SIZE : DEFAULT_THUMB_SIZE;
        const touchableArea = isTouchableDevice
            ? MOBILE_TOUCHABLE_AREA
            : isIos
            ? IOS_TOUCHABLE_AREA
            : DESKTOP_TOUCHABLE_AREA;

        const updateCurrentValue = React.useCallback(
            (pointerPosition: number) => {
                const track = trackRef.current;
                if (track) {
                    const leftBorder = track.getBoundingClientRect().left + thumbSize / 2;
                    const rightBorder = track.getBoundingClientRect().right - thumbSize / 2;
                    setCurrentValue((pointerPosition - leftBorder) / (rightBorder - leftBorder));
                }
            },
            [setCurrentValue, thumbSize]
        );

        const onPointerMove = React.useCallback(
            (e: PointerEvent) => {
                cancelEvent(e);
                updateCurrentValue(e.clientX);
            },
            [updateCurrentValue]
        );

        const capturePointerMove = React.useCallback(
            (e: React.PointerEvent<HTMLDivElement>) => {
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
            },
            [onPointerMove]
        );

        const releasePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
            const thumb = thumbRef.current;
            if (thumb) {
                thumb.onpointermove = null;
                thumb.releasePointerCapture(e.pointerId);
            }
        }, []);

        const progress = getSliderValueAsPercentage(currentValue, min, max);
        const thumbPosition = `calc(${progress} * (100% - ${thumbSize}px) - ${
            (touchableArea - thumbSize) / 2
        }px)`;
        const trackProgressPosition = `calc(${thumbPosition} + ${touchableArea / 2}px)`;

        const thumb = (
            <div
                className={classNames(isIos ? styles.iosThumb : styles.defaultThumb, {
                    [styles.thumbHover]: !isIos && isThumbHovered && !isPointerDown,
                    [styles.thumbActive]: !isIos && isPointerDown,
                })}
            />
        );

        return (
            <Box
                padding={8}
                className={styles.sliderContainer}
                dataAttributes={{'component-name': 'Slider', ...dataAttributes}}
            >
                <div
                    className={classNames(styles.container, {[styles.disabled]: disabled})}
                    style={{height: touchableArea}}
                    ref={sliderRef}
                    onPointerDown={(e) => {
                        const x = e.clientX;
                        const y = e.clientY;
                        if (!isTouchableDevice && isPointerOverElement(sliderRef.current, x, y)) {
                            if (!isPointerOverElement(thumbRef.current, x, y)) {
                                updateCurrentValue(x);
                            }
                            setIsPointerDown(true);
                            capturePointerMove(e);
                        }
                    }}
                    onPointerUp={(e) => {
                        if (!isTouchableDevice) {
                            setIsPointerDown(false);
                            releasePointerMove(e);
                        }
                    }}
                    onTouchStart={(e) => {
                        cancelEvent(e);
                        if (isTouchableDevice) {
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
                        if (isTouchableDevice) {
                            setIsPointerDown(false);
                        }
                    }}
                    onTouchMove={(e) => {
                        cancelEvent(e);
                        if (isTouchableDevice) {
                            updateCurrentValue(e.nativeEvent.touches[0].clientX);
                        }
                    }}
                >
                    <div
                        className={styles.track}
                        ref={trackRef}
                        style={{
                            background: `linear-gradient(to right, ${vars.colors.controlActivated} ${trackProgressPosition}, ${vars.colors.control} ${trackProgressPosition}`,
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
                            if (!isTouchableDevice) {
                                setIsThumbHovered(true);
                            }
                        }}
                        onPointerLeave={() => {
                            if (!isTouchableDevice) {
                                setIsThumbHovered(false);
                            }
                        }}
                        onFocus={() => {
                            if (isTabKeyDownRef.current) {
                                setIsFocused(true);
                            }
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                        tabIndex={disabled ? -1 : 0}
                    >
                        {tooltip ? (
                            <Tooltip
                                target={thumb}
                                open={isPointerDown || isFocused ? true : undefined}
                                description={String(values ? values[currentValue] : currentValue)}
                                centerContent
                                delay={false}
                            />
                        ) : (
                            thumb
                        )}
                    </div>
                    <ScreenReaderOnly>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            ref={combineRefs(ref, fieldProps.focusableRef)}
                            step={step}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy}
                            id={id}
                            className={styles.input}
                            aria-valuetext={String(values ? values[currentValue] : currentValue)}
                            style={{
                                height: touchableArea,
                            }}
                            name={fieldProps.name}
                            value={fieldProps.value}
                            disabled={fieldProps.disabled}
                            onChange={(e) => {
                                fieldProps.onChange(+e.target.value);
                            }}
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                            }}
                        />
                    </ScreenReaderOnly>
                </div>
            </Box>
        );
    }
);

export default Slider;
