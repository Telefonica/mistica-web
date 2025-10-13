'use client';
import * as React from 'react';
import {O2_SKIN, O2_NEW_SKIN, VIVO_NEW_SKIN} from '../skins/constants';
import {
    getAnimateDrawLineProps,
    getAnimateFadeInProps,
    getAnimateHopInProps,
    mergeProperties,
} from '../utils/animation';
import {useTheme} from '../hooks';
import {useIsInverseOrMediaVariant} from '../theme-variant-context';
import {vars} from '../skins/skin-contract.css';

type Props = {
    size?: number | string;
    color?: string;
    skipAnimation?: boolean;
};

const IconSuccessO2 = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                stroke={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                fill={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    d="M48.24,57.99c-4.71,2.95-10.27,4.65-16.24,4.65C15.08,62.64,1.36,48.92,1.36,32S15.08,1.36,32,1.36 S62.64,15.08,62.64,32c0,6.11-1.79,11.8-4.87,16.58"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.3s', platformOverrides))}
                />
                <polyline
                    fill="none"
                    strokeWidth="2"
                    stroke={color ? color : undefined}
                    points="16.92,30.08 28.68,43.12 50.26,20.22"
                    {...(!skipAnimation &&
                        mergeProperties(
                            getAnimateDrawLineProps('50', '0.6s', platformOverrides),
                            getAnimateHopInProps('0.6', platformOverrides)
                        ))}
                />
                <circle
                    stroke={color ? color : undefined}
                    cx="53.64"
                    cy="53.54"
                    r="1.06"
                    {...(!skipAnimation && getAnimateFadeInProps('0.2s', platformOverrides))}
                />
            </g>
        </svg>
    );
};

const IconSuccessO2New = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                stroke={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                fill={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}
                strokeLinecap="round"
                strokeWidth="4"
            >
                <circle
                    stroke={color ? color : undefined}
                    fill="none"
                    cx="32"
                    cy="32"
                    r="30"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.3s', platformOverrides))}
                />
                <polyline
                    fill="none"
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

const IconSuccessVivo = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
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

const IconSuccessDefault = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {platformOverrides} = useTheme();

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g stroke={color ? undefined : isInverse ? vars.colors.inverse : vars.colors.brand}>
                <path
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    d="M4.71002 43.3039C3.22557 39.7201 2.46154 35.879 2.46154 32C2.46154 28.121 3.22557 24.2799 4.71002 20.6961C6.19447 17.1124 8.37025 13.8561 11.1132 11.1132C13.8561 8.37026 17.1124 6.19447 20.6961 4.71002C24.2799 3.22558 28.121 2.46154 32 2.46154C35.879 2.46154 39.7201 3.22558 43.3039 4.71002C46.8877 6.19447 50.1439 8.37026 52.8868 11.1132C55.6297 13.8561 57.8055 17.1124 59.29 20.6961C60.7744 24.2799 61.5385 28.121 61.5385 32C61.5385 35.879 60.7744 39.7201 59.29 43.3039C57.8055 46.8877 55.6297 50.1439 52.8868 52.8868C50.1439 55.6297 46.8877 57.8055 43.3039 59.29C39.7201 60.7744 35.879 61.5385 32 61.5385C28.121 61.5385 24.2799 60.7744 20.6961 59.29C17.1124 57.8055 13.8561 55.6297 11.1132 52.8868C8.37025 50.1439 6.19447 46.8877 4.71002 43.3039Z"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.2s', platformOverrides))}
                />
                <path
                    fill="none"
                    stroke={color ? color : undefined}
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.8718 32L28.7179 41.8462L45.1282 23.7949"
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
            return <IconSuccessO2 size={size} color={color} skipAnimation={skipAnimation} />;
        case O2_NEW_SKIN:
            return <IconSuccessO2New size={size} color={color} skipAnimation={skipAnimation} />;
        case VIVO_NEW_SKIN:
            return <IconSuccessVivo size={size} color={color} skipAnimation={skipAnimation} />;
        default:
            return <IconSuccessDefault size={size} color={color} skipAnimation={skipAnimation} />;
    }
};

export default IconSuccess;
