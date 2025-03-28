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

const IconShowerLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M20.583 11.408c.703.068 1.255.65 1.255 1.365 0 .532-.309.988-.748 1.207l.002 2.8c0 2.32-2.358 4.16-4.644 4.497a.86.86 0 0 1-.801.563.86.86 0 0 1-.779-.505H9.022a.848.848 0 0 1-1.58-.073c-2.254-.372-4.546-2.195-4.546-4.478v-2.745q0-.015.006-.03l.006-.02a1.37 1.37 0 0 1-.757-1.222c0-.762.622-1.378 1.39-1.378h.607V5.025c0-1.583 1.297-2.869 2.894-2.869A2.895 2.895 0 0 1 9.888 4.58c.846.168 1.482.91 1.482 1.796v.199a.656.656 0 0 1-.659.652H8.337a.66.66 0 0 1-.658-.652v-.2c0-.848.588-1.56 1.38-1.764a2.07 2.07 0 0 0-2.016-1.63c-1.14 0-2.067.921-2.067 2.05v6.364h7.762c.033-.467.238-.756.417-.91.283-.238.63-.314.896-.33.118-.37.33-.589.51-.715.406-.286.897-.286 1.182-.255.398-.339.824-.496 1.272-.45.627.053 1.11.481 1.342.736.658-.03 1.19.14 1.585.496.563.51.633 1.24.642 1.442m-12.079-5v-.03c0-.558.457-1.012 1.02-1.012s1.02.454 1.02 1.012zm5.824 4.569c-.107-.017-.454-.022-.633.132-.031.025-.107.1-.13.285h6.191c-.014-.145-.073-.554-.375-.826-.258-.227-.65-.314-1.163-.263a.41.41 0 0 1-.38-.171c-.11-.149-.482-.546-.894-.58-.246-.022-.507.095-.77.359a.42.42 0 0 1-.395.109c-.126-.031-.51-.076-.74.09q-.202.141-.235.5a.41.41 0 0 1-.16.284.42.42 0 0 1-.316.081M3.54 12.215a.56.56 0 0 0-.563.558c0 .308.252.56.563.56h16.904c.311 0 .563-.255.563-.56a.56.56 0 0 0-.563-.558zm12.767 8.26c1.916-.271 3.955-1.812 3.96-3.683l-.002-2.639H3.728v2.64c0 1.842 1.978 3.366 3.869 3.671a.84.84 0 0 1 .65-.316c.29 0 .534.154.691.375h6.017a.84.84 0 0 1 .692-.375c.272 0 .504.131.661.328"
            />
        </svg>
    );
};

export default IconShowerLight;
