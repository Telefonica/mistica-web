'use client';
/*
 * This file was autogenerated. Don't edit this file!
 *
 * To update, execute "yarn start" inside "import-mistica-icons"
 */

import * as React from 'react';
import {useIsInverseVariant} from '../../theme-variant-context';
import {vars} from '../../skins/skin-contract.css';

import type {IconProps} from '../../utils/types';

const IconBoxStarLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M12 2.6c-.452 0-.853.261-1.045.67l-.579 1.221-1.283.195c-.436.066-.79.374-.929.79-.146.428-.037.902.28 1.224l.942.958-.223 1.359c-.074.45.106.903.483 1.17.358.257.83.282 1.213.07l1.142-.625 1.14.625h.001a1.14 1.14 0 0 0 1.214-.07c.375-.266.556-.719.483-1.17l-.22-1.368.94-.947.001-.002a1.2 1.2 0 0 0 .28-1.224 1.17 1.17 0 0 0-.93-.79l-1.284-.195-.579-1.222a1.16 1.16 0 0 0-1.046-.669m-.321 1.01a.352.352 0 0 1 .645.002l.62 1.31.005.008.004.007c.02.038.072.138.165.213.113.09.237.11.3.119l1.372.208c.129.02.243.111.291.254v.001a.4.4 0 0 1-.092.408l-.963.97-.009.009c-.04.04-.132.13-.178.25a.64.64 0 0 0-.024.32l.001.01.233 1.447a.39.39 0 0 1-.157.39.34.34 0 0 1-.363.021l-1.28-.702-.011-.005a.517.517 0 0 0-.51.02l-1.254.687a.34.34 0 0 1-.364-.02l-.002-.002a.39.39 0 0 1-.156-.389l.235-1.427a.6.6 0 0 0-.013-.324c-.041-.117-.12-.2-.15-.23l-.005-.005-1.005-1.02a.4.4 0 0 1-.093-.406l.002-.004a.37.37 0 0 1 .29-.253l1.395-.212.007-.001.005-.001a.6.6 0 0 0 .261-.111.7.7 0 0 0 .181-.24l.616-1.3z"
            />
            <path
                fill={fillColor}
                d="m11.567 21.645-7.1-2.88c-.44-.18-.72-.59-.72-1.07v-4.4l-.75-.36a1.14 1.14 0 0 1-.49-1.63c1.22-1.98 1.33-2.05 1.48-2.1l3.38-1.38c.18-.07.38.01.46.19.07.18-.01.38-.19.46l-2.61 1.07 6.98 2.93 6.98-2.93-2.62-1.07a.345.345 0 0 1-.19-.46c.08-.18.28-.26.46-.19l3.4 1.38c.14.05.25.12 1.47 2.1a1.145 1.145 0 0 1-.49 1.63l-.75.36v4.4c0 .47-.28.89-.72 1.07l-7.1 2.88c-.14.06-.28.08-.43.08l-.01.01c-.15 0-.3-.03-.44-.09m.79-8.108v7.388l6.92-2.81c.17-.07.28-.23.28-.42v-4.08l-4.7 2.1c-.54.24-1.17.04-1.47-.48l-.79-1.37a3 3 0 0 0-.24-.328m-7.9.093v4.065c0 .18.11.35.28.42l6.92 2.81v-7.39c-.07.09-.16.21-.26.36l-.78 1.35c-.3.51-.93.72-1.47.48zm4.98 1.445c.21.09.46.02.57-.19l.79-1.37c.18-.26.33-.46.47-.61l-7.06-2.95c-.14.2-.45.67-1.1 1.72-.07.11-.08.23-.05.36.04.12.12.22.24.28l.95.45.01-.01zm3.76-1.57.8 1.39c.12.2.36.28.57.19l5.18-2.32.95-.45c.12-.06.2-.15.24-.28a.42.42 0 0 0-.05-.36c-.64-1.05-.95-1.52-1.1-1.72l-7.06 2.96h.01c.13.14.29.33.46.59"
            />
        </svg>
    );
};

export default IconBoxStarLight;