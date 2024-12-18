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

const IconMobileCoverageFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M8.847 2C6.975 2 5.443 3.504 5.35 5.388h13.31C18.566 3.504 17.035 2 15.162 2zM5.34 6.458v11.084h13.333V6.458zm3.363 9.067a.53.53 0 0 1-.525.535.53.53 0 0 1-.525-.535v-1.051c0-.297.233-.535.525-.535s.525.238.525.535zm2.04.535a.53.53 0 0 1-.526-.534v-2.817c0-.297.233-.535.525-.535s.526.238.526.535v2.816a.53.53 0 0 1-.526.535m3.085-.535a.53.53 0 0 1-.526.535.53.53 0 0 1-.525-.535V10.56c0-.298.233-.535.525-.535s.526.237.526.535zm1.508.005V8.41c0-.297.234-.534.526-.534s.525.237.525.535v7.119a.53.53 0 0 1-.525.535.53.53 0 0 1-.526-.535m3.324 3.082C18.565 20.496 17.034 22 15.16 22H8.847c-1.872 0-3.404-1.504-3.498-3.388z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M8.847 2C6.975 2 5.443 3.504 5.35 5.388h13.31C18.567 3.504 17.035 2 15.163 2zM5.34 6.458v11.084h13.333V6.458zm3.364 9.067a.53.53 0 0 1-.526.535.53.53 0 0 1-.525-.535v-1.051c0-.297.233-.535.525-.535s.526.238.526.535zm2.038.535a.53.53 0 0 1-.525-.534v-2.817c0-.297.234-.535.525-.535s.526.238.526.535v2.816a.53.53 0 0 1-.526.535m3.086-.535a.53.53 0 0 1-.526.535.53.53 0 0 1-.525-.535V10.56c0-.298.233-.535.525-.535s.526.237.526.535zm1.509.005V8.41c0-.297.233-.534.525-.534s.525.237.525.535v7.119a.53.53 0 0 1-.525.535.53.53 0 0 1-.525-.535m3.323 3.082C18.565 20.496 17.034 22 15.162 22H8.846c-1.872 0-3.404-1.504-3.498-3.388z"
                />
            </svg>
        );
    }
};

export default IconMobileCoverageFilled;
