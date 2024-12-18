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

const IconPillFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M15.8 2.16c1.378-.027 2.784.628 4.1 1.945 2.555 2.552 2.594 5.367.11 7.927l-7.93 7.933-.004.003c-.063.066-.12.127-.187.182-1.207 1.129-2.476 1.694-3.75 1.694-1.365 0-2.734-.65-4.034-1.95-1.32-1.316-1.972-2.694-1.95-4.094.026-1.348.678-2.673 1.944-3.939l.146-.151c.12-.126.238-.247.361-.353l6.776-6.779c.078-.094.198-.208.32-.325l.002-.003.154-.145C13.124 2.842 14.45 2.186 15.8 2.16m.126 12.225 3.213-3.213c2.016-2.081 1.986-4.112-.104-6.199-1.053-1.053-2.115-1.588-3.154-1.588h-.056c-1.023.017-2.065.552-3.098 1.585l-.174.168a4 4 0 0 0-.269.272L9.777 7.917l-.004.034a.2.2 0 0 1-.007.047c-.445 1.367.148 2.84 1.815 4.507 1.123 1.124 2.768 2.364 4.25 1.891a.2.2 0 0 1 .057-.008q.019 0 .038-.003"
            />
        </svg>
    );
};

export default IconPillFilled;
