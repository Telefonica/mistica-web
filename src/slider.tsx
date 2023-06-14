import * as React from 'react';
import { useTheme } from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';
import IntegerField from './integer-field';

interface SliderProps {
    disabled?: boolean,
    steps?: number | Array<number>
    max?: number
    min?: number
    field?: boolean
};

const Slider: React.FC<SliderProps> = ({
    disabled,
    steps=1,
    max=100,
    min=0,
    field
}) => {

    const { isIos } = useTheme();


    const [valueRanger, setValueRanger] = React.useState(min)
    const [minSlider,setMinSlider] = React.useState(min)
    const [maxSlider,setMaxSlider] = React.useState(max)
    const [step,setStep] = React.useState(1)
    const [fieldValue, setFieldValue] = React.useState('')
    const [allSteps,setAllSteps] = React.useState([0])

    const setValue = () => {
        const
            newValue = Number(Math.abs(valueRanger - minSlider) * 100 / (maxSlider - minSlider)),
            newPosition = 10 - (newValue * 0.2);
  
        return `calc(${newValue}% + (${newPosition}px))`;
    }

    const opacity = disabled ? '0.5' : '1'

    const sliderDisabled = disabled && styles.sliderDisabled

    const getClosestNumber = (value:number) => {
        return allSteps.reduce((a, b) => {
            return Math.abs(b - value) < Math.abs(a - value) ? b : a;
        });
    }

    const handleField = (fieldValue:number) => {
        if(min <= fieldValue && fieldValue <= max){
            const value = allSteps.includes(fieldValue) ? fieldValue : getClosestNumber(fieldValue)
            
            setValueRanger(value)
            setFieldValue(value.toString())

        }
    }

    const handleSlider = (value:number) => {

            setValueRanger(value)
            setFieldValue(value.toString())
    }


    React.useEffect(()=>{
        if(steps !== 1){         
            if(Array.isArray(steps)){
                setStep(100/steps.length)
                setValueRanger(0)
                
            }else {
                const allStep = Array.from({length: (max-min)}, (_, i) => min + steps*i)
                
                setFieldValue(min.toString())
                setStep(steps)
                setMinSlider(min)
                setMaxSlider(max)
                setValueRanger(min)
                setAllSteps(allStep)
            }
        }
    },[steps,max,min])

    return (
        <div className={styles.container} >

            <div style={{opacity}} className={styles.rangeSlider}>

                {/* <input className={styles.slider} type="range" min={0} max={100} value={valueRanger} onChange={(e) => handleSlider(e)}>

                </input> */}

                <input   disabled={disabled} className={classnames(styles.sliderVariant[isIos ? 'ios' : 'default'],sliderDisabled)} type="range" min={minSlider} max={maxSlider} value={valueRanger} step={step} onChange={(e) => handleSlider(+e.target.value)}>

                </input>

                {/* <div className={styles.sliderThumb} style={{ left: setValue() }}> */}

                <div style={{ left: setValue() }} className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])} />


                

                <div className={styles.progress} style={{ width: setValue()  }} ></div>
            </div>
            
            {field && <div style={{marginLeft:'16px'}}>
            <IntegerField disabled={disabled} value={fieldValue} label='Value' name='Slider Value' onChange={(e)=> handleField(+e.target.value)}  />
            </div>}

        </div>

    );
};

export default Slider;
