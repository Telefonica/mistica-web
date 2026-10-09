'use client';
import * as React from 'react';
import {O2_SKIN, VIVO_SKIN, VIVO_EVOLUTION_SKIN} from '../skins/constants';
import {
    getAnimateCircleScaleInProps,
    getAnimateDrawLineProps,
    getAnimateHopInProps,
    mergeProperties,
} from '../utils/animation';
import {useTheme} from '../hooks';
import {vars} from '../skins/skin-contract.css';
import {useThemeVariant} from '../theme-variant-context';

type Props = {
    size?: number | string;
    color?: string;
    skipAnimation?: boolean;
};

const IconSuccessO2 = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    const themeVariant = useThemeVariant();
    const defaultColor =
        themeVariant === 'brand' || themeVariant === 'media'
            ? vars.colors.neutralHighBrand
            : themeVariant === 'negative'
              ? vars.colors.neutralHighNegative
              : vars.colors.brand;

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g
                stroke={color ? undefined : defaultColor}
                fill={color ? undefined : defaultColor}
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

const IconSuccessVivo = ({size = 48}: Props): JSX.Element => {
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

const IconSuccessVivoEvolution = ({size = 48}: Props): JSX.Element => {
    const themeVariant = useThemeVariant();
    const isBrand = themeVariant === 'brand';

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 48 48" fill="none">
            <path
                d="M0 18C0 8.05888 8.05888 0 18 0H30C39.9411 0 48 8.05888 48 18V30C48 39.9411 39.9411 48 30 48H18C8.05888 48 0 39.9411 0 30V18Z"
                fill={isBrand ? vars.colors.backgroundBrandSecondary : vars.colors.successLow}
            />
            <path
                d="M34.9092 15.5156C35.2803 15.1548 35.8734 15.1632 36.2344 15.5342C36.5952 15.9053 36.5869 16.4984 36.2158 16.8594L20.1572 32.4844C19.7933 32.8385 19.2135 32.8385 18.8496 32.4844L11.7842 25.6094C11.4132 25.2484 11.4048 24.6553 11.7656 24.2842C12.1266 23.9132 12.7197 23.9048 13.0908 24.2656L19.5039 30.5049L34.9092 15.5156Z"
                fill={isBrand ? vars.colors.neutralLow : vars.colors.successHigh}
            />
        </svg>
    );
};

const IconSuccessDefault = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const {platformOverrides} = useTheme();

    const themeVariant = useThemeVariant();
    const defaultColor =
        themeVariant === 'brand' || themeVariant === 'media'
            ? vars.colors.neutralHighBrand
            : themeVariant === 'negative'
              ? vars.colors.neutralHighNegative
              : vars.colors.brand;

    return (
        <svg role="presentation" width={size} height={size} viewBox="0 0 64 64">
            <g stroke={color ? undefined : defaultColor}>
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
        case VIVO_SKIN:
            return <IconSuccessVivo size={size} color={color} skipAnimation={skipAnimation} />;
        case VIVO_EVOLUTION_SKIN:
            return <IconSuccessVivoEvolution size={size} color={color} skipAnimation={skipAnimation} />;
        default:
            return <IconSuccessDefault size={size} color={color} skipAnimation={skipAnimation} />;
    }
};

export default IconSuccess;
