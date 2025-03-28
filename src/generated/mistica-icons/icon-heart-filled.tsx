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

const IconHeartFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^vivo-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M3 9.31C3 6.45 4.846 3.5 8.01 3.5c1.526 0 2.639.781 3.36 1.802.258.366.468.765.63 1.173.162-.408.372-.807.63-1.173.721-1.02 1.834-1.802 3.36-1.802C19.154 3.5 21 6.45 21 9.31c0 2.986-1.381 5.163-3.19 6.905-1.288 1.24-2.786 2.258-4.151 3.185l-.014.01c-.192.13-.41.27-.626.41l-.093.06c-.247.16-.485.314-.681.453l-.245.172-.245-.172a22 22 0 0 0-.681-.453l-.093-.06c-.216-.14-.434-.28-.626-.41l-.014-.01c-1.365-.927-2.863-1.945-4.151-3.185C4.38 14.473 3 12.296 3 9.31"
                />
            </svg>
        );
    } else if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.252 2c-2.02 0-3.372.769-5.256 3.08C10.14 2.824 8.656 2 6.58 2 3.572 2 2 4.354 2 6.685c0 4.764 6.404 11.52 9.48 14.767L12 22l.52-.549c.88-.925 1.904-2.018 2.96-3.21l2.66-3.232C20.736 11.582 22 8.859 22 6.685 22 4.355 20.368 2 17.252 2"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.252 2c-2.02 0-3.372.769-5.256 3.08C10.14 2.824 8.656 2 6.58 2 3.572 2 2 4.354 2 6.685c0 4.764 6.404 11.52 9.48 14.767L12 22l.52-.549c.88-.925 1.904-2.018 2.96-3.21l2.66-3.232C20.736 11.582 22 8.859 22 6.685 22 4.355 20.368 2 17.252 2"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.017 21.809H12q-.074 0-.138-.003h-.016a2.4 2.4 0 0 1-.4-.056c-.46-.104-.897-.3-1.278-.574-.457-.33-.995-.874-1.149-1.031-1.588-1.639-2.515-2.801-3.678-4.605-1.453-2.258-2.453-4.501-2.969-6.667-.56-2.353-.098-4.305 1.297-5.504.81-.692 1.916-1.11 3.11-1.17 1.257-.065 2.562.254 3.773.926.411.227.834.474 1.296.745.093.05.205.05.3 0 .462-.274.885-.518 1.3-.747 1.207-.67 2.512-.99 3.77-.925 1.196.062 2.3.48 3.11 1.174 1.394 1.196 1.857 3.151 1.296 5.504-.515 2.163-1.512 4.403-2.969 6.664-1.151 1.79-2.076 2.947-3.639 4.563l-.036.042c-.154.16-.692.7-1.146 1.028-.38.277-.817.473-1.277.574q-.198.047-.4.056h-.017q-.062.007-.123.006"
                />
            </svg>
        );
    }
};

export default IconHeartFilled;
