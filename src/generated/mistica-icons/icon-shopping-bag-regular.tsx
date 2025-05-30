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

const IconShoppingBagRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M11.998 1.81a3.625 3.625 0 0 0-3.625 3.625v1.75H5.4a1.5 1.5 0 0 0-1.496 1.4l-.73 10.934a2.5 2.5 0 0 0 2.495 2.666h12.656a2.5 2.5 0 0 0 2.494-2.666l-.729-10.934a1.5 1.5 0 0 0-1.496-1.4h-2.972v-1.75a3.625 3.625 0 0 0-3.625-3.625m2.375 6.625v2a.625.625 0 1 0 1.25 0v-2h2.972a.25.25 0 0 1 .25.233l.728 10.934a1.25 1.25 0 0 1-1.247 1.333H5.67a1.25 1.25 0 0 1-1.247-1.333l.729-10.934a.25.25 0 0 1 .25-.233h2.97v2a.625.625 0 1 0 1.25 0v-2zm0-1.25h-4.75v-1.75a2.375 2.375 0 0 1 4.75 0z"
            />
        </svg>
    );
};

export default IconShoppingBagRegular;
