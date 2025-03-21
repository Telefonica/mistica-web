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

const IconEmergencyCrossLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="m9.933 21.837 4.129.003c.641 0 1.204-.659 1.204-1.41l-.003-5.167h5.166c.736 0 1.409-.575 1.409-1.205V9.93c0-.63-.673-1.204-1.41-1.204l-5.167.003V3.565c0-.736-.575-1.409-1.205-1.409H9.927c-.63 0-1.204.673-1.204 1.41l.002 5.164-5.16.003c-.753 0-1.411.563-1.411 1.205l-.003 4.126c0 .641.659 1.204 1.41 1.204l5.164-.003.003 5.163c0 .75.563 1.409 1.205 1.409m-.39-6.983a.41.41 0 0 0-.409-.41l-5.577.01c-.325 0-.59-.236-.59-.387v-4.13c0-.15.265-.383.59-.383l5.575-.003a.41.41 0 0 0 .409-.409l-.003-5.577c0-.322.258-.588.386-.588h4.126c.13 0 .384.266.384.588l.003 5.572a.41.41 0 0 0 .409.409l5.577-.003c.322 0 .588.255.588.384v4.128c0 .132-.266.384-.588.384l-5.574.003a.41.41 0 0 0-.41.409l.004 5.577c0 .325-.233.591-.384.591l-4.129-.003c-.151 0-.384-.263-.384-.588z"
            />
        </svg>
    );
};

export default IconEmergencyCrossLight;
