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

const IconLanguageLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.254 5.96a5.795 5.795 0 0 0-5.79 5.79 5.795 5.795 0 0 0 5.79 5.79 5.795 5.795 0 0 0 5.79-5.79 5.795 5.795 0 0 0-5.79-5.79m4.686 5.254h-1.711c-.064-1.479-.393-2.764-.896-3.693a4.72 4.72 0 0 1 2.607 3.693m-5.222-3.957v3.957h-1.364c.096-1.918.7-3.41 1.364-3.957m0 5.028v3.958c-.664-.547-1.268-2.04-1.364-3.958zm1.072 3.958v-3.958h1.364c-.096 1.915-.7 3.411-1.364 3.958m0-5.029V7.257c.664.546 1.268 2.04 1.364 3.957zm-2.611-3.693c-.507.929-.832 2.214-.896 3.693H7.572a4.71 4.71 0 0 1 2.607-3.693m-2.61 4.764h1.71c.064 1.479.393 2.765.896 3.693a4.73 4.73 0 0 1-2.607-3.693m6.76 3.693c.507-.928.832-2.214.896-3.693h1.711a4.71 4.71 0 0 1-2.607 3.693"
                />
                <path
                    fill={fillColor}
                    d="M12.358 2.003c-5.318 0-9.644 4.325-9.644 9.643 0 1.375.283 2.7.843 3.943l-1.532 5.507a.715.715 0 0 0 .879.883l5.51-1.533a9.6 9.6 0 0 0 3.944.843c5.317 0 9.642-4.325 9.642-9.643s-4.325-9.643-9.642-9.643m0 17.858a8.16 8.16 0 0 1-3.572-.815.72.72 0 0 0-.504-.046l-4.539 1.26 1.26-4.542a.72.72 0 0 0-.046-.504 8.16 8.16 0 0 1-.814-3.571c0-4.529 3.686-8.215 8.215-8.215 4.528 0 8.214 3.686 8.214 8.215 0 4.528-3.682 8.218-8.214 8.218"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.013 18.679a.743.743 0 0 1-.741.74.743.743 0 0 1-.741-.74.74.74 0 1 1 1.482 0m-.934-6.943a5.83 5.83 0 0 1-5.82 5.82 5.83 5.83 0 0 1-5.82-5.82 5.83 5.83 0 0 1 5.82-5.82 5.83 5.83 0 0 1 5.82 5.82m-4.146-4.79c.708.978 1.175 2.567 1.23 4.42h2.157a5.09 5.09 0 0 0-3.387-4.42m-3.838 4.42h1.793v-4.62c-.87.403-1.715 2.174-1.793 4.62m0 .74c.078 2.446.922 4.216 1.793 4.62v-4.62zm4.327 0H12.63v4.62c.87-.404 1.716-2.174 1.793-4.62m0-.74c-.078-2.446-.922-4.217-1.793-4.62v4.62zm-7.224 0h2.156c.056-1.853.526-3.442 1.23-4.42a5.09 5.09 0 0 0-3.386 4.42m3.386 5.16c-.708-.978-1.174-2.567-1.23-4.42H7.198a5.09 5.09 0 0 0 3.386 4.42m6.736-4.42h-2.157c-.055 1.853-.526 3.442-1.23 4.42a5.09 5.09 0 0 0 3.387-4.42m-4.954-10.11c-5.313 0-9.633 4.32-9.633 9.632 0 1.42.3 2.786.897 4.06l-1.623 5.843a.36.36 0 0 0 .097.36.37.37 0 0 0 .363.092l5.842-1.622a9.6 9.6 0 0 0 4.06.896 9.5 9.5 0 0 0 4.247-.985.37.37 0 0 0 .082-.612.37.37 0 0 0-.409-.055 8.8 8.8 0 0 1-3.92.908 8.8 8.8 0 0 1-3.863-.882.35.35 0 0 0-.26-.022l-5.35 1.489 1.486-5.346a.37.37 0 0 0-.022-.26 8.8 8.8 0 0 1-.882-3.864c0-4.901 3.99-8.891 8.892-8.891s8.891 3.99 8.891 8.891c0 1.912-.596 3.731-1.726 5.265a.372.372 0 0 0 .596.44 9.56 9.56 0 0 0 1.868-5.7c0-5.317-4.32-9.637-9.633-9.637"
                />
            </svg>
        );
    }
};

export default IconLanguageLight;
