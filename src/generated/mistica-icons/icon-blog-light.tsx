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

const IconBlogLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
            <path
                fill={fillColor}
                d="M5.705 7.018h9.86a.28.28 0 0 0 .28-.28.28.28 0 0 0-.28-.28h-9.86a.28.28 0 0 0-.28.28c0 .154.126.28.28.28M5.705 10.525h9.86a.28.28 0 0 0 .28-.28.28.28 0 0 0-.28-.28h-9.86a.28.28 0 0 0-.28.28c0 .154.126.28.28.28"
            />
            <path
                fill={fillColor}
                d="M15.565 21.808h-9.86c-1.168 0-2.07-.33-2.69-.983-.582-.616-.879-1.485-.879-2.583V5.752c.003-1.095.3-1.964.883-2.583.616-.652 1.52-.983 2.689-.983h9.86c1.168 0 2.07.33 2.689.983.582.617.88 1.485.88 2.583v4.603a1.58 1.58 0 0 1 1.134-.362 1.707 1.707 0 0 1 1.585 1.703c0 .434-.176.835-.504 1.16-.137.134-1.102.996-2.216 1.986v3.4c0 1.098-.294 1.967-.88 2.583-.618.653-1.523.983-2.691.983m3.011-6.468c-1.113.988-2.26 2.004-2.816 2.496l-.335.297a.3.3 0 0 1-.098.056l-2.958.975a.3.3 0 0 1-.09.017.28.28 0 0 1-.266-.37l.428-1.275H5.705a.28.28 0 0 1-.28-.28.28.28 0 0 1 .28-.28h6.924l.376-1.12a.26.26 0 0 1 .08-.12c.542-.479 1.225-1.081 1.932-1.707H5.705a.28.28 0 0 1-.28-.28.28.28 0 0 1 .28-.28h9.91q.016 0 .033.002a564 564 0 0 0 2.928-2.604V5.752c0-1.372-.521-3.006-3.006-3.006H5.71c-2.484 0-3.005 1.636-3.005 3.006v12.49c0 1.373.52 3.006 3.005 3.006h9.86c2.485 0 3.006-1.636 3.006-3.006zm-5.064.765-.79 2.353 2.372-.784c1.941-1.717 5.603-4.964 5.863-5.219q.337-.332.339-.762a1.17 1.17 0 0 0-.336-.81 1.18 1.18 0 0 0-.731-.333c-.219-.016-.54.028-.846.334-.32.322-5.25 4.675-5.871 5.221"
            />
        </svg>
    );
};

export default IconBlogLight;
