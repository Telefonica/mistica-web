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

const IconIotSensorHumidityRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.317 4.964v10.231c.719.774 1.136 1.773 1.136 2.768 0 2.23-1.782 4.037-3.982 4.037S8.49 20.193 8.49 17.963c0-1 .418-2 1.136-2.768v-2.343l-.039.04c-.684.654-1.554 1.038-2.505 1.038a3.44 3.44 0 0 1-2.506-1.039c-.646-.694-1.025-1.58-1.025-2.54s.53-2 1.025-2.846l1.86-3.19a.73.73 0 0 1 .646-.385c.267 0 .495.153.645.384 0 0 1.788 2.999 1.9 3.19v-2.54C9.625 3.31 10.877 2 12.47 2s2.846 1.31 2.846 2.964m-2.278 11.388V4.89a.59.59 0 0 0-.568-.576.59.59 0 0 0-.568.576v11.462a1.75 1.75 0 0 0-1.136 1.616c0 .96.757 1.733 1.709 1.733s1.71-.768 1.71-1.733a1.73 1.73 0 0 0-1.147-1.616m-.568 2.192a.59.59 0 0 1-.568-.576.59.59 0 0 1 .568-.577.59.59 0 0 1 .568.577.59.59 0 0 1-.568.576m-3.982-6.77a2.28 2.28 0 0 0 .646-1.423c0-.73-.68-1.847-1.175-2.654-.156-.232-.875-1.463-.875-1.463L5.871 8.312c-.34.576-.796 1.423-.796 2.039 0 .536.228 1.038.607 1.422.379.385.874.616 1.403.616.53 0 1.025-.231 1.404-.615m1.515 6.193c0 1.384 1.103 2.502 2.467 2.502s2.467-1.118 2.467-2.502c0-.654-.306-1.344-.874-1.846a.7.7 0 0 1-.267-.576V4.969c0-.808-.568-1.423-1.326-1.423a1.41 1.41 0 0 0-1.403 1.423l.077 10.576c0 .231-.116.423-.267.576-.534.502-.874 1.152-.874 1.846"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M15.317 4.964v10.231c.719.774 1.136 1.773 1.136 2.768 0 2.23-1.782 4.037-3.982 4.037S8.49 20.193 8.49 17.963c0-1 .418-2 1.136-2.768v-2.343l-.039.04c-.684.654-1.554 1.038-2.505 1.038a3.44 3.44 0 0 1-2.506-1.039c-.646-.694-1.025-1.58-1.025-2.54s.53-2 1.025-2.846l1.86-3.19a.73.73 0 0 1 .646-.385c.267 0 .495.153.645.384 0 0 1.788 2.999 1.9 3.19v-2.54C9.625 3.31 10.877 2 12.47 2s2.846 1.31 2.846 2.964m-2.278 11.388V4.89a.59.59 0 0 0-.568-.576.59.59 0 0 0-.568.576v11.462a1.75 1.75 0 0 0-1.136 1.616c0 .96.757 1.733 1.709 1.733s1.71-.768 1.71-1.733a1.73 1.73 0 0 0-1.147-1.616m-.568 2.192a.59.59 0 0 1-.568-.576.59.59 0 0 1 .568-.577.59.59 0 0 1 .568.577.59.59 0 0 1-.568.576m-3.982-6.77a2.28 2.28 0 0 0 .646-1.423c0-.73-.68-1.847-1.175-2.654a65 65 0 0 1-.875-1.463L5.871 8.312c-.34.576-.796 1.423-.796 2.039 0 .536.228 1.038.607 1.422.379.385.874.616 1.403.616.53 0 1.025-.231 1.404-.615m1.515 6.193c0 1.384 1.102 2.502 2.467 2.502s2.467-1.118 2.467-2.502c0-.654-.306-1.344-.874-1.846a.7.7 0 0 1-.267-.576V4.969c0-.808-.568-1.423-1.326-1.423a1.41 1.41 0 0 0-1.403 1.423l.077 10.576c0 .231-.116.423-.267.576-.534.502-.874 1.152-.874 1.846"
                />
            </svg>
        );
    }
};

export default IconIotSensorHumidityRegular;
