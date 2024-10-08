'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useTheme} from '../../hooks';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconWaterDropFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M6.246 17.713a5.85 5.85 0 0 0 4.187 1.787c1.567 0 3.067-.644 4.179-1.75l.035-.037c1.116-1.143 1.71-2.642 1.71-4.25 0-2.002-1.393-4.324-2.509-6.18l-2.826-4.927A.67.67 0 0 0 10.43 2c-.246 0-.456.142-.594.356 0 0-2.58 4.534-2.826 4.927C5.893 9.107 4.5 11.424 4.5 13.426c0 1.645.63 3.144 1.746 4.287m11.339 0h1.393a.545.545 0 0 0 .522-.535.545.545 0 0 0-.522-.535h-1.393a.545.545 0 0 0-.523.535c0 .284.246.535.523.535m-.281 2.751a.53.53 0 0 1-.384-.141l-.942-.965a.525.525 0 0 1 0-.75.496.496 0 0 1 .732 0l.942.965c.21.215.21.535 0 .75-.072.105-.21.141-.348.141m-3.384 1.001c0 .284.245.535.522.535a.54.54 0 0 0 .522-.54v-1.42a.544.544 0 0 0-.522-.535.545.545 0 0 0-.522.534z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M6.246 17.713a5.85 5.85 0 0 0 4.187 1.787c1.567 0 3.067-.644 4.179-1.75l.035-.037c1.116-1.143 1.71-2.642 1.71-4.25 0-2.002-1.393-4.324-2.509-6.18l-2.826-4.927A.67.67 0 0 0 10.43 2c-.246 0-.456.142-.594.356 0 0-2.58 4.534-2.826 4.927C5.893 9.107 4.5 11.424 4.5 13.426c0 1.645.63 3.144 1.746 4.287m11.339 0h1.393a.545.545 0 0 0 .522-.535.545.545 0 0 0-.522-.535h-1.393a.545.545 0 0 0-.523.535c0 .284.246.535.523.535m-.281 2.751a.53.53 0 0 1-.384-.141l-.942-.965a.525.525 0 0 1 0-.75.496.496 0 0 1 .732 0l.942.965c.21.215.21.535 0 .75-.072.105-.21.141-.348.141m-3.384 1.001c0 .284.245.535.522.535a.54.54 0 0 0 .522-.54v-1.42a.544.544 0 0 0-.522-.535.545.545 0 0 0-.522.534z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.269 2.276a.407.407 0 0 0-.575-.003l-.003.002c-1.358 1.367-6.672 8.247-6.658 12.57.006 2.173.647 3.957 1.852 5.164 1.199 1.2 2.966 1.835 5.106 1.835h.034c4.367-.014 6.963-2.644 6.95-7.042-.009-4.28-5.345-11.157-6.707-12.526"
                />
            </svg>
        );
    }
};

export default IconWaterDropFilled;
