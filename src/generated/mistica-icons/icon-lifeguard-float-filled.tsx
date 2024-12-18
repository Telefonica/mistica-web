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

const IconLifeguardFloatFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M11.665 2.155c.255 0 .518.003.745.011 1.93.045 9.431.807 9.431 9.86 0 9.073-7.513 9.776-9.392 9.813q-.451.007-.902.002c-1.975-.03-9.392-.745-9.392-9.874 0-9.117 7.347-9.795 9.325-9.812zM9.63 6.48l-.577-2.784c-2.1.526-4.507 1.924-5.35 5.442l2.75.569C7.06 7.785 8.41 6.889 9.632 6.48m2.283 10.157c.115 0 .23 0 .328-.003 3.969-.07 4.395-3.252 4.395-4.619s-.432-4.555-4.423-4.65a19 19 0 0 0-.418-.005h-.098c-1.622.014-4.339.633-4.339 4.621 0 2.236.818 3.642 2.504 4.297a5.7 5.7 0 0 0 1.883.359zm2.423.86.571 2.773c2.087-.538 4.46-1.922 5.342-5.291l-2.756-.57c-.633 1.813-1.961 2.679-3.157 3.088m-5.25 2.784.575-2.779-.095-.03q-.073-.02-.146-.048c-1.129-.437-2.317-1.317-2.908-3.014l-2.759.569c.888 3.383 3.252 4.767 5.334 5.302m5.84-16.52-.57 2.764c1.212.428 2.549 1.325 3.165 3.185l2.745-.566c-.863-3.404-3.238-4.818-5.34-5.384"
            />
        </svg>
    );
};

export default IconLifeguardFloatFilled;
