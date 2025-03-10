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

const IconFirstAidKitFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M20.384 6.253c.804 0 1.457.645 1.457 1.44v11.485c0 .793-.653 1.437-1.457 1.437H3.611a1.45 1.45 0 0 1-1.456-1.437V7.693c0-.793.652-1.44 1.456-1.44h3.645v-1.66c0-.673.638-1.202 1.456-1.202h6.566c.818 0 1.46.53 1.46 1.201v1.661zM8.488 4.657v1.596h7.023V4.657a.44.44 0 0 0-.227-.053H8.718a.4.4 0 0 0-.23.053m5.37 6.938V9.802c0-.551-.451-1.036-.964-1.036h-1.8c-.513 0-.962.485-.962 1.036v1.796H8.314c-.571 0-1.05.434-1.05.95v1.775c0 .516.482.95 1.053.95h1.821v1.793c0 .563.44 1.036.96 1.036h1.805c.52 0 .96-.476.96-1.04v-1.795h1.818c.56 0 1.05-.442 1.05-.95v-1.775c0-.504-.492-.947-1.052-.947z"
            />
        </svg>
    );
};

export default IconFirstAidKitFilled;
