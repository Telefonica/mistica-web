import * as React from 'react';
import * as styles from './slider.css';
import {vars} from './skins/skin-contract.css';
import {DOWN, END, HOME, LEFT, RIGHT, TAB, UP} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import classNames from 'classnames';
import {cancelEvent} from './utils/dom';
import ScreenReaderOnly from './screen-reader-only';
import {useAriaId, useTheme} from './hooks';
import Tooltip from './tooltip';
import Box from './box';

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
    onChangeValue,
}: {
    value?: number;
    defaultValue?: number;
    min: number;
    max: number;
    step: number;
    onChangeValue?: (value: number) => void;
}): [number, (value: number) => void] => {
    const isControlledByParent = value !== undefined;

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

    /**
     * We use a ref to avoid race conditions caused by re-renders
     */
    const prevValueRef = React.useRef(isControlledByParent ? value : currentValue);

    const updateValue = (newValue: number) => {
        newValue = getValueInRange(true, newValue);
        if (!isControlledByParent) {
            setCurrentValue(newValue);
        }
        if (newValue !== prevValueRef.current) {
            onChangeValue?.(newValue);
        }
        prevValueRef.current = newValue;
    };

    return [isControlledByParent ? value : currentValue, updateValue];
};

interface SliderProps {
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    value?: number;
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    'aria-label'?: string;
    tooltip?: boolean;
    dataAttributes?: DataAttributes;
}

const getSliderValueAsPercentage = (value: number, min: number, max: number) => {
    return min >= max ? 0 : (value - min) / (max - min);
};

const Slider: React.FC<SliderProps> = ({
    disabled,
    step = 1,
    min = 0,
    max = 100,
    value,
    defaultValue,
    onChangeValue,
    'aria-label': ariaLabel,
    dataAttributes,
    tooltip,
}) => {
    step = step <= 0 ? 1 : step;

    const [currentValue, setCurrentValue] = useSliderState({
        value,
        defaultValue,
        min,
        max,
        step,
        onChangeValue,
    });

    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);

    const [isPointerDown, setIsPointerDown] = React.useState(false);
    const [isThumbHovered, setIsThumbHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const {isIos} = useTheme();
    const label = useAriaId(ariaLabel);

    const isTabKeyDownRef = React.useRef(false);

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

    const updateCurrentValue = React.useCallback(
        (pointerPosition: number) => {
            const track = trackRef.current;
            if (track) {
                const leftBorder = track.getBoundingClientRect().left;
                const width = track.clientWidth;
                setCurrentValue((pointerPosition - leftBorder) / width);
            }
        },
        [setCurrentValue]
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

            if (!isPointerOverElement(thumb, e.clientX, e.clientY)) {
                setIsThumbHovered(false);
            }
        }
    }, []);

    const progress = getSliderValueAsPercentage(currentValue, min, max) * 100;
    const thumbSize = isIos ? IOS_THUMB_SIZE : DEFAULT_THUMB_SIZE;
    const touchableArea = isTouchableDevice
        ? MOBILE_TOUCHABLE_AREA
        : isIos
        ? IOS_TOUCHABLE_AREA
        : DESKTOP_TOUCHABLE_AREA;

    const thumb = (
        <div
            className={classNames(isIos ? styles.iosThumb : styles.defaultThumb, {
                [styles.thumbHover]: !isIos && isThumbHovered && !isPointerDown,
                [styles.thumbActive]: !isIos && isPointerDown,
            })}
        />
    );

    return (
        <Box padding={8} dataAttributes={{'component-name': 'Slider', ...dataAttributes}}>
            <div
                className={classNames(styles.container, {[styles.disabled]: disabled})}
                style={{height: touchableArea}}
                onPointerDown={(e) => {
                    cancelEvent(e);
                    if (!isTouchableDevice) {
                        const x = e.clientX;
                        const y = e.clientY;
                        if (!isPointerOverElement(thumbRef.current, x, y)) {
                            updateCurrentValue(x);
                        }
                        setIsPointerDown(true);
                        capturePointerMove(e);
                    }
                }}
                onPointerUp={(e) => {
                    cancelEvent(e);
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
                        background: `linear-gradient(to right, ${vars.colors.controlActivated} ${progress}%, ${vars.colors.control} ${progress}%)`,
                    }}
                />
                <div
                    className={styles.thumbContainer}
                    ref={thumbRef}
                    style={{
                        cursor: isPointerDown ? 'grabbing' : isThumbHovered ? 'grab' : 'auto',
                        left: `calc(${progress / 100} * (100% - ${thumbSize}px) - ${
                            (touchableArea - thumbSize) / 2
                        }px)`,
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
                            open={isThumbHovered || isPointerDown || isFocused}
                            description={String(currentValue)}
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
                        step={step}
                        value={currentValue}
                        aria-label={label}
                        className={styles.input}
                        disabled={disabled}
                        style={{
                            height: touchableArea,
                        }}
                        onChange={(e) =>
                            setCurrentValue(getSliderValueAsPercentage(+e.target.value, min, max))
                        }
                    />
                </ScreenReaderOnly>
            </div>
        </Box>
    );
};

export default Slider;
