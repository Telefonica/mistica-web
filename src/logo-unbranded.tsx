import * as React from 'react';
import {getUnbrandedSkin} from './skins/unbranded';

import type {LogoImageProps} from './logo-common';

const UnbrandedLogoImage = ({isDarkMode, color: colorProp}: LogoImageProps): JSX.Element => {
    const {colors} = getUnbrandedSkin();
    const color = colorProp || (isDarkMode ? colors.inverse : colors.backgroundBrand);

    return (
        <g fill={color}>
            <circle cx="12" cy="12" r="12" />
        </g>
    );
};

export default UnbrandedLogoImage;
