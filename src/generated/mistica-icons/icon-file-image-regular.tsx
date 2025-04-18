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

const IconFileImageRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M19.387 8.152a.6.6 0 0 0-.047-.238.84.84 0 0 0-.213-.384l-5.213-5.126a.85.85 0 0 0-.605-.249h-7.3c-.725 0-1.386.658-1.386 1.384v16.919c0 .736.65 1.383 1.386 1.383h11.992c.75 0 1.386-.633 1.386-1.384zm-1.384 12.474H6.012c-.093 0-.19-.11-.19-.169V3.54c.005-.06.117-.168.19-.168h6.434v2.218c0 .995.336 1.852.978 2.482.633.622 1.495.952 2.493.952h2.277v11.435c0 .072-.095.168-.19.168M17.69 7.807l-.003-.003h.003zm-.003-.003h-1.77c-.684 0-1.258-.21-1.664-.61-.4-.396-.614-.95-.614-1.609V3.822zm-1.474 10.728L7.8 18.522v-7.585l8.415.014zm1.037-7.714c0-.499-.479-.936-1.022-.936h-8.44c-.552 0-1.023.429-1.023.936v7.832c0 .507.468.935 1.023.935h8.44c.543 0 1.022-.437 1.022-.935zm-7.633 3.473a.87.87 0 0 1-.86-.874c0-.481.384-.874.86-.874.473 0 .857.393.857.874a.866.866 0 0 1-.857.874m-1.154 3.27c.1.125.25.19.398.19.117 0 .235-.04.336-.12l2.09-1.771 1.411 1.353a.51.51 0 0 0 .731-.023.53.53 0 0 0-.022-.745l-.717-.686 1.126-.91 1.182.918a.51.51 0 0 0 .725-.098.535.535 0 0 0-.098-.74l-1.501-1.17a.506.506 0 0 0-.636.006l-1.56 1.263-.27-.258a.514.514 0 0 0-.685-.022l-2.443 2.07a.536.536 0 0 0-.067.742"
            />
        </svg>
    );
};

export default IconFileImageRegular;
