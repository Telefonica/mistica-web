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

const IconVideoCameraFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M22 6.4v11.2c0 .16-.09.308-.228.37a.4.4 0 0 1-.147.03.36.36 0 0 1-.256-.113l-5.313-5.534v5.248c0 .215-.161.389-.36.389H2.36c-.2 0-.361-.174-.361-.39V6.4c0-.215.161-.39.36-.39H15.7c.2 0 .36.175.36.39v5.247l5.314-5.534a.35.35 0 0 1 .403-.082c.138.067.223.21.223.369"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M22 6.4v11.2c0 .16-.09.308-.228.37a.4.4 0 0 1-.147.03.36.36 0 0 1-.256-.113l-5.313-5.534v5.248c0 .215-.161.389-.36.389H2.36c-.2 0-.361-.174-.361-.39V6.4c0-.215.161-.39.36-.39H15.7c.2 0 .36.175.36.39v5.247l5.314-5.534a.35.35 0 0 1 .403-.082c.138.067.223.21.223.369"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.93 7.83a.66.66 0 0 0-.65-.01l-3.004 1.682v-1.58A1.924 1.924 0 0 0 14.354 6H5.673A1.923 1.923 0 0 0 3.75 7.923v8.152c0 .69.364 1.295.908 1.633l.076.047c.277.156.598.243.939.243h8.68a1.923 1.923 0 0 0 1.923-1.923v-1.579l2.99 1.674a.66.66 0 0 0 .649.008.66.66 0 0 0 .335-.572V8.395a.66.66 0 0 0-.323-.565zM7.255 10.005a.499.499 0 1 1 0-1 .499.499 0 1 1 0 1"
                />
            </svg>
        );
    }
};

export default IconVideoCameraFilled;
