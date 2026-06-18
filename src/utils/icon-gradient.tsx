'use client';

import * as React from 'react';

import {angleToCoords, parseCSSGradient} from './icon-gradient-helpers';

let gradientIdCounter = 0;

const getGradientId = (): string => `icon-gradient-${gradientIdCounter++}`;

export const useIconGradient = (color?: string) => {
    const gradientId = React.useRef('');

    const gradientConfig = React.useMemo(() => {
        if (!color || typeof color !== 'string') {
            return null;
        }

        if (!color.includes('gradient(')) {
            return null;
        }

        return parseCSSGradient(color);
    }, [color]);

    if (!gradientId.current && gradientConfig) {
        gradientId.current = getGradientId();
    }

    const fillValue = gradientConfig ? `url(#${gradientId.current})` : color;

    const gradientDef = React.useMemo(() => {
        if (!gradientConfig) {
            return null;
        }

        if (gradientConfig.type === 'radial') {
            return (
                <radialGradient
                    id={gradientId.current}
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
            <linearGradient id={gradientId.current} {...coords}>
                {gradientConfig.stops.map((stop, idx) => (
                    <stop key={idx} offset={stop.offset} stopColor={stop.color} />
                ))}
            </linearGradient>
        );
    }, [gradientConfig]);

    return {
        fillValue,
        gradientDef,
    };
};
