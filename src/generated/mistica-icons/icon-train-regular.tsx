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

const IconTrainRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20 9.929C20 5.561 16.42 2 12.005 2S4 5.556 4 9.929v11.172c0 .396.326.72.726.72s.727-.324.727-.72V9.929c0-3.575 2.938-6.485 6.547-6.485s6.547 2.91 6.547 6.485v11.172c0 .396.326.72.727.72s.726-.324.726-.72zm-2.524 11.914a.537.537 0 0 0 0-.765l-1.993-1.97a1.99 1.99 0 0 0 1.788-1.97V8.85a1.996 1.996 0 0 0-2.002-1.984H8.722c-1.104 0-2.003.89-2.003 1.984v8.284c0 1.02.787 1.863 1.789 1.97l-1.993 1.974a.537.537 0 0 0 0 .765A.55.55 0 0 0 6.9 22c.14 0 .28-.05.387-.157l2.752-2.726h3.911l2.752 2.726a.55.55 0 0 0 .387.157c.14 0 .279-.05.386-.157m-1.299-5.969a.36.36 0 0 0-.363-.36c-.2 0-.364.162-.364.36 0 .199.164.36.364.36s.363-.161.363-.36m-8.363-3.602V8.85c0-.499.405-.9.908-.9h6.552c.498 0 .908.401.908.9v3.422zm.908 5.766a.9.9 0 0 1-.894-.766q.167.044.349.046c.8 0 1.453-.646 1.453-1.439s-.652-1.439-1.453-1.439q-.189.002-.363.05v-1.13h8.363v1.13a1.6 1.6 0 0 0-.363-.05c-.801 0-1.453.646-1.453 1.44a1.448 1.448 0 0 0 1.802 1.392.9.9 0 0 1-.894.766zm-.182-2.164c0 .199-.163.36-.363.36a.36.36 0 0 1-.363-.36c0-.198.163-.36.363-.36s.363.162.363.36"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M20 9.929C20 5.561 16.42 2 12.005 2S4 5.556 4 9.929v11.172c0 .396.326.72.726.72s.727-.324.727-.72V9.929c0-3.575 2.938-6.485 6.547-6.485s6.547 2.91 6.547 6.485v11.172c0 .396.326.72.727.72s.726-.324.726-.72zm-2.524 11.914a.537.537 0 0 0 0-.765l-1.993-1.97a1.99 1.99 0 0 0 1.788-1.97V8.85a1.996 1.996 0 0 0-2.002-1.984H8.722c-1.104 0-2.003.89-2.003 1.984v8.284c0 1.02.787 1.863 1.789 1.97l-1.993 1.974a.537.537 0 0 0 0 .765A.55.55 0 0 0 6.9 22c.14 0 .28-.05.387-.157l2.752-2.726h3.911l2.752 2.726a.55.55 0 0 0 .387.157c.14 0 .279-.05.386-.157m-1.299-5.969a.36.36 0 0 0-.363-.36c-.2 0-.364.162-.364.36 0 .199.164.36.364.36s.363-.161.363-.36m-8.363-3.602V8.85c0-.499.405-.9.908-.9h6.552c.498 0 .908.401.908.9v3.422zm.908 5.766a.9.9 0 0 1-.894-.766q.167.044.349.046c.8 0 1.453-.646 1.453-1.439s-.652-1.439-1.453-1.439q-.189.002-.363.05v-1.13h8.363v1.13a1.6 1.6 0 0 0-.363-.05c-.801 0-1.453.646-1.453 1.44a1.448 1.448 0 0 0 1.802 1.392.9.9 0 0 1-.894.766zm-.182-2.164c0 .199-.163.36-.363.36a.36.36 0 0 1-.363-.36c0-.198.163-.36.363-.36s.363.162.363.36"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M2.332 16.98a.76.76 0 0 1-.177-.492V5.273c0-.384.269-.697.602-.697h10.337c.117-.004 3.392-.094 7.204 4.311 1.135 1.312 1.65 2.668 1.53 4.027-.171 1.936-1.583 3.276-2.407 3.903-.34.257-.731.393-1.132.393h-.017c-1.009-.01-4.54-.028-15.515-.028a.57.57 0 0 1-.425-.203M3.36 5.965v.824h8.28c.333 0 .602.31.602.697v3.805c0 .383-.269.697-.602.697H3.36v1.413h17.134a2.8 2.8 0 0 0 .137-.627q.032-.348-.03-.707h-7.059c-.333 0-.602-.31-.602-.697V5.966zm16.089 3.907c-2.205-2.544-4.167-3.431-5.301-3.739v4.54h5.892a6.3 6.3 0 0 0-.591-.801m-.69 5.782c.225-.168.578-.47.917-.865H3.36v1.001c10.507 0 13.932.019 14.92.028h.009a.76.76 0 0 0 .47-.164M5.104 8.185H3.36v2.413h1.743zm1.205 2.413h1.871V8.184H6.308zm4.73 0V8.184H9.383v2.414zm10.807 8.13c0-.387-.27-.697-.603-.697H2.757c-.333 0-.602.31-.602.697s.269.697.602.697h18.485c.334 0 .603-.31.603-.697"
                />
            </svg>
        );
    }
};

export default IconTrainRegular;
