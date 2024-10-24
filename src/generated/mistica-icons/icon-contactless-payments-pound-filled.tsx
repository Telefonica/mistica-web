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

const IconContactlessPaymentsPoundFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M7.994 2c-1.882 0-3.42 1.504-3.515 3.388h13.372C17.756 3.504 16.218 2 14.337 2zm0 20c-1.882 0-3.42-1.504-3.515-3.388h13.372C17.756 20.496 16.218 22 14.337 22zm13.687-5.318a6.75 6.75 0 0 0-.117-9.378.7.7 0 0 0-.997 0 .72.72 0 0 0 0 1.01 5.31 5.31 0 0 1 .09 7.385.72.72 0 0 0 .027 1.01.7.7 0 0 0 .487.197c.185 0 .37-.078.51-.224m-1.777-7.7a4.38 4.38 0 0 1 .126 6.013.68.68 0 0 1-.519.233.7.7 0 0 1-.478-.187.726.726 0 0 1-.04-1.01 2.947 2.947 0 0 0-.086-4.038.72.72 0 0 1 0-1.01.7.7 0 0 1 .997 0m-2.04-2.524v11.084H4.47V6.458zm-4.407 8.4h-2.91q.09-.255.09-.535v-1.61h1.588a.53.53 0 0 0 .528-.535.53.53 0 0 0-.528-.535h-1.588v-1.426c0-.59.474-1.07 1.056-1.07.244 0 .474.082.663.237.226.188.56.151.745-.077a.54.54 0 0 0-.077-.755 2.1 2.1 0 0 0-1.331-.475c-1.164 0-2.116.96-2.116 2.144v1.427h-.176a.53.53 0 0 0-.528.535.53.53 0 0 0 .528.535h.176v1.61c0 .301-.23.534-.528.534a.53.53 0 0 0-.528.535.53.53 0 0 0 .528.535h4.408a.536.536 0 0 0 .528-.54.53.53 0 0 0-.528-.534"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M7.994 2c-1.882 0-3.42 1.504-3.515 3.388h13.372C17.756 3.504 16.218 2 14.337 2zm0 20c-1.882 0-3.42-1.504-3.515-3.388h13.372C17.756 20.496 16.218 22 14.337 22zm13.687-5.318a6.75 6.75 0 0 0-.117-9.378.7.7 0 0 0-.997 0 .72.72 0 0 0 0 1.01 5.31 5.31 0 0 1 .09 7.385.72.72 0 0 0 .027 1.01.7.7 0 0 0 .487.197c.185 0 .37-.078.51-.224m-1.777-7.7a4.38 4.38 0 0 1 .126 6.013.68.68 0 0 1-.519.233.7.7 0 0 1-.478-.187.726.726 0 0 1-.04-1.01 2.947 2.947 0 0 0-.086-4.038.72.72 0 0 1 0-1.01.7.7 0 0 1 .997 0m-2.04-2.524v11.084H4.47V6.458zm-4.407 8.4h-2.91q.09-.255.09-.535v-1.61h1.588a.53.53 0 0 0 .528-.535.53.53 0 0 0-.528-.535h-1.588v-1.426c0-.59.474-1.07 1.056-1.07.244 0 .474.082.663.237.226.188.56.151.745-.077a.54.54 0 0 0-.077-.755 2.1 2.1 0 0 0-1.331-.475c-1.164 0-2.116.96-2.116 2.144v1.427h-.176a.53.53 0 0 0-.528.535.53.53 0 0 0 .528.535h.176v1.61c0 .301-.23.534-.528.534a.53.53 0 0 0-.528.535.53.53 0 0 0 .528.535h4.408a.536.536 0 0 0 .528-.54.53.53 0 0 0-.528-.534"
                />
            </svg>
        );
    }
};

export default IconContactlessPaymentsPoundFilled;
