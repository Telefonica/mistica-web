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

const IconMobileUsageFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M14.435 5.387H5.309A3.576 3.576 0 0 1 8.878 2h6.44c1.247 0 2.346.645 2.983 1.614l-.06-.003-.06-.002a4.81 4.81 0 0 0-3.747 1.778M8.878 22h6.44a3.576 3.576 0 0 0 3.57-3.387H5.308A3.58 3.58 0 0 0 8.878 22m4.47-13.577a4.83 4.83 0 0 0 4.834 4.823c.242 0 .48-.023.719-.06v4.348H5.3V6.453h8.475a4.8 4.8 0 0 0-.426 1.97m8.952.004a4.115 4.115 0 0 1-4.114 4.106c-2.267 0-4.118-1.843-4.118-4.106a4.12 4.12 0 0 1 4.114-4.11 4.12 4.12 0 0 1 4.118 4.11m-2.382-2.491a3 3 0 0 0-1.2-.494v1.692zm-1.736 5.527c.646 0 1.241-.201 1.736-.544l-2.116-2.112a.53.53 0 0 1-.156-.38V5.442a3.044 3.044 0 0 0-2.506 2.985 3.043 3.043 0 0 0 3.042 3.036m2.496-4.768-1.736 1.732 1.736 1.733a3 3 0 0 0 .546-1.733c0-.644-.202-1.238-.546-1.732"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M14.435 5.387H5.309A3.576 3.576 0 0 1 8.878 2h6.44c1.247 0 2.346.645 2.983 1.614l-.06-.003-.06-.002a4.81 4.81 0 0 0-3.747 1.778M8.878 22h6.44a3.576 3.576 0 0 0 3.57-3.387H5.308A3.58 3.58 0 0 0 8.878 22m4.47-13.577a4.83 4.83 0 0 0 4.834 4.823c.242 0 .48-.023.719-.06v4.348H5.3V6.453h8.475a4.8 4.8 0 0 0-.426 1.97m8.952.004a4.115 4.115 0 0 1-4.114 4.106c-2.267 0-4.118-1.843-4.118-4.106a4.12 4.12 0 0 1 4.114-4.11 4.12 4.12 0 0 1 4.118 4.11m-2.382-2.491a3 3 0 0 0-1.2-.494v1.692zm-1.736 5.527c.646 0 1.241-.201 1.736-.544l-2.116-2.112a.53.53 0 0 1-.156-.38V5.442a3.044 3.044 0 0 0-2.506 2.985 3.043 3.043 0 0 0 3.042 3.036m2.496-4.768-1.736 1.732 1.736 1.733a3 3 0 0 0 .546-1.733c0-.644-.202-1.238-.546-1.732"
                />
            </svg>
        );
    }
};

export default IconMobileUsageFilled;
