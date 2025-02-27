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

const IconSubscriptionRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.546 6.938-1.368 1.415-1.368-1.415a.56.56 0 0 1 0-.772.51.51 0 0 1 .553-.121c-.09-.14-.189-.27-.305-.391a2.584 2.584 0 0 0-3.731 0c-1.026 1.06-1.026 2.792 0 3.858a2.584 2.584 0 0 0 3.73 0 .515.515 0 0 1 .748 0 .56.56 0 0 1 0 .773 3.6 3.6 0 0 1-2.134 1.08V22H4.311V2h13.36v1.801c.783.103 1.535.461 2.134 1.08.387.4.679.884.864 1.42l.13-.135a.515.515 0 0 1 .747 0 .56.56 0 0 1 0 .772m-7.038 5.967h-7.03a.71.71 0 0 0-.702.726c0 .4.315.726.702.726h7.03a.715.715 0 0 0 .702-.726c0-.4-.315-.726-.702-.726m-7.03 3.277h7.03c.387 0 .702.326.702.726s-.315.726-.702.726h-7.03a.715.715 0 0 1-.702-.726c0-.4.315-.726.702-.726m8.79-12.73H5.717v17.091h10.55v-9.271a3.6 3.6 0 0 1-1.68-.992c-1.44-1.49-1.44-3.91 0-5.399a3.63 3.63 0 0 1 1.68-.991z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.546 6.938-1.368 1.415-1.368-1.415a.56.56 0 0 1 0-.772.51.51 0 0 1 .553-.121 2.584 2.584 0 0 0-4.037-.391c-1.025 1.06-1.025 2.792 0 3.858a2.584 2.584 0 0 0 3.731 0 .515.515 0 0 1 .747 0 .56.56 0 0 1 0 .773 3.6 3.6 0 0 1-2.133 1.08V22H4.31V2H17.67v1.801c.783.103 1.535.461 2.133 1.08.387.4.68.884.864 1.42l.13-.135a.515.515 0 0 1 .748 0 .56.56 0 0 1 0 .772m-7.038 5.967h-7.03a.71.71 0 0 0-.702.726c0 .4.315.726.702.726h7.03a.715.715 0 0 0 .702-.726c0-.4-.315-.726-.703-.726m-7.03 3.277h7.03c.387 0 .702.326.702.726s-.315.726-.703.726H7.479a.715.715 0 0 1-.702-.726c0-.4.315-.726.702-.726m8.79-12.73H5.717v17.091h10.55v-9.271a3.6 3.6 0 0 1-1.68-.992c-1.44-1.49-1.44-3.91 0-5.399a3.63 3.63 0 0 1 1.68-.991z"
                />
            </svg>
        );
    }
};

export default IconSubscriptionRegular;
