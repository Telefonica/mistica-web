import * as React from 'react';
import {getUnbrandedSkin} from './skins/unbranded';

import type {LogoImageProps} from './logo-common';

const UnbrandedLogoImage = ({isDarkMode, color: colorProp}: LogoImageProps): JSX.Element => {
    const {colors} = getUnbrandedSkin();
    const color = colorProp || (isDarkMode ? colors.inverse : colors.backgroundBrand);

    return (
        <g fill={color}>
            <rect x="12" y="12" width="48" height="48" rx="8" />
        </g>
    );
};

export default UnbrandedLogoImage;
