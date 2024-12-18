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

const IconAppsLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M4.308 11.232h4.616a2.31 2.31 0 0 0 2.308-2.308V4.308A2.31 2.31 0 0 0 8.924 2H4.308A2.31 2.31 0 0 0 2 4.308v4.616a2.31 2.31 0 0 0 2.308 2.308M3.54 4.308c0-.42.348-.768.768-.768h4.616c.42 0 .768.348.768.768v4.616c0 .42-.348.768-.768.768H4.308a.773.773 0 0 1-.768-.768zm16.152 6.924h-4.616a2.31 2.31 0 0 1-2.308-2.308V4.308A2.31 2.31 0 0 1 15.076 2h4.616A2.31 2.31 0 0 1 22 4.308v4.616a2.31 2.31 0 0 1-2.308 2.308m-5.384-6.924v4.616c0 .42.348.768.768.768h4.616c.42 0 .768-.348.768-.768V4.308a.773.773 0 0 0-.768-.768h-4.616a.773.773 0 0 0-.768.768M8.924 22H4.308A2.31 2.31 0 0 1 2 19.692v-4.616a2.31 2.31 0 0 1 2.308-2.308h4.616a2.31 2.31 0 0 1 2.308 2.308v4.616A2.31 2.31 0 0 1 8.924 22M3.54 15.076v4.616c0 .42.348.768.768.768h4.616c.42 0 .768-.348.768-.768v-4.616a.773.773 0 0 0-.768-.768H4.308a.773.773 0 0 0-.768.768M19.692 22h-4.616a2.31 2.31 0 0 1-2.308-2.308v-4.616a2.31 2.31 0 0 1 2.308-2.308h4.616A2.31 2.31 0 0 1 22 15.076v4.616A2.31 2.31 0 0 1 19.692 22m-5.384-6.924v4.616c0 .42.348.768.768.768h4.616c.42 0 .768-.348.768-.768v-4.616a.773.773 0 0 0-.768-.768h-4.616a.773.773 0 0 0-.768.768"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path fill={fillColor} d="M21.616 20.851a.768.768 0 1 1-1.537 0 .768.768 0 0 1 1.537 0" />
                <path
                    fill={fillColor}
                    d="M9.31 11.231H3.926A1.927 1.927 0 0 1 2 9.314V3.926C2 2.865 2.864 2 3.925 2h5.382c1.052 0 1.917.865 1.917 1.926V9.31A1.923 1.923 0 0 1 9.31 11.23M3.926 2.77c-.64 0-1.157.516-1.157 1.157V9.31c0 .64.517 1.157 1.157 1.157h5.382c.64 0 1.156-.517 1.156-1.157V3.926c0-.641-.516-1.157-1.156-1.157zm10.768 8.462h5.386a1.923 1.923 0 0 0 1.913-1.921V3.926c0-1.061-.864-1.926-1.917-1.926h-5.382c-1.06 0-1.925.865-1.925 1.926v5.38c0 1.06.865 1.925 1.925 1.925m0-8.462h5.382c.64 0 1.157.516 1.157 1.157V9.31c0 .64-.517 1.157-1.157 1.157h-5.382c-.64 0-1.156-.517-1.156-1.157V3.926c0-.641.516-1.157 1.156-1.157M3.925 22H9.31a1.93 1.93 0 0 0 1.92-1.918v-5.384c0-1.06-.864-1.925-1.924-1.925H3.925c-1.06 0-1.925.864-1.925 1.925v5.384C2 21.136 2.864 22 3.925 22m0-8.463v.004h5.382c.64 0 1.156.517 1.156 1.157v5.38c0 .641-.516 1.157-1.156 1.157H3.925c-.64 0-1.157-.516-1.157-1.157v-5.384c0-.64.517-1.157 1.157-1.157M14.693 22h3.846c.212 0 .38-.16.38-.38a.386.386 0 0 0-.388-.389h-3.846c-.64 0-1.156-.516-1.156-1.157V14.69c0-.64.516-1.157 1.156-1.157h5.382c.64 0 1.157.517 1.157 1.157v3.847c0 .22.168.389.388.389s.388-.177.388-.389V14.69c0-1.06-.864-1.925-1.925-1.925h-5.382c-1.06 0-1.925.864-1.925 1.925v5.385c0 1.06.865 1.925 1.925 1.925"
                />
            </svg>
        );
    }
};

export default IconAppsLight;
