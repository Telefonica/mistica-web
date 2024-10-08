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

const IconWinnerFiberQualityLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m17.873 14.69 2.056 3.62c.11.19.091.429-.045.595a.53.53 0 0 1-.567.184l-3.068-.922-.922 3.432a.53.53 0 0 1-.44.392q-.04.005-.073.004a.53.53 0 0 1-.458-.262l-2.378-4.24-2.374 4.23a.53.53 0 0 1-.463.277q-.028.001-.063-.005a.54.54 0 0 1-.45-.396l-.921-3.427-3.023.922a.53.53 0 0 1-.567-.18.55.55 0 0 1-.05-.6l1.997-3.653A7.78 7.78 0 0 1 4.353 9.75C4.353 5.464 7.766 2 11.978 2c4.216 0 7.624 3.469 7.624 7.75 0 1.876-.64 3.597-1.729 4.94m-9.281 2.665.722 2.69 1.452-2.634a7.54 7.54 0 0 1-3.93-1.933l-1.203 2.2 2.292-.701a.54.54 0 0 1 .413.046c.122.074.218.19.254.332M5.774 9.75c0 3.469 2.79 6.306 6.204 6.306 3.408 0 6.204-2.837 6.204-6.306 0-3.464-2.791-6.305-6.204-6.305-3.409 0-6.204 2.836-6.204 6.305m9.848 7.274a.53.53 0 0 1 .409-.046l2.31.696-1.24-2.181a7.54 7.54 0 0 1-4.02 1.932l1.552 2.662.735-2.73a.54.54 0 0 1 .254-.333"
                />
                <path
                    fill={fillColor}
                    d="M14.106 10.833V7.48c.518-.212.885-.729.885-1.333a1.43 1.43 0 0 0-1.416-1.44 1.43 1.43 0 0 0-1.416 1.44c0 .604.368 1.12.885 1.333v3.348h-2.128v-.825c.517-.212.885-.729.885-1.333a1.43 1.43 0 0 0-1.416-1.44 1.43 1.43 0 0 0-1.416 1.44c0 .604.367 1.12.885 1.333v.825a1.25 1.25 0 0 0-1.24 1.26v1.439c0 .3.237.54.532.54s.53-.24.53-.54v-1.435c0-.101.082-.18.178-.18h4.257c.1 0 .177.083.177.18v1.44c0 .3.236.54.53.54.296 0 .532-.24.532-.54v-1.44a1.255 1.255 0 0 0-1.244-1.259m-.53-5.046c.194 0 .353.161.353.36s-.159.36-.354.36a.357.357 0 0 1-.354-.36c0-.199.155-.36.354-.36M10.733 8.67c0 .198-.159.36-.354.36a.357.357 0 0 1-.354-.36c0-.198.159-.36.354-.36s.354.162.354.36"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.62 19.007a.36.36 0 0 1-.375.123l-3.185-.968-.955 3.573a.35.35 0 0 1-.316.263L14.77 22a.35.35 0 0 1-.299-.174l-2.557-4.423-2.418 4.414a.35.35 0 0 1-.303.183q-.02.001-.045-.005a.36.36 0 0 1-.294-.26l-.95-3.573-3.147.964a.34.34 0 0 1-.37-.119.36.36 0 0 1-.031-.397l2.213-4.08a7.55 7.55 0 0 1-1.91-5.032C4.66 5.363 7.943 2 11.981 2s7.323 3.363 7.323 7.498c0 .375-.027.754-.08 1.124a.35.35 0 0 1-.398.302.356.356 0 0 1-.294-.407c.049-.333.075-.676.075-1.019 0-3.737-2.971-6.78-6.621-6.78S5.364 5.76 5.364 9.497s2.967 6.79 6.617 6.79a6.5 6.5 0 0 0 4.685-1.987l.001-.001c.012-.013.117-.127.272-.127.102 0 .187.013.258.118l2.45 4.323a.35.35 0 0 1-.027.393m-.669-6.292a.706.706 0 0 1-.696.713.706.706 0 0 1-.696-.713c0-.393.312-.713.696-.713s.696.32.696.713M7.082 15.06l-1.7 3.135 2.664-.818a.33.33 0 0 1 .268.032c.08.045.142.123.165.22l.82 3.083 2.053-3.742a7.17 7.17 0 0 1-4.27-1.91m11.525 3.13-1.749-3.103a7.17 7.17 0 0 1-4.381 1.892l2.173 3.756.83-3.112a.38.38 0 0 1 .165-.219.34.34 0 0 1 .267-.032zm-4.185-6.187v2.143c0 .197.152.352.344.352s.348-.16.348-.356v-2.143c0-.59-.469-1.07-1.044-1.07h-.174V6.232c.5-.155.87-.63.87-1.192 0-.686-.55-1.248-1.219-1.248S12.33 4.35 12.33 5.04c0 .566.366 1.037.87 1.192v4.702h-2.44V8.731c.5-.156.87-.63.87-1.193 0-.685-.549-1.247-1.218-1.247-.67 0-1.218.557-1.218 1.247 0 .567.366 1.037.87 1.193v2.202h-.174c-.576 0-1.044.48-1.044 1.07v2.142c0 .197.156.357.348.357s.348-.16.348-.357v-2.143c0-.196.156-.356.348-.356h4.185c.192 0 .348.16.348.356m-.87-6.424a.53.53 0 0 1-.522-.535c0-.292.236-.534.522-.534s.522.242.522.534a.53.53 0 0 1-.522.535m-2.62 1.965a.53.53 0 0 1-.521.534.53.53 0 0 1-.522-.534c0-.293.236-.535.522-.535.285 0 .522.242.522.535"
                />
            </svg>
        );
    }
};

export default IconWinnerFiberQualityLight;
