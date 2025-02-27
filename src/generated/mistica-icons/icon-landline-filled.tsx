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

const IconLandlineFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.482 19.396a.68.68 0 0 1-.985-.028l-1.795-1.956a1.69 1.69 0 0 0-1.216-.51c-.463 0-.9.188-1.23.523l-3.47 3.629A3.08 3.08 0 0 1 9.568 22a3.08 3.08 0 0 1-2.214-.946 3.25 3.25 0 0 1-.918-2.283c0-.473.102-.928.285-1.346a3.44 3.44 0 0 1-1.862-.974l-1.065-1.088c-.606-.62-.65-1.598-.093-2.177l1.594-1.663c.557-.579 1.502-.546 2.112.074l1.114 1.139c.753.767 2.379.197 3.871-1.355.766-.8 1.3-1.654 1.51-2.407.13-.473.196-1.135-.245-1.585L12.543 6.25c-.605-.62-.65-1.594-.093-2.172l1.595-1.663c.276-.285.65-.432 1.056-.413.392.018.766.192 1.055.486l1.065 1.089c2.063 2.108.971 6.22-2.66 10.004-1.777 1.85-3.64 3.11-5.381 3.642a7 7 0 0 1-.744.18l-.107.11a1.8 1.8 0 0 0-.499 1.258c0 .478.183.928.508 1.268a1.705 1.705 0 0 0 2.46 0l3.47-3.629a3.064 3.064 0 0 1 4.432-.004l1.809 1.97a.735.735 0 0 1-.027 1.02"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.482 19.396a.68.68 0 0 1-.984-.028l-1.796-1.956a1.69 1.69 0 0 0-1.216-.51c-.463 0-.9.188-1.23.523l-3.47 3.629A3.08 3.08 0 0 1 9.568 22a3.08 3.08 0 0 1-2.214-.946 3.25 3.25 0 0 1-.918-2.283c0-.473.102-.928.285-1.346a3.44 3.44 0 0 1-1.862-.974l-1.065-1.088c-.606-.62-.65-1.598-.093-2.177l1.595-1.663c.556-.579 1.5-.546 2.111.074l1.114 1.139c.753.767 2.379.197 3.871-1.355.766-.8 1.3-1.654 1.51-2.407.13-.473.196-1.135-.245-1.585L12.544 6.25c-.606-.62-.65-1.594-.094-2.172l1.595-1.663c.276-.285.65-.432 1.056-.413.392.018.766.192 1.056.486l1.064 1.089c2.063 2.108.971 6.22-2.66 10.004-1.777 1.85-3.639 3.11-5.38 3.642a7 7 0 0 1-.745.18l-.107.11a1.8 1.8 0 0 0-.499 1.258c0 .478.183.928.508 1.268a1.705 1.705 0 0 0 2.46 0l3.47-3.629a3.064 3.064 0 0 1 4.432-.004l1.809 1.97a.735.735 0 0 1-.027 1.02"
                />
            </svg>
        );
    }
};

export default IconLandlineFilled;
