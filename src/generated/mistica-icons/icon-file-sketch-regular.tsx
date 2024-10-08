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

const IconFileSketchRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M19.342 7.92q.046.112.045.234V20.46a1.4 1.4 0 0 1-1.386 1.383H6.009c-.74 0-1.386-.647-1.386-1.383V3.54c0-.722.66-1.38 1.386-1.38h7.3c.227 0 .442.087.605.246l5.213 5.127a.9.9 0 0 1 .215.386m-1.148 12.542V9.028h-2.277c-1 0-1.86-.33-2.493-.952-.639-.63-.978-1.487-.978-2.482V3.376H6.01c-.07 0-.185.112-.19.168v16.918c0 .06.098.169.19.169h11.994c.099 0 .19-.096.19-.169M13.639 3.83v1.765c0 .658.213 1.213.617 1.608.406.398.98.61 1.663.61h1.77zm1.992 9.05h-.838l.34-.988zm-1.17.97h1.016l-1.941 2.714zm-5.92 0h1.05l.942 2.76zm1.558-1.473s-.42-1.227-.418-1.23h1.381zm4.277-1.227-.423 1.232-.977-1.232zm-3.448 1.73 1.09-1.388 1.1 1.389zm-.325.97h2.846l-1.423 4.165zm-1.686-1.975.341 1.006h-.865zm7.977 1.49a.5.5 0 0 0-.052-.212q.002-.004-.007-.009l-1.364-2.692-.002-.01-.009-.01-.003-.002a.5.5 0 0 0-.14-.157l-.028-.017-.053-.032a.1.1 0 0 0-.03-.018c-.04-.015-.075-.017-.111-.019h-.019q-.008-.001-.015-.005-.008-.004-.015-.004h-6.04q-.009.001-.018.005-.006.005-.013.006l-.02.001a.4.4 0 0 0-.106.016l-.026.017-.027.016a.46.46 0 0 0-.193.18l-.01.009q-.006.004-.01.01L7.174 13.14l-.001.009-.001.008a.5.5 0 0 0-.05.218l.002.012q0 .015.006.03l.005.02a.4.4 0 0 0 .065.18l.004.015a.04.04 0 0 0 .007.02l4.426 6.135h.002q.06.08.149.13l.042.019c.059.03.126.045.193.047h.003a.5.5 0 0 0 .193-.047l.042-.02a.44.44 0 0 0 .149-.129q.001 0 .002-.002l4.39-6.135q.005-.008.007-.018a.1.1 0 0 1 .007-.018.5.5 0 0 0 .061-.174l.006-.023a.1.1 0 0 0 .006-.033q.004-.012.005-.02"
            />
        </svg>
    );
};

export default IconFileSketchRegular;
