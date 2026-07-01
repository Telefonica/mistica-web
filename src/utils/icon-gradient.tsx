'use client';
import * as React from 'react';
import {parseCSSGradient} from './icon-gradient-helpers';

type IconGradientResult = {
    fillValue: string | undefined;
    gradientDef: React.ReactElement | null;
    useClipPath: boolean;
    clipPathId?: string;
};

const angleToCoords = (angle: number) => {
    const radians = ((angle - 90) * Math.PI) / 180;

    return {
        x1: '0%',
        y1: '0%',
        x2: `${50 + 50 * Math.cos(radians)}%`,
        y2: `${50 + 50 * Math.sin(radians)}%`,
    };
};

const renderStops = (stops: Array<{color: string; offset: string}>) =>
    stops.map((stop, idx) => <stop key={idx} offset={stop.offset} stopColor={stop.color} />);

export const useIconGradient = (color?: string): IconGradientResult => {
    const generatedId = React.useId();

    const gradientConfig = React.useMemo(() => {
        if (!color || !color.includes('gradient(')) {
            return null;
        }

        return parseCSSGradient(color);
    }, [color]);

    const gradientId = `icon-gradient-${generatedId}`;

    const gradientDef = React.useMemo(() => {
        if (!gradientConfig || gradientConfig.type === 'conic') {
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
                    {renderStops(gradientConfig.stops)}
                </radialGradient>
            );
        }

        return (
            <linearGradient id={gradientId} {...angleToCoords(gradientConfig.angle ?? 180)}>
                {renderStops(gradientConfig.stops)}
            </linearGradient>
        );
    }, [gradientConfig, gradientId]);

    if (gradientConfig?.type === 'conic') {
        return {
            fillValue: color,
            gradientDef: null,
            useClipPath: true,
            clipPathId: gradientId,
        };
    }

    return {
        fillValue: gradientConfig ? `url(#${gradientId})` : color,
        gradientDef,
        useClipPath: false,
    };
};
