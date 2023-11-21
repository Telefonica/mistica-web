import * as React from 'react';
import * as styles from './slider.css';
import {vars} from './skins/skin-contract.css';
import {TAB} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import classNames from 'classnames';
import {cancelEvent} from './utils/dom';

const NOTCH_SIZE = 20;

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
        (isRelative: boolean, value?: number) => {
            const getRealValue = (value?: number) => {
                if (value === undefined) {
                    return min;
                }
                const realValue = isRelative ? min + (max - min) * value : value;
                return Math.max(min, Math.min(max, realValue));
            };
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

    const controlledValue = React.useMemo(() => getValueInRange(false, value), [getValueInRange, value]);

    const updateValue = (newValue: number) => {
        newValue = getValueInRange(true, newValue);
        const prevValue = isControlledByParent ? value : currentValue;
        if (newValue !== prevValue) {
            onChangeValue?.(newValue);
        }
        if (!isControlledByParent) {
            setCurrentValue(newValue);
        }
    };

    return [isControlledByParent ? controlledValue : currentValue, updateValue];
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
}

const Slider: React.FC<SliderProps> = ({
    disabled,
    step = 1,
    min = 0,
    max = 100,
    value,
    defaultValue,
    onChangeValue,
    'aria-label': ariaLabel,
}) => {
    const [currentValue, setCurrentValue] = useSliderState({
        value,
        defaultValue,
        min,
        max,
        step,
        onChangeValue,
    });

    const trackRef = React.useRef<HTMLDivElement>(null);
    const notchRef = React.useRef<HTMLDivElement>(null);

    const [isPointerDown, setIsPointerDown] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const isTabKeyDownRef = React.useRef(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.keyCode) {
                case TAB:
                    isTabKeyDownRef.current = true;
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
    }, []);

    const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;

    const onPointerMove = React.useCallback(
        (e: PointerEvent) => {
            cancelEvent(e);
            const track = trackRef.current;
            if (track) {
                const leftBorder = track.getBoundingClientRect().left;
                const width = track.clientWidth;
                const pointerPosition = e.pageX;
                setCurrentValue((pointerPosition - leftBorder) / width);
            }
        },
        [setCurrentValue]
    );

    const capturePointerMove = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const notch = notchRef.current;
            if (notch) {
                notch.onpointermove = onPointerMove;
                notch.setPointerCapture(e.pointerId);
            }
        },
        [onPointerMove]
    );

    const releasePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const notch = notchRef.current;
        if (notch) {
            notch.onpointermove = null;
            notch.releasePointerCapture(e.pointerId);
        }
    }, []);

    const progress = React.useMemo(
        () => (min === max ? 0 : ((currentValue - min) / (max - min)) * 100),
        [min, max, currentValue]
    );

    return (
        <div
            className={classNames(styles.container, {[styles.disabled]: disabled})}
            style={{height: isTouchableDevice ? 48 : 20}}
            aria-label={ariaLabel}
        >
            <div
                className={styles.track}
                ref={trackRef}
                style={{
                    background: `linear-gradient(to right, ${vars.colors.controlActivated} ${progress}%, ${vars.colors.control} ${progress}%)`,
                }}
            />
            <div
                className={styles.notchContainer}
                ref={notchRef}
                style={{
                    cursor: isPointerDown ? 'grabbing' : isHovered ? 'grab' : 'auto',
                    left: `calc(${progress}% - ${NOTCH_SIZE / 2}px)`,
                }}
                onPointerEnter={() => {
                    if (!isTouchableDevice) {
                        setIsHovered(true);
                    }
                }}
                onPointerLeave={() => {
                    if (!isTouchableDevice) {
                        setIsHovered(false);
                    }
                }}
                onPointerDown={(e) => {
                    setIsPointerDown(true);
                    capturePointerMove(e);
                }}
                onPointerUp={(e) => {
                    setIsPointerDown(false);
                    releasePointerMove(e);
                }}
            >
                <div className={styles.notch} />
            </div>
        </div>
    );
};

export default Slider;
