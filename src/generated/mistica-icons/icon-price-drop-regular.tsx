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

const IconPriceDropRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M7.014 10.884c.407.28.876.45 1.364.497v.276a.35.35 0 0 0 .7.003v-.3c.39-.059.719-.198.967-.412.33-.288.507-.691.507-1.17 0-.58-.262-1.297-1.474-1.497v-1.45q.269.063.544.213l.005.002a.54.54 0 0 0 .238.065.403.403 0 0 0 .404-.404c0-.086-.031-.252-.236-.378a2.5 2.5 0 0 0-.955-.325v-.288a.35.35 0 0 0-.7 0v.277c-.882.106-1.437.695-1.437 1.558 0 .566.255 1.273 1.437 1.472v1.538a2.3 2.3 0 0 1-.877-.366.5.5 0 0 0-.266-.084.41.41 0 0 0-.417.409q-.001.226.196.364m2.711-1.079c0 .373-.24.636-.647.737v-1.41c.562.14.647.403.647.673M8.378 6.81v1.358c-.61-.166-.61-.487-.61-.654 0-.374.223-.626.61-.704"
            />
            <path
                fill={fillColor}
                d="M12.17 21.705a.558.558 0 0 0 .76 0l7.103-6.558a.558.558 0 0 0-.38-.972h-2.718V3.537c0-.855-.532-1.387-1.386-1.387H9.54c-.846 0-1.372.532-1.372 1.387v.256C6.877 3.883 5.85 4.287 5.112 5c-.877.846-1.32 2.095-1.32 3.714 0 1.62.443 2.866 1.32 3.712.739.712 1.765 1.116 3.056 1.205v.545H5.45a.56.56 0 0 0-.381.972zM9.289 13.63c1.29-.09 2.317-.494 3.056-1.208.874-.843 1.32-2.093 1.32-3.712S13.22 5.842 12.344 5c-.739-.712-1.764-1.117-3.056-1.206v-.256c0-.152.031-.216.042-.227s.07-.04.21-.04h6.009c.14 0 .204.028.221.045s.045.082.045.222v11.196c0 .308.252.56.56.56h1.846l-5.67 5.235-5.669-5.235h1.846c.308 0 .56-.252.56-.56zm-.56-8.735c2.566 0 3.815 1.25 3.815 3.818s-1.25 3.818-3.815 3.818-3.815-1.25-3.815-3.818 1.25-3.818 3.815-3.818"
            />
        </svg>
    );
};

export default IconPriceDropRegular;
