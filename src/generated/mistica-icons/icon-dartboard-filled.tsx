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

const IconDartboardFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.84 5.507-2.57 2.57a.55.55 0 0 1-.39.16h-2.338l-6.444 6.449a.55.55 0 0 1-.39.16.55.55 0 0 1-.39-.94l6.444-6.445v-2.34a.55.55 0 0 1 .16-.39l2.569-2.569a.54.54 0 0 1 .601-.117.55.55 0 0 1 .338.507v2.02h2.02c.22 0 .423.136.507.338a.54.54 0 0 1-.117.597m-4.425 8.784a7.68 7.68 0 0 0-1.32-4.307l-2.414 2.414c.273.573.433 1.217.433 1.893a4.41 4.41 0 0 1-4.406 4.407 4.41 4.41 0 0 1-4.406-4.407 4.41 4.41 0 0 1 4.406-4.406c.676 0 1.32.155 1.893.432l2.414-2.414a7.66 7.66 0 0 0-4.307-1.32C5.457 6.583 2 10.04 2 14.29S5.457 22 9.708 22c4.25 0 7.707-3.457 7.707-7.709M8.67 15.33a1.466 1.466 0 0 0 2.076.005l2.09-2.095a3.304 3.304 0 0 1-3.128 4.355 3.304 3.304 0 0 1-3.302-3.303 3.304 3.304 0 0 1 4.354-3.128l-2.09 2.09a1.47 1.47 0 0 0 0 2.076m10.21-9.658a.547.547 0 0 1-.549-.55v-1.24l-1.465 1.466v1.79h1.79L20.12 5.67z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.84 5.507-2.57 2.57a.55.55 0 0 1-.39.16h-2.338l-6.444 6.449a.55.55 0 0 1-.39.16.55.55 0 0 1-.39-.94l6.444-6.445v-2.34a.55.55 0 0 1 .16-.39l2.569-2.569a.54.54 0 0 1 .601-.117.55.55 0 0 1 .338.507v2.02h2.02c.22 0 .423.136.507.338a.54.54 0 0 1-.117.597m-4.425 8.784a7.68 7.68 0 0 0-1.32-4.307l-2.414 2.414c.273.573.433 1.217.433 1.893a4.41 4.41 0 0 1-4.406 4.407 4.41 4.41 0 0 1-4.406-4.407 4.41 4.41 0 0 1 4.406-4.406c.676 0 1.32.155 1.893.432l2.414-2.414a7.66 7.66 0 0 0-4.307-1.32C5.457 6.583 2 10.04 2 14.29S5.457 22 9.708 22c4.25 0 7.707-3.457 7.707-7.709M8.67 15.33a1.466 1.466 0 0 0 2.076.005l2.09-2.095a3.304 3.304 0 0 1-3.128 4.355 3.304 3.304 0 0 1-3.302-3.303 3.304 3.304 0 0 1 4.354-3.128l-2.09 2.09a1.47 1.47 0 0 0 0 2.076m10.21-9.658a.547.547 0 0 1-.549-.55v-1.24l-1.465 1.466v1.79h1.79L20.12 5.67z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M16.055 9.063c.899 1.14 1.535 2.756 1.535 5.078 0 7.115-5.891 7.67-7.364 7.695-.14.002-.297.005-.457.005q-.127 0-.25-.003c-1.548-.022-7.363-.582-7.363-7.745 0-7.15 5.761-7.68 7.31-7.694h.16c.196 0 .398.002.572.008.874.02 3.212.238 5.028 1.79l.974-.975V4.068a.6.6 0 0 1 .088-.298l.005-.007a.6.6 0 0 1 .129-.154l.005-.008.011-.012 1.569-1.252q.01-.009.026-.013l.024-.012a.6.6 0 0 1 .401-.157c.33 0 .602.269.602.602v1.644a.594.594 0 0 1 .734.076c.168.168.21.41.137.62l1.314.013a.6.6 0 0 1 .594.608.3.3 0 0 1-.015.076l-.01.039a.5.5 0 0 1-.06.165l-.014.036q-.008.026-.021.048L20.58 7.73l-.01.009q-.005.003-.01.008a.6.6 0 0 1-.481.263h-2.972zm-1.821 1.817 1.82-1.817-.831-.866-2.314 2.314c-.62-.474-1.51-.801-2.796-.832-.16-.003-.619-.006-.619-.006-4.067.037-4.067 3.34-4.067 4.423 0 1.093 0 4.415 4.137 4.474l.19.002.415-.002c4.152-.073 4.152-3.35 4.152-4.426 0-.566-.006-1.731-.608-2.731zm6.042-4.747-1.277-.014-.84.84h1.448zm-2.272-.723V3.844l-.753.661v1.658zm-9.291 7.709a.6.6 0 0 1 .546-.65c.35-.02.625.215.65.546l.04.448 2.095-2.095c-.457-.297-1.087-.47-1.967-.49l-.588-.006c-2.381.023-2.869 1.305-2.869 3.221 0 1.939.502 3.238 2.953 3.272l.185.003.392-.003c2.457-.045 2.96-1.322 2.96-3.224 0-.714-.07-1.339-.29-1.849l-1.93 1.93.526.009a.6.6 0 0 1-.011 1.201h-.011L9.452 15.4q-.01 0-.02-.004l-.019-.005-.022-.002c-.046-.005-.091-.009-.135-.026l-.01-.005-.012-.006-.03-.015-.018-.01a.6.6 0 0 1-.129-.09l-.003-.003c-.016-.013-.028-.023-.041-.039a.7.7 0 0 1-.101-.157l-.009-.017a.7.7 0 0 1-.039-.168z"
                />
            </svg>
        );
    }
};

export default IconDartboardFilled;
