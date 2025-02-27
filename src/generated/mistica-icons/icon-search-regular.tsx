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

const IconSearchRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^blau/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.786 20.786-5.893-5.893a7.84 7.84 0 0 0 1.821-5.036C17.714 5.536 14.18 2 9.857 2 5.536 2 2 5.536 2 9.857c0 4.322 3.536 7.857 7.857 7.857a7.84 7.84 0 0 0 5.036-1.821l5.893 5.893a.7.7 0 0 0 .5.214.7.7 0 0 0 .5-.214.69.69 0 0 0 0-1M3.429 9.857c0-3.536 2.892-6.428 6.428-6.428s6.429 2.892 6.429 6.428-2.893 6.429-6.429 6.429S3.43 13.393 3.43 9.857"
                />
            </svg>
        );
    } else if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m15.701 14.884 5.62 5.896a.744.744 0 0 1-.004 1.012.66.66 0 0 1-.96 0l-5.62-5.9c-1.299 1.136-2.967 1.82-4.785 1.82-4.126 0-7.482-3.524-7.482-7.856S5.826 2 9.952 2s7.487 3.524 7.483 7.86c0 1.908-.652 3.66-1.734 5.024M9.952 3.428c-3.375 0-6.122 2.884-6.122 6.428s2.747 6.428 6.122 6.428 6.123-2.884 6.123-6.428-2.747-6.428-6.123-6.428"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m15.702 14.884 5.619 5.896a.744.744 0 0 1-.004 1.012.66.66 0 0 1-.96 0l-5.62-5.9c-1.299 1.136-2.967 1.82-4.785 1.82-4.126 0-7.482-3.524-7.482-7.856S5.826 2 9.952 2s7.487 3.524 7.483 7.86c0 1.908-.651 3.66-1.733 5.024M9.952 3.428c-3.375 0-6.122 2.884-6.122 6.428s2.747 6.428 6.122 6.428 6.123-2.884 6.123-6.428-2.747-6.428-6.123-6.428"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M10.021 17.83A7.846 7.846 0 0 1 4.472 4.435a7.848 7.848 0 0 1 11.473 10.677l5.704 5.704a.561.561 0 0 1-.793.793l-5.697-5.697a7.8 7.8 0 0 1-5.138 1.918m0-14.571A6.726 6.726 0 0 0 5.265 14.74a6.73 6.73 0 0 0 9.513-.036 6.724 6.724 0 0 0 0-9.473 6.67 6.67 0 0 0-4.757-1.972"
                />
            </svg>
        );
    }
};

export default IconSearchRegular;
