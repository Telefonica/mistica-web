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

const IconSubscriptionFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.739 12.166V22H3.908V2h13.83v.944a5 5 0 0 0-.364-.02 4.48 4.48 0 0 0-3.213 1.357 4.65 4.65 0 0 0-1.333 3.276c0 1.238.475 2.4 1.332 3.272a4.48 4.48 0 0 0 3.214 1.356c.121 0 .242-.01.363-.019m-.364-6.648q.189.002.364.038v4.002a2 2 0 0 1-.364.038A1.97 1.97 0 0 1 15.96 9a2.05 2.05 0 0 1-.586-1.442c0-.545.209-1.057.586-1.441.378-.384.88-.598 1.416-.598m-2.91 11.115h-7.28a.55.55 0 0 0-.546.554c0 .308.243.555.545.555h7.276c.307 0 .55-.251.55-.555a.55.55 0 0 0-.546-.555m.544-2.779a.55.55 0 0 0-.545-.555h-7.28a.55.55 0 0 0-.545.555c0 .308.243.555.545.555h7.276c.307 0 .55-.252.55-.555m6.148-7.61a.54.54 0 0 1 .773 0 .567.567 0 0 1 .005.787L20.52 8.472l-1.416-1.441a.56.56 0 0 1 0-.787.53.53 0 0 1 .61-.11 2.7 2.7 0 0 0-.41-.545 2.686 2.686 0 0 0-3.857 0 2.78 2.78 0 0 0-.8 1.963c0 .74.284 1.437.801 1.963a2.686 2.686 0 0 0 3.857 0 .54.54 0 0 1 .773 0 .56.56 0 0 1 0 .788 3.76 3.76 0 0 1-2.702 1.138 3.76 3.76 0 0 1-2.701-1.138 3.9 3.9 0 0 1-1.118-2.75c0-1.039.396-2.016 1.118-2.75a3.76 3.76 0 0 1 2.701-1.139c1.02 0 1.98.403 2.702 1.138.438.446.75.991.931 1.594z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.739 12.166V22H3.908V2h13.83v.944a5 5 0 0 0-.364-.02 4.48 4.48 0 0 0-3.213 1.357 4.65 4.65 0 0 0-1.333 3.276c0 1.238.475 2.4 1.332 3.272a4.48 4.48 0 0 0 3.214 1.356c.121 0 .242-.01.363-.019m-.364-6.648q.189.002.364.038v4.002a2 2 0 0 1-.364.038A1.97 1.97 0 0 1 15.96 9a2.05 2.05 0 0 1-.586-1.442c0-.545.209-1.057.586-1.441.378-.384.88-.598 1.416-.598m-2.91 11.115h-7.28a.55.55 0 0 0-.546.554c0 .308.243.555.545.555h7.276c.307 0 .55-.251.55-.555a.55.55 0 0 0-.546-.555m.544-2.779a.55.55 0 0 0-.545-.555h-7.28a.55.55 0 0 0-.545.555c0 .308.243.555.545.555h7.276c.307 0 .55-.252.55-.555m6.148-7.61a.54.54 0 0 1 .773 0 .567.567 0 0 1 .005.787L20.52 8.472l-1.416-1.441a.56.56 0 0 1 0-.787.53.53 0 0 1 .61-.11 2.7 2.7 0 0 0-.41-.545 2.686 2.686 0 0 0-3.857 0 2.78 2.78 0 0 0-.8 1.963c0 .74.284 1.437.801 1.963a2.686 2.686 0 0 0 3.857 0 .54.54 0 0 1 .773 0 .56.56 0 0 1 0 .788 3.76 3.76 0 0 1-2.702 1.138 3.76 3.76 0 0 1-2.701-1.138 3.9 3.9 0 0 1-1.118-2.75c0-1.039.396-2.016 1.118-2.75a3.76 3.76 0 0 1 2.701-1.139c1.02 0 1.98.403 2.702 1.138.438.446.75.991.931 1.594z"
                />
            </svg>
        );
    }
};

export default IconSubscriptionFilled;
