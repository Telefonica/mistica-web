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

const IconInternetDeviceLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.036 3.623c2.098.146 3.764 1.924 3.764 4.091 0 2.025-1.445 3.703-3.34 4.041v7.031C18.46 20.56 17.04 22 15.295 22h-6.33C7.218 22 5.8 20.56 5.8 18.786V5.214C5.8 3.44 7.218 2 8.965 2h6.33a3.15 3.15 0 0 1 2.741 1.623M19.5 7.179h1.198a3.05 3.05 0 0 0-1.576-2.162c.216.622.338 1.39.379 2.162m-1.053 1.075h-1.378c.081 1.513.491 2.354.69 2.491.197-.137.607-.978.688-2.491m-.689-3.566c-.198.137-.608.978-.689 2.491h1.378c-.081-1.513-.49-2.358-.689-2.491m-10.552.53v.174h7.216a4.07 4.07 0 0 1 1.99-1.545 1.72 1.72 0 0 0-1.116-.416h-6.33c-.973 0-1.76.804-1.76 1.787m7.612 1.961h1.198c.036-.772.162-1.536.378-2.162a3.04 3.04 0 0 0-1.576 2.162m1.576 3.237c-.216-.626-.342-1.39-.378-2.162h-1.198c.167.941.761 1.737 1.576 2.162m-1.098 10.158c.972 0 1.76-.805 1.76-1.788v-.178h-9.85v.178c0 .988.792 1.788 1.76 1.788zm-8.09-3.036h9.845v-5.783c-1.895-.338-3.34-2.02-3.34-4.04 0-.435.067-.856.193-1.249H7.205zM19.5 8.254c-.041.777-.163 1.54-.379 2.162a3.05 3.05 0 0 0 1.576-2.162z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.8 7.714c0-2.162-1.71-3.917-3.812-3.927C17.476 2.731 16.416 2 15.192 2H8.93C7.203 2 5.8 3.44 5.8 5.214v13.572C5.8 20.56 7.203 22 8.93 22h6.262c1.727 0 3.13-1.44 3.13-3.214v-5.714a.35.35 0 0 0-.347-.357.353.353 0 0 0-.348.357v5.714c0 1.38-1.09 2.5-2.435 2.5H8.93c-1.345 0-2.436-1.12-2.436-2.5v-.356h7.307c.192 0 .348-.16.348-.357a.353.353 0 0 0-.348-.356H6.495V6.288h7.917c-.169.443-.267.923-.267 1.426 0 2.167 1.719 3.927 3.825 3.927 2.107 0 3.83-1.76 3.83-3.927m-.717-.356h-1.55c-.035-1.015-.213-1.998-.53-2.675a3.2 3.2 0 0 1 2.08 2.675m0 .717c-.134 1.244-.966 2.277-2.08 2.675.317-.681.495-1.664.53-2.675zm-2.244-.717H17.11c.062-1.783.574-2.857.864-2.857s.801 1.078.864 2.857M6.495 5.218c0-1.38 1.09-2.5 2.436-2.5h6.26c.856 0 1.608.457 2.045 1.147a3.82 3.82 0 0 0-2.463 1.71H6.495zm8.367 2.857h1.55c.035 1.015.213 1.998.53 2.675a3.22 3.22 0 0 1-2.08-2.675m.005-.717c.133-1.244.966-2.277 2.08-2.675-.317.682-.5 1.664-.53 2.675zm3.972.717c-.063 1.783-.575 2.858-.864 2.858s-.802-1.08-.864-2.858zm-2.258 9.998a.705.705 0 0 0-.695-.713.705.705 0 0 0-.694.713c0 .393.311.713.694.713s.695-.32.695-.713"
                />
            </svg>
        );
    }
};

export default IconInternetDeviceLight;
