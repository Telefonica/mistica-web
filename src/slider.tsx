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
};

const Slider: React.FC<SliderProps> = ({
    disabled,
    steps = 1,
    max = 100,
    min = 0,
    field
}) => {

    const { isIos } = useTheme();


    const [valueRanger, setValueRanger] = React.useState(min)
    const [minSlider, setMinSlider] = React.useState(min)
    const [maxSlider, setMaxSlider] = React.useState(max)
    const [step, setStep] = React.useState(1)
    const [fieldValue, setFieldValue] = React.useState('')
    const [error, setError] = React.useState('')

    const setValue = () => {
        const
            newValue = Number(Math.abs(valueRanger - minSlider) * 100 / (maxSlider - minSlider)),
            newPosition = 10 - (newValue * 0.2);
        return `calc(${newValue}% + (${newPosition}px))`;
    }

    const opacity = React.useMemo(() => disabled ? '0.5' : '1', [disabled])

    const sliderDisabled = React.useMemo(() => disabled && styles.sliderDisabled, [disabled])

    // const tooltipDescription = React.useMemo(() =>Array.isArray(steps) ? steps[valueRanger].toString() : valueRanger.toString(),[valueRanger,steps])

    const getClosestNumber = (value: number) => {
        let finalValue = value
        if (Array.isArray(steps)) {
            // steps.includes(fieldValue) ? fieldValue : getClosestNumber(fieldValue)
            finalValue = steps.reduce((a, b) => {
                return Math.abs(b - value) < Math.abs(a - value) ? b : a;
            });
        }
        return finalValue
    }

    const getValidSliderValue = (fieldValue: number) => {
        let value = 0
        for (let i = fieldValue; ; i--) {
            if (i % step === 0) {
                value = i
                break;
            }
        }
        return value
    }


    const handleField = (fieldValue: number) => {
        setFieldValue(fieldValue.toString())
        if (Array.isArray(steps)) {
            setValueRanger(steps.indexOf(getClosestNumber(fieldValue)))

            const max = steps[steps.length - 1]
            const min = steps[0]

            let text = ''
            if (min > fieldValue || fieldValue > max) {
                text = max < fieldValue ? 'Max: ' + max : 'Min: ' + min
            }
            setError(text)
        }
        else {
            let text = ''
            let sliderValue = getValidSliderValue(fieldValue)
            if (min > fieldValue || fieldValue > max) {
                sliderValue = max < fieldValue ? max : min
                text = max < fieldValue ? 'Max: ' + max : 'Min: ' + min
            }
            setValueRanger(sliderValue)
            setError(text)
        }
    }


    const handleSlider = (value:number) => {

        if (Array.isArray(steps)) {
            setFieldValue(steps[value].toString())
        } else {
            setFieldValue(value.toString())
        }
        setValueRanger(value)
        setError('')
    }

    React.useEffect(() => {
        if (Array.isArray(steps)) {

            setMaxSlider(steps.length - 1)
            setValueRanger(0)
            setFieldValue(steps[0].toString())

        } else {

            setMinSlider(min)
            setMaxSlider(max)
            setValueRanger(min)
            setFieldValue(min.toString())
            setStep(steps)

        }
    }, [steps, max, min])

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
