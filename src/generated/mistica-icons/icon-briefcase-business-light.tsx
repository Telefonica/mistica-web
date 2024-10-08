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

const IconBriefcaseBusinessLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M22 19.264V8.274a2.23 2.23 0 0 0-2.218-2.236h-3.423C15.894 3.964 14.13 2.5 12.002 2.5c-2.152 0-4.057 1.521-4.541 3.538H4.223A2.233 2.233 0 0 0 2 8.274v10.99C2 20.499 3 21.5 4.223 21.5h15.554A2.233 2.233 0 0 0 22 19.264M17.558 8.646a.743.743 0 0 0-.74.744v8.567c0 .41.332.744.74.744s.74-.334.74-.744V9.39a.743.743 0 0 0-.74-.744m-4.442 3.166c0-.41.332-.744.74-.744s.74.334.74.744v6.146c0 .41-.332.743-.74.743a.743.743 0 0 1-.74-.744zm-2.782 1.86a.743.743 0 0 0-.74.743v3.538c0 .41.332.744.74.744.407 0 .74-.334.74-.744V14.42a.74.74 0 0 0-.74-.749m-2.778 3.17v1.116c0 .41-.332.743-.74.743a.743.743 0 0 1-.74-.744v-1.115a.74.74 0 1 1 1.479 0m1.531-10.99c.493-1.092 1.64-1.864 2.915-1.864 1.238 0 2.29.748 2.75 1.864zM19.782 7.53c.407 0 .739.334.739.744h-.005v10.99c0 .41-.332.744-.74.744H4.224a.743.743 0 0 1-.74-.744V8.274c0-.41.333-.744.74-.744z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.147 5.853h-4.133C15.626 3.893 13.986 2.5 12 2.5c-2.019 0-3.796 1.45-4.199 3.353H3.853A1.86 1.86 0 0 0 2 7.717v11.551c0 1.025.83 1.865 1.853 1.865h11.479a.371.371 0 0 0 0-.744H3.853c-.611 0-1.109-.5-1.109-1.116V7.717c0-.615.498-1.116 1.11-1.116h16.293c.611 0 1.109.501 1.109 1.116v11.551c0 .615-.498 1.116-1.11 1.116h-.369a.371.371 0 0 0 0 .744h.37A1.86 1.86 0 0 0 22 19.263V7.717a1.865 1.865 0 0 0-1.853-1.864m-11.588 0C8.948 4.36 10.384 3.244 12 3.244c1.578 0 2.891 1.073 3.26 2.609zM17.555 21.5c.407 0 .739-.334.739-.744a.743.743 0 0 0-.74-.744.743.743 0 0 0-.739.744c0 .41.332.744.74.744m-10.74-6.004c.228 0 .417.186.417.42v1.487c0 .23-.185.42-.417.42a.416.416 0 0 1-.417-.42v-1.492c0-.23.19-.415.417-.415m3.934-2.003c0-.234-.19-.42-.417-.42a.42.42 0 0 0-.417.42v3.91c0 .234.185.42.417.42s.417-.19.417-.42zm3.104-3.029c.228 0 .417.186.417.42v6.52c0 .228-.185.419-.417.419a.416.416 0 0 1-.417-.42v-6.519c0-.234.185-.42.417-.42m3.284 6.94c0 .233.19.419.418.419s.417-.19.417-.42V8.461a.416.416 0 0 0-.418-.42.42.42 0 0 0-.417.42z"
                />
            </svg>
        );
    }
};

export default IconBriefcaseBusinessLight;
