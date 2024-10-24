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

const IconParkingRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.782 22H4.223A2.226 2.226 0 0 1 2 19.777V4.223C2 3 2.995 2 4.223 2h15.554C21 2 22 2.995 22 4.223v15.554A2.22 2.22 0 0 1 19.782 22M8.3 17.928c0 .408.332.74.74.74.407 0 .74-.332.744-.74V13.48h2.963a4.08 4.08 0 0 0 4.072-4.072 4.08 4.08 0 0 0-4.072-4.072H8.3zm4.442-5.926H9.779V6.816h2.963a2.594 2.594 0 0 1 0 5.186M3.484 4.223v15.554c0 .407.332.74.74.74h15.553a.74.74 0 0 0 .74-.74V4.223a.74.74 0 0 0-.74-.74H4.223a.74.74 0 0 0-.74.74"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.782 22H4.223A2.226 2.226 0 0 1 2 19.777V4.223C2 3 2.995 2 4.223 2h15.554C21 2 22 2.995 22 4.223v15.554A2.22 2.22 0 0 1 19.782 22M8.3 17.928c0 .408.332.74.74.74.407 0 .74-.332.744-.74V13.48h2.963a4.08 4.08 0 0 0 4.072-4.072 4.08 4.08 0 0 0-4.072-4.072H8.3zm4.442-5.926H9.779V6.816h2.963a2.594 2.594 0 0 1 0 5.186M3.484 4.223v15.554c0 .407.332.74.74.74h15.553a.74.74 0 0 0 .74-.74V4.223a.74.74 0 0 0-.74-.74H4.223a.74.74 0 0 0-.74.74"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.385 8.595c0-2.13-.558-3.731-1.656-4.762-.641-.61-1.487-1.05-2.518-1.311-.975-.241-2.23-.367-3.73-.367H5.213a.6.6 0 0 0-.594.602V21.24c-.003.33.263.6.594.602h4.162a.6.6 0 0 0 .594-.602v-5.773h2.34c1.268 0 2.363-.157 3.257-.465.933-.32 1.709-.832 2.305-1.518 1.003-1.138 1.513-2.782 1.513-4.888m-1.19 0c0 1.8-.407 3.176-1.213 4.087-.46.529-1.065.924-1.799 1.176-.767.266-1.734.4-2.874.4H9.376a.6.6 0 0 0-.596.603v5.776H5.808V3.359h5.672c1.403 0 2.563.115 3.445.334.83.21 1.5.552 1.992 1.02.849.795 1.277 2.103 1.277 3.882m-4.76 1.977a1.5 1.5 0 0 1-.66.4c-.2.06-.597.127-1.345.127H9.97V6.413h1.353c.586 0 1.07.044 1.434.131.306.073.547.194.712.348.342.33.513.921.513 1.753 0 .913-.185 1.56-.547 1.927m.849-4.554q-.485-.459-1.252-.645c-.454-.109-1.028-.165-1.712-.165H9.374a.6.6 0 0 0-.594.602v5.891c-.003.33.263.6.594.602h2.053c.723 0 1.269-.056 1.67-.17a2.7 2.7 0 0 0 1.179-.706c.593-.603.893-1.535.893-2.779 0-1.17-.297-2.053-.885-2.63"
                />
            </svg>
        );
    }
};

export default IconParkingRegular;
