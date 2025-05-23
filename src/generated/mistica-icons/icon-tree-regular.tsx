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

const IconTreeRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M15.734 4.612c1.64.196 3.243 1.204 3.243 3.543 0 .944-.255 1.72-.759 2.317.392.428.712 1.072.712 2.039 0 1.67-.925 2.406-1.695 2.73-.199 2.771-2.426 3.802-4.423 3.866v2.135c0 .33-.283.6-.63.6s-.63-.27-.63-.6v-2.224c-1.35-.233-2.69-.933-3.275-2.356-1.642-.185-3.244-1.188-3.244-3.54 0-1.087.35-1.827.762-2.323-.39-.425-.711-1.073-.711-2.042 0-1.313.596-2.266 1.694-2.728.205-2.866 2.58-3.874 4.622-3.874 1.653 0 3.597.655 4.333 2.457m1.938 7.902c0-.726-.235-1.219-.714-1.51a.59.59 0 0 1-.286-.474.59.59 0 0 1 .244-.501c.543-.403.806-1.014.806-1.874 0-2.006-1.546-2.353-2.47-2.38a.62.62 0 0 1-.586-.444c-.518-1.837-2.63-1.98-3.263-1.98-1.02 0-3.387.294-3.387 3.028 0 .266-.176.572-.445.644-.838.233-1.227.782-1.227 1.731 0 .726.233 1.219.712 1.508.17.1.28.277.29.476a.59.59 0 0 1-.243.501c-.543.403-.81 1.02-.81 1.88 0 2.014 1.547 2.353 2.468 2.375a.62.62 0 0 1 .592.443c.338 1.204 1.358 1.675 2.201 1.86v-1.205l-2.496-2.387-.02-.019-.008-.009a.58.58 0 0 1 .031-.82.656.656 0 0 1 .891.003l1.602 1.529V9.777c0-.33.283-.6.63-.6.35 0 .63.27.63.6v1.818l1.242-1.602a.65.65 0 0 1 .91-.104.583.583 0 0 1 .1.815l-2.232 2.877q-.004.006-.01.01-.008.003-.012.01v4.313c1.095-.045 3.185-.46 3.185-3.028 0-.266.182-.571.454-.644.82-.219 1.22-.784 1.22-1.728"
            />
        </svg>
    );
};

export default IconTreeRegular;
