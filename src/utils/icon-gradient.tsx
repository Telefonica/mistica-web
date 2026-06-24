'use client';
import * as React from 'react';
import {parseCSSGradient} from './icon-gradient-helpers';

const angleToCoords = (angle: number) => {
    const radians = ((angle - 90) * Math.PI) / 180;

    return {
        x1: '0%',
        y1: '0%',
        x2: `${50 + 50 * Math.cos(radians)}%`,
        y2: `${50 + 50 * Math.sin(radians)}%`,
    };
};

export const useIconGradient = (color?: string) => {
    const generatedId = React.useId();

    const gradientConfig = React.useMemo(() => {
        if (!color || typeof color !== 'string') {
            return null;
        }

        if (!color.includes('gradient(')) {
            return null;
        }

        return parseCSSGradient(color);
    }, [color]);

    const gradientId = React.useMemo(() => `icon-gradient-${generatedId}`, [generatedId]);

    const fillValue = gradientConfig ? `url(#${gradientId})` : color;

    const gradientDef = React.useMemo(() => {
        if (!gradientConfig) {
            return null;
        }

        if (gradientConfig.type === 'radial') {
            return (
                <radialGradient
                    id={gradientId}
                    cx={gradientConfig.center?.x ?? '50%'}
                    cy={gradientConfig.center?.y ?? '50%'}
                    r={gradientConfig.radius ?? '50%'}
                >
                    {gradientConfig.stops.map((stop, idx) => (
                        <stop key={idx} offset={stop.offset} stopColor={stop.color} />
                    ))}
                </radialGradient>
            );
        }

        const angle = gradientConfig.angle ?? 180;
        const coords = angleToCoords(angle);

        return (
            <linearGradient id={gradientId} {...coords}>
                {gradientConfig.stops.map((stop, idx) => (
                    <stop key={idx} offset={stop.offset} stopColor={stop.color} />
                ))}
            </linearGradient>
        );
    }, [gradientConfig, gradientId]);

    return {
        fillValue,
        gradientDef,
    };
};
