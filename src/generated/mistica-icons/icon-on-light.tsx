'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconOnLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M6.257 11.998c0-3.134 1.451-3.798 2.698-3.798 1.238 0 2.748.664 2.748 3.798s-1.476 3.798-2.714 3.798c-1.813 0-2.732-1.28-2.732-3.798m.902.017c0 2.552.975 2.88 1.796 2.88.826 0 1.787-.303 1.787-2.88S9.792 9.11 8.955 9.11c-.835 0-1.796.353-1.796 2.905M17.196 8.331h.3c.162.003.29.14.285.303v6.737a.3.3 0 0 1-.302.302h-.23a.3.3 0 0 1-.255-.14l-3.487-5.283v5.11c0 .17-.14.31-.311.31h-.28a.31.31 0 0 1-.303-.31V8.634c0-.165.135-.303.303-.303h.221c.1 0 .196.048.255.132l3.524 5.289V8.634c0-.157.123-.289.28-.303"
            />
            <path
                fill={fillColor}
                d="M11.496 2.155h.91c1.577.05 9.434.63 9.434 9.843s-7.826 9.843-9.4 9.843h-.877c-8.958-.115-9.41-8.201-9.41-9.843s.452-9.762 9.343-9.843m.09 18.866h.845c2.028 0 8.588-.821 8.588-9.023s-6.563-8.966-8.63-9.022h-.885c-1.97 0-8.532.753-8.532 9.022s6.563 9.022 8.613 9.022"
            />
        </svg>
    );
};

export default IconOnLight;
