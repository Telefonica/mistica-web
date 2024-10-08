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

const IconExitDoorRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M8.751 2v7.679H6.894l.572-.572a.69.69 0 0 0 0-1 .69.69 0 0 0-1 0L4.18 10.393l2.286 2.286a.7.7 0 0 0 .5.214.7.7 0 0 0 .5-.214.69.69 0 0 0 0-1l-.572-.572h6.5a.716.716 0 0 0 .714-.714.716.716 0 0 0-.714-.714H10.18v-6.25h7.214l-2 2a.7.7 0 0 0-.214.5V17h-5v-4.107a.716.716 0 0 0-.714-.714.716.716 0 0 0-.715.714v5.536h6.429v2.857c0 .285.178.535.428.643.108.071.18.071.286.071a.7.7 0 0 0 .5-.214l3.215-3.215a.7.7 0 0 0 .214-.5V2zm9.643 15.786L16.61 19.57V6.214l1.785-1.785z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M8.751 2v7.679H6.894l.572-.572a.69.69 0 0 0 0-1 .69.69 0 0 0-1 0L4.18 10.393l2.286 2.286a.7.7 0 0 0 .5.214.7.7 0 0 0 .5-.214.69.69 0 0 0 0-1l-.572-.572h6.5a.716.716 0 0 0 .714-.714.716.716 0 0 0-.714-.714H10.18v-6.25h7.214l-2 2a.7.7 0 0 0-.214.5V17h-5v-4.107a.716.716 0 0 0-.714-.714.716.716 0 0 0-.715.714v5.536h6.429v2.857c0 .285.178.535.428.643.108.071.18.071.286.071a.7.7 0 0 0 .5-.214l3.215-3.215a.7.7 0 0 0 .214-.5V2zm9.643 15.786L16.61 19.57V6.214l1.785-1.785z"
                />
            </svg>
        );
    }
};

export default IconExitDoorRegular;
