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

const IconFullscreenLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M2.155 8.247c0 .32.26.577.58.577s.58-.257.58-.577V3.315h4.932a.581.581 0 0 0 0-1.16H2.735c-.32 0-.58.26-.58.58zm6.684 13.017c0-.32-.261-.58-.58-.58 0 0-4.944 0-4.947-.002v-4.933a.59.59 0 0 0-.58-.577c-.32 0-.577.26-.577.58v5.512c0 .32.26.577.58.58h5.524c.319 0 .58-.26.58-.58m12.423-6.103a.59.59 0 0 1 .576.58v5.523c0 .32-.257.577-.576.577h-5.524a.581.581 0 0 1 0-1.16h4.946v-4.943c0-.32.258-.577.578-.577m.58-12.429c0-.32-.261-.577-.58-.577h-5.513a.579.579 0 1 0 0 1.157h4.938V8.27a.576.576 0 1 0 1.154 0z"
            />
        </svg>
    );
};

export default IconFullscreenLight;
