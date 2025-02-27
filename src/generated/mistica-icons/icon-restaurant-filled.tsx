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

const IconRestaurantFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M13.555 4.856C13.555 3.28 14.79 2 16.315 2c.38 0 .69.32.685.718v18.564c0 .393-.31.713-.69.713a.7.7 0 0 1-.688-.713v-8.569h-1.378c-.38 0-.69-.32-.69-.713zm-1.038 3.575V3.074a.706.706 0 0 0-.694-.713c-.38 0-.689.32-.689.713v5.357a.704.704 0 0 1-.68.713v-6.07a.7.7 0 0 0-.689-.713c-.38 0-.689.32-.689.713v6.07h-.009a.7.7 0 0 1-.689-.713V3.074a.7.7 0 0 0-.689-.713c-.38 0-.689.32-.689.713v5.357c0 1.183.932 2.143 2.072 2.143h.008v10.713c0 .393.31.713.69.713s.689-.32.689-.713V10.574c1.135-.01 2.058-.964 2.058-2.143"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M13.555 4.856C13.555 3.28 14.79 2 16.315 2c.38 0 .69.32.685.718v18.564c0 .393-.31.713-.69.713a.7.7 0 0 1-.688-.713v-8.569h-1.378c-.38 0-.69-.32-.69-.713zm-1.038 3.575V3.074a.706.706 0 0 0-.694-.713c-.38 0-.689.32-.689.713v5.357a.704.704 0 0 1-.68.713v-6.07a.7.7 0 0 0-.689-.713c-.38 0-.689.32-.689.713v6.07h-.009a.7.7 0 0 1-.689-.713V3.074a.7.7 0 0 0-.689-.713c-.38 0-.689.32-.689.713v5.357c0 1.183.932 2.143 2.072 2.143h.008v10.713c0 .393.31.713.69.713s.689-.32.689-.713V10.574c1.135-.01 2.058-.964 2.058-2.143"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M10.749 2.76a.6.6 0 0 0-.594-.602.6.6 0 0 0-.597.602l-.005 4.532H8.63V2.757a.6.6 0 0 0-.594-.602.6.6 0 0 0-.594.602v4.535h-.82V2.757a.58.58 0 0 0-.594-.582c-.328 0-.594.288-.594.619v7.358c0 .614.359 1.073.835 1.073l.386-.003a467 467 0 0 0-1.028 8.11c0 1.826 1.283 2.495 2.373 2.51H8.2c1.098-.02 2.375-.687 2.372-2.558l-.008-.085c-.064-.627-.469-4.595-.95-7.971h.3c.476 0 .835-.46.835-1.073zm7.812 16.565c-.012-.116-.283-2.854-.65-5.739a.58.58 0 0 0 .171-.423V2.78a.6.6 0 0 0-.594-.603c-2.129 0-3.862 1.754-3.862 3.91v7.076c0 .334.266.603.593.603h.185a441 441 0 0 0-.694 5.613c0 1.796 1.257 2.448 2.336 2.462h.187c1.076-.022 2.33-.678 2.328-2.512z"
                />
            </svg>
        );
    }
};

export default IconRestaurantFilled;
