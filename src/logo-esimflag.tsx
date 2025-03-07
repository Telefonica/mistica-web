import * as React from 'react';
import * as styles from './logo.css';
import {getEsimflagSkin} from './skins/esimflag';
import {applyCssVars} from './utils/css';
import {calcInlineVars} from './logo-common';

import type {LogoImageProps} from './logo-common';

const EsimflagLogoImage = ({size, isDarkMode, isInverse, color: colorProp}: LogoImageProps): JSX.Element => {
    const {colors} = getEsimflagSkin();
    const color =
        colorProp || (isDarkMode ? colors.inverse : isInverse ? colors.inverse : colors.backgroundBrand);

    return (
        <svg
            className={styles.svg}
            style={applyCssVars(calcInlineVars(size))}
            viewBox="0 0 72 72"
            fill={color}
        >
            <circle cx="24" cy="24" r="24" fill="#D9D9D9" />
        </svg>
    );
};

export default EsimflagLogoImage;
