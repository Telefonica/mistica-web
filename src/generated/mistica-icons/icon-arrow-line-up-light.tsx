'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconArrowLineUpLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M12.38 19.529V5.518l6.783 6.448a.47.47 0 0 0 .829-.208.48.48 0 0 0-.19-.473L12.23 4.084a.13.13 0 0 0-.066-.048.4.4 0 0 0-.075 0 .46.46 0 0 0-.357 0 .4.4 0 0 0-.075 0 .3.3 0 0 0-.075.048l-7.43 7.069a.45.45 0 0 0-.15.35.46.46 0 0 0 .79.33l6.65-6.315v14.01c0 .26.21.472.47.472a.47.47 0 0 0 .469-.471q-.004 0 0 0"
            />
        </svg>
    );
};

export default IconArrowLineUpLight;
