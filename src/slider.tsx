import * as React from 'react';
import {useScreenSize, useTheme} from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';
import IntegerField from './integer-field';
import Tooltip from './tooltip';

interface SliderProps {
    disabled?: boolean;
    steps?: number | Array<number>;
    max?: number;
    min?: number;
    field?: boolean;
    value?: number;
    onChange?: (value: number) => void;
    getStepArrayIndex?: (value: number) => void;
    'arial-label'?: string;
    tooltip?: boolean;
    helperText?: string;
    error?: boolean;
}

const Slider: React.FC<SliderProps> = ({
    disabled,
    steps = 1,
    max = 100,
    min = 0,
    field,
    value,
    onChange,
    getStepArrayIndex,
    'arial-label': arialLabel,
    tooltip,
    helperText,
    error,
}) => {
    const {isIos} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    const [valueRanger, setValueRanger] = React.useState(min);
    const [minSlider, setMinSlider] = React.useState(min);
    const [maxSlider, setMaxSlider] = React.useState(max);
    const [step, setStep] = React.useState(1);
    const [fieldValue, setFieldValue] = React.useState('');
    const [err, setError] = React.useState('');
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const opacity = React.useMemo(() => (disabled ? '0.5' : '1'), [disabled]);
    const sliderPaddingTop = field ? 24 : 0;
    const sliderTop = field ? '93%' : '50%';
    const sliderDisabled = React.useMemo(() => disabled && styles.sliderDisabled, [disabled]);
    const invalidText = ' '

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

    const getValidValue = React.useCallback(
        (fieldValue: number) => {
            let value = 0;
            for (let i = fieldValue; ; i--) {
                if (i % step === 0) {
                    value = i;
                    break;
                }
            }
            return value;
        },
        [step]
    );

    const getValidNumber = React.useCallback(
        (fieldValue: number | string) =>
            Array.isArray(steps) ? steps.indexOf(getApproximation(+fieldValue)) : getValidValue(+fieldValue),
        [steps, getApproximation, getValidValue]
    );

    const handleField = (fieldValue: number) => {
        setFieldValue(fieldValue.toString());
        const maxValue = Array.isArray(steps) ? steps[steps.length - 1] : max;
        const minValue = Array.isArray(steps) ? steps[0] : min;

        let sliderValue = getValidNumber(fieldValue);
        let text = '';

        if (fieldValue % step !== 0 || (Array.isArray(steps) && !steps.includes(fieldValue))) {
            text = invalidText;
        }

        if (min > fieldValue || fieldValue > max) {
            sliderValue = max < fieldValue ? max : min;
        }
        if (minValue > fieldValue || fieldValue > maxValue) {
            text = maxValue < fieldValue ? 'Max: ' + maxValue : 'Min: ' + minValue;
        }

        setValueRanger(sliderValue);
        setError(text);
    };

    const handleSlider = (value: number) => {
        const fieldAux = Array.isArray(steps) ? steps[value].toString() : value.toString();

        setFieldValue(fieldAux);
        setValueRanger(value);
        setError('');
    };

    React.useEffect(() => {
        if (fieldValue !== 'true') {
            onChange?.(getValidNumber(fieldValue));
            getStepArrayIndex?.(valueRanger);
        }
    }, [fieldValue, onChange, getValidNumber, getStepArrayIndex, valueRanger]);

    React.useEffect(() => {
        if (Array.isArray(steps)) {
            setMaxSlider(steps.length - 1);
            let valueIndex = 0;
            let error = '';
            let field = 0;

            if (value !== undefined) {
                const condition = steps[0] > value || value > steps[steps.length - 1];
                valueIndex = steps.indexOf(getApproximation(value));
                field = value;
                error = !steps.includes(value) ? invalidText : error;
                error = condition
                    ? steps[0] > value
                        ? 'Min: ' + steps[0]
                        : 'Max: ' + steps[steps.length - 1]
                    : error;
            }

            setFieldValue(field.toString());
            setValueRanger(valueIndex);
            setError(error);
        } else {
            setMinSlider(min);
            setMaxSlider(max);
            let ranger = min;
            let field = min.toString();
            let error = '';
            if (value !== undefined) {
                const finalValue = getValidValue(value);
                ranger = finalValue;
                field = value.toString();
                if (step !== 1 && value % step !== 0) {
                    error = invalidText;
                }
                if (min > value || value > max) {
                    ranger = max < value ? max : min;
                    field = value.toString();
                    error = max < value ? 'Max: ' + max : 'Min: ' + min;
                }
            }

            setError(error);
            setValueRanger(ranger);
            setFieldValue(field);
            setStep(steps);
        }
    }, [steps, max, min, getApproximation, value, getValidValue, invalidText, step, getOrder]);

    const fieldContent = () => {
        return (
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

                    <div
                        style={{left: setPosition(), top: sliderTop}}
                        className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])}
                    />
                    <div className={styles.progress} style={{width: setPosition(), top: sliderTop}} />
                </div>
            </div>
        );
    };

    return (
        <section className={styles.container} aria-label={arialLabel}>
            {field ? (
                <div className={styles.container}>
                    {fieldContent()}

                    <div className={styles.fieldContainer}>
                        <IntegerField
                            error={error ?? !!err}
                            disabled={disabled}
                            value={fieldValue}
                            maxLength={maxSlider}
                            helperText={helperText ?? err}
                            label="Value"
                            name="Value"
                            onChange={(e) => handleField(+e.target.value)}
                            id="sliderField"
                        />
                    </div>
                </div>
            ) : tooltip ? (
                <Tooltip
                    description={
                        Array.isArray(steps) ? steps[valueRanger].toString() : valueRanger.toString()
                    }
                    width={isTabletOrSmaller ? 42 : 45}
                    targetLabel=""
                    textCenter
                    unstable_offsetX={setPosition(true)}
                    targetStyle={{width: '100%'}}
                    position="top"
                    target={fieldContent()}
                />
            ) : (
                fieldContent()
            )}
        </section>
    );
};

export default Slider;
