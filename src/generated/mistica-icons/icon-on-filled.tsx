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

const IconOnFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M12.401 2.164c1.575.037 9.44.69 9.44 9.86 0 9.177-7.835 9.784-9.403 9.812-.171.003-.364.006-.563.006-.104 0-.213 0-.314-.003-8.952-.129-9.406-8.246-9.406-9.871s.45-9.737 9.339-9.812c.3-.003.63.003.907.008M11.348 12.31c0-3.233-1.532-3.91-2.818-3.91-1.291 0-2.829.677-2.829 3.91 0 3.221 1.538 3.899 2.83 3.899 1.285 0 2.817-.675 2.817-3.9m6.11-3.373a.41.41 0 0 0-.41-.409h-.274a.41.41 0 0 0-.41.41v4.772l-3.313-5a.41.41 0 0 0-.342-.185h-.218a.41.41 0 0 0-.409.41v6.722a.41.41 0 0 0 .409.41h.274a.41.41 0 0 0 .41-.41v-4.765l3.3 4.995a.41.41 0 0 0 .34.185h.228c.23 0 .414-.185.414-.412zm-7.244 3.373c0-2.476-.9-2.796-1.684-2.796-.837 0-1.695.33-1.695 2.796 0 2.445.858 2.776 1.695 2.776.832 0 1.684-.33 1.684-2.776"
            />
        </svg>
    );
};

export default IconOnFilled;
