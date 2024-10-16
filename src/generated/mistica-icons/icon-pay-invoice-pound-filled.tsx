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

const IconPayInvoicePoundFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.695 2v20H4.31V8.254h6.117V2zM9.38 7.18H4.547L9.38 2.241zm4.806 9.645H11.3q.088-.253.09-.535v-1.609h1.574c.291 0 .524-.238.524-.535a.527.527 0 0 0-.524-.535H11.39v-1.426c0-.59.47-1.07 1.047-1.07.242 0 .47.083.658.238.224.188.555.151.739-.078a.545.545 0 0 0-.076-.754 2.08 2.08 0 0 0-1.32-.475c-1.155 0-2.1.96-2.1 2.144v1.426h-.17a.527.527 0 0 0-.523.535c0 .297.233.535.524.535h.174v1.609a.52.52 0 0 1-.523.535.527.527 0 0 0-.524.535c0 .297.233.534.524.534h4.372a.533.533 0 0 0 .519-.539.527.527 0 0 0-.524-.535"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.695 2v20H4.31V8.254h6.117V2zM9.38 7.18H4.547L9.38 2.241zm4.806 9.645H11.3q.088-.253.09-.535v-1.609h1.574c.291 0 .524-.238.524-.535a.527.527 0 0 0-.524-.535H11.39v-1.426c0-.59.47-1.07 1.047-1.07.242 0 .47.083.658.238.224.188.555.151.739-.078a.545.545 0 0 0-.076-.754 2.08 2.08 0 0 0-1.32-.475c-1.155 0-2.1.96-2.1 2.144v1.426h-.17a.527.527 0 0 0-.523.535c0 .297.233.535.524.535h.174v1.609a.52.52 0 0 1-.523.535.527.527 0 0 0-.524.535c0 .297.233.534.524.534h4.372a.533.533 0 0 0 .519-.539.527.527 0 0 0-.524-.535"
                />
            </svg>
        );
    }
};

export default IconPayInvoicePoundFilled;
