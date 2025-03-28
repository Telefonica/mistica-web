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

const IconLoudspeakerLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M16.247 18.559a.6.6 0 0 1-.19-.028l-6.041-1.827a1 1 0 0 1-.018.076l-.241.765a.55.55 0 0 1-.275.327.54.54 0 0 1-.428.042l-2.325-.728a.56.56 0 0 1-.367-.703l.24-.765.016-.042-3.88-1.174v.502a.276.276 0 0 1-.278.277.276.276 0 0 1-.277-.277V8.996c0-.154.123-.278.277-.278s.277.124.277.278v.499l13.32-4.029a.66.66 0 0 1 .588.104.74.74 0 0 1 .294.596v11.659a.75.75 0 0 1-.294.6.67.67 0 0 1-.398.134m0-12.566q-.014 0-.025.004l-.006.001L2.88 10.032c-.062.02-.106.09-.106.17v3.595c0 .08.044.151.106.17l13.336 4.034q.05.015.095-.02a.19.19 0 0 0 .07-.15V6.168c0-.061-.025-.12-.07-.151a.1.1 0 0 0-.064-.025m-9.35 10.655 2.325.729.24-.765-2.324-.728zM18.844 8.183a.279.279 0 0 1-.199-.476l1.963-1.964a.279.279 0 1 1 .395.395L19.04 8.102a.28.28 0 0 1-.196.081M21.53 12.01H18.75a.28.28 0 0 1-.28-.28.28.28 0 0 1 .28-.28h2.779a.28.28 0 0 1 .28.28.28.28 0 0 1-.28.28M20.6 17.66a.28.28 0 0 0 .395 0 .28.28 0 0 0 0-.395L19.03 15.3a.279.279 0 1 0-.395.395z"
            />
        </svg>
    );
};

export default IconLoudspeakerLight;
