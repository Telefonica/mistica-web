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

const IconInternetLight = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12 2C6.479 2 2 6.479 2 12s4.474 10 10 10 10-4.479 10-10S17.521 2 12 2M8.522 4.17C7.356 5.854 6.575 8.372 6.47 11.288H3.43c.261-3.186 2.3-5.868 5.092-7.116m-2.057 8.543c.105 2.911.887 5.43 2.052 7.116-2.788-1.248-4.826-3.93-5.086-7.116zm4.822 7.715c-1.792-.686-3.236-3.88-3.391-7.715h3.391zm-3.391-9.141c.155-3.835 1.6-7.03 3.391-7.715v7.715zm12.674 0h-3.035c-.105-2.911-.887-5.43-2.052-7.116 2.788 1.248 4.826 3.93 5.087 7.116m-4.466 0h-3.391V3.572c1.792.686 3.236 3.88 3.391 7.715m-3.391 9.14v-7.714h3.391c-.155 3.835-1.6 7.03-3.391 7.715m4.817-7.714h3.035c-.256 3.186-2.294 5.868-5.087 7.116 1.165-1.682 1.947-4.2 2.052-7.116"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M12.008 2C6.756 2 2.48 6.488 2.48 12s4.276 10 9.528 10a9.2 9.2 0 0 0 5.078-1.54.37.37 0 0 0 .104-.494.333.333 0 0 0-.47-.11 8.6 8.6 0 0 1-2.417 1.106c1.629-1.572 2.74-4.785 2.805-8.605h3.74a9.6 9.6 0 0 1-1.363 4.593.37.37 0 0 0 .105.493c.16.105.37.055.47-.11a10.35 10.35 0 0 0 1.468-5.328C21.536 6.488 17.26 2 12.008 2M3.164 12.357h3.74c.066 3.825 1.18 7.038 2.81 8.61-3.663-1.033-6.402-4.479-6.55-8.61m4.42 0h4.085v8.925c-2.226-.356-3.998-4.209-4.085-8.925m2.134-9.324c-1.63 1.568-2.744 4.785-2.81 8.61H3.165c.148-4.131 2.887-7.577 6.554-8.61m-2.134 8.61c.087-4.716 1.86-8.569 4.085-8.925v8.926zm4.764 9.64v-8.926h4.085c-.088 4.716-1.86 8.569-4.085 8.925m0-18.565c2.225.356 3.997 4.209 4.085 8.926h-4.085zm4.764 8.926c-.065-3.826-1.18-7.039-2.809-8.611 3.662 1.033 6.401 4.479 6.554 8.61zm1.363 7.851c.374 0 .68-.32.68-.713s-.306-.712-.68-.712-.68.32-.68.712c0 .393.305.713.68.713"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M2.156 11.997c0 6.437 3.404 9.837 9.838 9.837 4.813 0 7.93-1.901 9.198-5.547a.28.28 0 0 0 .079-.238q.565-1.768.566-4.05c0-3.263-.877-5.762-2.602-7.425-1.667-1.605-4.101-2.418-7.241-2.418-6.437 0-9.838 3.404-9.838 9.84m18.61 3.812h-3.77c.29-1.195.443-2.493.443-3.832 0-1.116-.106-2.204-.31-3.227h3.793q.352 1.451.352 3.247 0 2.154-.509 3.812m-4.349 0h-4.18V8.75h4.319c.21 1.019.32 2.108.32 3.227 0 1.345-.158 2.645-.459 3.832m-4.18.56h4.025a10.8 10.8 0 0 1-.91 2.177c-.854 1.521-1.948 2.431-3.114 2.603zm-.588-.56H7.246a15.7 15.7 0 0 1-.46-3.832c0-1.12.11-2.209.32-3.227h4.543zm-4.248.56h4.248v4.804c-1.249-.082-2.428-1.008-3.339-2.627a10.8 10.8 0 0 1-.91-2.177m-.585 0c.257.892.594 1.718 1.004 2.448.586 1.043 1.284 1.826 2.05 2.317-3.268-.46-5.425-2.056-6.453-4.765zm-.148-.56H3.225q-.509-1.658-.509-3.812 0-1.796.354-3.247h3.463a16.6 16.6 0 0 0-.31 3.227c0 1.339.154 2.637.445 3.832m10.18.56h3.726c-1.07 2.821-3.365 4.433-6.863 4.816.798-.487 1.524-1.289 2.131-2.368.412-.73.749-1.556 1.005-2.448M3.223 8.19C4.152 5.156 6.352 3.374 9.8 2.868c-.738.494-1.41 1.26-1.979 2.27-.502.893-.894 1.928-1.164 3.053zM8.31 5.41c.909-1.62 2.09-2.546 3.34-2.628V8.19H7.233c.256-1.025.618-1.966 1.076-2.782m3.928 2.78V2.806c1.168.171 2.26 1.079 3.114 2.603.458.816.82 1.757 1.076 2.782zm3.605-3.052c-.59-1.047-1.291-1.833-2.06-2.323 3.685.422 6.022 2.222 6.986 5.376h-3.763c-.27-1.125-.662-2.16-1.164-3.053"
                />
            </svg>
        );
    }
};

export default IconInternetLight;
