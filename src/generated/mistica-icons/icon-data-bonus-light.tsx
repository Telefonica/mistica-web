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

const IconDataBonusLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M19.782 2H4.223A2.226 2.226 0 0 0 2 4.223v15.554C2 21 2.995 22 4.223 22h15.554A2.226 2.226 0 0 0 22 19.777V4.219A2.22 2.22 0 0 0 19.782 2m-.74 4.996a.555.555 0 0 0 0-1.11h-.924v-.923a.55.55 0 0 0-.555-.555.55.55 0 0 0-.555.555v.924h-.924a.55.55 0 0 0-.555.555c0 .308.247.554.555.554h.924v.925c0 .308.247.554.555.554a.55.55 0 0 0 .555-.554v-.925zm-2.54 4.798c.198-.313.317-.688.317-1.095A2.017 2.017 0 0 0 14.78 8.66h-2.038a.74.74 0 0 0-.74.74v5.19c0 .408.332.74.74.74h2.408a2.017 2.017 0 0 0 2.038-2.038c0-.593-.265-1.124-.687-1.498m-3.02-1.65h1.293a.53.53 0 0 1 .555.555.53.53 0 0 1-.555.554h-1.294zm0 3.707v-1.11h1.587c.346 0 .63.252.63.556a.526.526 0 0 1-.549.554zm-2.22-1.853A3.3 3.3 0 0 1 7.93 15.33c-1.939 0-3.517-1.493-3.517-3.332a3.3 3.3 0 0 1 3.332-3.333c.522 0 1.513.085 2.243.673.317.256.37.72.113 1.043a.744.744 0 0 1-1.042.114c-.27-.218-.764-.346-1.314-.346-1.057 0-1.853.796-1.853 1.853 0 1.02.915 1.854 2.038 1.854.792 0 1.432-.446 1.707-1.11H8.3a.74.74 0 0 1 0-1.478h2.223c.408-.01.74.322.74.73m8.52 8.518H4.223a.74.74 0 0 1-.74-.74V4.22a.74.74 0 0 1 .74-.74h15.554a.74.74 0 0 1 .74.74v15.558h.004a.74.74 0 0 1-.74.74"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.528 19.822V3.82c0-1-.79-1.815-1.761-1.82H4.245C3.27 2 2.48 2.82 2.48 3.82v15.997c0 1.005.795 1.82 1.765 1.82h11.64a.36.36 0 0 0 .351-.363c0-.2-.158-.363-.352-.363H4.245c-.582 0-1.056-.489-1.056-1.09V3.82c0-.6.474-1.09 1.056-1.09h15.517c.583 0 1.057.49 1.057 1.09v16.002c0 .493-.325.926-.795 1.052a.36.36 0 0 0-.253.442.35.35 0 0 0 .43.26c.78-.204 1.327-.926 1.327-1.754m-3.17-12h1.409a.354.354 0 0 0 .348-.362c0-.2-.159-.363-.353-.363h-1.408V5.644c0-.2-.158-.363-.352-.363a.36.36 0 0 0-.352.363v1.453h-1.405a.36.36 0 0 0-.352.363c0 .2.158.363.352.363h1.409v1.452c0 .2.158.363.352.363a.36.36 0 0 0 .352-.363zm-12.7 3.999c0 1.405 1.106 2.546 2.47 2.546 1.241 0 2.27-.95 2.442-2.183H8.48a.36.36 0 0 1-.352-.363c0-.2.158-.363.352-.363h2.47c.194 0 .352.163.352.363 0 1.806-1.422 3.272-3.174 3.272s-3.174-1.466-3.174-3.272 1.422-3.272 3.174-3.272c.718 0 1.422.256 1.986.717a.37.37 0 0 1 .055.512.345.345 0 0 1-.497.055 2.4 2.4 0 0 0-1.544-.558c-1.364 0-2.47 1.14-2.47 2.546m10.583-1.452c0-1.001-.79-1.82-1.765-1.82h-2.118a.36.36 0 0 0-.352.363v5.818c0 .2.158.363.352.363h2.47c.97 0 1.765-.815 1.765-1.82 0-.684-.375-1.275-.916-1.582.343-.331.564-.801.564-1.322m-3.53-1.094h1.765c.582 0 1.056.489 1.056 1.089s-.474 1.09-1.056 1.09H12.71zm3.173 3.998c0 .6-.474 1.09-1.056 1.09H12.71v-2.184h2.118v.005c.582 0 1.056.489 1.056 1.089m2.822 8c0 .401-.316.727-.704.727a.716.716 0 0 1-.705-.726c0-.4.316-.726.705-.726s.704.326.704.726"
                />
            </svg>
        );
    }
};

export default IconDataBonusLight;
