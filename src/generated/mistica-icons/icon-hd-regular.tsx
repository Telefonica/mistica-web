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

const IconHdRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M2 6v12h20V6zm4.257 3.2v5.6c0 .333.246.6.555.6.308 0 .554-.267.554-.6V12.6h2.963V14.8c0 .333.246.6.555.6.308 0 .554-.267.554-.6V9.2c0-.333-.246-.6-.554-.6s-.555.267-.555.6V11.4H7.366V9.2c0-.333-.246-.6-.554-.6s-.555.267-.555.6M18.108 12c0-1.94-1.431-3.4-3.333-3.4h-2.223v6.8h2.223c1.902 0 3.333-1.46 3.333-3.4m-4.442-2.201h1.11c1.289 0 2.223.926 2.223 2.201s-.934 2.201-2.223 2.201h-1.11zM3.48 16.398V7.602h17.037v8.796z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M2 6v12h20V6zm4.257 3.2v5.6c0 .333.246.6.555.6.308 0 .554-.267.554-.6V12.6h2.963V14.8c0 .333.246.6.555.6.308 0 .554-.267.554-.6V9.2c0-.333-.246-.6-.554-.6s-.555.267-.555.6V11.4H7.366V9.2c0-.333-.246-.6-.554-.6s-.555.267-.555.6M18.108 12c0-1.94-1.431-3.4-3.333-3.4h-2.223v6.8h2.223c1.902 0 3.333-1.46 3.333-3.4m-4.442-2.201h1.11c1.289 0 2.223.926 2.223 2.201s-.934 2.201-2.223 2.201h-1.11zM3.48 16.398V7.602h17.037v8.796z"
                />
            </svg>
        );
    }
};

export default IconHdRegular;
