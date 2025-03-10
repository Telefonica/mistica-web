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

const IconFileMp4Regular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M13.602 14.225h-1.619a.8.8 0 0 1-.022-.188c0-.151.028-.322.112-.56l.765-2.09h.742l-.83 2.26h.852v-.876h.77v.877h.432v.577h-.431v.845h-.77zM4.342 11.39h.66l1.163 2.056 1.202-2.056h.647v3.68h-.77v-2.12l-.765 1.28h-.647l-.787-1.302v2.142h-.703zM8.815 11.39h1.264c.577 0 .94.081 1.179.302q.298.273.297.86-.001.589-.275.894c-.215.24-.549.356-1.033.356h-.591v1.268h-.84zm1.74 1.641q.146-.146.145-.468c0-.198-.042-.344-.14-.436-.1-.093-.257-.13-.515-.13h-.392v1.174h.412c.268 0 .38-.036.49-.14"
            />
            <path
                fill={fillColor}
                d="M21.798 7.922q.047.11.048.238v12.305c0 .751-.644 1.384-1.409 1.384H8.255c-.75 0-1.406-.647-1.406-1.384l.033-2.773h-2.3a2.427 2.427 0 0 1-2.42-2.425V11.17a2.427 2.427 0 0 1 2.42-2.425H6.85V3.54c0-.723.67-1.384 1.406-1.384h7.414a.86.86 0 0 1 .614.25l5.297 5.126c.112.109.176.246.218.39m-1.361 12.712c.098 0 .193-.096.193-.169V9.032h-2.313c-1.014 0-1.891-.33-2.535-.952-.65-.63-.995-1.487-.995-2.482V3.38H8.252c-.073 0-.187.109-.193.168v5.201h6.364c1.336 0 2.42 1.09 2.42 2.426v4.095a2.427 2.427 0 0 1-2.42 2.426h-6.33l-.034 2.779c0 .05.1.16.193.16zM3.373 15.269c0 .667.54 1.21 1.207 1.21h9.846a1.21 1.21 0 0 0 1.207-1.21v-4.095c0-.666-.54-1.21-1.207-1.21H4.58a1.21 1.21 0 0 0-1.207 1.21zM16.006 3.832v1.765c0 .658.215 1.213.622 1.608.414.4.997.61 1.691.61h1.802z"
            />
        </svg>
    );
};

export default IconFileMp4Regular;
