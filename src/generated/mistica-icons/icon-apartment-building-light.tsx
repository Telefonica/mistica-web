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

const IconApartmentBuildingLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M5.348 2h13.297c.4 0 .717.326.722.73V22h-9.345v-5.454H8.223v5.45H4.63V2.725c0-.4.322-.726.718-.726m6.11 18.544h6.469V3.456H6.066v17.088h.717V15.09h4.675zm-4.675-7.455h4.675V9.818H6.783zm3.594-2.178V12H7.86v-1.089zm2.157 2.178h4.675V9.818h-4.675zm3.594-2.178V12H13.61v-1.089zm-3.594 7.45h4.675V15.09h-4.675zm3.594-2.182v1.089H13.61v-1.09zM6.783 8.003h4.675V4.727H6.783zm3.594-2.183v1.09H7.86V5.82zm2.157 2.183h4.675V4.727h-4.675zm3.594-2.183v1.09H13.61V5.82z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.283 22c.198 0 .358-.17.358-.377a.37.37 0 0 0-.358-.377h-7.18v-5.661h-4.31v5.661H5.717V2.754h12.208v14.343c0 .207.16.376.358.376s.358-.169.358-.376V2.377A.37.37 0 0 0 18.284 2H5.358A.37.37 0 0 0 5 2.377V22h2.514v-5.662h2.873V22zm-.717-2.642c0-.416.322-.754.717-.754.4 0 .717.338.717.754 0 .415-.322.753-.717.753s-.717-.338-.717-.753M6.793 9.923h4.31v3.019h-4.31zm3.59 2.265v-1.507H7.51v1.507zm6.466.754h-4.311v-3.02h4.311zm-3.59-2.26v1.506h2.873v-1.507zm-.721 4.903h4.311v3.019h-4.311zm3.59 2.265v-1.507h-2.873v1.507zM11.103 7.657H6.793V4.643h4.31zm-3.59-2.26v1.506h2.873V5.396zm9.335 2.26h-4.311V4.643h4.311zm-3.59-2.26v1.506h2.873V5.396z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.387 3.356v17.28c0 .639-.569 1.201-1.216 1.201H5.841c-.647 0-1.216-.562-1.216-1.201V3.353c-.003-.628.577-1.202 1.213-1.202h12.33c.636 0 1.219.574 1.219 1.205m-.812 17.28V3.356c0-.177-.219-.384-.407-.384H5.838c-.185 0-.406.207-.406.38v17.281c0 .188.204.384.406.384h4.05V16.33c0-.227.182-.41.406-.41h3.42c.225 0 .407.185.407.41v4.686h4.05c.2 0 .404-.194.404-.381m-7.874.353h2.608v-4.25H10.7zm-.39-13.622H8.533V5.57h1.778zm.813-2.207a.41.41 0 0 0-.407-.41h-2.59a.407.407 0 0 0-.407.41v2.616c0 .224.182.409.406.409h2.591a.407.407 0 0 0 .407-.41zm2.529 2.207V5.57h1.779v1.796zm2.588-2.207a.41.41 0 0 0-.406-.41h-2.588a.405.405 0 0 0-.406.41v2.616c0 .224.182.409.406.409h2.588a.405.405 0 0 0 .406-.41zm-7.706 7.344V10.71h1.78v1.795zm2.589-2.207a.407.407 0 0 0-.407-.41h-2.59a.407.407 0 0 0-.407.41v2.616c0 .224.182.41.406.41h2.591a.407.407 0 0 0 .407-.41zm2.529 2.207V10.71h1.779v1.795zm2.588-2.207a.407.407 0 0 0-.406-.41l-2.588-.002a.405.405 0 0 0-.406.41v2.618c0 .227.182.41.406.41h2.588a.405.405 0 0 0 .406-.41z"
                />
            </svg>
        );
    }
};

export default IconApartmentBuildingLight;
