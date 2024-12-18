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

const IconLockOpenLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.798 8.07v1.823c.954.18 1.702 1.035 1.702 2.107v7.857c0 1.18-.92 2.143-2.046 2.143H6.546C5.42 22 4.5 21.036 4.5 19.857V12c0-1.18.92-2.143 2.046-2.143h9.885V8.074c0-2.571-1.977-4.643-4.431-4.643-1.771 0-3.34 1.104-4.088 2.783-.137.356-.546.5-.885.356-.34-.144-.477-.572-.34-.927.92-2.216 3-3.643 5.317-3.643 3.202 0 5.794 2.715 5.794 6.07m-.344 12.499c.374 0 .683-.32.683-.716V12c0-.392-.305-.716-.683-.716H6.546c-.374 0-.683.32-.683.716v7.853c0 .392.305.716.683.716z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.8 9.856h-.34V7.712C17.458 4.572 15.006 2 12.005 2c-1.91 0-3.72 1.072-4.674 2.784a.39.39 0 0 0 .103.5c.172.108.378.036.477-.108.856-1.536 2.425-2.464 4.094-2.464 2.627 0 4.773 2.252 4.773 5v2.144H6.203c-.955 0-1.703.784-1.703 1.784v8.576c0 1 .748 1.784 1.703 1.784h11.594c.954 0 1.703-.784 1.703-1.784v-8.572c.004-1-.745-1.788-1.7-1.788m1.024 10.36c0 .608-.443 1.072-1.023 1.072H6.203c-.58 0-1.023-.464-1.023-1.072v-8.572c0-.608.443-1.072 1.023-1.072h11.594c.58 0 1.023.464 1.023 1.072v8.572z"
                />
                <path
                    fill={fillColor}
                    d="M6.887 7.712c.377 0 .683-.32.683-.716s-.306-.716-.683-.716-.684.32-.684.716.306.716.684.716"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.385 19.098c-.003-2.602 0-7.885 0-7.885v-.003c.005-.08.071-1.128-.65-1.924-.51-.555-1.26-.838-2.235-.838a6834 6834 0 0 0-8.572.009V7.062c0-3.762 2.944-4.082 3.849-4.09.129-.003.283 0 .409.003.73.017 3.165.274 3.762 2.823q.003.004.002.009c.054.215.27.35.488.297a.41.41 0 0 0 .302-.493c-.73-3.124-3.655-3.435-4.535-3.457l-.216-.001q-.113 0-.223-.002c-.776.009-4.653.278-4.656 4.913v1.404c-.442.033-1.151.168-1.709.683-.518.476-.778 1.157-.778 2.023v7.913c-.003.045-.07 1.123.67 1.924.506.546 1.249.826 2.204.826l8.972-.005c.047.005 1.291.084 2.145-.72.513-.479.77-1.16.77-2.014m-1.258-9.26c.493.537.445 1.302.443 1.341 0 0-.003 5.308 0 7.919 0 .616-.171 1.09-.508 1.409-.55.52-1.397.507-1.544.504h-.021l-9 .006c-.715 0-1.255-.188-1.6-.558-.498-.535-.46-1.305-.456-1.341V11.17c0-.622.17-1.098.507-1.412.47-.44 1.157-.482 1.409-.482q.076 0 .093.003h.069l1.23-.001c1.976-.003 5.814-.007 7.748-.007.734 0 1.283.187 1.63.566m-6.154 7.08h-.227c-.82-.01-1.796-.355-1.796-1.93 0-1.565.967-1.901 1.774-1.91h.047l.185.003c.826.023 1.812.37 1.812 1.927 0 1.552-.977 1.897-1.795 1.91m2.608-1.912c0-2.519-2.076-2.732-2.608-2.745q-.094-.004-.205-.003h-.053c-.546.003-2.58.193-2.58 2.73 0 2.544 2.054 2.743 2.6 2.752h.09q.083 0 .16-.003c.517-.009 2.596-.205 2.596-2.731"
                />
            </svg>
        );
    }
};

export default IconLockOpenLight;
