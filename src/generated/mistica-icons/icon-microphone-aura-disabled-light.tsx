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

const IconMicrophoneAuraDisabledLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M18.52 13.34a.819.819 0 0 0 0 1.635.817.817 0 0 0 0-1.635M14.896 18.877a.957.957 0 1 0 0 1.913.957.957 0 0 0 0-1.913M17.568 16.597a.957.957 0 1 0 0 1.913.957.957 0 0 0 0-1.913M11.566 19.834a.957.957 0 1 0 .001 1.914.957.957 0 0 0 0-1.914M5.382 14.157a.816.816 0 1 0-1.632 0 .816.816 0 0 0 1.632 0M8.19 18.877a.957.957 0 1 0 0 1.913.957.957 0 0 0 0-1.913M19.406 2.322a.28.28 0 0 0-.396.022L4.774 18.024a.273.273 0 0 0 .023.392c.053.047.12.072.188.072a.3.3 0 0 0 .207-.092L19.428 2.713a.273.273 0 0 0-.022-.391M15.357 13.513a3.3 3.3 0 0 1-.99 2.368c-.64.633-1.487.98-2.392.98h-.867a3.38 3.38 0 0 1-2.64-1.252l-.378.416a3.95 3.95 0 0 0 3.018 1.391h.867c2.176 0 3.943-1.746 3.943-3.903V7.408l-.561.619v5.489zM7.752 13.91a3 3 0 0 1-.022-.398V6.161c0-.894.35-1.736.99-2.369a3.37 3.37 0 0 1 2.392-.98h.867a3.38 3.38 0 0 1 3.334 2.774l.458-.505a3.94 3.94 0 0 0-3.79-2.827h-.866c-2.176 0-3.943 1.747-3.943 3.904v7.354c0 .317.04.625.11.92l.473-.523z"
            />
        </svg>
    );
};

export default IconMicrophoneAuraDisabledLight;