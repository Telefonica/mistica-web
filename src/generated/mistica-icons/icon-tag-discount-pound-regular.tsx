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

const IconTagDiscountPoundRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.34 2.213a.674.674 0 0 1 .984 0 .75.75 0 0 1 0 1.028l-1.188 1.243v8.423a.75.75 0 0 1-.21.521l-7.743 7.94a2.02 2.02 0 0 1-2.946-.01L3.09 14.93a2.254 2.254 0 0 1 0-3.085l7.503-8.167a.68.68 0 0 1 .503-.224h8.055zm-9.136 18.116 7.539-7.725h-.005V5.94l-.899.94a.67.67 0 0 1-.98 0 .75.75 0 0 1 .001-1.028l.9-.945h-6.37l-7.307 7.958a.754.754 0 0 0-.009 1.038l6.146 6.426a.674.674 0 0 0 .984 0m3.542-6.328a.53.53 0 0 1-.52.544H11.27A.53.53 0 0 1 10.75 14a.53.53 0 0 1 .52-.545c.098 0 .174-.08.174-.181v-.908a.53.53 0 0 1-.52-.544.53.53 0 0 1 .52-.545v-.907c0-.903.703-1.638 1.567-1.638.431 0 .845.186 1.139.516a.567.567 0 0 1-.022.773.51.51 0 0 1-.739-.024.5.5 0 0 0-.378-.172c-.29 0-.521.247-.521.545v.907h.868c.29 0 .52.242.52.545a.53.53 0 0 1-.52.544h-.868v.907q0 .092-.013.182h1.749c.284-.005.52.242.52.545M9.01 12.362a.53.53 0 0 0 .52-.544.53.53 0 0 0-.52-.544H7.27a.53.53 0 0 0-.521.544.53.53 0 0 0 .52.544z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.34 2.213a.674.674 0 0 1 .984 0 .75.75 0 0 1 0 1.028l-1.188 1.243v8.423a.75.75 0 0 1-.21.521l-7.743 7.94a2.02 2.02 0 0 1-2.946-.01L3.09 14.93a2.254 2.254 0 0 1 0-3.085l7.503-8.167a.68.68 0 0 1 .503-.224h8.055zm-9.136 18.116 7.539-7.725h-.005V5.94l-.899.94a.67.67 0 0 1-.98 0 .75.75 0 0 1 .001-1.028l.9-.945h-6.37l-7.307 7.958a.754.754 0 0 0-.009 1.038l6.146 6.426a.674.674 0 0 0 .984 0m3.542-6.328a.53.53 0 0 1-.52.544H11.27A.53.53 0 0 1 10.75 14a.53.53 0 0 1 .52-.545c.098 0 .174-.08.174-.181v-.908a.53.53 0 0 1-.52-.544.53.53 0 0 1 .52-.545v-.907c0-.903.703-1.638 1.567-1.638.431 0 .845.186 1.139.516a.567.567 0 0 1-.022.773.51.51 0 0 1-.739-.024.5.5 0 0 0-.378-.172c-.29 0-.521.247-.521.545v.907h.868c.29 0 .52.242.52.545a.53.53 0 0 1-.52.544h-.868v.907q0 .092-.013.182h1.749c.284-.005.52.242.52.545M9.01 12.362a.53.53 0 0 0 .52-.544.53.53 0 0 0-.52-.544H7.27a.53.53 0 0 0-.521.544.53.53 0 0 0 .52.544z"
                />
            </svg>
        );
    }
};

export default IconTagDiscountPoundRegular;
