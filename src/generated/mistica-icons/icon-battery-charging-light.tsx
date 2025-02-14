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

const IconBatteryChargingLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M10.928 17.26a.724.724 0 0 0 .98-.26l2.5-4.288a.7.7 0 0 0 .004-.716.7.7 0 0 0-.616-.356h-2.328l1.876-3.208a.71.71 0 0 0-.256-.98.71.71 0 0 0-.98.256l-2.5 4.288a.7.7 0 0 0-.004.716c.124.22.36.356.616.356h2.328l-1.876 3.212a.71.71 0 0 0 .256.98"
                />
                <path
                    fill={fillColor}
                    d="M15.928 22H8.076c-1.18 0-2.144-.96-2.144-2.144V5.928c0-1.18.96-2.144 2.144-2.144h1.068V2h5.716v1.788h1.068c1.18 0 2.144.96 2.144 2.144V19.86c0 1.176-.96 2.14-2.144 2.14M8.076 5.212a.714.714 0 0 0-.712.712v13.928c0 .392.32.712.712.712h7.86c.392 0 .712-.32.712-.712V5.928a.714.714 0 0 0-.712-.712h-2.5V3.428H10.58v1.788H8.076z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.12 16.692a.3.3 0 0 0 .176.048.37.37 0 0 0 .304-.172l2.456-4.212a.351.351 0 0 0-.304-.528h-2.896l2.148-3.684a.35.35 0 0 0-.124-.48.35.35 0 0 0-.48.124L9.944 12a.351.351 0 0 0 .304.528h2.896l-2.148 3.684c-.1.164-.044.38.124.48m2.628 3.908a.7.7 0 1 0 .002 1.402.7.7 0 0 0-.002-1.402"
                />
                <path
                    fill={fillColor}
                    d="M17.62 5.512c0-.972-.792-1.756-1.756-1.756h-1.408V2H9.544v1.752H8.136c-.972 0-1.756.792-1.756 1.756v14.388c0 .972.792 1.756 1.756 1.756h3.508c.192 0 .36-.16.36-.356a.353.353 0 0 0-.352-.352H8.144c-.58 0-1.052-.472-1.052-1.052V5.508c0-.58.472-1.052 1.052-1.052h2.108V2.7h3.508v1.756h2.108c.58 0 1.052.472 1.052 1.052v12.56c-.004.028-.008.048-.008.076V19.9c0 .576-.476 1.048-1.056 1.052a.353.353 0 0 0 0 .704 1.763 1.763 0 0 0 1.756-1.752v-1.676c.004-.028.008-.048.008-.076z"
                />
            </svg>
        );
    }
};

export default IconBatteryChargingLight;
