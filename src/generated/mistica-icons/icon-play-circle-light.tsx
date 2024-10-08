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

const IconPlayCircleLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M8.956 16.325a.257.257 0 0 1-.258-.258V7.836a.26.26 0 0 1 .39-.224l7.128 4.115a.26.26 0 0 1 0 .448l-7.132 4.118a.26.26 0 0 1-.128.033m.26-8.039v7.33l6.347-3.663z"
            />
            <path
                fill={fillColor}
                d="M11.998 21.838c-6.435 0-9.838-3.4-9.838-9.838s3.4-9.84 9.838-9.84c3.14 0 5.574.812 7.238 2.417C20.96 6.241 21.838 8.74 21.838 12c.003 6.435-3.4 9.838-9.84 9.838m0-19.118C5.844 2.72 2.72 5.843 2.72 12c0 6.154 3.12 9.278 9.278 9.278 6.16 0 9.28-3.12 9.28-9.278.003-6.16-3.12-9.28-9.28-9.28"
            />
        </svg>
    );
};

export default IconPlayCircleLight;
