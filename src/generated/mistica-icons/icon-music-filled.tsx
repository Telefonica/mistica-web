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

const IconMusicFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.518 2.72a.76.76 0 0 0-.276-.576.65.65 0 0 0-.622-.108L8.519 5.64A.69.69 0 0 0 8 6.324v9.187a3.26 3.26 0 0 0-2.075-.72c-1.902 0-3.455 1.623-3.455 3.6C2.47 20.37 4.02 22 5.922 22s3.455-1.622 3.455-3.6V6.867l10.722-3.209v8.612a3.26 3.26 0 0 0-2.075-.72c-1.902 0-3.455 1.623-3.455 3.6 0 1.979 1.557 3.601 3.455 3.601s3.456-1.622 3.456-3.6c.038-.036.038-12.432.038-12.432"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.518 2.72a.76.76 0 0 0-.276-.576.65.65 0 0 0-.622-.108L8.519 5.64A.69.69 0 0 0 8 6.324v9.187a3.26 3.26 0 0 0-2.075-.72c-1.902 0-3.455 1.623-3.455 3.6C2.47 20.37 4.02 22 5.922 22s3.455-1.622 3.455-3.6V6.867l10.722-3.209v8.612a3.26 3.26 0 0 0-2.075-.72c-1.902 0-3.455 1.623-3.455 3.6 0 1.979 1.557 3.601 3.455 3.601s3.456-1.622 3.456-3.6c.038-.036.038-12.432.038-12.432"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20.61 5.712c0-.546-.424-.997-.967-1.048l-9.286-2.482-.165-.022c-.443 0-.821.266-.983.644a1.05 1.05 0 0 0-.084.41v8.254c-.622-.46-1.384-.678-2.099-.694-.09-.003-.196-.003-.296-.003-1.544.014-3.345.924-3.345 3.448 0 2.52 1.812 3.442 3.361 3.465h.115q.094 0 .171-.003c1.485-.025 3.188-.885 3.333-3.148h.028V5.95l8.953 2.445v7.233c-.622-.46-1.39-.678-2.104-.695l-.291-.003c-1.544.014-3.345.925-3.345 3.448 0 2.521 1.813 3.443 3.362 3.465h.114q.094 0 .171-.002c1.55-.028 3.362-.947 3.362-3.449 0-.05-.011-.09-.014-.137h.014V5.712z"
                />
            </svg>
        );
    }
};

export default IconMusicFilled;
