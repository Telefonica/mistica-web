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

const IconWinnerPoundFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.979 2c-4.117 0-7.45 3.389-7.45 7.568s3.337 7.569 7.453 7.569c4.117 0 7.454-3.389 7.454-7.569S16.1 2 11.98 2m1.952 10.989H9.672a.55.55 0 0 1-.531-.54c0-.287.248-.539.531-.539s.532-.288.532-.54V9.929h-.532c-.283 0-.46-.252-.46-.54 0-.287.177-.539.46-.539h.532V7.407c0-1.155.783-1.982 1.916-1.982.354 0 .85.036 1.315.467.212.216.247.54.035.755-.213.216-.531.252-.744.036-.106-.108-.283-.18-.606-.18-.531 0-.85.36-.85.904v1.446h1.42c.284 0 .532.216.532.54 0 .323-.248.54-.531.54h-1.42v1.474c0 .153-.053.28-.112.427l-.03.076h2.802c.283 0 .53.252.53.54 0 .287-.247.539-.53.539M5.662 15.37l-1.598 2.954c-.106.18-.07.431.036.615.141.18.354.252.566.18l3.015-.935.92 3.42a.58.58 0 0 0 .461.396h.071a.55.55 0 0 0 .46-.288l1.953-3.532c-2.334-.108-4.392-1.155-5.884-2.81M18.264 15.37c-1.492 1.659-3.621 2.738-5.963 2.814l2.058 3.532c.107.18.284.252.46.252h.072c.212-.036.39-.18.425-.396l.92-3.42 3.086.935a.5.5 0 0 0 .567-.18c.142-.18.142-.395.035-.615z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.979 2c-4.117 0-7.45 3.389-7.45 7.568s3.337 7.569 7.453 7.569c4.117 0 7.454-3.389 7.454-7.569S16.1 2 11.98 2m1.952 10.989H9.672a.55.55 0 0 1-.531-.54c0-.287.248-.539.531-.539s.532-.288.532-.54V9.929h-.532c-.283 0-.46-.252-.46-.54 0-.287.177-.539.46-.539h.532V7.407c0-1.155.783-1.982 1.916-1.982.354 0 .85.036 1.315.467.212.216.247.54.035.755-.213.216-.531.252-.744.036-.106-.108-.283-.18-.606-.18-.531 0-.85.36-.85.904v1.446h1.42c.284 0 .532.216.532.54 0 .323-.248.54-.531.54h-1.42v1.474c0 .153-.053.28-.112.427l-.03.076h2.802c.283 0 .53.252.53.54 0 .287-.247.539-.53.539M5.662 15.37l-1.598 2.954c-.106.18-.07.431.036.615.141.18.354.252.566.18l3.015-.935.92 3.42a.58.58 0 0 0 .461.396h.071a.55.55 0 0 0 .46-.288l1.953-3.532c-2.334-.108-4.392-1.155-5.884-2.81M18.264 15.37c-1.492 1.659-3.621 2.738-5.963 2.814l2.058 3.532c.107.18.284.252.46.252h.072c.212-.036.39-.18.425-.396l.92-3.42 3.086.935a.5.5 0 0 0 .567-.18c.142-.18.142-.395.035-.615z"
                />
            </svg>
        );
    }
};

export default IconWinnerPoundFilled;
