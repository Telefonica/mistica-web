'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconHeadphoneBluetoothLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M20.488 14.5c0-.196.155-.356.345-.356s.346.16.35.356v4.108c0 1.932-1.343 3.392-3.119 3.392h-1.385v-6.788h1.385c1 0 1.862.464 2.424 1.212zm-3.118 6.784h.694c1.38 0 2.424-1.148 2.424-2.676s-1.043-2.68-2.424-2.68h-.694zM21.528 12.356c0 .396-.311.716-.695.716a.705.705 0 0 1-.694-.716c0-.395.31-.716.694-.716s.695.32.695.716M3.17 11.644v4.78a2.99 2.99 0 0 1 2.424-1.208h1.389V22H5.598c-1.78 0-3.118-1.456-3.118-3.392l.002-.071.002-.065c-.004-.016-.004-.028-.004-.044v-6.784c0-2.576.97-5 2.738-6.82C6.983 3.004 9.33 2 11.828 2c2.249 0 4.42.836 6.116 2.352a9.73 9.73 0 0 1 3.126 5.816.36.36 0 0 1-.291.408.35.35 0 0 1-.396-.3c-.643-4.308-4.32-7.56-8.556-7.56-4.77 0-8.657 4.004-8.657 8.928m2.424 9.64h.695v-5.36h-.695c-1.38 0-2.424 1.152-2.424 2.68s1.044 2.68 2.424 2.68"
            />
            <path fill={fillColor} d="m12.068 9.908-.004-1.132.55.568z" />
            <path
                fill={fillColor}
                d="M9.341 10.508c0-2.712 1-3.424 2.451-3.424s2.448.712 2.448 3.424-.997 3.424-2.448 3.424c-1.45 0-2.45-.712-2.45-3.424m2.234 2.948 1.722-1.776-1.136-1.172 1.136-1.172-1.722-1.776v2.344l-.946-.976-.341.352 1.186 1.232-1.187 1.224.342.356.946-.976z"
            />
            <path fill={fillColor} d="m12.064 12.244.55-.564-.546-.564z" />
        </svg>
    );
};

export default IconHeadphoneBluetoothLight;
