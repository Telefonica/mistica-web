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

const IconMmsFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.072 3.5H5.928C3.76 3.5 2 5.326 2 7.564v5.915c0 2.115 1.573 3.86 3.571 4.045v2.607c0 .151.087.284.22.34a.351.351 0 0 0 .389-.08l2.752-2.848h9.14c2.168 0 3.928-1.826 3.928-4.064V7.564c.005-2.238-1.76-4.064-3.928-4.064m-7.884 8.874a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553v-1.349l-.773 1.595a.53.53 0 0 1-.48.307.53.53 0 0 1-.48-.307l-.773-1.595v1.349a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553V8.678c0-.255.17-.482.412-.539a.535.535 0 0 1 .603.293l1.308 2.707 1.308-2.707a.53.53 0 0 1 .603-.293.55.55 0 0 1 .412.54zm4.752.553a.54.54 0 0 1-.535-.553v-1.349l-.773 1.595a.53.53 0 0 1-.48.307.53.53 0 0 1-.48-.307l-.773-1.595v1.349a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553V8.678c0-.255.17-.482.412-.539a.535.535 0 0 1 .603.293l1.308 2.707 1.308-2.707a.53.53 0 0 1 .603-.293.55.55 0 0 1 .412.54v3.695a.54.54 0 0 1-.535.553m1.502-.17a.56.56 0 0 1-.284-.729.53.53 0 0 1 .704-.293c.138.062.293.09.485.09.48 0 .48-.293.48-.388 0-.137-.032-.237-.64-.516-.302-.137-1.102-.501-1.102-1.42 0-.808.645-1.376 1.573-1.376.11 0 .398.01.7.095a.56.56 0 0 1 .374.68.536.536 0 0 1-.658.389 1.8 1.8 0 0 0-.416-.057c-.05 0-.498.01-.498.265 0 .076 0 .194.461.402.662.303 1.276.72 1.276 1.529.005.894-.635 1.509-1.55 1.509-.338 0-.631-.057-.905-.18"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.072 3.5H5.928C3.76 3.5 2 5.326 2 7.564v5.915c0 2.115 1.573 3.86 3.571 4.045v2.607c0 .151.087.284.22.34a.351.351 0 0 0 .389-.08l2.752-2.848h9.14c2.168 0 3.928-1.826 3.928-4.064V7.564c.005-2.238-1.76-4.064-3.928-4.064m-7.884 8.874a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553v-1.349l-.773 1.595a.53.53 0 0 1-.48.307.53.53 0 0 1-.48-.307l-.773-1.595v1.349a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553V8.678c0-.255.17-.482.412-.539a.535.535 0 0 1 .603.293l1.308 2.707 1.308-2.707a.53.53 0 0 1 .603-.293.55.55 0 0 1 .412.54zm4.752.553a.54.54 0 0 1-.535-.553v-1.349l-.773 1.595a.53.53 0 0 1-.48.307.53.53 0 0 1-.48-.307l-.773-1.595v1.349a.54.54 0 0 1-.535.553.54.54 0 0 1-.535-.553V8.678c0-.255.17-.482.412-.539a.535.535 0 0 1 .603.293l1.308 2.707 1.308-2.707a.53.53 0 0 1 .603-.293.55.55 0 0 1 .412.54v3.695a.54.54 0 0 1-.535.553m1.502-.17a.56.56 0 0 1-.284-.729.53.53 0 0 1 .704-.293c.138.062.293.09.485.09.48 0 .48-.293.48-.388 0-.137-.032-.237-.64-.516-.302-.137-1.102-.501-1.102-1.42 0-.808.645-1.376 1.573-1.376.11 0 .398.01.7.095a.56.56 0 0 1 .374.68.536.536 0 0 1-.658.389 1.8 1.8 0 0 0-.416-.057c-.05 0-.498.01-.498.265 0 .076 0 .194.461.402.662.303 1.276.72 1.276 1.529.005.894-.635 1.509-1.55 1.509-.338 0-.631-.057-.905-.18"
                />
            </svg>
        );
    }
};

export default IconMmsFilled;
