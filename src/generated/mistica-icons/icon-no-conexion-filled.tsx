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

const IconNoConexionFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M20.605 15.41a5 5 0 0 0-1-.788c-.543-.336-1.1-.504-1.66-.504q-.236 0-.474.042c-.72.12-1.423.524-2.095 1.196-.171.171-.278.291-.443.496a.3.3 0 0 1-.118.025c-.184 0-.54-.115-1.131-.518-.883-.605-1.922-1.614-2.628-2.322l-.084-.082c-.706-.705-1.714-1.747-2.32-2.63-.523-.762-.562-1.134-.495-1.252a6 6 0 0 0 .496-.442c.672-.673 1.076-1.379 1.199-2.096.12-.72-.034-1.44-.465-2.134a4.9 4.9 0 0 0-.787-1c-.81-.807-1.65-1.224-2.496-1.241H6.05c-.86 0-1.731.415-2.583 1.23-.3.283-.59.684-.69.822l-.005.007-.014.017-.016.025c-.796 1.154-.776 2.941.056 5.033.873 2.188 2.568 4.58 4.907 6.92l.006.002.078.078c2.34 2.34 4.731 4.037 6.919 4.908 1.07.426 2.061.641 2.93.641.826 0 1.54-.193 2.104-.582l.025-.02.017-.011c.134-.095.54-.39.831-.692.832-.871 1.247-1.759 1.227-2.639-.017-.845-.431-1.683-1.238-2.49m-3.826-3.342c-3.053 0-4.832-1.544-4.832-4.838 0-3.3 1.779-4.843 4.832-4.843s4.835 1.543 4.835 4.843-1.782 4.838-4.835 4.838M15.56 9.3 16.78 8.08 18 9.303a.604.604 0 0 0 .852.003l.003-.003a.605.605 0 0 0 0-.854l-1.222-1.222 1.222-1.224a.604.604 0 0 0-.852-.854L16.782 6.37l-1.216-1.218a.605.605 0 0 0-.854.854l1.215 1.218-1.215 1.219a.603.603 0 1 0 .848.857"
            />
        </svg>
    );
};

export default IconNoConexionFilled;
