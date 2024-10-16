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

const IconSharedDataFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.06 5.855c-.563-.644-1.404-.972-2.504-.972H5.445c-1.098 0-1.94.328-2.504.972-.52.6-.787 1.468-.787 2.583v4.938c0 1.115.266 1.984.787 2.583.563.644 1.404.972 2.504.972h13.11c1.098 0 1.94-.328 2.504-.97.524-.599.787-1.467.787-2.582V8.438c0-1.115-.266-1.983-.787-2.583m.753 12.698c0 .308-.252.56-.56.56H2.749a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56h18.504c.308 0 .56.252.56.56m-10.652-7.908q.03.248 0 .496l1.977.989.073-.076c.24-.227.574-.344.994-.344q.632 0 .995.344c.255.241.384.591.384 1.04 0 .428-.12.77-.356 1.008s-.591.372-1.023.372-.784-.128-1.022-.372-.353-.58-.353-1.008q0-.093.008-.177l-2.02-1.011c-.237.24-.587.367-1.016.367s-.784-.13-1.022-.373q-.357-.366-.356-1.008c0-.448.129-.798.384-1.04.24-.226.574-.344.994-.344q.632 0 .994.345l.026.025 2.017-1.009a2 2 0 0 1-.009-.179c0-.448.129-.798.384-1.04.24-.226.574-.344.994-.344q.632 0 .995.345c.255.24.383.59.383 1.04 0 .428-.12.77-.355 1.008-.236.238-.591.372-1.023.372s-.784-.129-1.022-.372a.2.2 0 0 1-.032-.03l-.013-.015z"
            />
        </svg>
    );
};

export default IconSharedDataFilled;
