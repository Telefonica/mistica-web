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

const IconComputerLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.217 15.685V7.212c0-1.217-.964-2.212-2.144-2.212H5.931c-1.179 0-2.144.995-2.144 2.212v8.473H2v.552C2 17.746 3.18 19 4.642 19h14.752C20.821 19 22 17.746 22 16.237v-.552zM5.218 7.212c0-.406.32-.736.713-.736h12.142c.393 0 .713.33.713.736v8.473H5.218zm-.571 10.685c-.677 0-1.248-.481-1.463-1.104h17.678c-.252.623-.823 1.104-1.468 1.104z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M4.861 6.893c0-.644.466-1.133 1.07-1.133H18.07c.607 0 1.069.494 1.069 1.133v4.92c0 .228.142.378.356.378.215 0 .357-.15.357-.377v-4.92c0-1.061-.786-1.894-1.787-1.894H5.93c-1.001 0-1.787.833-1.787 1.893v9.08H2v.378C2 17.601 2.891 19 4.144 19h15.713C21.104 19 22 17.6 22 16.351v-.378H4.861zm14.996 11.352H4.144c-.713 0-1.248-.756-1.394-1.511h18.496c-.142.75-.676 1.51-1.39 1.51m-.362-3.41c-.393 0-.713-.339-.713-.755 0-.417.32-.755.713-.755s.713.338.713.755c0 .416-.32.755-.713.755"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M5.319 17.462c-1.042 0-1.84-.283-2.381-.84-.518-.538-.782-1.32-.782-2.32V8.025c0-1 .264-1.776.782-2.305.535-.55 1.336-.827 2.378-.827l13.356-.008c1.042 0 1.843.277 2.378.826.518.533.781 1.308.781 2.306v6.277c0 1-.263 1.782-.781 2.32-.538.557-1.34.84-2.381.84zM18.675 5.445l-13.356.009c-1.751 0-2.603.84-2.603 2.571v6.277c0 .852.21 1.499.625 1.93.429.446 1.093.67 1.978.67l13.356-.009c.882 0 1.549-.224 1.977-.67.415-.428.625-1.077.625-1.929V8.017c-.003-1.731-.855-2.572-2.603-2.572M2.156 18.83c0 .154.126.28.28.28l19.118-.008a.28.28 0 0 0 .28-.28.28.28 0 0 0-.28-.28l-19.118.008a.28.28 0 0 0-.28.28"
                />
            </svg>
        );
    }
};

export default IconComputerLight;
