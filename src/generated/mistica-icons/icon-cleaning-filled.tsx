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

const IconCleaningFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.127 5.336V2h-6.59c-.22 0-.402.112-.548.26l-2.38 2.776a.75.75 0 0 0-.11.776c.11.26.367.444.656.444h1.28v2.036H6.87v11.484C6.87 21 7.858 22 9.068 22h5.126c1.21 0 2.197-1 2.197-2.224V8.296h-2.565v-1.52l.479.776c.146.224.367.372.62.372a.6.6 0 0 0 .368-.112c.332-.224.478-.664.257-1l-.878-1.484h.62z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.127 5.336V2h-6.59c-.22 0-.402.112-.548.26l-2.38 2.776a.75.75 0 0 0-.11.776c.11.26.367.444.656.444h1.28v2.036H6.87v11.484C6.87 21 7.858 22 9.068 22h5.126c1.21 0 2.197-1 2.197-2.224V8.296h-2.565v-1.52l.479.776c.146.224.367.372.62.372a.6.6 0 0 0 .368-.112c.332-.224.478-.664.257-1l-.878-1.484h.62z"
                />
            </svg>
        );
    }
};

export default IconCleaningFilled;
