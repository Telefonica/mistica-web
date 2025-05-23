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

const IconCafeRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M7.609 5.75c0-.21-.081-.336-.235-.563-.166-.236-.37-.53-.373-.953s.202-.706.355-.918l.01-.012c.148-.201.246-.336.243-.619a.54.54 0 0 1 .546-.535h.006c.302 0 .549.236.551.524.006.625-.266.997-.448 1.244-.123.165-.162.227-.16.308 0 .1.065.196.185.37l.002.002c.179.257.424.61.421 1.152a.54.54 0 0 1-.551.53.54.54 0 0 1-.552-.53m9.428 12.893c1.286-.095 4.804-.756 4.804-5.123 0-4.294-3.414-5.02-4.75-5.134V7.374a.626.626 0 0 0-.636-.613H2.79a.626.626 0 0 0-.636.613v10.558c0 1.288.342 2.243 1.048 2.916.7.666 1.683.991 3.01.991h6.816c1.328 0 2.31-.325 3.011-.991.566-.54.888-1.275.997-2.205m-1.218-.714c0 .947-.221 1.616-.672 2.048-.449.428-1.14.635-2.115.635H6.214c-.975 0-1.667-.207-2.115-.635-.451-.435-.672-1.104-.672-2.048V7.982h12.392zm1.272-.515V9.61c1.3.126 3.481.798 3.481 3.91 0 3.126-2.193 3.779-3.481 3.893M10.155 5.47c.059.09.17.26.188.327a.55.55 0 0 0 .566.49q.008-.002.02-.002a.537.537 0 0 0 .512-.566c-.02-.301-.199-.576-.346-.8l-.01-.015-.067-.101.084-.123.004-.006c.159-.229.354-.51.338-.84-.014-.294-.286-.524-.575-.533-.302.014-.535.236-.52.53-.013.042-.08.14-.133.218l-.027.04-.002.002c-.148.213-.318.455-.306.74.005.227.13.42.264.624z"
            />
        </svg>
    );
};

export default IconCafeRegular;
