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

const IconWinnerEuroLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M8.176 10.288h.213c.319 1.838 1.916 3.24 3.833 3.24.672 0 1.35-.18 1.951-.539.354-.216.46-.647.248-.975-.212-.36-.637-.468-.96-.252-.39.216-.815.324-1.243.324-1.138 0-2.058-.755-2.377-1.802h2.377c.39 0 .708-.324.708-.72a.716.716 0 0 0-.708-.719H9.84q.16-.592.637-1.083a2.45 2.45 0 0 1 1.74-.719c.425 0 .85.108 1.243.324a.686.686 0 0 0 .96-.252.71.71 0 0 0-.248-.975 3.866 3.866 0 0 0-4.722.615 3.95 3.95 0 0 0-1.066 2.09h-.213a.716.716 0 0 0-.708.72c.004.399.323.723.712.723"
                />
                <path
                    fill={fillColor}
                    d="m17.864 14.687 2.058 3.6c.11.216.11.432-.047.652a.5.5 0 0 1-.566.18l-3.085-.935-.921 3.42c-.036.216-.213.36-.425.396h-.071a.51.51 0 0 1-.46-.252l-2.377-4.251-2.377 4.215a.55.55 0 0 1-.46.288h-.071a.58.58 0 0 1-.46-.396l-.922-3.42-3.014.935a.5.5 0 0 1-.566-.18c-.107-.184-.142-.436-.036-.615l1.987-3.677a7.78 7.78 0 0 1-1.704-4.899C4.347 5.461 7.751 2 11.974 2s7.63 3.46 7.63 7.748c0 1.878-.642 3.605-1.74 4.94m.32-4.939c0-3.46-2.803-6.305-6.21-6.305-3.404 0-6.206 2.849-6.206 6.305 0 3.457 2.798 6.302 6.206 6.302 3.407 0 6.21-2.841 6.21-6.302m-8.87 10.306 1.456-2.63a7.6 7.6 0 0 1-3.94-1.945l-1.204 2.197 2.306-.683a.58.58 0 0 1 .425.036c.107.072.213.18.248.324zm6.28-3.029a.58.58 0 0 1 .425-.036l2.278.683-1.243-2.197a7.3 7.3 0 0 1-4.01 1.946l1.558 2.665.744-2.737a.46.46 0 0 1 .248-.324"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M18.953 12.69a.707.707 0 0 1-.697.716.707.707 0 0 1-.697-.716c0-.395.312-.716.697-.716s.697.32.697.716M12.23 6.613c.488 0 .978.144 1.395.396.175.108.386.036.487-.144a.364.364 0 0 0-.14-.5 3.3 3.3 0 0 0-1.741-.5c-.939 0-1.812.356-2.474 1.036a3.8 3.8 0 0 0-.802 1.288h-.732c-.21 0-.347.144-.347.356 0 .216.14.356.347.356h.557c-.035.18-.035.356-.035.536s.035.357.035.537h-.557c-.21 0-.347.144-.347.356 0 .216.14.356.347.356h.732c.487 1.36 1.776 2.324 3.24 2.324.593 0 1.22-.18 1.742-.464.175-.108.21-.324.14-.5-.105-.18-.316-.216-.487-.144a2.7 2.7 0 0 1-1.394.396c-1.114 0-2.057-.644-2.509-1.612h2.509c.21 0 .346-.144.346-.356 0-.216-.14-.356-.346-.356h-2.75c-.035-.18-.035-.357-.035-.537s.035-.356.035-.536h2.75c.21 0 .346-.144.346-.356s-.14-.356-.346-.356H9.687c.14-.284.316-.536.522-.788.592-.504 1.293-.788 2.022-.788"
                />
                <path
                    fill={fillColor}
                    d="m19.65 18.595-2.438-4.328c-.07-.109-.14-.109-.245-.109-.175 0-.276.145-.276.145-1.255 1.252-2.926 1.968-4.702 1.968-3.657 0-6.617-3.04-6.617-6.798 0-3.756 2.96-6.797 6.617-6.797s6.618 3.04 6.618 6.797c0 .33-.03.63-.062.955l-.008.082c-.035.18.105.396.276.396.175.036.386-.108.386-.284.07-.356.07-.752.07-1.108C19.269 5.36 15.997 2 11.954 2S4.635 5.357 4.635 9.51c0 1.932.733 3.72 1.917 5.045L4.359 18.63c-.07.144-.07.284.035.396a.38.38 0 0 0 .386.108l3.135-.964.939 3.577c.035.144.14.252.276.252h.035c.14 0 .246-.072.316-.18l2.403-4.44 2.544 4.436c.07.108.175.18.315.18h.035c.14-.036.245-.108.277-.252l.938-3.577 3.17.964c.141.036.277 0 .386-.108.172-.14.172-.284.102-.428M9.307 20.708l-.803-3.113c-.035-.108-.07-.18-.175-.216s-.175-.036-.277-.036l-2.648.824 1.706-3.144a7.46 7.46 0 0 0 4.25 1.932zm6.376-3.338-.035.013c-.07.036-.14.144-.176.216l-.837 3.113-2.162-3.757c1.64-.108 3.17-.788 4.39-1.896l1.74 3.112-2.679-.824c-.092-.032-.158-.008-.241.023"
                />
            </svg>
        );
    }
};

export default IconWinnerEuroLight;
