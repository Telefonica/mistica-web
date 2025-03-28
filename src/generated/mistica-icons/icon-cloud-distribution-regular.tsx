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

const IconCloudDistributionRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.763 16.639c.28-.603.87-1.07 1.56-1.07.936 0 1.699.823 1.677 1.787 0 .75-.413 1.326-1.038 1.61v2.321c0 .393-.31.713-.692.713a.703.703 0 0 1-.691-.713v-2.322a1.85 1.85 0 0 1-.834-.891h-4.19a1.77 1.77 0 0 1-.864.891v2.322c0 .393-.31.713-.691.713a.703.703 0 0 1-.692-.713v-2.322a1.85 1.85 0 0 1-.833-.891h-4.19a1.77 1.77 0 0 1-.864.891v2.322c0 .393-.31.713-.692.713a.703.703 0 0 1-.692-.713v-2.322C3.452 18.677 3 18.07 3 17.357c0-.965.798-1.787 1.733-1.787.696 0 1.286.425 1.561 1.069h4.159c.172-.393.483-.713.864-.891v-1.61H7.89c-2.319 0-4.19-1.964-4.19-4.318S5.571 5.537 7.86 5.5c.381-2 2.08-3.5 4.123-3.5 2.008 0 3.742 1.504 4.123 3.5 2.283.033 4.225 1.998 4.225 4.32 0 2.39-1.87 4.319-4.158 4.319h-3.463v1.572c.412.178.692.535.865.928zM5.088 9.819c0 1.573 1.21 2.857 2.771 2.894v.005h8.313c1.56 0 2.806-1.248 2.806-2.857 0-1.536-1.281-2.82-2.806-2.893a4 4 0 0 1-.138.608.676.676 0 0 1-.656.498c-.07 0-.137 0-.208-.037-.382-.105-.586-.498-.484-.89.067-.289.102-.54.102-.823 0-1.61-1.245-2.893-2.806-2.893a2.78 2.78 0 0 0-2.735 2.248c.345.142.66.284.97.498.346.215.417.681.209 1.001a.677.677 0 0 1-.971.215 3.2 3.2 0 0 0-1.144-.43c-.142-.036-.28-.036-.417-.036-1.56 0-2.806 1.284-2.806 2.893"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.763 16.639c.28-.603.87-1.07 1.56-1.07.936 0 1.699.823 1.677 1.787 0 .75-.413 1.326-1.038 1.61v2.321c0 .393-.31.713-.692.713a.703.703 0 0 1-.691-.713v-2.322a1.85 1.85 0 0 1-.834-.891h-4.19a1.77 1.77 0 0 1-.864.891v2.322c0 .393-.31.713-.691.713a.703.703 0 0 1-.692-.713v-2.322a1.85 1.85 0 0 1-.833-.891h-4.19a1.77 1.77 0 0 1-.864.891v2.322c0 .393-.31.713-.692.713a.703.703 0 0 1-.692-.713v-2.322C3.452 18.677 3 18.07 3 17.357c0-.965.798-1.787 1.733-1.787.696 0 1.286.425 1.561 1.069h4.159c.172-.393.483-.713.864-.891v-1.61H7.89c-2.319 0-4.19-1.964-4.19-4.318S5.571 5.537 7.86 5.5c.381-2 2.08-3.5 4.123-3.5 2.008 0 3.742 1.504 4.123 3.5 2.283.033 4.225 1.998 4.225 4.32 0 2.39-1.87 4.319-4.158 4.319h-3.463v1.572c.412.178.692.535.865.928zM5.088 9.819c0 1.573 1.21 2.857 2.771 2.894v.005h8.313c1.56 0 2.806-1.248 2.806-2.857 0-1.536-1.281-2.82-2.806-2.893a4 4 0 0 1-.138.608.676.676 0 0 1-.656.498c-.07 0-.137 0-.208-.037-.382-.105-.586-.498-.484-.89.067-.289.102-.54.102-.823 0-1.61-1.245-2.893-2.806-2.893a2.78 2.78 0 0 0-2.735 2.248c.345.142.66.284.97.498.346.215.417.681.209 1.001a.677.677 0 0 1-.971.215 3.2 3.2 0 0 0-1.144-.43c-.142-.036-.28-.036-.417-.036-1.56 0-2.806 1.284-2.806 2.893"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.056 15.275v1.852c1.28.255 1.77 1.308 1.787 2.227v.182c-.017 1.061-.655 2.302-2.417 2.302s-2.392-1.232-2.4-2.285a1 1 0 0 1-.002-.138l.001-.058c.017-.913.516-1.975 1.788-2.23v-1.232H5.19v1.224c1.28.263 1.778 1.316 1.795 2.238v.182C6.97 20.6 6.322 21.84 4.57 21.84c-1.762 0-2.392-1.232-2.41-2.286v-.195c.026-.914.516-1.967 1.788-2.23l-.008-1.843c0-.163.067-.32.182-.443a.61.61 0 0 1 .44-.182h6.803q-.004-.02-.01-.04a.3.3 0 0 1-.015-.092v-.921l-3.571.017c-1.67 0-3.614-.93-3.614-3.56 0-2 1.082-2.863 1.961-3.233.177-3.446 2.933-4.678 5.308-4.678.664 0 3.919.154 4.983 2.975 1.886.204 3.754 1.39 3.754 4.201 0 3.143-2.345 4.253-4.345 4.253l-3.232.016v.928a.3.3 0 0 1-.016.092l-.01.04h6.877c.34 0 .622.28.622.615m-12.3-2.885 8.054-.042c.938 0 3.106-.294 3.106-3.017 0-2.532-1.88-2.969-2.991-3a.63.63 0 0 1-.591-.453c-.625-2.311-3.157-2.49-3.914-2.49-.955 0-4.07.28-4.07 3.79l.009.089a.61.61 0 0 1-.457.591c-1.014.289-1.504 1.014-1.504 2.205 0 2.033 1.476 2.327 2.359 2.327m-2.02 7.13v-.14c-.007-.494-.223-1.085-1.162-1.085-.946 0-1.154.6-1.17 1.092v.149c.008.706.397 1.067 1.162 1.067s1.154-.37 1.17-1.084m13.69 1.083c.765 0 1.163-.37 1.17-1.084h.004v-.14c-.009-.485-.216-1.059-1.124-1.076l-.02.005q-.01.004-.022.004t-.02-.004a.1.1 0 0 0-.022-.005c-.904.014-1.112.6-1.12 1.084v.149c0 .706.39 1.067 1.154 1.067"
                />
            </svg>
        );
    }
};

export default IconCloudDistributionRegular;
