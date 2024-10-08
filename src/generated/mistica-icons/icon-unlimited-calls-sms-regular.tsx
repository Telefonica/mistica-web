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

const IconUnlimitedCallsSmsRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m20.698 5.253-1.123-1.128a2.08 2.08 0 0 0-1.372-.623 1.81 1.81 0 0 0-1.406.55l-1.683 1.725c-.37.376-.555.89-.525 1.44.029.519.253 1.013.627 1.389l1.177 1.182c.326.326.268.86.156 1.251-.2.722-.73 1.548-1.493 2.33-1.581 1.622-2.997 1.933-3.522 1.404l-1.177-1.182a2.08 2.08 0 0 0-1.372-.623 1.8 1.8 0 0 0-1.406.549l-1.683 1.726c-.37.376-.554.89-.525 1.439.03.52.253 1.014.627 1.39l1.124 1.132c.817.821 2.019 1.296 3.439 1.296 2.218 0 4.981-1.152 7.666-3.912 1.858-1.909 3.133-4.1 3.59-6.177.457-2.102.049-3.976-1.119-5.158m-.37 4.812c-.394 1.795-1.527 3.724-3.186 5.425-3.575 3.675-7.36 4.209-8.955 2.606L7.07 16.97a.56.56 0 0 1-.176-.376.33.33 0 0 1 .088-.262l1.683-1.726a.32.32 0 0 1 .233-.09h.02c.131.006.267.07.374.179l1.178 1.182c1.298 1.306 3.575.737 5.671-1.415.954-.979 1.6-2.012 1.873-2.997.311-1.117.117-2.101-.55-2.774l-1.177-1.182a.56.56 0 0 1-.175-.376.34.34 0 0 1 .088-.262l1.683-1.726a.33.33 0 0 1 .258-.089c.13.005.267.07.374.178l1.124 1.133c.793.796 1.04 2.111.69 3.699m-11.285 1.42L8.037 10.46l-1.012 1.023a2.91 2.91 0 0 1-4.164 0 3.04 3.04 0 0 1 0-4.238 2.92 2.92 0 0 1 4.169 0L8.037 8.27l1.006-1.024a2.9 2.9 0 0 1 2.082-.875 2.9 2.9 0 0 1 2.082.875 3.04 3.04 0 0 1 0 4.238 2.91 2.91 0 0 1-4.164 0m1.075-3.141L9.112 9.368l1.006 1.028c.56.564 1.464.564 2.02 0a1.474 1.474 0 0 0 0-2.052c-.54-.55-1.48-.55-2.02 0m-6.182 2.052c.56.564 1.464.564 2.019 0l1.002-1.028L5.95 8.344a1.4 1.4 0 0 0-1.007-.425c-.365 0-.73.143-1.007.425a1.474 1.474 0 0 0 0 2.052"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m20.698 5.253-1.123-1.128a2.08 2.08 0 0 0-1.372-.623 1.81 1.81 0 0 0-1.406.55l-1.683 1.725c-.37.376-.555.89-.525 1.44.029.519.253 1.013.627 1.389l1.177 1.182c.326.326.268.86.156 1.251-.2.722-.73 1.548-1.493 2.33-1.581 1.622-2.997 1.933-3.522 1.404l-1.177-1.182a2.08 2.08 0 0 0-1.372-.623 1.8 1.8 0 0 0-1.406.549l-1.683 1.726c-.37.376-.554.89-.525 1.439.03.52.253 1.014.627 1.39l1.124 1.132c.817.821 2.019 1.296 3.439 1.296 2.218 0 4.981-1.152 7.666-3.912 1.858-1.909 3.133-4.1 3.59-6.177.457-2.102.049-3.976-1.119-5.158m-.37 4.812c-.394 1.795-1.527 3.724-3.186 5.425-3.575 3.675-7.36 4.209-8.955 2.606L7.07 16.97a.56.56 0 0 1-.176-.376.33.33 0 0 1 .088-.262l1.683-1.726a.32.32 0 0 1 .233-.09h.02c.131.006.267.07.374.179l1.178 1.182c1.298 1.306 3.575.737 5.671-1.415.954-.979 1.6-2.012 1.873-2.997.311-1.117.117-2.101-.55-2.774l-1.177-1.182a.56.56 0 0 1-.175-.376.34.34 0 0 1 .088-.262l1.683-1.726a.33.33 0 0 1 .258-.089c.13.005.267.07.374.178l1.124 1.133c.793.796 1.04 2.111.69 3.699m-11.285 1.42L8.037 10.46l-1.012 1.023a2.91 2.91 0 0 1-4.164 0 3.04 3.04 0 0 1 0-4.238 2.92 2.92 0 0 1 4.169 0L8.037 8.27l1.006-1.024a2.9 2.9 0 0 1 2.082-.875 2.9 2.9 0 0 1 2.082.875 3.04 3.04 0 0 1 0 4.238 2.91 2.91 0 0 1-4.164 0m1.075-3.141L9.112 9.368l1.006 1.028c.56.564 1.464.564 2.02 0a1.474 1.474 0 0 0 0-2.052c-.54-.55-1.48-.55-2.02 0m-6.182 2.052c.56.564 1.464.564 2.019 0l1.002-1.028L5.95 8.344a1.4 1.4 0 0 0-1.007-.425c-.365 0-.73.143-1.007.425a1.474 1.474 0 0 0 0 2.052"
                />
            </svg>
        );
    }
};

export default IconUnlimitedCallsSmsRegular;
