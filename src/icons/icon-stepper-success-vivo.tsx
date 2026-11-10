'use client';
import * as React from 'react';
import {useTheme} from '../hooks';
import {getAnimateDrawLineProps, getAnimateHopInProps, mergeProperties} from '../utils/animation';
import {useThemeVariant} from '../theme-variant-context';
import {vars} from '../skins/skin-contract.css';

type Props = {
    size?: number | string;
    color?: string;
    skipAnimation?: boolean;
};

const IconStepperSuccessVivo = ({size = 48, color, skipAnimation = false}: Props): JSX.Element => {
    const themeVariant = useThemeVariant();
    const {platformOverrides} = useTheme();

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
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    d="M61.4,32c0,19.5-10,29.4-29.4,29.4C12.5,61.4,2.6,51.5,2.6,32S12.5,2.6,32,2.6S61.4,12.5,61.4,32z"
                    transform="rotate(90 32 32)"
                    {...(!skipAnimation && getAnimateDrawLineProps('202', '0.2s', platformOverrides))}
                />
                <polyline
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke={color}
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

export default IconStepperSuccessVivo;
