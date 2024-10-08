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

const IconVolumeDownRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.333 22a.73.73 0 0 1-.37-.1l-9.459-5.452H2.74a.74.74 0 0 1-.74-.74V8.297a.74.74 0 0 1 .74-.74h2.764l9.46-5.457a.74.74 0 0 1 1.11.64v18.52a.74.74 0 0 1-.74.74M3.48 14.964h2.224c.128 0 .256.033.37.1l8.52 4.916V4.02l-8.52 4.917a.73.73 0 0 1-.37.1H3.48zM21.26 11.26a.74.74 0 0 1 0 1.48h-3.703a.74.74 0 0 1 0-1.48z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.333 22a.73.73 0 0 1-.37-.1l-9.459-5.452H2.74a.74.74 0 0 1-.74-.74V8.297a.74.74 0 0 1 .74-.74h2.764l9.46-5.457a.74.74 0 0 1 1.11.64v18.52a.74.74 0 0 1-.74.74M3.48 14.964h2.224c.128 0 .256.033.37.1l8.52 4.916V4.02l-8.52 4.917a.73.73 0 0 1-.37.1H3.48zM21.26 11.26a.74.74 0 0 1 0 1.48h-3.703a.74.74 0 0 1 0-1.48z"
                />
            </svg>
        );
    }
};

export default IconVolumeDownRegular;
