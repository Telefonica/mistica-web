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

const IconFileCompressedRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="m13.914 2.402 5.215 5.128c.166.163.258.39.258.622V20.46a1.4 1.4 0 0 1-1.384 1.381H6.006c-.737 0-1.384-.647-1.384-1.38V3.535c0-.723.659-1.381 1.384-1.381h7.306c.226 0 .44.087.602.247m4.092 18.23c.098 0 .194-.099.194-.172h-.003V9.018h-2.28c-.998 0-1.86-.33-2.493-.953-.64-.627-.978-1.484-.978-2.479V3.362H9.449v.614h.907a.6.6 0 0 1 .594.605.6.6 0 0 1-.594.605H9.45V6.71h.907a.6.6 0 0 1 .594.605.6.6 0 0 1-.594.605H9.45v1.524h.907a.6.6 0 0 1 .594.605.6.6 0 0 1-.594.605H9.45v1.523h.907a.6.6 0 0 1 .594.606.6.6 0 0 1-.594.604H9.45v.493h.885a.6.6 0 0 1 .594.606v2.266a.6.6 0 0 1-.594.605h-3a.6.6 0 0 1-.594-.605v-2.266a.6.6 0 0 1 .594-.606h.927v-1.86h-.935a.6.6 0 0 1-.594-.604.6.6 0 0 1 .594-.606h.935V9.288h-.935a.6.6 0 0 1-.594-.605.6.6 0 0 1 .594-.605h.935V6.553h-.935a.6.6 0 0 1-.594-.605.6.6 0 0 1 .594-.605h.935v-1.98H6.006c-.075 0-.19.111-.196.173V20.46c0 .062.098.171.196.171zM9.74 16.146v-.815H7.93v.815zm3.896-12.334V5.59c0 .658.213 1.216.614 1.61.406.399.983.611 1.667.611H17.7z"
            />
        </svg>
    );
};

export default IconFileCompressedRegular;
