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

const IconCatRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M14.046 12.463q.42 0 .645-.217.232-.227.232-.665 0-.44-.232-.666-.226-.217-.645-.218-.419.001-.644.218-.233.227-.233.666.001.438.233.665.225.217.644.217M10.598 12.246q-.226.217-.645.217t-.644-.217q-.232-.227-.233-.665 0-.44.233-.666.225-.217.644-.218.42.001.645.218.232.226.232.666 0 .438-.232.665"
            />
            <path
                fill={fillColor}
                d="M19.267 3.037c-.585-.24-2.607.716-3.633 1.992l-.036.046c-1.036-.372-2.238-.559-3.596-.559-1.361 0-2.564.187-3.6.559l-.037-.046C7.339 3.753 5.317 2.796 4.732 3.037c-.176.07-.49.267-.614.756-.506 1.658-.304 4.032.202 5.48q-.506 1.518-.506 3.486v.054l-.115-.023a.589.589 0 0 0-.228 1.155l.4.08q.154 1.64.717 2.911l-.304.061a.588.588 0 0 0 .228 1.155l.676-.135q.354.519.8.951C7.378 20.316 9.4 21 12.002 21s4.624-.684 6.012-2.032q.446-.432.8-.95l.674.134a.589.589 0 0 0 .228-1.155l-.303-.06q.563-1.27.716-2.912l.4-.08a.589.589 0 0 0-.228-1.155l-.115.023v-.052c0-1.311-.17-2.476-.507-3.487.507-1.448.709-3.823.203-5.48-.125-.49-.438-.686-.615-.757m-.34 11.229c-.12.947-.358 1.755-.697 2.434l-2.242-.45a.588.588 0 0 0-.228 1.155l1.777.357a5 5 0 0 1-.334.358h-.001c-1.012.983-2.518 1.595-4.618 1.69v-2.916c.04-.018.068-.033.076-.037l.004-.002h.002a2.8 2.8 0 0 0 .46-.291l.006-.005a1.75 1.75 0 0 0 .514-.611l.002-.005a1.05 1.05 0 0 0 .008-.9 1.1 1.1 0 0 0-.564-.534l-.013-.006a1.6 1.6 0 0 0-.601-.12 20 20 0 0 0-.936-.001h-.044a1.6 1.6 0 0 0-.581.122l-.043.02c-.17.08-.397.235-.531.52a1.05 1.05 0 0 0 .004.89l.014.029c.128.261.328.457.51.598a2.7 2.7 0 0 0 .544.333v2.915c-2.097-.095-3.602-.706-4.616-1.689a5 5 0 0 1-.334-.359l1.775-.355a.588.588 0 0 0-.229-1.155l-2.24.448c-.34-.68-.577-1.486-.698-2.433l2.699.54A.588.588 0 0 0 8 13.652l-3.014-.603-.003-.29c0-2.517.673-4.254 1.816-5.363 1.106-1.072 2.797-1.702 5.203-1.702 2.403 0 4.097.633 5.2 1.704 1.142 1.109 1.814 2.846 1.814 5.364q0 .146-.003.287L16 13.652a.589.589 0 0 0 .229 1.155zM5.987 6.547a6.2 6.2 0 0 0-.87 1.058 10 10 0 0 1-.074-.574c-.1-1.007-.05-2.025.164-2.795.172.054.391.145.639.274.526.274 1.06.66 1.444 1.07a6.3 6.3 0 0 0-1.302.967m12.896 1.058A6.2 6.2 0 0 0 16.71 5.58c.384-.41.919-.795 1.445-1.07.247-.128.466-.219.638-.273.214.77.263 1.788.164 2.795q-.03.299-.073.574m-6.472 8.027a1.6 1.6 0 0 1-.28.175l-.003.001-.052.025-.014.005a.2.2 0 0 1-.046.01h-.035a.2.2 0 0 1-.044-.01h-.002l-.013-.006-.051-.024-.007-.003-.01-.005a1.6 1.6 0 0 1-.348-.24h.057c.437-.008.442-.008.893 0h.038q-.035.034-.08.07z"
            />
        </svg>
    );
};

export default IconCatRegular;
