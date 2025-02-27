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

const IconData10GbLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.213 6.429-3.786-3.786C15.036 2.214 14.464 2 13.893 2H6.285a2.15 2.15 0 0 0-2.143 2.143V22h15.714V7.964c0-.571-.214-1.143-.643-1.535m-.786 14.142H5.57V4.143c0-.393.322-.714.715-.714h7.607c.178 0 .357.071.5.214l3.821 3.821a.7.7 0 0 1 .214.5zM13.25 12.18c1.178 0 1.964-1.108 1.964-2.858s-.75-2.857-1.964-2.857-1.964 1.072-1.964 2.857c0 1.75.75 2.858 1.964 2.858m0-4.643c.821 0 .893 1.357.893 1.785 0 .893-.286 1.786-.893 1.786-.857 0-.893-1.5-.893-1.786 0-.535.072-1.785.893-1.785m-.893 8.214A2.866 2.866 0 0 1 9.5 18.607a2.866 2.866 0 0 1-2.857-2.857 2.866 2.866 0 0 1 2.857-2.857c.643 0 1.286.214 1.786.643.214.178.285.535.071.75-.178.214-.536.285-.75.071a1.82 1.82 0 0 0-1.107-.393c-1 0-1.786.786-1.786 1.786S8.5 17.536 9.5 17.536c.786 0 1.464-.536 1.714-1.25H9.856a.55.55 0 0 1-.536-.536.55.55 0 0 1 .536-.536h1.964a.55.55 0 0 1 .536.536M8.463 7.571a.53.53 0 0 1 .286-.678l.893-.357a.5.5 0 0 1 .5.071c.143.107.25.25.25.429v4.643a.55.55 0 0 1-.536.535.55.55 0 0 1-.536-.535V7.786l-.143.071c-.285.107-.607-.036-.714-.286m8.215 8q.32-.428.32-.964c0-.928-.75-1.714-1.713-1.714H13.57a.55.55 0 0 0-.535.536v4.642c0 .286.25.536.535.536h2.072c.928 0 1.714-.75 1.714-1.714 0-.536-.25-1-.679-1.322m-2.536-1.607h1.143a.64.64 0 0 1 .643.643c0 .357-.286.607-.643.607h-1.143zm1.5 3.572h-1.5v-1.25h1.5a.64.64 0 0 1 .643.643c0 .357-.286.607-.643.607"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.673 19.5a.716.716 0 0 1-.714.714.716.716 0 0 1-.715-.714c0-.393.322-.714.715-.714s.714.321.714.714m-.714 1.786H5.03V3.82c0-.607.5-1.107 1.072-1.107h7.5c.285 0 .607.143.82.322l3.822 3.821c.215.214.358.5.358.75v9.75c0 .214.142.357.357.357.214 0 .357-.143.357-.357v-9.75c0-.428-.214-.893-.572-1.25l-3.821-3.821C14.6 2.214 14.066 2 13.6 2h-7.5c-1 0-1.785.821-1.785 1.821V22h14.643c.214 0 .357-.143.357-.357s-.143-.357-.357-.357M12.887 12c-1.107 0-1.786-1.036-1.786-2.679 0-1.678.68-2.678 1.786-2.678 1.107 0 1.786 1.036 1.786 2.678 0 1.643-.714 2.679-1.786 2.679m0-.714c.786 0 1.072-1.072 1.072-1.965 0-.464-.072-1.964-1.072-1.964-.964 0-1.071 1.357-1.071 1.964 0 .965.285 1.965 1.071 1.965m-6.071 4.107a2.7 2.7 0 0 0 2.678 2.678 2.7 2.7 0 0 0 2.679-2.678c0-.214-.143-.357-.357-.357H9.852c-.215 0-.358.143-.358.357s.143.357.358.357h1.57a1.955 1.955 0 0 1-1.928 1.607 1.98 1.98 0 0 1-1.964-1.964c0-1.072.893-1.964 1.964-1.964.465 0 .893.142 1.215.428.143.107.393.107.5-.071.107-.143.107-.393-.072-.5-.464-.393-1.071-.572-1.678-.572-1.429 0-2.643 1.215-2.643 2.679M10.03 12c.214 0 .357-.143.357-.357V7c0-.107-.071-.214-.143-.286a.35.35 0 0 0-.321-.035l-.893.357c-.178.071-.286.285-.214.464s.286.286.464.214l.393-.178v4.107c0 .214.143.357.357.357m2.857 5.714v-4.643c0-.214.143-.357.357-.357h1.858c.75.072 1.357.75 1.357 1.5 0 .393-.143.75-.393 1 .464.25.75.75.75 1.322 0 .821-.679 1.5-1.5 1.5h-2.072c-.214.035-.357-.107-.357-.322m2.429-1.964H13.6v1.607h1.715a.793.793 0 0 0 .786-.786c0-.428-.358-.821-.786-.821m-1.715-.714h1.358a.793.793 0 0 0 .785-.786c0-.429-.321-.786-.75-.786h-1.393z"
                />
            </svg>
        );
    }
};

export default IconData10GbLight;
