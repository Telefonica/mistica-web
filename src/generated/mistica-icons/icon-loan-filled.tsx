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

const IconLoanFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M7.531 13.445h.928a5.22 5.22 0 0 0 5.218-5.218V7.218A5.22 5.22 0 0 0 8.459 2H7.53a5.226 5.226 0 0 0-5.207 5.23v1.009a5.22 5.22 0 0 0 5.219 5.218zm-1.16-3.907a.28.28 0 0 1 .406 0c.255.243.627.394 1.01.44V7.891c-.662-.174-1.358-.464-1.38-1.461 0-.58.254-1.056.73-1.322.197-.105.417-.163.65-.197v-.603c0-.163.127-.29.29-.29.161 0 .289.127.289.29v.603c.36.058.742.185 1.102.406.139.08.174.266.092.394a.285.285 0 0 1-.394.093 2.2 2.2 0 0 0-.788-.302v1.937c.672.174 1.484.463 1.484 1.577 0 .637-.336 1.16-.916 1.403-.174.07-.371.116-.568.139v.568c0 .163-.128.29-.29.29a.287.287 0 0 1-.29-.29v-.568c-.522-.058-1.044-.267-1.403-.603a.28.28 0 0 1 0-.406z"
            />
            <path
                fill={fillColor}
                d="M9.27 9.016c0-.615-.336-.812-.904-.963v1.925c.116-.023.232-.035.336-.081.371-.162.568-.452.568-.87zM7.786 5.479a1 1 0 0 0-.36.127c-.29.163-.44.441-.428.812 0 .522.29.72.8.87V5.49zM17.249 14.849c-2.714.104-3.584.603-3.595.614-1.832 1.148-3.757 1.102-4.697 1.09h-.313c-.382 0-.591.348-.591.684 0 .372.36.859.73.859h5.625c.394 0 .719.058.719.44v.15c0 .384-.29.407-.673.407H8.83c-.8 0-.974 0-1.473-.163-1.322-.382-2.783-.927-4.279-1.45-.36-.115-.742.024-.95.384-.21.405-.198.591.312.904 1.485.94 5.868 3.143 6.97 3.71l.255.128c.324.151.719.22 1.206.22.568 0 1.032-.104 1.426-.324l5.149-2.482a.35.35 0 0 0 .197-.324V15.22a.37.37 0 0 0-.371-.36zM21.435 14.246h-2.493a.257.257 0 0 0-.255.255v7.665c0 .139.116.267.266.267h2.482a.26.26 0 0 0 .255-.267V14.5a.257.257 0 0 0-.255-.255m-1.24 2.098a.643.643 0 0 1-.639-.637c0-.348.29-.638.638-.638s.638.29.638.638-.29.637-.638.637"
            />
        </svg>
    );
};

export default IconLoanFilled;
