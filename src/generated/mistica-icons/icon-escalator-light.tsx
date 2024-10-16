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

const IconEscalatorLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.928 6.494h3.214c1.55 0 2.863 1.316 2.858 2.873a2.87 2.87 0 0 1-.841 2.017c-.494.508-1.23.804-2.017.804H17.3l-8.047 8.408a1.8 1.8 0 0 1-1.18.404H4.858C3.308 21 2 19.707 2 18.179c0-.748.302-1.463.846-2.018a2.84 2.84 0 0 1 2.012-.855h1.664l.114-.118V9.245c0-.692.32-1.298.828-1.698a2.8 2.8 0 0 1-.65-1.792C6.815 4.237 8.018 3 9.495 3s2.68 1.237 2.68 2.755c0 .687-.243 1.312-.65 1.797.513.4.833 1.006.833 1.693v.108l2.172-2.215c.42-.433.877-.644 1.399-.644m-5.18-.739c0-.705-.559-1.283-1.25-1.283-.69 0-1.247.578-1.247 1.283 0 .706.557 1.284 1.243 1.284.69 0 1.253-.578 1.253-1.284M8.071 9.25v4.486l2.858-2.92V9.249c0-.46-.466-.733-.915-.733H8.965c-.43 0-.892.258-.892.733m11.075 1.472c.393 0 .777-.146 1.001-.376.27-.278.425-.635.425-.978 0-.748-.667-1.401-1.426-1.401h-3.215c-.087 0-.196.014-.393.216l-8.422 8.6h-2.26c-.36 0-.754.165-1 .423-.275.278-.426.63-.426.978 0 .734.654 1.355 1.427 1.355h3.21c.132 0 .196-.02.283-.08l8.354-8.737z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M16.112 6.524h3.392c1.376 0 2.5 1.164 2.496 2.598 0 .698-.26 1.349-.736 1.838-.466.49-1.093.76-1.765.76h-1.993l-5.627 5.846h-.146a.365.365 0 0 1-.362-.37c0-.119.05-.223.133-.29l5.71-5.922h2.285c.48 0 .928-.19 1.262-.542.338-.347.526-.812.526-1.31 0-1.026-.805-1.858-1.788-1.858h-3.392c-.27 0-.484.105-.699.328l-8.617 8.953H4.5c-.48 0-.928.19-1.262.541a1.86 1.86 0 0 0-.526 1.31c0 1.027.805 1.858 1.788 1.858h3.332c.233 0 .453-.076.64-.223a.35.35 0 0 1 .498.07.38.38 0 0 1-.068.519c-.306.242-.681.37-1.07.37H4.501C3.12 21 2 19.836 2 18.402c0-.698.26-1.349.736-1.838a2.42 2.42 0 0 1 1.765-.76h1.997l.864-.897V9.122c0-.788.435-1.477 1.07-1.814a2.45 2.45 0 0 1-.891-1.895C7.54 4.083 8.583 3 9.863 3s2.322 1.083 2.322 2.413c0 .77-.352 1.453-.891 1.895a2.05 2.05 0 0 1 1.07 1.814v.589l2.546-2.646c.352-.365.745-.541 1.202-.541m-4.645-1.111c0-.922-.722-1.672-1.609-1.672s-1.604.75-1.604 1.672.717 1.667 1.6 1.671c.891 0 1.613-.75 1.613-1.671M8.075 9.122h-.004v5.044l3.57-3.71V9.123c0-.712-.558-1.297-1.248-1.297h-1.07c-.685 0-1.248.58-1.248 1.297m2.144 10.387c.394 0 .714-.333.714-.741 0-.409-.32-.741-.714-.741s-.713.332-.713.74c0 .41.32.742.713.742"
                />
            </svg>
        );
    }
};

export default IconEscalatorLight;
