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

const IconSearchMoneyRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M9.797 13.88c0 .208.168.379.378.379a.38.38 0 0 0 .381-.379v-.547c.558-.07 1.026-.26 1.367-.556.44-.381.672-.919.672-1.552 0-.778-.356-1.748-2.039-1.993V7.214c.276.054.548.155.83.308l.008.003c.095.05.198.081.305.084.283 0 .512-.23.512-.513 0-.112-.039-.322-.302-.484a3.3 3.3 0 0 0-1.353-.445v-.275c0-.21-.17-.381-.381-.381a.38.38 0 0 0-.378.38v.263c-1.228.109-2.006.9-2.006 2.074 0 .765.351 1.721 2.006 1.965v2.13q-.646-.085-1.291-.513a.64.64 0 0 0-.342-.109.526.526 0 0 0-.532.521c0 .19.084.348.252.465.567.392 1.228.621 1.913.669zm.759-1.578v-1.997c.86.186.989.568.989.956 0 .546-.37.922-.989 1.041m-.76-3.185c-.83-.187-.951-.573-.951-.934 0-.555.35-.914.952-.996z"
            />
            <path
                fill={fillColor}
                d="M2.175 9.984a7.846 7.846 0 0 0 7.846 7.846 7.8 7.8 0 0 0 5.138-1.918l5.697 5.697a.55.55 0 0 0 .395.165.561.561 0 0 0 .398-.958l-5.704-5.704A7.848 7.848 0 0 0 4.472 4.435a7.85 7.85 0 0 0-2.297 5.55m1.12 0a6.726 6.726 0 0 1 6.726-6.725 6.67 6.67 0 0 1 4.756 1.972 6.724 6.724 0 0 1 0 9.473 6.73 6.73 0 0 1-9.512.036 6.73 6.73 0 0 1-1.97-4.756"
            />
        </svg>
    );
};

export default IconSearchMoneyRegular;
