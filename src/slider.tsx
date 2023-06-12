import * as React from 'react';
import { useTheme } from './hooks';
import * as styles from './slider.css';
import classnames from 'classnames';

interface SliderProps {
    disabled?: boolean,
};

const Slider: React.FC<SliderProps> = ({
    disabled,
}) => {

    const { isIos } = useTheme();

    const min = 0
    const max = 100


    const [valueRanger, setValueRange] = React.useState(50)

    const setValue = () => {
        const
            newValue = Number((valueRanger - 0) * 100 / (100 - 0)),
            newPosition = 10 - (newValue * 0.2);
        return `calc(${newValue}% + (${newPosition}px))`;
    }

    const opacity = disabled ? '0.2' : '1'

    const cursor = disabled ? 'no-drop' : ''

    const sliderDisabled = disabled && styles.sliderDisabled

    return (
        <div className={styles.container} >

            <div style={{opacity}} className={styles.rangeSlider}>

                {/* <input className={styles.slider} type="range" min={0} max={100} value={valueRanger} onChange={(e) => handleSlider(e)}>

                </input> */}

                <input  style={{cursor}} disabled={disabled} className={classnames(styles.sliderVariant[isIos ? 'ios' : 'default'],sliderDisabled)} type="range" min={min} max={max} value={valueRanger} onChange={(e) => setValueRange(+e.target.value)}>

                </input>

                {/* <div className={styles.sliderThumb} style={{ left: setValue() }}> */}

                <div style={{ left: setValue() }} className={classnames(styles.sliderThumbVariant[isIos ? 'ios' : 'default'])} />




                <div className={styles.progress} style={{ width: setValue()  }} ></div>
            </div>
            

        </div>

    );
};

export default Slider;
