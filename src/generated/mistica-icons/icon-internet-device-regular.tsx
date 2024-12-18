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

const IconInternetDeviceRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.036 3.623c2.098.146 3.764 1.924 3.764 4.091 0 2.025-1.445 3.703-3.34 4.041v7.031C18.46 20.56 17.04 22 15.295 22h-6.33C7.218 22 5.8 20.56 5.8 18.786V5.214C5.8 3.44 7.218 2 8.965 2h6.33c1.17 0 2.197.654 2.741 1.623M19.5 7.179h1.198a3.05 3.05 0 0 0-1.576-2.162c.216.622.338 1.39.379 2.162m-1.053 1.075h-1.378c.081 1.513.491 2.354.69 2.491.197-.137.607-.978.688-2.491m-.689-3.566c-.198.137-.608.978-.689 2.491h1.378c-.081-1.513-.49-2.358-.689-2.491m-10.552.53v.174h7.216a4.07 4.07 0 0 1 1.99-1.545 1.72 1.72 0 0 0-1.116-.416h-6.33c-.972 0-1.76.804-1.76 1.787m7.613 1.961h1.197c.036-.772.162-1.536.378-2.162a3.04 3.04 0 0 0-1.575 2.162m1.575 3.237c-.216-.626-.342-1.39-.378-2.162h-1.197c.166.941.76 1.737 1.575 2.162m-1.098 10.158c.972 0 1.76-.805 1.76-1.788v-.178h-9.85v.178c0 .988.792 1.788 1.76 1.788zm-8.09-3.036h9.846v-5.783c-1.896-.338-3.341-2.02-3.341-4.04 0-.435.067-.856.194-1.249h-6.7zM19.5 8.254c-.041.777-.163 1.54-.379 2.162a3.05 3.05 0 0 0 1.576-2.162z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.036 3.623c2.098.146 3.764 1.924 3.764 4.091 0 2.025-1.445 3.703-3.34 4.041v7.031C18.46 20.56 17.04 22 15.295 22h-6.33C7.218 22 5.8 20.56 5.8 18.786V5.214C5.8 3.44 7.218 2 8.965 2h6.33a3.15 3.15 0 0 1 2.741 1.623M19.5 7.179h1.198a3.05 3.05 0 0 0-1.576-2.162c.216.622.338 1.39.379 2.162m-1.053 1.075h-1.378c.081 1.513.491 2.354.69 2.491.197-.137.607-.978.688-2.491m-.689-3.566c-.198.137-.608.978-.689 2.491h1.378c-.081-1.513-.49-2.358-.689-2.491m-10.552.53v.174h7.216a4.07 4.07 0 0 1 1.99-1.545 1.72 1.72 0 0 0-1.116-.416h-6.33c-.973 0-1.76.804-1.76 1.787m7.612 1.961h1.198c.036-.772.162-1.536.378-2.162a3.04 3.04 0 0 0-1.576 2.162m1.576 3.237c-.216-.626-.342-1.39-.378-2.162h-1.198c.167.941.761 1.737 1.576 2.162m-1.098 10.158c.972 0 1.76-.805 1.76-1.788v-.178h-9.85v.178c0 .988.792 1.788 1.76 1.788zm-8.09-3.036h9.845v-5.783c-1.895-.338-3.34-2.02-3.34-4.04 0-.435.067-.856.193-1.249H7.205zM19.5 8.254c-.041.777-.163 1.54-.379 2.162a3.05 3.05 0 0 0 1.576-2.162z"
                />
            </svg>
        );
    }
};

export default IconInternetDeviceRegular;
