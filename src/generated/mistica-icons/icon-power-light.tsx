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

const IconPowerLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.215 12.668c0 .416.35.761.777.761a.773.773 0 0 0 .776-.761V2.762A.773.773 0 0 0 11.992 2a.773.773 0 0 0-.777.762z"
                />
                <path
                    fill={fillColor}
                    d="M2.47 12.668C2.47 17.81 6.748 22 11.992 22c5.247 0 9.522-4.193 9.526-9.332 0-4.037-2.645-7.621-6.57-8.876-.388-.116-.857.112-.973.493-.115.38.116.842.504.954 3.268 1.066 5.482 4.037 5.482 7.429 0 4.305-3.575 7.809-7.97 7.809-4.393 0-7.968-3.504-7.968-7.81 0-3.391 2.218-6.366 5.486-7.428.426-.116.618-.573.503-.954-.115-.417-.584-.605-.972-.493-3.93 1.255-6.57 4.835-6.57 8.876"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.003 13.047c-.223 0-.37-.152-.37-.38V2.38c0-.228.148-.38.37-.38s.37.152.37.38v10.287c0 .228-.148.38-.37.38M18.681 19.141c0 .42-.332.76-.741.76a.75.75 0 0 1-.741-.76c0-.42.332-.76.741-.76.41 0 .741.34.741.76M19.387 17.808c-.074 0-.148 0-.187-.076-.187-.112-.222-.345-.11-.533a8.9 8.9 0 0 0 1.265-4.532c0-3.884-2.563-7.312-6.238-8.305-.187-.036-.296-.228-.261-.456.035-.192.261-.344.444-.268 4.007 1.073 6.792 4.804 6.792 9.033a9.66 9.66 0 0 1-1.373 4.953.44.44 0 0 1-.332.184"
                />
                <path
                    fill={fillColor}
                    d="M12.003 22c-5.009 0-9.093-4.188-9.093-9.333 0-4.229 2.781-7.96 6.752-9.03a.43.43 0 0 1 .484.269c.035.192-.074.416-.261.456-3.67.99-6.234 4.42-6.234 8.305 0 4.724 3.749 8.572 8.352 8.572 1.408 0 2.781-.344 3.97-1.029.188-.112.407-.036.52.152.109.193.035.417-.148.533A9.1 9.1 0 0 1 12.003 22"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 18.042c-1.921 0-3.417-.501-4.44-1.487C6.5 15.53 5.959 13.998 5.959 12c0-1.664.376-3.01 1.115-4.005.726-.972 1.793-1.605 3.18-1.88a.28.28 0 0 1 .33.221.28.28 0 0 1-.221.331c-2.55.507-3.843 2.303-3.843 5.336 0 3.639 1.843 5.482 5.481 5.482s5.485-1.843 5.485-5.482c0-3.073-1.33-4.877-3.95-5.356a.28.28 0 0 1 .101-.549c1.42.26 2.518.886 3.264 1.86.761.998 1.148 2.359 1.148 4.048 0 1.997-.54 3.53-1.602 4.555-1.028.98-2.524 1.481-4.446 1.481"
                />
                <path
                    fill={fillColor}
                    d="M11.72 8.967c0 .154.126.28.28.28s.28-.126.28-.28V4.869a.28.28 0 0 0-.28-.28.28.28 0 0 0-.28.28z"
                />
                <path
                    fill={fillColor}
                    d="M2.16 12c0 6.437 3.403 9.838 9.838 9.838 6.44 0 9.843-3.404 9.84-9.838 0-3.26-.877-5.759-2.602-7.423-1.664-1.605-4.098-2.417-7.238-2.417C5.56 2.16 2.16 5.563 2.16 12m.56 0c0-6.156 3.124-9.28 9.278-9.28 6.16 0 9.283 3.12 9.28 9.28 0 6.157-3.12 9.278-9.28 9.278-6.157 0-9.278-3.124-9.278-9.278"
                />
            </svg>
        );
    }
};

export default IconPowerLight;
