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

const IconPuzzleRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M3.609 21.43h12.568c.799 0 1.449-.669 1.449-1.492v-2.216a3.316 3.316 0 0 0 .703.022c1.619-.022 3.512-1.014 3.512-3.734 0-2.689-1.815-3.7-3.512-3.75h-.3a3 3 0 0 0-.403.022V8.375c0-.821-.648-1.49-1.446-1.49h-2.664q.03-.274.031-.57c0-2.694-1.818-3.702-3.532-3.75h-.291c-1.687.022-3.49 1.014-3.49 3.734q0 .303.03.588H3.61c-.801 0-1.454.667-1.454 1.49v2.541c0 .182.073.353.205.473a.6.6 0 0 0 .478.157c.098-.012.182-.015.24-.018l.027-.001h.274c.12.006.455.023.832.156.983.309 1.479 1.093 1.479 2.328 0 1.233-.499 2.014-1.49 2.33a2.8 2.8 0 0 1-.857.14c-.05.006-.11.006-.163.006h-.036a4 4 0 0 1-.297-.025.6.6 0 0 0-.485.154.65.65 0 0 0-.207.477v2.845c0 .821.653 1.49 1.454 1.49m-.216-1.492v-2.19c.006 0 .009 0 .017.005.221 0 .67-.026 1.17-.196.878-.28 2.35-1.112 2.35-3.541 0-2.437-1.472-3.263-2.33-3.535a4 4 0 0 0-1.198-.219l-.006-1.885a.22.22 0 0 1 .216-.224h3.414a.62.62 0 0 0 .499-.26.65.65 0 0 0 .09-.566 3.5 3.5 0 0 1-.143-1.03c0-2.118 1.42-2.455 2.26-2.466h.266c.863.023 2.311.378 2.311 2.485 0 .372-.047.703-.143 1.011a.64.64 0 0 0 .09.566c.115.165.3.26.498.26h3.423c.115 0 .208.101.208.224v2.687c0 .204.092.395.252.512a.61.61 0 0 0 .554.093c.376-.124.71-.138.835-.138h.275c.862.026 2.302.387 2.302 2.482 0 2.196-1.605 2.457-2.347 2.47-.062.006-.137.006-.19.006a3 3 0 0 1-.863-.15.6.6 0 0 0-.56.083.64.64 0 0 0-.258.516v3c0 .12-.093.22-.208.22H3.61a.217.217 0 0 1-.216-.22"
            />
        </svg>
    );
};

export default IconPuzzleRegular;
