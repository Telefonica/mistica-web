'use client';
import * as React from 'react';
import {useTheme} from '../hooks';
import {getAnimateCircleScaleInProps, getAnimateDrawLineProps} from '../utils/animation';

type Props = {
    size?: number | string;
};

const IconSuccessVivoNew = ({size = 48}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();
    const gradientId = React.useId();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64" fill="none">
            <circle
                cx="32"
                cy="32"
                r="31"
                stroke={`url(#${gradientId})`}
                {...getAnimateCircleScaleInProps('31', platformOverrides)}
            />

            <polyline
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="24,32.75 30,39 40.5,24.5"
                {...getAnimateDrawLineProps('44', '0.4s', platformOverrides, '0.5 0 0.83 0.83')}
            />

            <defs>
                <linearGradient
                    id={gradientId}
                    x1="6.66663"
                    y1="6.66669"
                    x2="58.3441"
                    y2="7.98638"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#E5B9FF" />
                    <stop offset="1" stopColor="#FF6ACE" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default IconSuccessVivoNew;
