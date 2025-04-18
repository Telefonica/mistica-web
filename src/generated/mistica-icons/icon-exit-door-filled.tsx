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

const IconExitDoorFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path fill={fillColor} d="M17.677 21.993h3.694V3.347l-3.694 3.695z" />
                <path
                    fill={fillColor}
                    d="M16.373 6.78c0-.173.087-.347.174-.477L20.893 2H7.898v8.475h4.78a1.54 1.54 0 0 1 1.522 1.521 1.54 1.54 0 0 1-1.521 1.522H7.898v8.475h8.475z"
                />
                <path
                    fill={fillColor}
                    d="M12.679 11.345H5.116L6.16 10.3a.63.63 0 0 0 0-.912.63.63 0 0 0-.913 0L2.64 11.997l2.65 2.65c.131.131.305.175.479.175a.65.65 0 0 0 .478-.174.63.63 0 0 0 0-.913l-1.043-1.043h7.476a.67.67 0 0 0 .652-.652c0-.348-.305-.695-.652-.695"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path fill={fillColor} d="M17.677 21.993h3.694V3.347l-3.694 3.695z" />
                <path
                    fill={fillColor}
                    d="M16.373 6.78c0-.173.087-.347.174-.477L20.893 2H7.898v8.475h4.78a1.54 1.54 0 0 1 1.522 1.521 1.54 1.54 0 0 1-1.521 1.522H7.898v8.475h8.475z"
                />
                <path
                    fill={fillColor}
                    d="M12.679 11.345H5.116L6.16 10.3a.63.63 0 0 0 0-.912.63.63 0 0 0-.912 0l-2.608 2.608 2.651 2.65c.13.131.304.175.478.175a.65.65 0 0 0 .478-.174.63.63 0 0 0 0-.913l-1.043-1.043h7.476a.67.67 0 0 0 .652-.652c0-.348-.304-.695-.652-.695"
                />
            </svg>
        );
    }
};

export default IconExitDoorFilled;
