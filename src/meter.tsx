// https://www.figma.com/design/jWWCJ9kYl6I5uHLz3GcgRp/%F0%9F%94%B6-%5BREADY%5D-Data-Visualizations-Specs
'use client';
import * as React from 'react';
import {vars} from './skins/skin-contract.css';
// @ts-expect-error - no types
import bezier from 'cubic-bezier';

const VIEW_BOX_WIDTH = 100;
const CENTER_X = VIEW_BOX_WIDTH / 2;
const CENTER_Y = VIEW_BOX_WIDTH / 2;

const STROKE_WIDTH_PX = 6;
const SEPARATION_PX = 2;

const ANIMATION_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 1000;
const ANIMATION_EPSILON = 1000 / 60 / ANIMATION_DURATION_MS / 4;

const DEFAULT_COLORS = [
    vars.colors.success,
    vars.colors.error,
    vars.colors.warning,
    vars.colors.promo,
    vars.colors.highlight,
];

type Segment = {
    a1: number; // start angle
    a2: number; // end angle
};

/**
 * Cubic bezier easing function
 * https://github.com/arian/cubic-bezier/blob/27d2512d15a0b873fa0fca8769069c7b290e80f8/index.js
 *
 * @param time - time in the range [0, 1]
 */
const timingFunction: (time: number) => number = bezier(0.75, 0, 0.27, 1, ANIMATION_EPSILON);

const getX = (angle: number, radius: number) => CENTER_X - radius * Math.cos(angle);
const getY = (angle: number, radius: number) => CENTER_Y - radius * Math.sin(angle);

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/**
 * Calculate the start and end angles for each segment of the meter
 */
const calculateArcSegments = (startValues: Array<number>, endValues: Array<number>, time: number) => {
    const segments: Array<Segment> = [];
    for (let i = 0; i < startValues.length; i++) {
        const startValue = startValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);
        const endValue = endValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);

        // each segment has an accumulated delay time. The last segment has no delay
        const delay = ANIMATION_DELAY_MS * (startValues.length - i - 1);
        const animationTime = clamp((time - delay) / ANIMATION_DURATION_MS, 0, 1);

        const t = clamp(timingFunction(animationTime), 0, 1);
        const a1 = segments.at(-1)?.a2 || 0;
        const a2 = (startValue + (endValue - startValue) * t) * Math.PI;
        segments.push({a1, a2});
    }
    return segments;
};

/**
 * Returns an SVG path string for a circular (radX === radY) arc between two points
 *
 * https://www.nan.fyi/svg-paths/arcs
 */
const createArcPath = ({
    x1,
    y1,
    x2,
    y2,
    radius,
    clockwise = 1,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
    clockwise?: 0 | 1;
}): string => {
    const xAxisRotation = 0;
    const largeArchFlag = 0;
    return `M ${x1} ${y1} A ${radius} ${radius} ${xAxisRotation} ${largeArchFlag} ${clockwise} ${x2} ${y2}`;
};

type MeterProps = {
    /**
     * Position of the meter. 0 is at the start, 1 is at the end. The sum of the values must not exceed 1.
     */
    values: Array<number>;
    width?: number;
    colors?: Array<string>;
};

const Meter = ({width = 400, colors = DEFAULT_COLORS, values}: MeterProps): JSX.Element => {
    const scaleFactor = VIEW_BOX_WIDTH / width;
    const strokeWidth = STROKE_WIDTH_PX * scaleFactor;
    const radius = CENTER_X - strokeWidth / 2;
    const separation = SEPARATION_PX * scaleFactor;
    const separationAngle = separation / radius;

    const initialValuesRef = React.useRef(Array.from({length: values.length}, () => 0));

    const [segments, setSegments] = React.useState<Array<Segment>>(() => {
        return values.map(() => ({a1: 0, a2: 0}));
    });

    const firstNonZeroIndex = segments.findIndex((s) => s.a1 !== s.a2);

    const getColor = (index: number) => {
        return colors[index % colors.length];
    };

    React.useEffect(() => {
        let raf: number;
        const start = performance.now();
        const end = start + ANIMATION_DURATION_MS + ANIMATION_DELAY_MS * (values.length - 1);
        console.log('EFFECT-------------------', {start, end, duration: end - start});
        console.log({initialValuesRef: initialValuesRef.current, values});
        const animate = () => {
            const now = performance.now();
            setSegments(calculateArcSegments(initialValuesRef.current, values, now - start));
            if (now < end) {
                raf = requestAnimationFrame(animate); // request next frame
            } else {
                console.log('DONE');
                setSegments(calculateArcSegments(initialValuesRef.current, values, end - start)); // set the final values
                initialValuesRef.current = values;
            }
        };
        animate();
        return () => {
            cancelAnimationFrame(raf);
        };
    }, [radius, values]);

    return (
        <svg
            viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_WIDTH}`}
            width={width}
            height={width}
            style={{border: '1px dotted red'}}
        >
            <defs>
                <marker
                    id="marker-current"
                    viewBox="0 0 10 10"
                    markerWidth={1}
                    markerHeight={1}
                    orient="auto"
                    refX={5}
                    refY={5}
                >
                    <circle cx={5} cy={5} r={5} fill={getColor(values.length - 1)} />
                </marker>

                <mask id="mask-line">
                    <rect x={0} y={0} width={VIEW_BOX_WIDTH} height={VIEW_BOX_WIDTH} fill="white" />
                    {firstNonZeroIndex >= 0 && (
                        <path
                            stroke="black"
                            fill="none"
                            strokeWidth={strokeWidth + separation * 2}
                            strokeLinecap="round"
                            d={createArcPath({
                                x1: strokeWidth / 2,
                                y1: CENTER_Y,
                                x2: getX(segments.at(-1)?.a2 ?? VIEW_BOX_WIDTH - strokeWidth / 2, radius),
                                y2: getY(segments.at(-1)?.a2 ?? CENTER_Y, radius),
                                radius,
                            })}
                        />
                    )}
                </mask>
            </defs>

            <path
                stroke={vars.colors.barTrack}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                d={createArcPath({
                    x1: strokeWidth / 2,
                    y1: VIEW_BOX_WIDTH / 2,
                    x2: VIEW_BOX_WIDTH - strokeWidth / 2,
                    y2: VIEW_BOX_WIDTH / 2,
                    radius,
                })}
                mask="url(#mask-line)"
            />

            {firstNonZeroIndex >= 0 &&
                [...segments].reverse().map((segment, reversedIndex) => {
                    // note that the list is reversed, so the first segment is drawn last
                    const index = segments.length - 1 - reversedIndex;
                    const color = getColor(index);
                    const isFirst = index === firstNonZeroIndex;
                    const isLast = index === segments.length - 1;
                    const a1 = isFirst ? segment.a1 : segment.a1 + separationAngle / 2;
                    const a2 = isLast ? segment.a2 : segment.a2 - separationAngle / 2;
                    if (a2 <= a1) {
                        return null;
                    }
                    return (
                        <path
                            key={reversedIndex}
                            stroke={color}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                            markerEnd={isLast ? 'url(#marker-current)' : undefined}
                            d={createArcPath({
                                x1: getX(a1, radius),
                                y1: getY(a1, radius),
                                x2: getX(a2, radius),
                                y2: getY(a2, radius),
                                radius,
                            })}
                        />
                    );
                })}

            {firstNonZeroIndex >= 0 && (
                <path
                    strokeWidth={0}
                    fill={getColor(firstNonZeroIndex)}
                    d={createArcPath({
                        x1: 0,
                        y1: CENTER_Y,
                        x2: strokeWidth,
                        y2: CENTER_Y,
                        radius: strokeWidth / 2,
                        clockwise: 0,
                    })}
                />
            )}
        </svg>
    );
};

export default Meter;
