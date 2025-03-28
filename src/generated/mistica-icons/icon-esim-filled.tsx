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

const IconEsimFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.01 12.536c-.726 0-1.344.5-1.517 1.18h2.998c-.174-.716-.726-1.18-1.482-1.18"
                />
                <path
                    fill={fillColor}
                    d="m15.077 2.68 3.616 3.64c.413.428.726 1.144.722 1.752V22H4.635L4.6 4.32C4.6 3 5.499 2 6.668 2h6.892c.587 0 1.104.248 1.517.68m-8.235 17h10.342v-9.464c0-.68-.552-1.252-1.208-1.252H8.05c-.656 0-1.208.572-1.208 1.252z"
                />
                <path
                    fill={fillColor}
                    d="M8.046 10.036h7.926c.105 0 .17.072.17.18v8.392h-8.27v-8.392c0-.108.07-.18.174-.18m2.481 4.748h3.55c.275 0 .518-.248.525-.54 0-1.64-1.069-2.784-2.585-2.784-1.412 0-2.586 1.18-2.586 2.644v.216c0 .392.07.716.174 1.036.066.216.17.464.309.644a2.64 2.64 0 0 0 1.93 1.144h.273c.726 0 1.447-.284 1.964-.82a.53.53 0 0 0 0-.752.487.487 0 0 0-.725 0c-.344.356-.895.536-1.412.5a1.56 1.56 0 0 1-1.174-.68 1.1 1.1 0 0 1-.173-.356c-.018-.036-.026-.081-.035-.126s-.017-.09-.035-.126"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.01 12.536c-.726 0-1.344.5-1.517 1.18h2.998c-.173-.716-.725-1.18-1.482-1.18"
                />
                <path
                    fill={fillColor}
                    d="m15.077 2.68 3.616 3.64c.413.428.726 1.144.722 1.752V22H4.635L4.6 4.32C4.6 3 5.5 2 6.668 2h6.893c.586 0 1.103.248 1.516.68m-8.235 17h10.342v-9.464c0-.68-.552-1.252-1.208-1.252H8.05c-.656 0-1.208.572-1.208 1.252z"
                />
                <path
                    fill={fillColor}
                    d="M8.046 10.036h7.927c.104 0 .17.072.17.18v8.392h-8.27v-8.392c0-.108.069-.18.173-.18m2.481 4.748h3.55c.275 0 .518-.248.525-.54 0-1.64-1.068-2.784-2.585-2.784-1.412 0-2.586 1.18-2.586 2.644v.216c0 .392.07.716.174 1.036.066.216.17.464.309.644a2.64 2.64 0 0 0 1.93 1.144h.273c.726 0 1.447-.284 1.965-.82a.53.53 0 0 0 0-.752.487.487 0 0 0-.726 0c-.343.356-.895.536-1.412.5a1.56 1.56 0 0 1-1.174-.68 1.1 1.1 0 0 1-.173-.356.5.5 0 0 1-.035-.126c-.008-.045-.017-.09-.035-.126"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M13.728 14.379c-.201-.756-.841-1.247-1.719-1.247-.837 0-1.558.529-1.76 1.247z"
                />
                <path
                    fill={fillColor}
                    d="M8 19v-8h8v8zm1.009-3.983c.04.414.08.756.201 1.094q.123.34.359.68c.52.68 1.32 1.133 2.238 1.209h.318c.842 0 1.72-.3 2.28-.866a.526.526 0 0 0 0-.795.603.603 0 0 0-.842 0c-.44.377-1.04.605-1.64.529-.559-.038-1.078-.3-1.36-.719a1.8 1.8 0 0 1-.202-.376.5.5 0 0 1-.04-.132.5.5 0 0 0-.04-.134H14.4c.318 0 .6-.266.6-.566C15 13.204 13.76 12 12 12c-1.639 0-3 1.246-3 2.793v.152a.3.3 0 0 1 .009.072"
                />
                <path
                    fill={fillColor}
                    d="M19 20V4a2 2 0 0 0-2-2h-6.793a.5.5 0 0 0-.353.146L5.146 6.854A.5.5 0 0 0 5 7.207V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2m-2.5-10a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5z"
                />
            </svg>
        );
    }
};

export default IconEsimFilled;
