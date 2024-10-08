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

const IconCoinsFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.298 10.144a8.15 8.15 0 0 1-8.15 8.149A8.15 8.15 0 0 1 2 10.144C2 5.645 5.65 2 10.149 2s8.149 3.645 8.149 8.144m.74 0c0-1.08-.195-2.119-.55-3.076a8.1 8.1 0 0 1 1.663 4.925 8.151 8.151 0 0 1-13.079 6.49c.958.355 1.996.55 3.077.55 4.902 0 8.888-3.987 8.888-8.889M13.85 22A8.15 8.15 0 0 0 22 13.851c0-1.853-.616-3.56-1.664-4.925.356.957.55 1.995.55 3.076 0 4.902-3.987 8.889-8.888 8.889a8.8 8.8 0 0 1-3.077-.55A8.14 8.14 0 0 0 13.851 22M12.557 8.158c0-1.124-1.223-2-2.783-2-.521 0-1.028.099-1.47.293a.554.554 0 0 0 .446 1.015c.3-.133.65-.2 1.02-.2.957 0 1.673.47 1.673.892 0 .412-.706.882-1.65.891h-.398l-.021.002-.022.003h-.109v.019a.555.555 0 0 0-.403.53c0 .252.171.465.403.532v.019h.119q.006 0 .013.002l.02.002h.398c.896.01 1.65.498 1.65 1.062 0 .579-.768 1.067-1.673 1.067-.437 0-.854-.114-1.176-.323a.56.56 0 0 0-.768.166.56.56 0 0 0 .166.768c.498.323 1.128.498 1.778.498 1.56 0 2.782-.958 2.782-2.176.005-.635-.332-1.2-.877-1.593.545-.365.882-.886.882-1.47"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.298 10.144a8.15 8.15 0 0 1-8.15 8.149A8.15 8.15 0 0 1 2 10.144C2 5.645 5.65 2 10.149 2s8.149 3.645 8.149 8.144m.74 0c0-1.08-.195-2.119-.55-3.076a8.1 8.1 0 0 1 1.663 4.925 8.151 8.151 0 0 1-13.079 6.49c.958.355 1.996.55 3.077.55 4.902 0 8.888-3.987 8.888-8.889M13.85 22A8.15 8.15 0 0 0 22 13.851c0-1.853-.616-3.56-1.664-4.925.356.957.55 1.995.55 3.076 0 4.902-3.987 8.889-8.888 8.889a8.8 8.8 0 0 1-3.077-.55A8.14 8.14 0 0 0 13.851 22M12.557 8.158c0-1.124-1.223-2-2.783-2-.521 0-1.028.099-1.47.293a.554.554 0 0 0 .446 1.015c.3-.133.65-.2 1.02-.2.957 0 1.673.47 1.673.892 0 .412-.706.882-1.65.891h-.398l-.021.002-.022.003h-.109v.019a.555.555 0 0 0-.403.53c0 .252.171.465.403.532v.019h.119q.006 0 .013.002l.02.002h.398c.896.01 1.65.498 1.65 1.062 0 .579-.768 1.067-1.673 1.067-.437 0-.854-.114-1.176-.323a.56.56 0 0 0-.768.166.56.56 0 0 0 .166.768c.498.323 1.128.498 1.778.498 1.56 0 2.782-.958 2.782-2.176.005-.635-.332-1.2-.877-1.593.545-.365.882-.886.882-1.47"
                />
            </svg>
        );
    }
};

export default IconCoinsFilled;
