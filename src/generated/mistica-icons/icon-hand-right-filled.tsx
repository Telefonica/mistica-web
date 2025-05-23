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

const IconHandRightFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M14.385 18.159q0-.424-.118-.773c.857-.238 1.367-.942 1.367-1.95q-.002-.425-.118-.776c.85-.24 1.353-.941 1.353-1.944q0-.37-.09-.683h2.903c1.333 0 2.162-.818 2.162-2.135 0-1.266-.77-2.042-2.118-2.129h-7.428c.577-.339.98-.644 1.272-1.008.288-.359.43-.787.43-1.207 0-.404-.13-.801-.397-1.132-.52-.65-1.409-.81-2.263-.409-1.448.68-3.776 1.826-5.647 2.748-1.165.574-2.174 1.07-2.476 1.21-.32.146-1.062.49-1.062 1.272v7.787c0 .983.308 1.82.866 2.361.554.538 1.33.81 2.302.81h6.997c1.275-.006 2.065-.785 2.065-2.042"
            />
        </svg>
    );
};

export default IconHandRightFilled;
