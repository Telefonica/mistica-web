'use client';
import * as React from 'react';
import {O2_SKIN, O2_NEW_SKIN} from '../skins/constants';
import {getAnimateDrawLineProps, getAnimateHopInProps, mergeProperties} from '../utils/animation';
import {useTheme} from '../hooks';
import {useIsInverseVariant} from '../theme-variant-context';
import {vars} from '../skins/skin-contract.css';

type Props = {
    size?: number | string;
    color?: string;
    skipAnimation?: boolean;
};

const IconSuccessO2 = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                stroke={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                fill={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                strokeLinecap="round"
            >
                <circle
                    strokeWidth="4"
                    fill="none"
                    cx="32"
                    cy="32"
                    r="30"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.3s', platformOverrides))}
                />
                <polyline
                    fill="none"
                    strokeWidth="4"
                    stroke={color ? color : undefined}
                    points="18,32.67 27.33,42 49.33,20.67"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('50', '0.6s', platformOverrides),
                            getAnimateHopInProps('0.6', platformOverrides)
                        ))}
                />
            </g>
        </svg>
    );
};

const IconSuccessDefault = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g stroke={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}>
                <path
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    d="M61.4,32c0,19.5-10,29.4-29.4,29.4C12.5,61.4,2.6,51.5,2.6,32S12.5,2.6,32,2.6S61.4,12.5,61.4,32z"
                    transform="rotate(90 32 32)"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.2s', platformOverrides))}
                />
                <polyline
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,34.9 27.4,44.3 45.6,21"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('44', '0.6s', platformOverrides),
                            getAnimateHopInProps('0.6s', platformOverrides)
                        ))}
                />
            </g>
        </svg>
    );
};

const IconSuccess = ({size, color, skipAnimation}: Props): JSX.Element => {
    const {skinName} = useTheme();

    switch (skinName) {
        case O2_SKIN:
        case O2_NEW_SKIN:
            return <IconSuccessO2 size={size} color={color} skipAnimation={skipAnimation} />;
        default:
            return <IconSuccessDefault size={size} color={color} skipAnimation={skipAnimation} />;
    }
};

export default IconSuccess;
