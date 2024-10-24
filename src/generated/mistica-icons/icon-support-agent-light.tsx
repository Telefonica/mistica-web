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

const IconSupportAgentLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.153 11.642H16.03a4.8 4.8 0 0 1-1.043 1.124c2.651.788 4.379 2.64 4.379 4.967v3.547c0 .396-.33.716-.738.716a.726.726 0 0 1-.738-.716v-3.547c0-2.288-2.478-3.951-5.893-3.951-1.719 0-3.257.424-4.337 1.188-1.019.72-1.555 1.68-1.555 2.767v3.547c0 .396-.33.716-.738.716a.726.726 0 0 1-.738-.716v-3.547c0-1.54.767-2.931 2.157-3.92.635-.447 1.39-.799 2.222-1.047-1.097-.852-1.802-2.163-1.802-3.627 0-2.56 2.148-4.643 4.787-4.643 2.64 0 4.788 2.083 4.788 4.643 0 .368-.046.728-.128 1.072h.499a.73.73 0 0 0 .738-.716v-.204c0-3.123-2.544-5.755-5.674-5.863a5.96 5.96 0 0 0-4.309 1.6C6.75 6.12 6.11 7.579 6.11 9.142c0 .397-.33.717-.738.717a.726.726 0 0 1-.738-.716c0-1.956.8-3.78 2.251-5.139 1.448-1.36 3.361-2.068 5.381-2a7.32 7.32 0 0 1 5.051 2.256 7.24 7.24 0 0 1 2.046 5.035v.204c0 1.183-.994 2.143-2.21 2.143m-5.155-5.714c-1.83 0-3.315 1.443-3.315 3.215s1.489 3.211 3.32 3.22c.787 0 1.509-.269 2.078-.717h-1.344a.726.726 0 0 1-.739-.716c0-.395.33-.715.739-.715h2.387a3.1 3.1 0 0 0 .19-1.072c0-1.776-1.485-3.215-3.316-3.215"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M17.928 19.145a.357.357 0 0 0 .715 0V17.74c0-2.364-1.89-4.203-4.716-4.811a4.7 4.7 0 0 0 1.569-1.288h1.349c.987 0 1.79-.8 1.79-1.783v-.916c0-1.788-.67-3.488-1.895-4.795a6.68 6.68 0 0 0-4.668-2.144 6.78 6.78 0 0 0-4.977 1.9 6.73 6.73 0 0 0-2.083 4.883.357.357 0 0 0 .714 0c0-1.664.663-3.216 1.863-4.371a6.05 6.05 0 0 1 4.451-1.7c3.235.116 5.868 2.907 5.868 6.223v.916c0 .591-.481 1.071-1.075 1.071h-.887a4.6 4.6 0 0 0 .525-2.143c0-2.56-2.09-4.643-4.66-4.643-2.568 0-4.66 2.083-4.66 4.643a4.64 4.64 0 0 0 2.561 4.143c-1.055.228-1.999.624-2.757 1.176C5.695 15.017 5 16.309 5 17.732v3.904a.357.357 0 0 0 .714 0v-3.903c0-1.192.59-2.276 1.662-3.056 1.112-.807 2.685-1.255 4.435-1.255 3.533 0 6.097 1.811 6.097 4.31v1.413zM7.886 8.79c0-2.168 1.77-3.927 3.941-3.927A3.94 3.94 0 0 1 15.77 8.79c0 .792-.237 1.527-.642 2.143h-3.304a.357.357 0 0 0-.357.356c0 .196.16.356.357.356h2.702a3.94 3.94 0 0 1-2.702 1.072c-2.167 0-3.937-1.764-3.937-3.927M18.282 22c.396 0 .718-.32.718-.716a.717.717 0 0 0-.718-.716.717.717 0 1 0 0 1.432"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M16.415 10.302h-.365a3.5 3.5 0 0 1-.798 1.196c-.745.717-1.832 1.081-3.232 1.081-1.398 0-2.488-.364-3.233-1.084-.773-.745-1.165-1.863-1.165-3.316 0-1.454.392-2.572 1.165-3.317.748-.717 1.835-1.081 3.233-1.081s2.487.364 3.232 1.084c.773.748 1.165 1.863 1.165 3.316q0 .861-.182 1.56h.18q.497 0 .75-.249c.168-.165.255-.428.255-.773v-.005l.009-.547c0-3.616-1.835-5.45-5.454-5.45-3.247 0-5.062 1.484-5.398 4.408a.28.28 0 0 1-.554-.064c.184-1.63.806-2.88 1.845-3.706 1-.795 2.381-1.199 4.107-1.199 1.919 0 3.406.499 4.423 1.48 1.056 1.016 1.59 2.543 1.59 4.537v.006l-.008.546c0 .498-.142.893-.42 1.168q-.416.41-1.145.409m-1.623-.56h.862q.203-.682.203-1.56c0-1.297-.336-2.278-.994-2.914-.636-.616-1.594-.927-2.843-.927-1.25 0-2.205.311-2.843.927-.661.636-.995 1.617-.995 2.913 0 1.297.336 2.278.995 2.914.638.616 1.593.927 2.843.927s2.204-.311 2.843-.927a2.8 2.8 0 0 0 .573-.793h-.642a.5.5 0 0 1-.124.204c-.115.115-.283.171-.49.171s-.376-.056-.49-.17c-.107-.107-.166-.267-.166-.48 0-.445.26-.652.658-.652.3 0 .52.118.61.367M3.535 21.834h16.933a.28.28 0 0 0 .28-.28v-1.639c0-1.493-.462-2.764-1.342-3.677-.958-.995-2.39-1.521-4.137-1.521H8.734c-1.75 0-3.18.526-4.137 1.52-.877.914-1.342 2.185-1.342 3.678v1.639c0 .154.126.28.28.28m.28-.56v-1.359c0-1.344.41-2.481 1.185-3.288.863-.894 2.118-1.347 3.734-1.347h6.535c1.616 0 2.871.453 3.734 1.347.776.807 1.185 1.944 1.185 3.288v1.359z"
                />
            </svg>
        );
    }
};

export default IconSupportAgentLight;
