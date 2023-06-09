import * as React from 'react';
import { useTheme } from './hooks';
import { vars } from './skins/skin-contract.css';
import * as styles from './slider.css';
import { getPrefixedDataAttributes } from './utils/dom';
import classNames from 'classnames';
import * as key from './utils/key-codes';

import type { DataAttributes } from './utils/types';


type Props = {

};

const Slider: React.FC<Props> = ({


}) => {


    const [valueRanger, setValueRange] = React.useState(50)

    const setValue = () => {
        const
            newValue = Number((valueRanger - 0) * 100 / (100 - 0)),
            newPosition = 10 - (newValue * 0.2);
        return `calc(${newValue}% + (${newPosition}px))`;
    }

    const handleSlider = (e) => {
        setValueRange(e.target.value);
    }




    return (
        <div className={styles.container} >

            <div className={styles.rangeSlider}>

                <input className={styles.slider} type="range" min={0} max={100} value={valueRanger} onChange={(e) => handleSlider(e)}>

                </input>

                <div className={styles.sliderThumb} style={{ left: setValue() }}>


                </div>

                <div className={styles.progress} style={{ width: setValue() }} ></div>
            </div>

        </div>

    );
};

export default Slider;
