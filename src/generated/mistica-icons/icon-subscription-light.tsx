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

const IconSubscriptionLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m21.546 6.938-1.368 1.415-1.368-1.415a.56.56 0 0 1 0-.772.51.51 0 0 1 .553-.121 2.584 2.584 0 0 0-4.037-.391c-1.025 1.06-1.025 2.792 0 3.858a2.584 2.584 0 0 0 3.731 0 .515.515 0 0 1 .747 0 .56.56 0 0 1 0 .773 3.6 3.6 0 0 1-2.133 1.08V22H4.31V2H17.67v1.801c.783.103 1.535.461 2.133 1.08.387.4.68.884.864 1.42l.13-.135a.515.515 0 0 1 .748 0 .56.56 0 0 1 0 .772m-7.038 5.967h-7.03a.71.71 0 0 0-.702.726c0 .4.315.726.702.726h7.03a.715.715 0 0 0 .702-.726c0-.4-.315-.726-.703-.726m-7.03 3.277h7.03c.387 0 .702.326.702.726s-.315.726-.703.726H7.479a.715.715 0 0 1-.702-.726c0-.4.315-.726.702-.726m8.79-12.73H5.717v17.091h10.55v-9.271a3.6 3.6 0 0 1-1.68-.992c-1.44-1.49-1.44-3.91 0-5.399a3.63 3.63 0 0 1 1.68-.991z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.464 6.375a.36.36 0 0 1 .518 0c.146.143.146.38.004.527L20.688 8.21l-1.299-1.308a.365.365 0 0 1 0-.522.36.36 0 0 1 .518 0l.466.47a2.96 2.96 0 0 0-.73-1.257 2.926 2.926 0 0 0-4.159 0 2.98 2.98 0 0 0 0 4.19 2.926 2.926 0 0 0 4.16 0 .363.363 0 0 1 .517 0 .365.365 0 0 1 0 .522 3.65 3.65 0 0 1-2.597 1.081c-.941 0-1.882-.36-2.597-1.08a3.725 3.725 0 0 1 0-5.239 3.65 3.65 0 0 1 2.206-1.062.3.3 0 0 1-.028-.133V2.74H4.649v18.52h12.863c.202 0 .367.166.367.37s-.165.37-.367.37H3.91V2h13.969v1.872q-.002.066-.024.124a3.65 3.65 0 0 1 2.31 1.071c.457.46.772 1.038.937 1.673zM17.88 17.184v-4.447a.37.37 0 0 0-.367-.37.37.37 0 0 0-.367.37v4.447c0 .203.165.37.367.37a.37.37 0 0 0 .367-.37m.367 2.218c0 .408-.33.74-.734.74a.74.74 0 0 1-.734-.74c0-.407.33-.74.734-.74.405 0 .734.333.734.74M7.218 13.477h7.353c.203 0 .363.165.363.37 0 .203-.165.37-.367.37h-7.35a.37.37 0 0 1-.366-.37c0-.204.164-.37.367-.37m7.353 3.337H7.218a.37.37 0 0 0-.367.37c0 .204.164.37.367.37h7.349a.37.37 0 0 0 .367-.37c0-.204-.16-.37-.363-.37"
                />
            </svg>
        );
    }
};

export default IconSubscriptionLight;
