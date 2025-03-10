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

const IconMobileEuroRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.165 2H8.849C6.912 2 5.34 3.6 5.34 5.571V18.43C5.34 20.399 6.912 22 8.85 22h6.316c1.936 0 3.508-1.6 3.508-3.571V5.576C18.673 3.605 17.101 2 15.165 2M6.742 17.364V6.646h10.53v10.718zM15.165 3.43c1.042 0 1.905.773 2.075 1.788H6.773c.17-1.015 1.033-1.788 2.076-1.788zm0 17.147H8.849c-1.043 0-1.905-.773-2.076-1.788H17.24c-.17 1.015-1.033 1.788-2.075 1.788m0-5.02a.72.72 0 0 0 .256-.975.69.69 0 0 0-.957-.256 2.6 2.6 0 0 1-1.316.362c-1.209 0-2.224-.837-2.534-1.967h2.704c.387 0 .701-.32.701-.713a.71.71 0 0 0-.7-.713h-2.71c.306-1.134 1.326-1.966 2.534-1.966.458 0 .917.123 1.317.36a.697.697 0 0 0 .961-.26.723.723 0 0 0-.256-.978 4 4 0 0 0-2.017-.554c-1.986 0-3.639 1.468-3.971 3.393h-.418c-.387 0-.701.32-.701.713 0 .394.314.714.7.714h.419c.332 1.925 1.985 3.393 3.97 3.393.706 0 1.402-.192 2.018-.554"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.165 2H8.849C6.911 2 5.34 3.6 5.34 5.571V18.43C5.34 20.399 6.912 22 8.848 22h6.317c1.936 0 3.508-1.6 3.508-3.571V5.576C18.673 3.605 17.101 2 15.165 2M6.742 17.364V6.646h10.53v10.718zM15.165 3.43c1.042 0 1.905.773 2.075 1.788H6.773c.17-1.015 1.033-1.788 2.076-1.788zm0 17.147H8.849c-1.043 0-1.905-.773-2.076-1.788H17.24c-.17 1.015-1.033 1.788-2.075 1.788m0-5.02a.72.72 0 0 0 .256-.975.69.69 0 0 0-.957-.256 2.6 2.6 0 0 1-1.316.362c-1.209 0-2.224-.837-2.534-1.967h2.704c.387 0 .701-.32.701-.713a.71.71 0 0 0-.7-.713h-2.71c.306-1.134 1.326-1.966 2.534-1.966.458 0 .917.123 1.316.36a.697.697 0 0 0 .962-.26.723.723 0 0 0-.256-.978 4 4 0 0 0-2.017-.554c-1.986 0-3.64 1.468-3.972 3.393H8.76c-.387 0-.701.32-.701.713 0 .394.314.714.7.714h.418c.333 1.925 1.986 3.393 3.972 3.393.705 0 1.401-.192 2.017-.554"
                />
            </svg>
        );
    }
};

export default IconMobileEuroRegular;
