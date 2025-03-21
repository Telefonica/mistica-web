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

const IconPickpocketRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.775 11.6a.83.83 0 0 0-.379-.425L8.724 9.192a.847.847 0 0 0-1.147.35l-1.09 2.044q-.018-.002-.038-.004H4.663c-.668 0-1.211.547-1.211 1.218v4.687c0 2.486 2.014 4.515 4.49 4.515h1.35c2.475 0 4.49-2.03 4.49-4.519v-4.686c0-.6-.436-1.1-1.007-1.197m-.3 1.225q.025.006.057.01v1.487h-.854zm-1.808 1.497h-2.54l1.833-3.443 1.975 1.064zm-2.325-4.315.828.446-2.057 3.869H6.045zM5.82 12.836l-.79 1.482h-.328v-1.482zm3.472 7.908h-1.35c-1.786 0-3.24-1.464-3.24-3.26v-1.905h7.83v1.904c0 1.797-1.454 3.261-3.24 3.261m.71-8.676a.356.356 0 0 1 .483-.146l.314.167a.37.37 0 0 1 .175.215.35.35 0 0 1-.028.275l-.422.79a.357.357 0 0 1-.482.146l-.314-.168a.37.37 0 0 1-.175-.215.35.35 0 0 1 .028-.275zm11.42-5.076a.625.625 0 0 0-.685-.56l-1.626.167a.63.63 0 0 0-.55.515l-.189 1.043-1.236 1.221-2.025.779a.57.57 0 0 1-.447-.004.58.58 0 0 1-.314-.321.58.58 0 0 1 .003-.45.6.6 0 0 1 .318-.318l1.622-.668a1 1 0 0 0 .082-.04 1.7 1.7 0 0 0 .59-2.321 1.68 1.68 0 0 0-2.304-.597l-1.036.604a.63.63 0 0 0-.268.31L12.485 8.8a.587.587 0 0 1-1.079.088.59.59 0 0 1-.035-.446l.89-2.625 3.01-2.397 4.337-.16a.624.624 0 0 0 .6-.65.634.634 0 0 0-.647-.608l-4.54.164a.6.6 0 0 0-.364.136l-.668.532-3.78.883a1.846 1.846 0 0 0-.833 3.178c.29.259.657.418 1.045.454l-.232.69a1.85 1.85 0 0 0 1.171 2.329c.465.153.965.114 1.4-.107q.187-.098.347-.225.03.14.09.274c.185.458.535.815.985 1.004q.349.146.714.147c.233 0 .461-.043.675-.133l2.133-.821a.7.7 0 0 0 .214-.14l1.472-1.453a.63.63 0 0 0 .179-.336l.139-.775 1.16-.121a.63.63 0 0 0 .554-.69m-10.705-.896a.584.584 0 0 1-.61-.896.6.6 0 0 1 .374-.255l1.215-.282-.354.282a.64.64 0 0 0-.203.29l-.283.828zm3.397 1.846.314-.896.008-.022.853-.496a.437.437 0 0 1 .475.732l-1.568.647q-.038.014-.082.035"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.775 11.6a.83.83 0 0 0-.38-.425L8.725 9.192a.847.847 0 0 0-1.147.35l-1.09 2.044c-.014 0-.024-.004-.039-.004H4.662c-.667 0-1.21.547-1.21 1.218v4.687c0 2.486 2.014 4.515 4.49 4.515h1.35c2.475 0 4.49-2.03 4.49-4.519v-4.686c0-.6-.436-1.1-1.008-1.197m-.3 1.225q.025.006.057.01v1.487h-.854zm-1.808 1.497h-2.54l1.833-3.443 1.975 1.064zm-2.325-4.315.828.446-2.057 3.869H6.045zM5.82 12.836l-.79 1.482h-.328v-1.482zm3.472 7.908h-1.35c-1.786 0-3.24-1.464-3.24-3.26v-1.905h7.83v1.904c0 1.797-1.454 3.261-3.24 3.261m.71-8.676a.356.356 0 0 1 .483-.146l.314.167a.37.37 0 0 1 .175.215.35.35 0 0 1-.028.275l-.422.79a.357.357 0 0 1-.482.146l-.314-.168a.37.37 0 0 1-.175-.215.35.35 0 0 1 .028-.275zm11.42-5.076a.626.626 0 0 0-.686-.56l-1.625.167a.63.63 0 0 0-.55.515l-.19 1.043-1.235 1.221-2.025.779a.57.57 0 0 1-.447-.004.58.58 0 0 1-.314-.321.58.58 0 0 1 .003-.45.6.6 0 0 1 .318-.318l1.622-.668a1 1 0 0 0 .082-.04 1.7 1.7 0 0 0 .59-2.321 1.68 1.68 0 0 0-2.304-.597l-1.036.604a.63.63 0 0 0-.268.31L12.485 8.8a.587.587 0 0 1-1.079.088.59.59 0 0 1-.035-.446l.89-2.625 3.01-2.397 4.337-.16a.624.624 0 0 0 .6-.65.634.634 0 0 0-.647-.608l-4.54.164a.6.6 0 0 0-.364.136l-.668.532-3.78.883a1.846 1.846 0 0 0-.833 3.178c.29.259.657.418 1.045.454l-.233.69a1.85 1.85 0 0 0 1.172 2.329c.464.153.964.114 1.4-.107q.187-.098.347-.225.031.14.089.274c.186.458.536.815.986 1.004q.349.146.714.147c.232 0 .461-.043.675-.133l2.133-.821a.7.7 0 0 0 .214-.14l1.472-1.453a.63.63 0 0 0 .178-.336l.14-.775 1.16-.121a.63.63 0 0 0 .554-.69m-10.705-.896a.584.584 0 0 1-.61-.896.6.6 0 0 1 .374-.255l1.215-.282-.354.282a.64.64 0 0 0-.203.29l-.283.828zm3.397 1.846.314-.896.007-.022.854-.496a.437.437 0 0 1 .475.732l-1.568.647q-.038.014-.082.035"
                />
            </svg>
        );
    }
};

export default IconPickpocketRegular;
