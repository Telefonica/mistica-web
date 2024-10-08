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

const IconBookmarkRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M15.77 21.533c.265.205.58.308.896.308.224 0 .445-.05.655-.157.51-.252.826-.759.826-1.327V3.637c0-.818-.663-1.482-1.476-1.482h-9.35c-.815 0-1.476.664-1.476 1.479v16.723a1.47 1.47 0 0 0 .824 1.327c.51.252 1.106.194 1.616-.204l3.566-3.546a.21.21 0 0 1 .302-.006zm-2.72-4.504a1.46 1.46 0 0 0-1.043-.431c-.392 0-.767.154-1.05.428L7.45 20.525a.19.19 0 0 1-.218.02.2.2 0 0 1-.118-.188V3.628c0-.114.092-.204.207-.204h9.35a.21.21 0 0 1 .205.21v16.723a.2.2 0 0 1-.118.187c-.042.023-.126.054-.157.034z"
            />
        </svg>
    );
};

export default IconBookmarkRegular;
