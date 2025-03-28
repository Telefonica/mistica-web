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

const IconTagDiscountEuroFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.314 2.213a.674.674 0 0 0-.983 0l-1.189 1.242h-8.055c-.191 0-.37.08-.503.224l-7.503 8.167a2.254 2.254 0 0 0 0 3.085l6.146 6.427a2.02 2.02 0 0 0 2.946.01l7.744-7.94a.75.75 0 0 0 .209-.521V4.484l1.188-1.243a.75.75 0 0 0 0-1.028M9 12.363H7.26a.53.53 0 0 1-.52-.545.53.53 0 0 1 .52-.544H9c.29 0 .52.242.52.544a.53.53 0 0 1-.52.544m5.737-.545a.53.53 0 0 1-.521.544h-1.651c.222.736.872 1.27 1.65 1.27.281 0 .553-.069.802-.204a.51.51 0 0 1 .703.233.555.555 0 0 1-.222.735c-.401.219-.833.33-1.287.33-1.357 0-2.487-1.019-2.732-2.364h-.4a.53.53 0 0 1-.521-.544.53.53 0 0 1 .52-.545h.4c.246-1.344 1.376-2.364 2.733-2.364.45 0 .882.112 1.287.33a.56.56 0 0 1 .222.736.516.516 0 0 1-.703.233 1.7 1.7 0 0 0-.801-.205c-.774 0-1.429.54-1.651 1.27h1.65c.29 0 .522.242.522.545"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.314 2.213a.674.674 0 0 0-.983 0l-1.189 1.242h-8.055a.68.68 0 0 0-.503.224l-7.503 8.167a2.254 2.254 0 0 0 0 3.085l6.146 6.427a2.019 2.019 0 0 0 2.946.01l7.744-7.94a.75.75 0 0 0 .209-.521V4.484l1.188-1.243a.75.75 0 0 0 0-1.028M9 12.363H7.26a.53.53 0 0 1-.52-.545.53.53 0 0 1 .52-.544H9c.29 0 .52.242.52.544a.53.53 0 0 1-.52.544m5.736-.545a.53.53 0 0 1-.52.544h-1.651c.222.736.872 1.27 1.65 1.27.281 0 .553-.069.802-.204a.51.51 0 0 1 .703.233.555.555 0 0 1-.223.735c-.4.219-.832.33-1.286.33-1.357 0-2.488-1.019-2.732-2.364h-.4a.53.53 0 0 1-.522-.544.53.53 0 0 1 .521-.545h.4c.245-1.344 1.376-2.364 2.733-2.364q.676.001 1.287.33a.56.56 0 0 1 .222.736.516.516 0 0 1-.703.233 1.7 1.7 0 0 0-.801-.205c-.775 0-1.429.54-1.651 1.27h1.65c.29 0 .521.242.521.545"
                />
            </svg>
        );
    }
};

export default IconTagDiscountEuroFilled;
