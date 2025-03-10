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

const IconVideoCameraLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.554 6.062a.71.71 0 0 0-.806.16l-4.672 4.857V7.2c0-.66-.498-1.198-1.11-1.198H3.11c-.612 0-1.11.537-1.11 1.198v9.598c0 .66.498 1.198 1.11 1.198h11.856c.612 0 1.11-.538 1.11-1.198v-3.88l4.672 4.858a.71.71 0 0 0 .801.164.8.8 0 0 0 .45-.738V6.794a.78.78 0 0 0-.445-.732m-6.957 10.33H3.48V7.599h11.117zm2.736-4.397 3.192-3.317v6.634z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.772 6.028a.37.37 0 0 0-.403.083l-5.308 5.457V6.57a.366.366 0 0 0-.36-.371H2.36c-.2 0-.361.166-.361.37v10.67c0 .205.161.37.36.37h8.895c.2 0 .36-.165.36-.37a.365.365 0 0 0-.36-.37H2.716V6.94H15.34v10.3c0 .204.16.37.36.37s.36-.166.36-.37v-5l5.31 5.458a.365.365 0 0 0 .402.083.38.38 0 0 0 .228-.351V6.38a.38.38 0 0 0-.228-.352m-.512 10.48-4.478-4.603L21.26 7.3zM13.48 18c.408 0 .74-.341.74-.76a.75.75 0 0 0-.74-.761.75.75 0 0 0-.74.76c0 .42.332.761.74.761"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M6.993 9.437a.74.74 0 0 1-.731.73.71.71 0 0 1-.704-.73.74.74 0 0 1 .732-.732c.396 0 .71.328.703.732"
                />
                <path
                    fill={fillColor}
                    d="M21.301 7.247a.46.46 0 0 1 .467.006h.003a.48.48 0 0 1 .229.415v8.707a.48.48 0 0 1-.241.421.4.4 0 0 1-.226.062.44.44 0 0 1-.241-.068l-3.968-2.284v2.136c0 1.451-1.148 2.63-2.561 2.63H4.56C3.148 19.273 2 18.094 2 16.643V7.358c0-1.451 1.148-2.63 2.561-2.63H14.76c1.413 0 2.56 1.179 2.56 2.63v2.18zm-6.538 11.41c1.079 0 1.958-.904 1.958-2.012V7.358c0-1.108-.88-2.012-1.958-2.012H4.56c-1.079 0-1.958.904-1.958 2.012v9.287c0 1.108.88 2.012 1.958 2.012zm2.57-4.854 4.065 2.34v-8.24l-4.065 2.34z"
                />
            </svg>
        );
    }
};

export default IconVideoCameraLight;
