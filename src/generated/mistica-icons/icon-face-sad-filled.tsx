'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useTheme} from '../../hooks';
import {useIsInverseVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconFaceSadFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^vivo-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.519 0 9.999 4.48 9.999 10s-4.48 10-10 10S2 17.519 2 12 6.48 2 12 2m4.006 6.18a1.336 1.336 0 1 0 0 2.672 1.336 1.336 0 0 0 0-2.671m-8.013 0a1.336 1.336 0 1 0 .001 2.672 1.336 1.336 0 0 0 0-2.671m.36 7.447s.745-1.858 3.662-1.858c2.922 0 3.627 1.846 3.627 1.846a.666.666 0 1 0 1.263-.43s-.86-2.75-4.89-2.75c-3.998 0-4.917 2.737-4.917 2.737a.668.668 0 0 0 1.254.455"
                />
            </svg>
        );
    } else if (skinName.match(/^blau/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.519 0 9.999 4.48 9.999 10s-4.48 10-10 10S2 17.519 2 12 6.48 2 12 2m4.006 6.18a1.336 1.336 0 1 0 0 2.672 1.336 1.336 0 0 0 0-2.671m-8.013 0a1.336 1.336 0 1 0 .001 2.672 1.336 1.336 0 0 0 0-2.671m.36 7.447s.745-1.858 3.662-1.858c2.922 0 3.627 1.846 3.627 1.846a.666.666 0 1 0 1.263-.43s-.86-2.75-4.89-2.75c-3.998 0-4.917 2.737-4.917 2.737a.668.668 0 0 0 1.254.455"
                />
            </svg>
        );
    } else if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.519 0 9.999 4.48 9.999 10s-4.48 10-10 10S2 17.519 2 12 6.48 2 12 2M7.624 9.482a.982.982 0 1 0 1.963.001.982.982 0 0 0-1.963 0m6.696 0a.982.982 0 1 0 1.964.001.982.982 0 0 0-1.964 0m-7.007 6.482a.5.5 0 0 0 .65-.278v.002c.177-.407.485-.773.81-1.068.602-.547 1.609-1.12 3.226-1.12s2.624.573 3.226 1.12c.326.296.633.66.81 1.068v-.001a.5.5 0 0 0 .928-.373 3 3 0 0 0-.252-.472 4.7 4.7 0 0 0-.813-.962c-.773-.703-2.016-1.38-3.899-1.38s-3.126.677-3.899 1.38c-.718.653-1.01 1.302-1.059 1.418a.51.51 0 0 0 .272.666"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2c5.519 0 9.999 4.48 9.999 10s-4.48 10-10 10S2 17.519 2 12 6.48 2 12 2M7.624 9.482a.982.982 0 1 0 1.963.001.982.982 0 0 0-1.963 0m6.696 0a.982.982 0 1 0 1.964.001.982.982 0 0 0-1.964 0m-7.007 6.482a.5.5 0 0 0 .65-.278v.002c.177-.407.485-.773.81-1.068.602-.547 1.609-1.12 3.226-1.12s2.624.573 3.226 1.12c.326.296.633.66.81 1.068v-.001a.5.5 0 0 0 .928-.373 3 3 0 0 0-.252-.472 4.7 4.7 0 0 0-.813-.962c-.773-.703-2.016-1.38-3.899-1.38s-3.126.677-3.899 1.38c-.718.653-1.01 1.302-1.059 1.418a.51.51 0 0 0 .272.666"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.841 12c0-6.705-3.627-9.845-9.846-9.845-6.218 0-9.84 3.14-9.84 9.846s3.622 9.84 9.84 9.84c6.219 0 9.846-3.134 9.846-9.84M5.928 16.05c2.333-2.614 6.003-2.485 6.157-2.48 3.714.04 5.893 2.412 5.986 2.513a.613.613 0 0 1-.457 1.025.6.6 0 0 1-.456-.201l-.003-.003c-.08-.085-1.977-2.073-5.1-2.107h-.03c-.328.001-3.33.004-5.178 2.07a.613.613 0 0 1-.868.05.613.613 0 0 1-.05-.867m3.084-5.502c-.356 0-.653-.112-.86-.322-.201-.207-.305-.493-.305-.846 0-.723.445-1.17 1.165-1.17.717 0 1.165.447 1.165 1.17 0 .353-.103.639-.305.846-.207.21-.504.322-.86.322m6.832-.322c-.207.21-.504.322-.86.322-.358 0-.655-.112-.857-.322-.202-.207-.305-.493-.305-.846 0-.723.445-1.17 1.165-1.17.717 0 1.165.447 1.165 1.17 0 .353-.104.639-.308.846"
                />
            </svg>
        );
    }
};

export default IconFaceSadFilled;