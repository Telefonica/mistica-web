import * as React from 'react';
import {useScreenSize, useTheme} from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';
import Tooltip from './tooltip';

interface SliderProps {
    disabled?: boolean;
    steps?: number | Array<number>;
    max?: number;
    min?: number;
    value?: number;
    onChange?: (value: number) => void;
    getStepArrayIndex?: (value: number) => void;
    'arial-label'?: string;
    tooltip?: boolean;
}

const Slider: React.FC<SliderProps> = ({
    disabled,
    steps = 1,
    max = 100,
    min = 0,
    value,
    onChange,
    getStepArrayIndex,
    'arial-label': arialLabel,
    tooltip,
}) => {
    const {isIos} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    const [valueRanger, setValueRanger] = React.useState(min);
    const [minSlider, setMinSlider] = React.useState(min);
    const [maxSlider, setMaxSlider] = React.useState(max);
    const [step, setStep] = React.useState(1);
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const opacity = React.useMemo(() => (disabled ? '0.5' : '1'), [disabled]);
    const sliderPaddingTop = 0;
    const sliderTop = '50%';
    const sliderDisabled = React.useMemo(() => disabled && styles.sliderDisabled, [disabled]);

    const setPosition = React.useCallback(
        (withMultiplyValue = false) => {
            if (!sliderRef.current) return;
            const slider = sliderRef.current.getBoundingClientRect();
            const newValue = Number((Math.abs(valueRanger - minSlider) * 100) / (maxSlider - minSlider));
            const multiplyValue = 0.2 + (window.innerWidth - slider.right) / 100 + (slider.left - 0) / 100;
            const newPosition = withMultiplyValue
                ? slider.left - 10 - newValue * multiplyValue
                : 10 - newValue * 0.2;
            return `calc(${newValue}% + (${newPosition}px))`;
        },
        [valueRanger, minSlider, maxSlider]
    );

    const getApproximation = React.useCallback(
        (value: number) => {
            let finalValue = value;
            if (Array.isArray(steps)) {
                finalValue = steps.reduce((a, b) => {
                    return Math.abs(b - value) < Math.abs(a - value) ? b : a;
                });
            }
            return finalValue;
        },
        [steps]
    );

    const getOrder = React.useCallback(() => {
        if (Array.isArray(steps)) {
            steps.sort((a, b) => {
                return a - b;
            });
        }
    }, [steps]);

    const handleSlider = (value: number) => {
        setValueRanger(value);
    };

    React.useEffect(() => {
        onChange?.(valueRanger);
        getStepArrayIndex?.(valueRanger);
    }, [onChange, getStepArrayIndex, valueRanger]);

    React.useEffect(() => {
        if (Array.isArray(steps)) {
            setMaxSlider(steps.length - 1);
            let valueIndex = 0;

            if (value !== undefined) {
                valueIndex = steps.indexOf(getApproximation(value));
            }

            setValueRanger(valueIndex);
        } else {
            setMinSlider(min);
            setMaxSlider(max);
            let ranger = min;
            if (value !== undefined) {
                if (min > value || value > max) {
                    ranger = max < value ? max : min;
                }
            }

            setValueRanger(ranger);
            setStep(steps);
        }
    }, [steps, max, min, getApproximation, value, step, getOrder]);

    return (
        <section className={styles.container} aria-label={arialLabel}>
            <div className={styles.targetContainer}>
                <div
                    ref={sliderRef}
                    style={{opacity, paddingTop: sliderPaddingTop}}
                    className={styles.rangeSlider}
                >
                    <input
                        disabled={disabled}
                        style={{top: sliderTop}}
                        className={classnames(
                            styles.sliderVariant[isIos ? 'ios' : 'default'],
                            sliderDisabled
                        )}
                        aria-label="Slider"
                        type="range"
                        min={minSlider}
                        max={maxSlider}
                        value={valueRanger}
                        step={step}
                        onChange={(e) => handleSlider(+e.target.value)}
                    />
                    {tooltip ? (
                        <Tooltip
                            description={
                                Array.isArray(steps) ? steps[valueRanger].toString() : valueRanger.toString()
                            }
                            width={isTabletOrSmaller ? 42 : 45}
                            centerContent
                            position="top"
                            target={
                                <div
                                    style={{left: setPosition(), top: sliderTop}}
                                    className={classnames(
                                        styles.sliderThumbVariant[isIos ? 'ios' : 'default']
                                    )}
                                />
                            }
                        />
                    ) : (
                        <div
                            style={{left: setPosition(), top: sliderTop}}
                            className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])}
                        />
                    )}
                    <div className={styles.progress} style={{width: setPosition(), top: sliderTop}} />
                </div>
            </div>
        </section>
    );
};

export default Slider;
