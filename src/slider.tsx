import * as React from 'react';
import { useTheme } from './hooks';
import { vars } from './skins/skin-contract.css';
import * as styles from './slider.css';
import { getPrefixedDataAttributes } from './utils/dom';
import classNames from 'classnames';
import * as key from './utils/key-codes';

import type { DataAttributes } from './utils/types';


type Props = {
    progressPercent: number;
    color?: string;
    children?: void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    dataAttributes?: DataAttributes;
    reverse?: boolean;
};

const Slider: React.FC<Props> = ({
    progressPercent,
    color,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    dataAttributes,
    reverse = false,
    // value,
}) => {
    const { texts } = useTheme();
    const defaultLabel = texts.loading;
    const label = ariaLabelledBy ? undefined : ariaLabel || defaultLabel;

    const [valueRanger, setValueRange] = React.useState('30')

    //  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValueRange(e.target.value) 
    //  };

    // Evento das teclas das setas e tab
    // const handleChange = (e: KeyboardEvent) => {
    //     if(e.keyCode === key.LEFT || key.DOWN) {
    //         return valueRanger !== '0' ? setValueRange(valueRanger - 1) : valueRanger
    //     }
    //     if(e.keyCode === key.RIGHT || key.UP) {
    //         return valueRanger !== '100' ? setValueRange(valueRanger + 1) : valueRanger
    //     }
    // }
    

    return (
        <div className={styles.container} >
            <div className={styles.rangeSlider}>
                <input className={styles.slider} type="range" min={0} max={100} value={valueRanger} onChange={(e) => setValueRange(e.target.value)}>

                </input>
                <div className={styles.sliderThumb} style={{ left: `${valueRanger}%` }}>
                    {/* <div className={styles.tooltip}>{valueRanger}</div> */}

                </div>
                <div className={styles.progress} style={{ width: `${valueRanger}%` }} ></div>
            </div>
        </div>
    );
};

export default Slider;
