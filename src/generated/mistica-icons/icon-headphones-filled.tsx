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

const IconHeadphonesFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.008 2C6.756 2 2.48 6.488 2.48 12v6.248c0 2.139 1.463 3.747 3.401 3.747h1.703V14.5H5.88c-.78 0-1.48.265-2.042.713V12c0-4.726 3.662-8.57 8.165-8.57s8.165 3.844 8.165 8.57v3.213a3.22 3.22 0 0 0-2.043-.713h-1.702V22h1.703c1.937 0 3.4-1.613 3.4-3.748V12c.01-5.512-4.267-10-9.519-10"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.008 2C6.756 2 2.48 6.488 2.48 12v6.248c0 2.139 1.463 3.747 3.401 3.747h1.703V14.5H5.88c-.78 0-1.48.265-2.042.713V12c0-4.726 3.662-8.57 8.165-8.57s8.165 3.844 8.165 8.57v3.213a3.22 3.22 0 0 0-2.043-.713h-1.702V22h1.703c1.937 0 3.4-1.613 3.4-3.748V12c.01-5.512-4.267-10-9.519-10"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.882 11.16c-.092-5.804-2.91-9-7.983-9-5.098 0-7.924 3.238-7.975 9.126-1.145.7-1.761 2.003-1.761 3.868 0 2.745 1.327 4.322 3.736 4.432l.275.008h.106c1.941-.067 2.342-1.824 2.342-4.44 0-2.624-.4-4.378-2.305-4.448a2 2 0 0 0-.303 0c-.05 0-.1 0-.115.009a5 5 0 0 0-.711.084c.185-4.883 2.431-7.365 6.711-7.365s6.53 2.474 6.72 7.34c-.157-.017-.308-.054-.476-.062-.05-.009-.1-.009-.134-.009a1.5 1.5 0 0 0-.283 0c-1.947.068-2.342 1.824-2.342 4.449 0 1.714.176 3.05.846 3.792-.869.485-1.913.801-3.135.964-.15-.572-.602-.913-1.288-.93-.88-.025-1.42.468-1.448 1.39-.017.442.092.8.327 1.055.233.255.586.41 1.028.418h.068c.409 0 .742-.12.986-.35.075-.076.126-.18.176-.28 1.88-.197 3.445-.751 4.658-1.636.042.008.067.016.107.016h.126l.274-.008c2.406-.112 3.737-1.69 3.737-4.431 0-1.972-.703-3.337-1.964-3.992"
                />
            </svg>
        );
    }
};

export default IconHeadphonesFilled;
