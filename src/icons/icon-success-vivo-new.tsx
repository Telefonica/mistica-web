import * as React from 'react';
import {useTheme} from '../hooks';
import {getAnimateCircleScaleInProps, getAnimateDrawLineProps} from '../utils/animation';

type Props = {
    size?: number | string;
};

const IconSuccessVivoNew = ({size = 48}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
            <circle
                cx="32"
                cy="32"
                r="24.9375"
                stroke="url(#vivoNewGradient)"
                strokeWidth="0.791667"
                {...getAnimateCircleScaleInProps('24.9375', platformOverrides)}
            />

            <polyline
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="25.75,32.75 29.69,37.5 38.25,26.5"
                {...getAnimateDrawLineProps('44', '0.4s', platformOverrides, '0.5 0 0.83 0.83')}
            />

            <defs>
                <linearGradient
                    id="vivoNewGradient"
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
