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

const IconFaceNeutralRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^vivo-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.52 0 10.002 4.48 10.002 10 0 5.518-4.482 10-10.001 10C6.48 22 2 17.517 2 12 2 6.48 6.481 2 12 2m0 1.332c-4.784 0-8.667 3.884-8.667 8.668s3.883 8.666 8.668 8.666c4.783 0 8.667-3.883 8.667-8.666s-3.884-8.668-8.667-8.668M8.005 14.404a.665.665 0 0 1-.67-.663.67.67 0 0 1 .664-.67l7.999-.039a.666.666 0 1 1 .006 1.333zm7.999-5.742a1.334 1.334 0 1 1-.001 2.668 1.334 1.334 0 0 1 .001-2.668m-8.004 0a1.335 1.335 0 1 1-.003 2.67A1.335 1.335 0 0 1 8 8.661"
                />
            </svg>
        );
    } else if (skinName.match(/^blau/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.52 0 10.002 4.481 10.002 10.001C22.002 17.52 17.52 22 12 22 6.48 22 2 17.519 2 12.001 2 6.481 6.481 2 12 2m0 1.333c-4.784 0-8.667 3.883-8.667 8.668 0 4.783 3.883 8.666 8.668 8.666 4.783 0 8.667-3.883 8.667-8.666 0-4.785-3.884-8.668-8.667-8.668M8.005 14.405a.665.665 0 0 1-.67-.663.67.67 0 0 1 .664-.67l7.999-.04a.666.666 0 1 1 .006 1.334zm7.999-5.742a1.334 1.334 0 1 1-.001 2.668 1.334 1.334 0 0 1 .001-2.668m-8.004 0a1.335 1.335 0 1 1-.003 2.669A1.335 1.335 0 0 1 8 8.662"
                />
            </svg>
        );
    } else if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10m0-18.75c-4.825 0-8.75 3.925-8.75 8.75s3.925 8.75 8.75 8.75 8.75-3.925 8.75-8.75S16.825 3.25 12 3.25M8.607 8.5a.982.982 0 1 0-.001 1.963.982.982 0 0 0 .001-1.963m6.697 0a.982.982 0 1 0-.002 1.963.982.982 0 0 0 .002-1.963"
                />
                <path
                    fill={fillColor}
                    d="M7.375 13.875c0-.345.28-.625.625-.625h8a.625.625 0 1 1 0 1.25H8a.625.625 0 0 1-.625-.625"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M22 12.003C22 18.815 18.313 22 11.996 22S2 18.815 2 12.003C2 5.19 5.68 2 11.997 2s10.002 3.19 10.002 10.003M11.996 20.75c5.888 0 8.753-2.862 8.753-8.747 0-5.888-2.862-8.753-8.753-8.753-5.885 0-8.747 2.862-8.747 8.753 0 5.885 2.862 8.747 8.747 8.747m2.163-10.552c-.208-.213-.31-.503-.31-.86 0-.733.455-1.188 1.184-1.188.73 0 1.183.455 1.183 1.189 0 .359-.105.65-.313.86-.207.213-.51.327-.87.327-.362 0-.664-.114-.874-.328m-5.194.328c-.36 0-.663-.114-.874-.328-.207-.21-.31-.5-.31-.86 0-.733.456-1.188 1.184-1.188.732 0 1.184.455 1.184 1.189 0 .359-.106.65-.31.86-.21.213-.512.327-.874.327M7.6 14.206a.572.572 0 0 1 0-1.143l9.047-.007a.572.572 0 1 1 0 1.143z"
                />
            </svg>
        );
    }
};

export default IconFaceNeutralRegular;
