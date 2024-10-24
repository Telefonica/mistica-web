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

const IconFileMp3Filled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M12.334 15.121v-.582c.216.039.47.064.74.064.302 0 .481-.039.61-.123.129-.087.2-.227.2-.426 0-.193-.071-.325-.186-.406-.134-.098-.342-.129-.72-.129h-.103v-.54h.129c.338 0 .512-.042.644-.157.087-.076.145-.2.145-.378 0-.14-.039-.261-.123-.337-.11-.098-.291-.14-.582-.14-.239 0-.507.023-.723.054v-.572c.25-.053.563-.081.849-.081.465 0 .86.11 1.086.336.157.157.255.373.255.68 0 .384-.168.653-.49.816.39.14.622.431.622.913 0 .286-.087.535-.26.714-.244.255-.64.384-1.2.384a4.7 4.7 0 0 1-.893-.09M4.424 11.438h.664l1.168 2.064 1.204-2.064h.647v3.695h-.77v-2.13l-.768 1.287h-.647l-.79-1.309v2.152h-.708zM8.911 11.438h1.269c.577 0 .944.081 1.182.302.199.185.297.471.297.866q-.001.591-.275.896c-.215.244-.551.356-1.036.356h-.594v1.275h-.843zm1.75 1.647q.147-.147.146-.47c0-.2-.042-.345-.14-.438-.103-.092-.26-.128-.518-.128h-.395v1.179h.418v-.003c.268 0 .383-.04.49-.14"
            />
            <path
                fill={fillColor}
                d="M21.793 7.914q.047.11.048.238v12.306c0 .75-.644 1.383-1.409 1.383H8.25c-.75 0-1.409-.647-1.409-1.384l.034-2.773H4.578a2.42 2.42 0 0 1-2.423-2.423v-4.095a2.426 2.426 0 0 1 2.42-2.426h2.266V3.54c0-.726.672-1.384 1.409-1.384h7.415c.23 0 .456.092.619.252l5.29 5.123c.113.107.177.241.22.384m-5.792-4.09V5.59c0 .656.215 1.213.624 1.608.415.4.997.61 1.69.61h1.803zM4.575 16.471h9.846a1.21 1.21 0 0 0 1.207-1.21v-4.095c0-.667-.54-1.21-1.207-1.21H4.575a1.21 1.21 0 0 0-1.207 1.21v4.095c0 .667.54 1.21 1.207 1.21"
            />
        </svg>
    );
};

export default IconFileMp3Filled;
