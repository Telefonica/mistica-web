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

const IconBusRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M19.886 6.433c-1.807-1.812-4.17-1.82-4.252-1.818H4.449c-.577 0-1.16.255-1.6.698-.442.442-.694 1.03-.694 1.613v8.451c0 .58.252 1.168.695 1.614.355.358.804.577 1.308.658.445 1.09 1.448 1.73 2.84 1.73 1.376 0 2.367-.626 2.82-1.691h3.866c.454 1.065 1.446 1.692 2.821 1.692s2.367-.627 2.82-1.692h.225c.577 0 1.16-.255 1.602-.7.44-.443.692-1.031.692-1.614v-3.38c-.003-2.387-.661-4.258-1.958-5.56m.412 9.698a1.1 1.1 0 0 1-.709.338q.003-.05.009-.098.007-.058.008-.12c0-1.927-1.188-3.126-3.1-3.126-1.914 0-3.104 1.199-3.104 3.126q.001.073.01.14l.01.084h-3.34q.003-.05.008-.098.008-.06.009-.126c0-1.927-1.188-3.126-3.1-3.126-1.914 0-3.102 1.199-3.102 3.126v.008q-.031-.02-.065-.038a.5.5 0 0 1-.13-.09c-.22-.219-.342-.493-.342-.754v-3.91h11.72c.177-.005 4.19-.099 5.557 2.694v1.216c0 .26-.123.535-.34.754m-5.695.123c0-1.27.639-1.913 1.9-1.913s1.898.644 1.898 1.913-.638 1.913-1.899 1.913c-1.26 0-1.899-.644-1.899-1.913m-7.608 1.913c-1.26 0-1.899-.644-1.899-1.913s.639-1.913 1.9-1.913 1.899.644 1.899 1.913-.64 1.913-1.9 1.913M4.45 5.825h3.336v4.429H3.36v-3.33c0-.256.126-.538.341-.754.216-.219.49-.345.748-.345m4.538 4.429V5.825h4.39v4.429zm11.65 1.888c-2.112-2.023-5.448-1.897-5.594-1.888h-.465V5.825h1.053c.205.003 5.006.087 5.006 6.171z"
            />
        </svg>
    );
};

export default IconBusRegular;
