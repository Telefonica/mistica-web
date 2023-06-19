import * as React from 'react';
import { useTheme } from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';
import IntegerField from './integer-field';
// import Tooltip from './tooltip';

interface SliderProps {
    disabled?: boolean,
    steps?: number | Array<number>
    max?: number
    min?: number
    field?: boolean
    value?: number
    onChange?: (value: number) => void;
    getStepArrayIndex?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
    disabled,
    steps = 1,
    max = 100,
    min = 0,
    field,
    value,
    onChange,
    getStepArrayIndex
}) => {

    const { isIos } = useTheme();


    const [valueRanger, setValueRanger] = React.useState(min)
    const [minSlider, setMinSlider] = React.useState(min)
    const [maxSlider, setMaxSlider] = React.useState(max)
    const [step, setStep] = React.useState(1)
    const [fieldValue, setFieldValue] = React.useState('')
    const [error, setError] = React.useState('')

    const opacity = React.useMemo(() => disabled ? '0.5' : '1', [disabled])

    const sliderDisabled = React.useMemo(() => disabled && styles.sliderDisabled, [disabled])

    const setValue = React.useCallback(() => {
        const
            newValue = Number(Math.abs(valueRanger - minSlider) * 100 / (maxSlider - minSlider)),
            newPosition = 10 - (newValue * 0.2);
        return `calc(${newValue}% + (${newPosition}px))`;
    }, [valueRanger, minSlider, maxSlider])


    const getClosestNumber = React.useCallback((value: number) => {
        let finalValue = value
        if (Array.isArray(steps)) {
            finalValue = steps.reduce((a, b) => {
                return Math.abs(b - value) < Math.abs(a - value) ? b : a;
            });
        }
        return finalValue
    }, [steps])

    const getValidSliderValue = React.useCallback((fieldValue: number) => {
        let value = 0
        for (let i = fieldValue; ; i--) {
            if (i % step === 0) {
                value = i
                break;
            }
        }
        return value
    }, [step])

    const getValidNumber = React.useCallback((
        fieldValue:number|string
    )=>Array.isArray(steps) ? steps.indexOf(getClosestNumber(+fieldValue)) : getValidSliderValue(+fieldValue),[steps,getClosestNumber,getValidSliderValue])

    const handleField = (fieldValue: number) => {
        setFieldValue(fieldValue.toString())
        const maxValue = Array.isArray(steps) ? steps[steps.length - 1] : max
        const minValue = Array.isArray(steps) ? steps[0] : min
        
        let sliderValue = getValidNumber(fieldValue)
        let text = ''
        if(min > fieldValue || fieldValue > max){
            sliderValue = max < fieldValue ? max : min
            
        }
        if(minValue > fieldValue || fieldValue > maxValue){
            text = maxValue < fieldValue ? 'Max: ' + maxValue : 'Min: ' + minValue
        }
        
        setValueRanger(sliderValue)
        setError(text)
        
    }

    const handleSlider = (value: number) => {
        const fieldAux = Array.isArray(steps) ? steps[value].toString() : value.toString()

        setFieldValue(fieldAux)
        setValueRanger(value)
        setError('')
    }

    React.useEffect(() => {
        onChange?.(getValidNumber(fieldValue))
        getStepArrayIndex?.(valueRanger)
    }, [fieldValue, onChange,getValidNumber,getStepArrayIndex,valueRanger])

    React.useEffect(() => {
        if (Array.isArray(steps)) {

            setMaxSlider(steps.length - 1)
            const valueIndex = value !== undefined ? steps.indexOf(getClosestNumber(value)) : 0
            setValueRanger(valueIndex)
            setFieldValue(steps[valueIndex].toString())
        } else {

            setMinSlider(min)
            setMaxSlider(max)
            if (value === undefined) {
                setValueRanger(min)
                setError('')
            }
            else if (min <= value && value <= max) {
                const finalValue = getValidSliderValue(value)
                setValueRanger(finalValue)
                setError('')
            } else {

                setValueRanger(max < value ? max : min)
                setError(max < value ? 'Max: ' + max : 'Min: ' + min)
            }
            setFieldValue(min.toString())
            setStep(steps)

        }
    }, [steps, max, min, getClosestNumber, value, getValidSliderValue])

    return (
        <div className={styles.container}>
            {/* <Tooltip
                description={tooltipDescription}
                targetLabel='Slider'
                position='top'
                target={ */}
            <div style={{ opacity }} className={styles.rangeSlider}>
                <input disabled={disabled} className={classnames(styles.sliderVariant[isIos ? 'ios' : 'default'], sliderDisabled)} type="range" min={minSlider} max={maxSlider} value={valueRanger} step={step} onChange={(e) => handleSlider(+e.target.value)} />

                <div style={{ left: setValue() }} className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])} />
                <div className={styles.progress} style={{ width: setValue() }} />
            </div>
            {/* }
            /> */}


            {field && <div style={{ width: '96px', marginLeft: '16px' }}>
                <IntegerField error={!!error} helperText={error} disabled={disabled} value={fieldValue} label='Value' name='Value' onChange={(e) => handleField(+e.target.value)} />
            </div>}

        </div>
    );
};

export default Slider;
