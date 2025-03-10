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

const IconCallbackFilled = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m17.476 19.324 3.903-.58a.75.75 0 0 0 .613-.86.736.736 0 0 0-.828-.638l-1.374.203A10.2 10.2 0 0 0 21.351 12c0-5.512-4.342-10-9.675-10S2 6.488 2 12s4.338 10 9.676 10a9.3 9.3 0 0 0 3.52-.681.76.76 0 0 0 .415-.976.72.72 0 0 0-.944-.43 7.9 7.9 0 0 1-2.987.58c-4.529 0-8.217-3.812-8.217-8.493s3.688-8.493 8.217-8.493c4.53 0 8.218 3.812 8.218 8.493a8.66 8.66 0 0 1-1.323 4.618l-.215-1.545a.736.736 0 0 0-.828-.638c-.397.058-.673.444-.617.855zm-6.955-5.416c.496-.145 1.061-.526 1.599-1.077.528-.55.897-1.135 1.028-1.647.075-.276.117-.648-.107-.875l-.823-.84c-.561-.575-.594-1.488-.07-2.034l1.178-1.227c.523-.546 1.407-.522 1.967.053l.786.802c1.64 1.686.836 4.898-1.959 7.816l-.014.02c-1.855 1.893-3.823 2.908-5.422 2.908-.846 0-1.584-.28-2.15-.87l-.776-.811c-.556-.58-.58-1.493-.051-2.034l1.187-1.218c.528-.54 1.412-.507 1.968.073l.813.85c.22.232.584.188.846.111"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="m17.476 19.324 3.903-.58a.75.75 0 0 0 .613-.86.736.736 0 0 0-.828-.638l-1.374.203A10.2 10.2 0 0 0 21.351 12c0-5.512-4.342-10-9.675-10S2 6.488 2 12s4.338 10 9.676 10a9.3 9.3 0 0 0 3.52-.681.76.76 0 0 0 .415-.976.72.72 0 0 0-.944-.43 7.9 7.9 0 0 1-2.987.58c-4.529 0-8.217-3.812-8.217-8.493s3.688-8.493 8.217-8.493c4.53 0 8.218 3.812 8.218 8.493a8.66 8.66 0 0 1-1.323 4.618l-.215-1.545a.736.736 0 0 0-.828-.638c-.397.058-.673.444-.617.855zm-6.955-5.416c.496-.145 1.061-.526 1.599-1.077.528-.55.897-1.135 1.028-1.647.075-.276.117-.648-.107-.875l-.823-.84c-.561-.575-.594-1.488-.07-2.034l1.178-1.227c.523-.546 1.407-.522 1.967.053l.786.802c1.64 1.686.836 4.898-1.959 7.816l-.014.02c-1.855 1.893-3.823 2.908-5.422 2.908-.846 0-1.584-.28-2.15-.87l-.776-.811c-.556-.58-.58-1.493-.051-2.034l1.187-1.218c.528-.54 1.412-.507 1.968.073l.813.85c.22.232.584.188.846.111"
                />
            </svg>
        );
    }
};

export default IconCallbackFilled;
