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

const IconData10GbRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.213 6.429-3.786-3.786C15.035 2.214 14.463 2 13.892 2H6.285a2.15 2.15 0 0 0-2.143 2.143V22h15.714V7.964c0-.571-.214-1.143-.643-1.535m-.786 14.142H5.57V4.143c0-.393.322-.714.715-.714h7.607c.178 0 .357.071.5.214l3.821 3.821a.7.7 0 0 1 .214.5zM13.25 12.18c1.178 0 1.964-1.108 1.964-2.858s-.75-2.857-1.964-2.857-1.964 1.072-1.964 2.857c0 1.75.75 2.858 1.964 2.858m0-4.643c.821 0 .893 1.357.893 1.785 0 .893-.286 1.786-.893 1.786-.857 0-.893-1.5-.893-1.786 0-.535.071-1.785.893-1.785m-.893 8.214a2.866 2.866 0 0 1-2.857 2.857 2.866 2.866 0 0 1-2.857-2.857 2.866 2.866 0 0 1 2.857-2.857c.643 0 1.286.214 1.786.643.214.178.285.535.071.75-.179.214-.536.285-.75.071a1.82 1.82 0 0 0-1.107-.393c-1 0-1.786.786-1.786 1.786S8.5 17.536 9.5 17.536c.786 0 1.464-.536 1.714-1.25H9.856a.55.55 0 0 1-.536-.536.55.55 0 0 1 .536-.536h1.964a.55.55 0 0 1 .536.536M8.463 7.571a.53.53 0 0 1 .286-.678l.893-.357a.5.5 0 0 1 .5.071c.143.107.25.25.25.429v4.643a.55.55 0 0 1-.536.535.55.55 0 0 1-.536-.535V7.786l-.143.071c-.285.107-.607-.036-.714-.286m8.214 8q.322-.428.322-.964c0-.928-.75-1.714-1.714-1.714H13.57a.55.55 0 0 0-.535.536v4.642c0 .286.25.536.535.536h2.072c.928 0 1.714-.75 1.714-1.714 0-.536-.25-1-.679-1.322m-2.535-1.607h1.143a.64.64 0 0 1 .642.643c0 .357-.285.607-.642.607h-1.143zm1.5 3.572h-1.5v-1.25h1.5a.64.64 0 0 1 .643.643c0 .357-.286.607-.643.607"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.213 6.429-3.786-3.786C15.036 2.214 14.464 2 13.893 2H6.285a2.15 2.15 0 0 0-2.143 2.143V22h15.714V7.964c0-.571-.214-1.143-.643-1.535m-.786 14.142H5.57V4.143c0-.393.322-.714.715-.714h7.607c.178 0 .357.071.5.214l3.821 3.821a.7.7 0 0 1 .214.5zM13.25 12.18c1.178 0 1.964-1.108 1.964-2.858s-.75-2.857-1.964-2.857-1.964 1.072-1.964 2.857c0 1.75.75 2.858 1.964 2.858m0-4.643c.821 0 .893 1.357.893 1.785 0 .893-.286 1.786-.893 1.786-.857 0-.893-1.5-.893-1.786 0-.535.072-1.785.893-1.785m-.893 8.214A2.866 2.866 0 0 1 9.5 18.607a2.866 2.866 0 0 1-2.857-2.857 2.866 2.866 0 0 1 2.857-2.857c.643 0 1.286.214 1.786.643.214.178.285.535.071.75-.178.214-.536.285-.75.071a1.82 1.82 0 0 0-1.107-.393c-1 0-1.786.786-1.786 1.786S8.5 17.536 9.5 17.536c.786 0 1.464-.536 1.714-1.25H9.856a.55.55 0 0 1-.536-.536.55.55 0 0 1 .536-.536h1.964a.55.55 0 0 1 .536.536M8.463 7.571a.53.53 0 0 1 .286-.678l.893-.357a.5.5 0 0 1 .5.071c.143.107.25.25.25.429v4.643a.55.55 0 0 1-.536.535.55.55 0 0 1-.536-.535V7.786l-.143.071c-.285.107-.607-.036-.714-.286m8.215 8q.32-.428.32-.964c0-.928-.75-1.714-1.713-1.714H13.57a.55.55 0 0 0-.535.536v4.642c0 .286.25.536.535.536h2.072c.928 0 1.714-.75 1.714-1.714 0-.536-.25-1-.679-1.322m-2.536-1.607h1.143a.64.64 0 0 1 .643.643c0 .357-.286.607-.643.607h-1.143zm1.5 3.572h-1.5v-1.25h1.5a.64.64 0 0 1 .643.643c0 .357-.286.607-.643.607"
                />
            </svg>
        );
    }
};

export default IconData10GbRegular;
