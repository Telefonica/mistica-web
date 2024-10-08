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

const IconCheckedLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m10.633 14.164 6.317-6.15a.726.726 0 0 1 1.03 0 .704.704 0 0 1 0 1.023l-7.38 7.247-3.593-3.721a.7.7 0 0 1 .027-1.023.724.724 0 0 1 1.032.029z"
                />
                <path
                    fill={fillColor}
                    d="M12 2C6.484 2 2 6.484 2 12s4.484 10 10 10 10-4.484 10-10S17.516 2 12 2m0 18.576c-4.728 0-8.576-3.848-8.576-8.576S7.272 3.424 12 3.424 20.576 7.272 20.576 12 16.728 20.576 12 20.576"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.998 2C6.488 2 2 6.488 2 12s4.487 10 9.998 10a9.97 9.97 0 0 0 5.33-1.544.353.353 0 0 0 .113-.496.36.36 0 0 0-.496-.112 9.26 9.26 0 0 1-4.951 1.432c-5.119 0-9.282-4.164-9.282-9.284s4.167-9.288 9.286-9.288 9.282 4.164 9.282 9.284a9.26 9.26 0 0 1-1.432 4.952.36.36 0 0 0 .608.384A9.97 9.97 0 0 0 22 11.996C21.996 6.488 17.513 2 11.998 2"
                />
                <path
                    fill={fillColor}
                    d="m10.928 16-3.834-4.267a.336.336 0 0 1 0-.467.292.292 0 0 1 .44 0l3.394 3.732L17.466 8.1a.292.292 0 0 1 .44 0 .336.336 0 0 1 0 .466zM18.789 19.504a.716.716 0 1 0 0-1.432.716.716 0 0 0 0 1.432"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M10.107 16.73c.053.072.14.116.235.116.09 0 .178-.044.235-.116l6.864-8.872a.3.3 0 0 0-.053-.416.3.3 0 0 0-.417.053l-6.63 8.565-2.652-3.466a.296.296 0 0 0-.416-.057.296.296 0 0 0-.057.417z"
                />
                <path
                    fill={fillColor}
                    d="M11.998 23C4.805 23 1 19.198 1 12.002 1 4.805 4.802 1 11.998 1c3.511 0 6.233.908 8.093 2.703C22.02 5.563 23 8.356 23 12.002 23.003 19.195 19.198 23 11.998 23m0-21.374c-6.88 0-10.372 3.492-10.372 10.376 0 6.88 3.489 10.372 10.372 10.372 6.887 0 10.376-3.489 10.376-10.372.003-6.887-3.489-10.376-10.376-10.376"
                />
            </svg>
        );
    }
};

export default IconCheckedLight;
