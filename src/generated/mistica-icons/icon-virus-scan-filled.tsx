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

const IconVirusScanFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.662 20.805a.6.6 0 0 1 .006.851l-.006.006a.614.614 0 0 1-.866 0l-5.826-5.776a7.84 7.84 0 0 1-4.989 1.784c-4.325 0-7.826-3.473-7.826-7.759 0-4.283 3.501-7.756 7.824-7.756 4.322 0 7.823 3.473 7.823 7.756a7.68 7.68 0 0 1-1.96 5.126c.002 0 5.82 5.768 5.82 5.768M14.035 10.7v-.748a.53.53 0 0 0-.53-.526h-.639a4.2 4.2 0 0 0-.285-1.233l.832-.25a.524.524 0 0 0 .375-.528l-.062-1.127c-.016-.288-.271-.481-.557-.495a.527.527 0 0 0-.501.551l.039.718-.437.131c.011-.081.02-.16.02-.25 0-1.652-1.62-1.652-2.311-1.652-.692 0-2.311 0-2.311 1.653 0 .09.01.169.021.25l.001.008-.465-.14.04-.718a.527.527 0 0 0-.502-.551c-.275-.006-.54.204-.558.495l-.061 1.127a.53.53 0 0 0 .375.532l.852.255c-.16.375-.244.795-.286 1.227h-.639a.526.526 0 0 0-.53.523v.748c0 .291.239.524.53.524s.53-.232.53-.524v-.221h.073c.005.532.047 1.05.17 1.512l-.703.21a.53.53 0 0 0-.375.533l.062 1.123a.53.53 0 0 0 .529.499h.03a.53.53 0 0 0 .502-.552l-.039-.714.454-.138c.428.552 1.134.902 2.297.902 1.157 0 1.862-.347 2.291-.896l.437.132-.04.714a.527.527 0 0 0 .502.552h.031c.28 0 .513-.216.53-.499l.061-1.126a.53.53 0 0 0-.375-.532l-.684-.205c.126-.465.168-.983.171-1.518h.073v.221c0 .292.238.524.532.524a.52.52 0 0 0 .53-.52m-5.3-3.764v.016h2.498l.003-.016c0-.13 0-.247-.067-.342-.11-.16-.403-.258-1.185-.258-1.25 0-1.25.252-1.25.6m1.742 4.98a.528.528 0 0 1-1.059 0V9.116c0-.292.238-.524.53-.524.291 0 .53.232.53.524zm1.367-1.605c0-1.224-.18-1.88-.594-2.19-.269-.2-.686-.298-1.269-.298-.59 0-1.008.099-1.277.303-.412.31-.585.966-.585 2.185 0 1.955.4 2.49 1.862 2.49s1.863-.535 1.863-2.49"
            />
        </svg>
    );
};

export default IconVirusScanFilled;
