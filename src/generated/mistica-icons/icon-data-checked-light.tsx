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

const IconDataCheckedLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M21.838 4.91c0-1.002-.807-1.75-2.404-2.23-1.137-.341-2.63-.529-4.199-.529s-3.061.188-4.198.532c-1.325.395-2.11.99-2.337 1.762v.003a1.7 1.7 0 0 0-.064.462v2.824l-.087-.005a2 2 0 0 0-.126-.006h-.006c-1.501 0-2.378.577-3.148 1.087l-.004.002c-.791.523-1.416.936-2.607.748a.43.43 0 0 0-.35.076.41.41 0 0 0-.157.322v.022c0 .392-.005 4.782.336 6.71.451 2.584 5.541 5.008 5.757 5.108.109.054.238.054.35 0q1.362-.659 2.616-1.504c1.12.314 2.538.488 4.028.488 1.563 0 3.053-.188 4.199-.53 1.594-.479 2.4-1.23 2.4-2.232zm-12.33-.269c.156-.47.761-.876 1.764-1.176 1.064-.32 2.47-.493 3.963-.493s2.9.176 3.964.493c1.04.31 1.633.717 1.779 1.204l-.006.009-.006.008c-.17.454-.778.846-1.759 1.14-1.061.317-2.465.493-3.96.493-1.493 0-2.9-.176-3.961-.493-1.003-.302-1.616-.708-1.773-1.176q-.005-.005-.006-.009m-.051 1.216q.586.452 1.593.75c1.135.34 2.625.527 4.197.527 1.574 0 3.061-.184 4.198-.526.664-.202 1.185-.446 1.572-.734v3.358c-.196.359-.762.838-1.81 1.152-1.061.32-2.467.495-3.96.495q-.217 0-.43-.01l-.133-.003c.004-.44.003-.753.003-.866v-.04c0-.12-.065-.229-.157-.307a.42.42 0 0 0-.342-.093c-1.207.185-1.828-.226-2.62-.75h-.002c-.572-.379-1.205-.796-2.11-.984zm4.092 10.69c-.302 1.727-3.65 3.7-5.129 4.425-1.479-.726-4.823-2.695-5.129-4.426-.271-1.546-.313-4.905-.319-6.129 1.23.062 2.006-.434 2.748-.924l.004-.003c.74-.489 1.438-.95 2.69-.95h.006c1.252.003 1.953.463 2.692.953l.023.015c.73.48 1.483.976 2.728.904-.006 1.218-.048 4.585-.314 6.134m-2.723-4.074a.41.41 0 0 1 .583.577l-.003.003-3.722 3.712a.41.41 0 0 1-.58 0l-1.675-1.67a.407.407 0 0 1-.003-.577l.003-.003c.16-.16.42-.16.582 0l1.381 1.378zm8.373 6.992c-1.07.32-2.476.496-3.964.493-1.14 0-2.23-.104-3.16-.294 1.104-.863 2.093-1.905 2.28-2.978.023-.131.046-.28.065-.434q.406.023.824.025c1.571 0 3.061-.187 4.199-.53.627-.187 1.156-.447 1.571-.755v3.028c0 .599-.61 1.084-1.815 1.445m-4.527-7.784.141.004q.215.009.436.01c1.569 0 3.06-.188 4.196-.53.628-.187 1.157-.445 1.572-.753v3.4c-.196.359-.765.838-1.81 1.152-1.061.319-2.467.493-3.96.493-.247 0-.488-.011-.732-.023h-.008c.1-1.185.149-2.638.165-3.753"
            />
        </svg>
    );
};

export default IconDataCheckedLight;
