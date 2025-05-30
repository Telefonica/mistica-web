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

const IconRookFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M7.512 6.656a.423.423 0 0 1-.426-.42v-3.66c0-.23.19-.421.426-.421H9.39c.235 0 .426.188.426.42v1.151h.904v-1.15c0-.23.19-.421.426-.421h1.628c.235 0 .425.188.425.42v1.227l.939-.014V2.575c0-.23.19-.42.425-.42h1.953c.235 0 .426.188.426.42V6.24c0 .233-.19.42-.426.42h-.289v-.005h-8.16v.005h-.554zm.196 9.737c0-.232.19-.42.426-.42h.781a.5.5 0 0 1-.014-.149l.813-6.94h-.437a.423.423 0 0 1-.426-.42V7.32h6.392v1.143c0 .23-.19.42-.426.42h-.437l.813 6.942q.007.076-.014.148h.689c.235 0 .426.188.426.42v2.09H7.705v-2.09zm10.034 3.18c0-.233-.19-.42-.426-.42H6.686a.424.424 0 0 0-.426.42v1.848c0 .233.19.42.426.42h10.63a.423.423 0 0 0 .426-.42z"
            />
        </svg>
    );
};

export default IconRookFilled;
