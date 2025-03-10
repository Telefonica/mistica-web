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

const IconStomachRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M9.096 21.332c.773.342 1.633.507 2.535.507 1.983 0 4.177-.804 6.152-2.327 2.07-1.6 3.422-3.788 3.817-6.168l.003-.012.003-.01c.076-.284.135-.583.174-.883.44-3.342-1.678-4.91-3.846-5.266q-.128-.016-.285-.04l-.074-.01a5.6 5.6 0 0 0-.787-.037 3.165 3.165 0 0 1-.633-2.924c.056-.16.18-.592-.025-1.06-.115-.265-.378-.624-.978-.829-1.198-.411-1.938.311-2.154.928a6.48 6.48 0 0 0 .695 5.235c-.597.678-.975 1.588-1.123 2.714a5 5 0 0 0-.06.647c-.052.376 0 .751.049 1.082.039.274.092.65.01.742-.019.022-.195.199-1.078.173-.137-.044-.291-.085-.475-.134l-.01-.003c-.691-.154-1.72-.305-2.414-.28h-.02c-1-.053-2.025.146-2.963.577a6.4 6.4 0 0 0-3.336 3.605c-.216.488-.21 1.4.697 1.927.49.283 1.446.591 2.294-.58q.156-.213.303-.428c.448-.642.837-1.196 1.44-1.507l.126-.067c.196-.11.246-.126.31-.112.116.028.152.364.09.818-.109.792-.047 1.512.185 2.142.28.76.756 1.306 1.378 1.58M7.73 15.576a1.4 1.4 0 0 0-.327-.04c-.352 0-.63.142-.832.245l-.031.016-.098.05c-.874.449-1.386 1.182-1.881 1.892l-.01.013q-.142.207-.288.41c-.289.397-.426.375-.673.232l-.002-.001c-.081-.048-.25-.146-.166-.369a5.2 5.2 0 0 1 2.703-2.941 5 5 0 0 1 2.4-.464l.029-.001h.025q.026.002.05 0c.541-.022 1.485.112 2.085.244q.261.07.473.14.085.03.174.033c1.058.04 1.736-.143 2.131-.582.467-.523.374-1.197.299-1.744l-.002-.013-.003-.025c-.036-.264-.071-.53-.039-.723a1 1 0 0 0 .009-.106q0-.227.044-.518c.143-1.056.51-1.84 1.098-2.33a.63.63 0 0 0 .104-.852 5.5 5.5 0 0 1-.386-.608 5.2 5.2 0 0 1-.44-3.941c.124-.292.46-.183.577-.145l.005.002c.152.053.225.112.241.148.017.034.006.093-.002.12l-.02.062a4.42 4.42 0 0 0 1.137 4.393.62.62 0 0 0 .48.17c.366-.03.683-.002.817.015l.053.007c.12.018.241.036.317.043.966.16 3.17.857 2.776 3.866a6 6 0 0 1-.126.658.6.6 0 0 0-.04.14c-.33 2.092-1.52 4.025-3.358 5.445-2.521 1.936-5.376 2.574-7.445 1.667-.309-.135-.55-.429-.712-.871-.16-.432-.199-.947-.118-1.53.233-1.647-.546-2.09-1.028-2.207"
            />
        </svg>
    );
};

export default IconStomachRegular;
