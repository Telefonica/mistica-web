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

const IconLongDistanceCallFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M12.012 2.18a9.8 9.8 0 0 1 9.036 5.989 9.9 9.9 0 0 1 .776 3.73c.045 5.418-4.311 9.85-9.731 9.894a.532.532 0 0 1-.734-.493V2.7a.53.53 0 0 1 .63-.521zM6.874 15.524c.748 0 1.365.171 1.835.505.473.336.79.826.936 1.462q.12.488.117.988c0 1.832-.986 2.827-2.857 2.869H6.85c-.316 0-.664-.056-.784-.076l-.014-.003-.025-.005c-1.087-.2-2.065-1.194-2.757-2.801-.714-1.661-1.09-3.874-1.09-6.407v-.09c0-2.531.379-4.747 1.093-6.402.692-1.608 1.67-2.603 2.756-2.799l.026-.003.014-.002.026-.004c.146-.024.504-.08.814-.072 1.868.042 2.857 1.034 2.857 2.868.003.334-.036.667-.118.99C9.5 7.171 9.18 7.666 8.71 8c-.47.334-1.09.505-1.835.505q-.247 0-.49-.028c-.042.033-.221.224-.347 1.028-.12.773-.135 1.776-.135 2.465v.09c0 .686.014 1.691.135 2.464.123.804.305.995.347 1.028a4 4 0 0 1 .49-.028m12.407 1.328a8.65 8.65 0 0 0 1.456-4.314h-3.535a18 18 0 0 1-.395 3.283c.919.27 1.754.614 2.474 1.031m-3.46-8.221a18 18 0 0 1-3.4.392v2.45h3.717a17 17 0 0 0-.317-2.842m-3.4-.673a16.6 16.6 0 0 0 3.15-.364 11 11 0 0 0-.736-1.927c-.395-.787-.849-1.4-1.35-1.82q-.521-.437-1.064-.558zm0 12.726q.542-.12 1.064-.558c.501-.42.955-1.03 1.35-1.817a11 11 0 0 0 .675-1.715 16.6 16.6 0 0 0-3.09-.35zm0-5.504c1.128.02 2.252.148 3.355.383.213-.994.334-2.005.362-3.022H12.42zm4.434-6.813a18 18 0 0 1 .35 3.107h3.538a8.7 8.7 0 0 0-1.353-4.188c-.731.44-1.588.801-2.535 1.081m1.339-2.563a8.7 8.7 0 0 0-3.356-2.095q.517.625.95 1.482c.338.686.613 1.403.815 2.14.81-.244 1.54-.552 2.154-.908a8 8 0 0 0-.563-.619m-2.41 12.98a7.7 7.7 0 0 1-.949 1.483 8.6 8.6 0 0 0 3.356-2.098q.228-.227.434-.466c-.6-.333-1.308-.621-2.084-.851q-.294.997-.756 1.933"
            />
        </svg>
    );
};

export default IconLongDistanceCallFilled;
