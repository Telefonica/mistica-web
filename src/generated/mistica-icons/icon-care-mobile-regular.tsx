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

const IconCareMobileRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <g clipPath="url(#a)">
                <path
                    fill={fillColor}
                    d="M19.313 14.127h-4.517c-.807 0-1.407-.196-1.821-.61-.415-.415-.622-1.015-.622-1.833V2.662c0-.797.196-1.386.622-1.811.425-.426 1.014-.633 1.821-.633h4.517c.807 0 1.407.207 1.822.622.414.415.61 1.015.61 1.822v9.022c0 .818-.207 1.418-.621 1.832s-1.004.611-1.811.611M14.796 1.342c-.96 0-1.32.36-1.32 1.32v9.022c0 .992.339 1.32 1.32 1.32h4.517c.992 0 1.32-.338 1.32-1.32V2.662c0-.502-.098-.84-.295-1.037s-.534-.294-1.036-.294h-4.506zM16.75 12.48a1 1 0 0 0 .306.044.96.96 0 0 0 .687-.262c.163-.164.25-.393.25-.677 0-.578-.36-.938-.937-.938-.579 0-.939.36-.939.938a.94.94 0 0 0 .251.677c.098.098.23.174.382.218M3.353 22.985h1.734c.495 0 .931-.271 1.167-.672l3.393 1.403c.262.11.535.164.808.164.272 0 .534-.054.763-.164l8.695-3.545c.48-.196.85-.567 1.047-1.047a1.9 1.9 0 0 0-.01-1.484 1.92 1.92 0 0 0-.972-.993 1.96 1.96 0 0 0-1.385-.076L13.3 18.249q.023-.133.023-.27c0-.895-.72-1.615-1.593-1.626l-1.113-.077a4.5 4.5 0 0 1-1.603-.36l-.917-.382a6 6 0 0 0-1.685-.422 1.36 1.36 0 0 0-1.326-1.083H3.353A1.36 1.36 0 0 0 2 15.382v6.25c0 .743.61 1.353 1.353 1.353m6.73-.338L6.44 21.14v-4.864c.414.058.82.168 1.21.328l.917.381a5.9 5.9 0 0 0 1.986.448l1.123.076h.033c.262 0 .47.207.47.47 0 .256-.2.46-.454.468h-.016l-2.89.044a.57.57 0 0 0-.404.175.6.6 0 0 0-.164.414.59.59 0 0 0 .589.567l3.61-.054c.306 0 .612-.055.896-.142l5.618-1.778c.37-.131.785.054.938.425a.74.74 0 0 1 .01.59.77.77 0 0 1-.414.414l-8.683 3.545a.94.94 0 0 1-.731 0m-6.927-7.265c0-.11.088-.197.197-.197h1.734c.11 0 .197.088.197.197v6.25c0 .11-.088.197-.197.197H3.353a.196.196 0 0 1-.197-.196z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill={fillColor} d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default IconCareMobileRegular;
