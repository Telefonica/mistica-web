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

const IconBatteryLowRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M18.153 7.542c0-1.056-.275-1.835-.84-2.387-.57-.555-1.373-.824-2.46-.824h-.185v-.666c0-.482-.132-.846-.406-1.112-.27-.264-.656-.398-1.146-.398H10.89c-.49 0-.876.137-1.145.403-.27.264-.407.636-.407 1.107v.664H9.15c-1.079 0-1.88.274-2.457.84-.566.557-.843 1.333-.843 2.37v11.098c0 1.061.277 1.846.849 2.395.566.546 1.367.812 2.45.812h5.704c1.084 0 1.888-.266 2.45-.812.572-.552.85-1.337.85-2.398zm-7.947-3.877c0-.359.117-.474.157-.51.036-.04.154-.154.526-.154h2.227c.37 0 .486.107.527.146l.003.002v.001c.038.037.15.15.15.515v.666h-3.59zm7.078 14.969c0 .823-.196 1.412-.594 1.793-.395.38-.994.565-1.837.565H9.15c-.843 0-1.443-.184-1.838-.565-.397-.384-.59-.972-.59-1.796V7.54c0-.804.193-1.381.59-1.773.404-.395 1.003-.589 1.838-.589h5.706c.843 0 1.445.188 1.84.575.395.383.588.969.588 1.787zm-2.952.56H9.668a1.22 1.22 0 0 1-1.224-1.075h7.112c-.062.605-.588 1.075-1.224 1.075m2.1-1.498a.43.43 0 0 0-.433-.423H8a.43.43 0 0 0-.434.422v.3c0 1.13.944 2.045 2.104 2.045h4.66c1.16 0 2.102-.916 2.102-2.045z"
            />
        </svg>
    );
};

export default IconBatteryLowRegular;
