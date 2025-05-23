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

const IconWinnerCheckRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.821 18.475-2.201-3.787a7.44 7.44 0 0 0 2.007-5.115C19.627 5.408 16.22 2 12.054 2S4.48 5.408 4.48 9.573c0 1.93.718 3.714 1.93 5.038l-2.235 3.864a.58.58 0 0 0 .039.645c.15.19.378.267.606.19l2.991-.874.907 3.142a.62.62 0 0 0 .495.417h.077c.19 0 .378-.111.495-.3l2.235-3.904 2.235 3.904c.111.189.3.3.495.3h.077a.62.62 0 0 0 .495-.417l.911-3.142 2.992.873c.228.078.455 0 .606-.189.102-.19.102-.417-.01-.645M12.054 3.513c3.336 0 6.06 2.725 6.06 6.06 0 3.336-2.724 6.061-6.06 6.061s-6.06-2.725-6.06-6.06c0-3.336 2.724-6.061 6.06-6.061M9.44 19.988l-.683-2.386a.6.6 0 0 0-.267-.339c-.111-.078-.3-.078-.417-.039l-2.157.645 1.4-2.385a7.6 7.6 0 0 0 3.865 1.667zm6.517-2.802c-.15-.04-.3-.04-.417.038-.112.078-.228.19-.267.34l-.683 2.385-1.663-2.875a7.45 7.45 0 0 0 3.903-1.59l1.362 2.346zm-5.532-4.088 5.188-5.188c.3-.3.3-.756 0-1.062a.73.73 0 0 0-1.062 0L10.42 10.98 9.096 9.656c-.3-.3-.756-.3-1.062 0-.3.3-.3.756 0 1.062z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.821 18.475-2.201-3.787a7.44 7.44 0 0 0 2.007-5.115C19.627 5.408 16.22 2 12.054 2S4.48 5.408 4.48 9.573c0 1.93.717 3.714 1.93 5.038l-2.236 3.864a.58.58 0 0 0 .039.645c.15.19.378.267.606.19l2.991-.874.907 3.142a.62.62 0 0 0 .495.417h.077c.19 0 .378-.111.495-.3l2.235-3.904 2.235 3.904c.112.189.3.3.495.3h.077a.62.62 0 0 0 .495-.417l.911-3.142 2.992.873c.228.078.455 0 .606-.189.102-.19.102-.417-.01-.645M12.054 3.513c3.336 0 6.06 2.725 6.06 6.06 0 3.336-2.724 6.061-6.06 6.061s-6.06-2.725-6.06-6.06c0-3.336 2.724-6.061 6.06-6.061M9.44 19.988l-.684-2.386a.6.6 0 0 0-.267-.339c-.111-.078-.3-.078-.417-.039l-2.157.645 1.4-2.385a7.6 7.6 0 0 0 3.865 1.667zm6.516-2.802c-.15-.04-.3-.04-.417.038-.112.078-.228.19-.267.34l-.683 2.385-1.663-2.875a7.45 7.45 0 0 0 3.903-1.59l1.362 2.346zm-5.532-4.088 5.188-5.188c.3-.3.3-.756 0-1.062a.73.73 0 0 0-1.062 0L10.42 10.98 9.096 9.656c-.3-.3-.756-.3-1.062 0-.3.3-.3.756 0 1.062z"
                />
            </svg>
        );
    }
};

export default IconWinnerCheckRegular;
