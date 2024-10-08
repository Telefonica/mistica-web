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

const IconSyringeLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="m19 2.271 2.716 2.734c.16.17.16.44.009.602a.43.43 0 0 1-.303.126.4.4 0 0 1-.294-.126l-.025-.025-2.566 2.591 1.375 1.384a.42.42 0 0 1 0 .6.407.407 0 0 1-.588 0l-.336-.34-8.524 8.594a.43.43 0 0 1-.302.126.4.4 0 0 1-.294-.126l-1.09-1.098-1.258 1.258a.4.4 0 0 1-.294.126.41.41 0 0 1-.302-.126l-.47-.474-3.59 3.614a.43.43 0 0 1-.302.126.42.42 0 0 1-.291-.717l3.588-3.622-.403-.406a.43.43 0 0 1-.126-.294c0-.12.05-.222.126-.306l1.255-1.255-.947-.955a.435.435 0 0 1 0-.6L14.299 5.1l-.31-.314a.42.42 0 0 1 .584-.599l1.275 1.283 2.566-2.583-.009-.017a.42.42 0 0 1 0-.599.43.43 0 0 1 .594 0m-2.555 3.798 1.493 1.502 2.566-2.583-1.494-1.51zm-9.79 7.916 3.504 3.53 8.235-8.292-3.504-3.529-.863.868 1.3 1.283a.417.417 0 0 1-.294.717.44.44 0 0 1-.294-.117l-1.3-1.292-1.485 1.485q.024.012.034.025l2.213 2.221c.16.168.16.44 0 .6a.43.43 0 0 1-.303.126.4.4 0 0 1-.294-.126L11.4 9.265l-.013-.016-.012-.017-1.477 1.484 1.376 1.37c.168.16.168.431.008.6a.43.43 0 0 1-.302.126.4.4 0 0 1-.294-.126l-1.384-1.367-1.476 1.484 2.022 2.025a.42.42 0 0 1 0 .6.4.4 0 0 1-.294.126.43.43 0 0 1-.303-.126l-2.01-2.034zm.568 3.69.956-.964-.88-.885-.955.972z"
            />
        </svg>
    );
};

export default IconSyringeLight;
