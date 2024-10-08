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

const IconLaptopCheckFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.213 6.942c0-.795-.644-1.442-1.426-1.442H5.217a1.44 1.44 0 0 0-1.425 1.442v7.947h16.426V6.942zM2 15.972v.36c0 1.192.964 2.168 2.144 2.168h15.713c1.179 0 2.143-.976 2.143-2.168v-.36zm9.109-2.853-2.18-2.205a.527.527 0 0 1 0-.759.51.51 0 0 1 .75 0l1.393 1.41 3.894-3.938a.51.51 0 0 1 .75 0 .58.58 0 0 1 .068.795z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.213 6.942c0-.795-.644-1.442-1.426-1.442H5.217a1.44 1.44 0 0 0-1.425 1.442v7.947h16.426V6.942zM2 15.972v.36c0 1.192.964 2.168 2.144 2.168h15.713c1.179 0 2.143-.976 2.143-2.168v-.36zm9.109-2.853-2.18-2.205a.527.527 0 0 1 0-.759.51.51 0 0 1 .75 0l1.393 1.41 3.894-3.938a.51.51 0 0 1 .75 0 .58.58 0 0 1 .068.795z"
                />
            </svg>
        );
    }
};

export default IconLaptopCheckFilled;
