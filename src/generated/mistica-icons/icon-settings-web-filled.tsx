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

const IconSettingsWebFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.841 5.993c0-.759-.641-1.378-1.428-1.378H3.583c-.79 0-1.428.62-1.428 1.378v12.012c0 .759.638 1.375 1.428 1.375h16.83c.787 0 1.428-.62 1.428-1.378zm-16.496.83c0 .296-.249.537-.56.537a.55.55 0 0 1-.557-.537V6.82a.55.55 0 0 1 .56-.535h.003a.545.545 0 0 1 .554.538m15.292 11.179c0 .12-.101.216-.224.216H3.583a.22.22 0 0 1-.224-.216V8.338h17.278zm-5.062-5.588c.386 0 .697.3.697.672v.585c0 .37-.31.673-.697.673h-.501q-.06.247-.152.465l.406.392c.267.252.275.67.026.935l-.025.026-.446.428a.725.725 0 0 1-.994 0l-.406-.395q-.237.092-.485.148v.482c0 .37-.314.673-.698.673h-.607a.685.685 0 0 1-.698-.673v-.482a3 3 0 0 1-.484-.148l-.407.395a.74.74 0 0 1-.994 0l-.445-.431a.666.666 0 0 1-.02-.939l.02-.02.403-.386a3 3 0 0 1-.149-.47h-.5a.685.685 0 0 1-.698-.673v-.585c0-.37.31-.672.697-.672h.501c.034-.138.082-.309.149-.471l-.403-.39a.65.65 0 0 1-.205-.478c0-.185.073-.356.207-.482l.443-.429a.74.74 0 0 1 .994 0l.407.392q.226-.087.484-.145v-.482c0-.37.314-.672.698-.672h.607c.387 0 .698.302.698.672v.482c.17.039.328.084.485.148l.406-.395a.72.72 0 0 1 .994 0l.446.429c.263.252.274.67.022.935l-.008.009-.014.014-.41.392q.092.22.152.468c.003.003.504.003.504.003m-3.577 2.56c1.053 0 1.658-.583 1.658-1.597s-.605-1.594-1.658-1.594-1.658.58-1.658 1.594.605 1.597 1.658 1.597m-5.532-8.69a.55.55 0 0 1 .557.539.55.55 0 0 1-.56.537.55.55 0 0 1-.558-.537.55.55 0 0 1 .558-.538zm2.235.539a.55.55 0 0 1-.56.537.55.55 0 0 1-.558-.537V6.82a.55.55 0 0 1 .56-.535.55.55 0 0 1 .558.538"
            />
        </svg>
    );
};

export default IconSettingsWebFilled;
