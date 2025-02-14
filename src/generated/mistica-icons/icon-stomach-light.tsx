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

const IconStomachLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M9.108 21.336c.767.337 1.613.499 2.506.499 1.98 0 4.174-.807 6.166-2.322 2.073-1.605 3.428-3.799 3.82-6.182l.005-.016.004-.015a7 7 0 0 0 .174-.874c.428-3.266-1.64-4.795-3.743-5.143a4 4 0 0 1-.28-.037l-.09-.013a5 5 0 0 0-.868-.034 3.5 3.5 0 0 1-.473-.667 3.47 3.47 0 0 1-.283-2.605 1.27 1.27 0 0 0-.017-.93c-.1-.232-.336-.546-.874-.73-1.084-.37-1.742.265-1.93.806a6.42 6.42 0 0 0 .518 4.888q.122.218.255.423c-.641.67-1.047 1.605-1.204 2.784a3.7 3.7 0 0 0-.05.605c-.064.362-.011.738.036 1.074l.003.022v.005c.056.393.108.76-.042.927-.093.104-.376.278-1.294.247a11 11 0 0 0-.507-.146c-.698-.157-1.76-.31-2.423-.28q-.014-.004-.029-.003a6.25 6.25 0 0 0-2.93.569 6.34 6.34 0 0 0-3.302 3.577c-.165.364-.244 1.19.625 1.695.537.313 1.333.476 2.064-.533q.159-.217.308-.436l.006-.008c.451-.647.88-1.26 1.538-1.598l.123-.067c.204-.11.32-.168.465-.132q.389.098.252 1.073c-.11.776-.048 1.476.176 2.084.272.732.706 1.233 1.295 1.493M7.58 15.855a1.3 1.3 0 0 0-.286-.034c-.318 0-.567.132-.766.237l-.018.01-.104.055c-.848.435-1.358 1.166-1.851 1.874q-.148.211-.3.423c-.325.446-.574.521-.964.297-.38-.22-.319-.504-.266-.636A5.52 5.52 0 0 1 5.9 14.955a5.4 5.4 0 0 1 2.535-.493h.037q.032.004.064.003c.574-.022 1.543.112 2.193.258q.276.07.496.146.057.02.118.022c1.014.045 1.655-.126 2.011-.527.411-.458.326-1.068.251-1.609l-.002-.012c-.042-.292-.084-.591-.036-.902 0-.166.017-.356.047-.558.152-1.131.555-1.98 1.197-2.515a.43.43 0 0 0 .07-.58 5.551 5.551 0 0 1-.863-4.86c.028-.084.202-.487.854-.263.137.047.311.129.373.263a.4.4 0 0 1 .003.289l-.009.022-.008.022a4.3 4.3 0 0 0 .347 3.27c.207.38.462.716.756 1.002.087.084.21.129.328.118.398-.034.734-.003.885.014l.018.002c.127.02.267.04.36.048 1.048.174 3.44.93 3.012 4.188-.028.224-.07.448-.132.7a.5.5 0 0 0-.036.12c-.345 2.194-1.591 4.219-3.51 5.7-2.633 2.026-5.628 2.69-7.815 1.73-.37-.163-.653-.505-.84-1.012-.177-.474-.222-1.034-.132-1.667.201-1.442-.373-1.893-.891-2.02"
            />
        </svg>
    );
};

export default IconStomachLight;
