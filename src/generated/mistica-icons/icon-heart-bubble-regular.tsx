'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseOrMediaVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconHeartBubbleRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.841 6.147c0-1.745-1.476-3.165-3.285-3.165H5.44c-1.81 0-3.286 1.42-3.286 3.165v8.748c0 1.353.824 2.51 2.053 2.96v1.673c0 .812.723 1.499 1.583 1.499.66 0 1.076-.353 1.3-.642l1.88-2.325h9.585c1.812 0 3.285-1.417 3.285-3.162zm-1.235 0v8.748c0 1.087-.919 1.97-2.048 1.97H8.67c-.19 0-.37.086-.487.229L6.11 19.66c-.134.173-.246.173-.32.173-.17 0-.346-.151-.346-.302v-2.118a.6.6 0 0 0-.496-.585c-.916-.182-1.558-.975-1.558-1.93V6.147c0-1.087.92-1.972 2.05-1.972h13.116c1.131 0 2.05.885 2.05 1.972M14.39 9.295c-.16.659-.484 1.353-.952 2.065a8.7 8.7 0 0 1-1.224 1.482l-.042.039-.003.005a3 3 0 0 1-.207.185 5 5 0 0 1-.241-.218 8.6 8.6 0 0 1-1.238-1.496c-.474-.711-.796-1.406-.958-2.064-.045-.185-.13-.645.092-.827a.76.76 0 0 1 .434-.143l.056-.002c.23 0 .474.067.706.193.146.076.294.16.482.266.202.112.431.17.664.17.227 0 .45-.052.65-.159l.02-.008.016-.011q.243-.139.46-.255c.232-.126.476-.194.703-.194l.059.003a.76.76 0 0 1 .434.143c.218.182.137.639.09.826m.715-1.733c-.306-.255-.726-.407-1.174-.429a1 1 0 0 1-.115-.008c-.437 0-.885.114-1.305.339-.157.084-.317.173-.49.274a.1.1 0 0 1-.057.014.1.1 0 0 1-.056-.014 26 26 0 0 0-.49-.272 2.8 2.8 0 0 0-1.305-.339l-.058.002-.062.001c-.454.023-.872.174-1.177.429-.527.437-.703 1.151-.49 2.011.193.79.571 1.61 1.12 2.434.44.661.79 1.087 1.39 1.684l.014.013c.073.07.261.25.42.362.148.104.314.174.482.21q.071.014.15.02h.113q.08-.005.151-.02a1.4 1.4 0 0 0 .482-.21 3.5 3.5 0 0 0 .434-.375l.014-.014a10 10 0 0 0 1.376-1.667c.551-.826.927-1.644 1.123-2.434.213-.86.039-1.572-.49-2.011"
            />
        </svg>
    );
};

export default IconHeartBubbleRegular;
