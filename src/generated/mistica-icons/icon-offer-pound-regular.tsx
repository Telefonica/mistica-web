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

const IconOfferPoundRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.131 12 2.215-2.41a.7.7 0 0 0 .15-.68.68.68 0 0 0-.52-.463l-3.205-.644.378-3.252a.687.687 0 0 0-.968-.706l-2.976 1.363-1.603-2.855a.685.685 0 0 0-1.197 0L9.803 5.208 6.83 3.845a.69.69 0 0 0-.691.07.68.68 0 0 0-.277.636l.378 3.252-3.205.644a.69.69 0 0 0-.52.464.69.69 0 0 0 .15.68L4.876 12l-2.214 2.41a.7.7 0 0 0-.15.68.68.68 0 0 0 .52.463l3.205.644-.379 3.252c-.026.247.08.49.277.636a.7.7 0 0 0 .692.07l2.971-1.363 1.603 2.855a.685.685 0 0 0 1.197 0l1.603-2.855 2.971 1.363c.225.102.489.08.691-.07a.68.68 0 0 0 .278-.636l-.379-3.252 3.2-.644a.69.69 0 0 0 .52-.464.69.69 0 0 0-.15-.68zm-2.254 2.97a.683.683 0 0 0-.546.755l.309 2.665-2.435-1.117a.69.69 0 0 0-.885.287l-1.312 2.34-1.312-2.34a.68.68 0 0 0-.885-.29l-2.434 1.116.308-2.666a.69.69 0 0 0-.546-.755l-2.624-.53L6.33 12.46a.693.693 0 0 0 0-.936L4.515 9.546l2.624-.53a.683.683 0 0 0 .546-.754l-.308-2.665L9.81 6.713c.326.15.71.022.885-.287l1.312-2.339 1.312 2.34a.685.685 0 0 0 .885.286l2.435-1.116-.309 2.665a.69.69 0 0 0 .546.755l2.624.53-1.814 1.976a.693.693 0 0 0 0 .936l1.814 1.977zm-2.637.82a.69.69 0 0 0 .687-.688.703.703 0 0 0-.691-.697H11.62q.034-.165.035-.344v-1.377h1.374a.689.689 0 0 0 0-1.377h-1.374v-1.205a.86.86 0 0 1 1.4-.67.69.69 0 0 0 .867-1.073 2.23 2.23 0 0 0-1.404-.498 2.24 2.24 0 0 0-2.236 2.241v1.214a.688.688 0 0 0 0 1.377v1.377c0 .194-.15.344-.344.344a.688.688 0 0 0 0 1.377z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m19.131 12 2.215-2.41a.7.7 0 0 0 .15-.68.68.68 0 0 0-.52-.463l-3.205-.644.378-3.252a.687.687 0 0 0-.968-.706l-2.976 1.363-1.603-2.855a.685.685 0 0 0-1.197 0L9.803 5.208 6.83 3.845a.69.69 0 0 0-.691.07.68.68 0 0 0-.277.636l.378 3.252-3.205.644a.69.69 0 0 0-.52.464.69.69 0 0 0 .15.68L4.876 12l-2.214 2.41a.7.7 0 0 0-.15.68.68.68 0 0 0 .52.463l3.205.644-.379 3.252c-.026.247.08.49.277.636a.7.7 0 0 0 .692.07l2.971-1.363 1.603 2.855a.685.685 0 0 0 1.197 0l1.603-2.855 2.971 1.363c.225.102.489.08.691-.07a.68.68 0 0 0 .278-.636l-.379-3.252 3.2-.644a.69.69 0 0 0 .52-.464.69.69 0 0 0-.15-.68zm-2.254 2.97a.683.683 0 0 0-.546.755l.309 2.665-2.435-1.117a.69.69 0 0 0-.885.287l-1.312 2.34-1.312-2.34a.68.68 0 0 0-.885-.29l-2.434 1.116.308-2.666a.69.69 0 0 0-.546-.755l-2.624-.53L6.33 12.46a.693.693 0 0 0 0-.936L4.515 9.546l2.624-.53a.683.683 0 0 0 .546-.754l-.308-2.665L9.81 6.713c.326.15.71.022.885-.287l1.312-2.339 1.312 2.34a.685.685 0 0 0 .885.286l2.435-1.116-.309 2.665a.69.69 0 0 0 .546.755l2.624.53-1.814 1.976a.693.693 0 0 0 0 .936l1.814 1.977zm-2.637.82a.69.69 0 0 0 .687-.688.703.703 0 0 0-.691-.697H11.62q.034-.165.035-.344v-1.377h1.374a.688.688 0 0 0 0-1.377h-1.374v-1.205a.86.86 0 0 1 1.4-.67.69.69 0 0 0 .867-1.073 2.23 2.23 0 0 0-1.404-.498 2.24 2.24 0 0 0-2.236 2.241v1.214a.688.688 0 0 0 0 1.377v1.377c0 .194-.15.344-.344.344a.688.688 0 0 0 0 1.377z"
                />
            </svg>
        );
    }
};

export default IconOfferPoundRegular;
