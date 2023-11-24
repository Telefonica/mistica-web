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

const getClosestValidValue = (value: number, values?: Array<number>) => {
    if (!values) {
        return value;
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
            steps,
            getStepArrayIndex,
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
            value:
                props.value !== undefined
                    ? getValueInRange(false, min, max, step, getClosestValidValue(props.value, values))
                    : undefined,
            defaultValue:
                props.defaultValue !== undefined
                    ? getValueInRange(false, min, max, step, getClosestValidValue(props.defaultValue, values))
                    : undefined,
            onChange: props.onChangeValue,
            disabled: props.disabled,
        });

        const [currentValue, setCurrentValue] = React.useState(
            value ?? getValueInRange(false, min, max, step, getClosestValidValue(defaultValue ?? min, values))
        );

        const finalValue = value ?? currentValue;

        const prevValueRef = React.useRef(finalValue);

        const handleChange = (value: number, isPercentage: boolean) => {
            const realValue = getValueInRange(isPercentage, min, max, step, value);
            if (prevValueRef.current !== realValue) {
                onChangeValue(values ? values[realValue] : realValue);
            }
            setCurrentValue(realValue);
            prevValueRef.current = realValue;
        };

        const trackRef = React.useRef<HTMLDivElement>(null);
        const thumbRef = React.useRef<HTMLDivElement>(null);
        const sliderRef = React.useRef<HTMLDivElement>(null);

        const [isPointerDown, setIsPointerDown] = React.useState(false);
        const [isThumbHovered, setIsThumbHovered] = React.useState(false);
        const [isFocused, setIsFocused] = React.useState(false);
        const {isIos} = useTheme();

        const isPointerOverElement = (element: HTMLElement | null, x: number, y: number) => {
            const box = element?.getBoundingClientRect();
            return box !== undefined && box.left <= x && x <= box.right && box.top <= y && y <= box.bottom;
        };

        const isTabKeyDownRef = React.useRef(false);

        React.useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                switch (e.keyCode) {
                    case TAB:
                        isTabKeyDownRef.current = true;
                        break;
                    case ESC:
                        if (isFocused) {
                            setIsFocused(false);
                            thumbRef.current?.blur();
                        }
                        break;
                    default:
                    // do nothing
                }
            };

            const handleKeyUp = () => (isTabKeyDownRef.current = false);

            document.addEventListener('keydown', handleKeyDown, false);
            document.addEventListener('keyup', handleKeyUp, false);
            return () => {
                document.removeEventListener('keydown', handleKeyDown, false);
                document.removeEventListener('keyup', handleKeyUp, false);
            };
        }, [isFocused]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            switch (e.keyCode) {
                case RIGHT:
                case UP:
                    cancelEvent(e);
                    handleChange(finalValue + step, false);
                    break;
                case LEFT:
                case DOWN:
                    cancelEvent(e);
                    handleChange(finalValue - step, false);
                    break;
                case HOME:
                    cancelEvent(e);
                    handleChange(min, false);
                    break;
                case END:
                    cancelEvent(e);
                    handleChange(max, false);
                    break;

                default:
                // do nothing
            }
        };

        const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;
        const thumbSize = isIos ? IOS_THUMB_SIZE : DEFAULT_THUMB_SIZE;
        const touchableArea = isTouchableDevice
            ? MOBILE_TOUCHABLE_AREA
            : isIos
            ? IOS_TOUCHABLE_AREA
            : DESKTOP_TOUCHABLE_AREA;

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
                        onKeyDown={!disabled ? handleKeyDown : undefined}
                        tabIndex={disabled ? -1 : 0}
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
                    <ScreenReaderOnly>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            ref={combineRefs(ref, focusableRef)}
                            step={step}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy}
                            id={id}
                            className={styles.input}
                            aria-valuetext={String(values ? values[finalValue] : finalValue)}
                            style={{
                                height: touchableArea,
                            }}
                            name={name}
                            value={values ? values[finalValue] : finalValue}
                            disabled={disabled}
                            onChange={(e) => handleChange(+e.target.value, false)}
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
