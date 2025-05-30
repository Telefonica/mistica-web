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

const IconVideoCameraRegular = ({color, size = 24, ...rest}: IconProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const fillColor = color ?? (isInverse ? vars.colors.inverse : vars.colors.neutralHigh);
    const {skinName} = useTheme();
    if (skinName.match(/^vivo-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M3.277 7.806c0-.579.476-1.048 1.063-1.048h9.362c.588 0 1.064.47 1.064 1.048v8.388c0 .579-.476 1.048-1.064 1.048H4.34c-.587 0-1.063-.47-1.063-1.049zm12.766 2.972V7.806c0-1.273-1.048-2.306-2.34-2.306H4.34C3.048 5.5 2 6.533 2 7.806v8.388C2 17.467 3.048 18.5 4.34 18.5h9.362c1.293 0 2.34-1.033 2.34-2.306v-2.972l4.949 3.484c.194.136.45.155.663.047a.63.63 0 0 0 .346-.56V7.808a.63.63 0 0 0-.346-.56.65.65 0 0 0-.663.048zm4.68 4.193-4.22-2.97 4.22-2.972z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2-new/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.554 6.062a.71.71 0 0 0-.806.16l-4.672 4.857V7.2c0-.66-.498-1.198-1.11-1.198H3.11c-.612 0-1.11.537-1.11 1.198v9.598c0 .66.498 1.198 1.11 1.198h11.856c.612 0 1.11-.538 1.11-1.198v-3.88l4.672 4.858a.71.71 0 0 0 .801.164.8.8 0 0 0 .45-.738V6.794a.78.78 0 0 0-.445-.732m-6.957 10.33H3.48V7.599h11.117zm2.736-4.397 3.192-3.317v6.634z"
                />
            </svg>
        );
    } else if (skinName.match(/^o2/i)) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path
                    fill={fillColor}
                    d="M21.554 6.062a.71.71 0 0 0-.806.16l-4.672 4.857V7.2c0-.66-.498-1.198-1.11-1.198H3.11c-.612 0-1.11.537-1.11 1.198v9.598c0 .66.498 1.198 1.11 1.198h11.856c.612 0 1.11-.538 1.11-1.198v-3.88l4.672 4.858a.71.71 0 0 0 .801.164.8.8 0 0 0 .45-.738V6.794a.78.78 0 0 0-.445-.732m-6.957 10.33H3.48V7.599h11.117zm2.736-4.397 3.192-3.317v6.634z"
                />
            </svg>
        );
    } else {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" role="presentation" {...rest}>
                <path fill={fillColor} d="M7.455 9.273a.91.91 0 1 1-1.819 0 .91.91 0 0 1 1.819 0" />
                <path
                    fill={fillColor}
                    d="M20.822 6.934A.797.797 0 0 1 22 7.63v8.741a.794.794 0 0 1-.793.793.8.8 0 0 1-.4-.109l-3.624-2.03v1.915a2.33 2.33 0 0 1-2.33 2.33H4.33A2.33 2.33 0 0 1 2 16.94V7.058a2.33 2.33 0 0 1 2.33-2.33h10.52a2.33 2.33 0 0 1 2.33 2.33v1.914zM14.85 18.03c.6 0 1.087-.488 1.087-1.088h.003V7.061c0-.6-.487-1.087-1.087-1.087H4.33c-.6 0-1.088.487-1.088 1.087v9.882c0 .6.488 1.088 1.088 1.088zm2.336-4.425 3.571 2V8.395l-3.57 2.002z"
                />
            </svg>
        );
    }
};

export default IconVideoCameraRegular;
