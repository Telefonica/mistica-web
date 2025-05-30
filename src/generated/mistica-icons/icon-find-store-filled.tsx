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

const IconFindStoreFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.907 2 1.737 2.144H3.557L5.294 2zM7.556 19.5c-.806 0-1.58-.22-2.262-.626V22h4.524v-3.126a4.4 4.4 0 0 1-2.262.626M3.21 8.787v-3.57H22v3.57h-1.741v13.208h-4.524V11.64h-4.92a4.45 4.45 0 0 0-3.255-1.426c-.824 0-1.594.229-2.262.626V8.787zm8.175 6.07c0 2.166-1.714 3.925-3.825 3.925a3.7 3.7 0 0 1-2.168-.694l-2.209 2.267a.67.67 0 0 1-.49.21.67.67 0 0 1-.49-.21.73.73 0 0 1 0-1.01l2.21-2.267a3.98 3.98 0 0 1-.678-2.226c0-2.166 1.72-3.926 3.825-3.926 2.106.005 3.825 1.764 3.825 3.93m-3.83-2.5c-1.344 0-2.435 1.12-2.435 2.5 0 .662.25 1.288.708 1.76l.009.008a2.4 2.4 0 0 0 1.714.727c1.35.005 2.44-1.115 2.44-2.495s-1.09-2.5-2.435-2.5"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.907 2 1.737 2.144H3.557L5.294 2zM7.556 19.5c-.806 0-1.58-.22-2.262-.626V22h4.524v-3.126a4.4 4.4 0 0 1-2.262.626M3.21 8.787v-3.57H22v3.57h-1.741v13.208h-4.524V11.64h-4.92a4.45 4.45 0 0 0-3.255-1.426c-.824 0-1.594.229-2.262.626V8.787zm8.175 6.07c0 2.166-1.714 3.925-3.825 3.925a3.7 3.7 0 0 1-2.168-.694l-2.209 2.267a.67.67 0 0 1-.49.21.67.67 0 0 1-.49-.21.73.73 0 0 1 0-1.01l2.21-2.267a3.98 3.98 0 0 1-.678-2.226c0-2.166 1.72-3.926 3.825-3.926 2.106.005 3.825 1.764 3.825 3.93m-3.83-2.5c-1.344 0-2.435 1.12-2.435 2.5 0 .662.25 1.288.708 1.76l.009.008a2.4 2.4 0 0 0 1.714.727c1.35.005 2.44-1.115 2.44-2.495s-1.09-2.5-2.435-2.5"
                />
            </svg>
        );
    }
};

export default IconFindStoreFilled;
