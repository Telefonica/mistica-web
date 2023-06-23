import * as React from 'react';
import {useTheme} from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';
import IntegerField from './integer-field';

interface SliderProps {
    disabled?: boolean;
    steps?: number | Array<number>;
    max?: number;
    min?: number;
    field?: boolean;
    value?: number;
    onChange?: (value: number) => void;
    getStepArrayIndex?: (value: number) => void;
    invalidText?: string;
    'arial-label'?: string;
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
    invalidText = ' ',
    'arial-label': arialLabel,
}) => {
    const {isIos} = useTheme();
    const [valueRanger, setValueRanger] = React.useState(min);
    const [minSlider, setMinSlider] = React.useState(min);
    const [maxSlider, setMaxSlider] = React.useState(max);
    const [step, setStep] = React.useState(1);
    const [fieldValue, setFieldValue] = React.useState('');
    const [error, setError] = React.useState('');
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const opacity = React.useMemo(() => (disabled ? '0.5' : '1'), [disabled]);
    const sliderDisabled = React.useMemo(() => disabled && styles.sliderDisabled, [disabled]);

    const setValue = React.useCallback(() => {
        const newValue = Number((Math.abs(valueRanger - minSlider) * 100) / (maxSlider - minSlider)),
            newPosition = 10 - newValue * 0.2;
        return `calc(${newValue}% + (${newPosition}px))`;
    }, [valueRanger, minSlider, maxSlider]);

    const getClosestNumber = React.useCallback(
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

    const getValidSliderValue = React.useCallback(
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
            Array.isArray(steps)
                ? steps.indexOf(getClosestNumber(+fieldValue))
                : getValidSliderValue(+fieldValue),
        [steps, getClosestNumber, getValidSliderValue]
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
                valueIndex = steps.indexOf(getClosestNumber(value));
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
                const finalValue = getValidSliderValue(value);
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
    }, [steps, max, min, getClosestNumber, value, getValidSliderValue, invalidText, step]);

    return (
        <section className={styles.container} aria-label={arialLabel}>
            <div
                style={{
                    display: 'inline-block',
                    width: '100%',
                }}
            >
                <div ref={sliderRef} style={{opacity}} className={styles.rangeSlider}>
                    <input
                        disabled={disabled}
                        className={classnames(
                            styles.sliderVariant[isIos ? 'ios' : 'default'],
                            sliderDisabled
                        )}
                        type="range"
                        min={minSlider}
                        max={maxSlider}
                        value={valueRanger}
                        step={step}
                        onChange={(e) => handleSlider(+e.target.value)}
                    />

                    <div
                        style={{left: setValue()}}
                        className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])}
                    />

                    <div className={styles.progress} style={{width: setValue()}} />
                </div>
            </div>

            {field && (
                <div
                    style={{
                        display: 'inline-block',

                        width: '100px',
                        marginLeft: '16px',
                    }}
                >
                    <IntegerField
                        error={!!error}
                        disabled={disabled}
                        value={fieldValue}
                        helperText={error}
                        label="Value"
                        name="Value"
                        onChange={(e) => handleField(+e.target.value)}
                        id="sliderField"
                    />
                </div>
            )}
        </section>
    );
};

export default Slider;
