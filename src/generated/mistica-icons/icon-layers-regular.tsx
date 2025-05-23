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

const IconLayersRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.065 10.74c.482.247.784.743.784 1.287 0 .54-.305 1.036-.795 1.277l-.68.347.685.35a1.442 1.442 0 0 1-.002 2.569l-8.485 4.302a1.4 1.4 0 0 1-.644.155 1.4 1.4 0 0 1-.653-.157l-8.339-4.303a1.44 1.44 0 0 1-.006-2.557l.684-.356-.678-.35a1.43 1.43 0 0 1-.779-1.277c0-.541.297-1.034.774-1.28l.683-.356-.678-.35a1.44 1.44 0 0 1-.006-2.557l8.34-4.34c.207-.109.43-.162.658-.162.224 0 .445.053.65.157l8.484 4.339a1.442 1.442 0 0 1-.003 2.568l-.68.345zm-9.132-6.318L3.594 8.76l8.34 4.306 8.484-4.306zm-8.339 7.602 8.34 4.302 8.484-4.3-1.622-.831-6.218 3.154a1.414 1.414 0 0 1-1.297-.006l-6.098-3.148zm8.34 7.563 8.484-4.303-1.622-.829-6.218 3.154a1.414 1.414 0 0 1-1.297-.006l-6.098-3.145-1.589.826z"
            />
        </svg>
    );
};

export default IconLayersRegular;
