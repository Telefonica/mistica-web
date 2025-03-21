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

const IconDisableFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M1 12.003C1 4.51 5.048 1 11.997 1 18.947 1 23 4.51 23 12.003S18.946 23 11.997 23C5.047 23 1 19.497 1 12.003m10.997-9.169c-6.252 0-9.163 2.915-9.163 9.17 0 2.682.542 4.748 1.65 6.235L18.207 4.515c-1.493-1.123-3.556-1.68-6.21-1.68m0 18.332c6.254 0 9.168-2.912 9.168-9.163 0-2.639-.554-4.692-1.665-6.185L5.783 19.532c1.487 1.095 3.543 1.634 6.214 1.634"
            />
        </svg>
    );
};

export default IconDisableFilled;
