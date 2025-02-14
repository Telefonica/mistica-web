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

const IconHotlineRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.686 12.338a.7.7 0 0 1-.175-.023l-2.432-.68a4.6 4.6 0 0 1-1.811.374c-2.641 0-4.785-2.244-4.785-5S4.623 2 7.263 2c2.642 0 4.785 2.245 4.785 5 0 .657-.118 1.296-.358 1.898l.65 2.54a.75.75 0 0 1-.174.69.65.65 0 0 1-.48.21m-7.208 8.284C5.373 21.553 6.548 22 7.883 22c2.637 0 5.911-1.743 8.989-4.986 4.61-4.868 5.968-10.192 3.3-12.952L18.85 2.694a2.2 2.2 0 0 0-1.476-.69 1.92 1.92 0 0 0-1.497.598l-1.982 2.09c-.389.41-.585.967-.555 1.57.03.574.27 1.117.672 1.536l1.384 1.433c.459.474.385 1.209.24 1.738-.248.908-.89 1.944-1.811 2.915-1.746 1.843-3.62 2.56-4.449 1.702l-1.384-1.433c-.85-.88-2.187-.921-2.973-.09l-1.981 2.089c-.389.41-.585.967-.555 1.569.03.57.27 1.118.672 1.533zm1.506-5.56a.58.58 0 0 1 .428-.179.87.87 0 0 1 .616.283L8.412 16.6c1.436 1.482 3.998.793 6.378-1.716 1.095-1.158 1.838-2.377 2.152-3.53.345-1.274.13-2.387-.594-3.14l-1.384-1.432a.96.96 0 0 1-.27-.602.65.65 0 0 1 .161-.488l1.982-2.09a.57.57 0 0 1 .463-.173c.21.01.419.11.58.278l1.323 1.369c2.096 2.167.738 6.665-3.309 10.935-4.064 4.288-8.364 5.766-10.46 3.6l-1.323-1.37a.96.96 0 0 1-.27-.601.65.65 0 0 1 .161-.488zm3.213-4.873 1.524.424-.406-1.592a.72.72 0 0 1 .043-.488c.219-.48.328-.995.328-1.533 0-1.97-1.537-3.577-3.423-3.577S3.841 5.03 3.841 7s1.536 3.577 3.422 3.577c.511 0 1.004-.114 1.467-.342a.66.66 0 0 1 .467-.046M7.25 4.673a.52.52 0 0 0-.51.534.52.52 0 0 0 .51.534.52.52 0 0 0 .511-.534.52.52 0 0 0-.51-.534m.511 2.318v1.784a.52.52 0 0 1-.51.533.52.52 0 0 1-.512-.533V6.99a.52.52 0 0 1 .511-.534.52.52 0 0 1 .511.534"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M11.686 12.338a.7.7 0 0 1-.175-.023l-2.432-.68a4.6 4.6 0 0 1-1.811.374c-2.641 0-4.785-2.244-4.785-5S4.623 2 7.263 2c2.642 0 4.785 2.245 4.785 5 0 .657-.118 1.296-.358 1.898l.65 2.54a.75.75 0 0 1-.174.69.65.65 0 0 1-.48.21m-7.208 8.284C5.373 21.553 6.548 22 7.883 22c2.637 0 5.911-1.743 8.989-4.986 4.61-4.868 5.968-10.192 3.3-12.952L18.85 2.694a2.2 2.2 0 0 0-1.476-.69 1.92 1.92 0 0 0-1.497.598l-1.982 2.09c-.389.41-.585.967-.555 1.57.03.574.27 1.117.672 1.536l1.384 1.433c.459.474.385 1.209.24 1.738-.248.908-.89 1.944-1.811 2.915-1.746 1.843-3.62 2.56-4.449 1.702l-1.384-1.433c-.85-.88-2.187-.921-2.973-.09l-1.981 2.089c-.389.41-.585.967-.555 1.569.03.57.27 1.118.672 1.533zm1.506-5.56a.58.58 0 0 1 .428-.179.87.87 0 0 1 .616.283L8.412 16.6c1.436 1.482 3.998.793 6.378-1.716 1.095-1.158 1.838-2.377 2.152-3.53.345-1.274.13-2.387-.594-3.14l-1.384-1.432a.96.96 0 0 1-.27-.602.65.65 0 0 1 .161-.488l1.982-2.09a.57.57 0 0 1 .463-.173c.21.01.419.11.58.278l1.323 1.369c2.096 2.167.738 6.665-3.309 10.935-4.064 4.288-8.364 5.766-10.46 3.6l-1.323-1.37a.96.96 0 0 1-.27-.601.65.65 0 0 1 .161-.488zm3.213-4.873 1.524.424-.406-1.592a.72.72 0 0 1 .043-.488c.219-.48.328-.995.328-1.533 0-1.97-1.537-3.577-3.423-3.577S3.841 5.03 3.841 7s1.536 3.577 3.422 3.577c.511 0 1.004-.114 1.467-.342a.66.66 0 0 1 .467-.046M7.25 4.673a.52.52 0 0 0-.51.534.52.52 0 0 0 .51.534.52.52 0 0 0 .511-.534.52.52 0 0 0-.51-.534m.511 2.318v1.784a.52.52 0 0 1-.51.533.52.52 0 0 1-.512-.533V6.99a.52.52 0 0 1 .511-.534.52.52 0 0 1 .511.534"
                />
            </svg>
        );
    }
};

export default IconHotlineRegular;
