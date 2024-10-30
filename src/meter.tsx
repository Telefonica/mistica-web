// https://www.figma.com/design/jWWCJ9kYl6I5uHLz3GcgRp/%F0%9F%94%B6-%5BREADY%5D-Data-Visualizations-Specs
'use client';
import * as React from 'react';
import {vars} from './skins/skin-contract.css';
// @ts-expect-error - no types
import bezier from 'cubic-bezier';

const VIEW_BOX_WIDTH = 100;
const CENTER_X = VIEW_BOX_WIDTH / 2;
const CENTER_Y = VIEW_BOX_WIDTH / 2;

const STROKE_WIDTH_PX = 26;
const SEPARATION_PX = 2;

const ANIMATION_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 1000;
const ANIMATION_EPSILON = 1000 / 60 / ANIMATION_DURATION_MS / 4;

const ANGLE_THRESHOLD = Math.PI / 1000;

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
const calculateSegments = (
    startValues: Array<number>,
    endValues: Array<number>,
    time: number,
    maxAngle: number
) => {
    const segments: Array<Segment> = [];
    for (let i = 0; i < startValues.length; i++) {
        const startValue = startValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);
        const endValue = endValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);

        // each segment has an accumulated delay time. The last segment has no delay
        const delay = ANIMATION_DELAY_MS * (startValues.length - i - 1);
        const animationTime = clamp((time - delay) / ANIMATION_DURATION_MS, 0, 1);

        const t = clamp(timingFunction(animationTime), 0, 1);
        const a1 = segments.at(-1)?.a2 || 0;
        const a2 = clamp(
            (startValue + (endValue - startValue) * t) * maxAngle,
            0,
            maxAngle - ANGLE_THRESHOLD
        );
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
    largeArchFlag = 0,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
    clockwise?: 0 | 1 | boolean;
    largeArchFlag?: 0 | 1 | boolean;
}): string => {
    const xAxisRotation = 0;
    return `M ${x1} ${y1} A ${radius} ${radius} ${xAxisRotation} ${+largeArchFlag} ${+clockwise} ${x2} ${y2}`;
};

type MeterProps = {
    type?: 'arc' | 'circle' | 'line';
    /** Position of the meter. 0 is at the start, 1 is at the end. The sum of the values must not exceed 1. */
    values: Array<number>;
    width?: number;
    colors?: Array<string>;
};

const Meter = ({type = 'arc', width = 400, colors = DEFAULT_COLORS, values}: MeterProps): JSX.Element => {
    const maxAngle = type === 'circle' ? 2 * Math.PI : Math.PI;
    const scaleFactor = VIEW_BOX_WIDTH / width;
    const strokeWidth = STROKE_WIDTH_PX * scaleFactor;
    const radius = CENTER_X - strokeWidth / 2;
    const separation = SEPARATION_PX * scaleFactor;
    const separationAngle = separation / radius;

    const initialValuesRef = React.useRef(Array.from({length: values.length}, () => 0));

    const [segments, setSegments] = React.useState<Array<Segment>>(() => {
        return values.map(() => ({a1: 0, a2: 0}));
    });

    const getColor = (index: number) => colors[index % colors.length];

    const firstNonZeroIndex = segments.findIndex((s) => s.a2 - s.a1 > ANGLE_THRESHOLD);
    const lastSegment: Segment | undefined = segments.at(-1);

    React.useEffect(() => {
        let raf: number;
        const start = performance.now();
        const end = start + ANIMATION_DURATION_MS + ANIMATION_DELAY_MS * (values.length - 1);
        let currentSegments: Array<Segment> = [];
        const animate = () => {
            const now = performance.now();
            currentSegments = calculateSegments(initialValuesRef.current, values, now - start, maxAngle);
            if (now < end) {
                raf = requestAnimationFrame(animate); // request next frame
            } else {
                currentSegments = calculateSegments(initialValuesRef.current, values, end - start, maxAngle); // set the final values
                initialValuesRef.current = values;
            }
            setSegments(currentSegments);
        };
        animate();
        return () => {
            cancelAnimationFrame(raf);
            initialValuesRef.current = currentSegments.map(
                (s) => (s.a2 - s.a1) / (type === 'circle' ? Math.PI * 2 : Math.PI)
            );
        };
    }, [radius, values, maxAngle, type]);

    return (
        <svg
            viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_WIDTH}`}
            width={width}
            height={width}
            style={{transform: `rotate(${type === 'circle' ? '90deg' : 0})`, border: '1px dotted red'}}
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
                    <path
                        // the half pixel displacement is to avoid a gap between the marker and the path
                        d={createArcPath({x1: 5 - 0.5, y1: 0, x2: 5 - 0.5, y2: 10, radius: 5})}
                        fill={getColor(values.length - 1)}
                    />
                </marker>
                <marker
                    id="marker-start"
                    viewBox="0 0 10 10"
                    markerWidth={1}
                    markerHeight={1}
                    orient="auto"
                    refX={5}
                    refY={5}
                >
                    <path
                        // the half pixel displacement is to avoid a gap between the marker and the path
                        d={createArcPath({x1: 5 + 0.5, y1: 0, x2: 5 + 0.5, y2: 10, radius: 5, clockwise: 0})}
                        fill={getColor(firstNonZeroIndex)}
                    />
                </marker>
                <mask id="mask-bar-track">
                    <rect x={0} y={0} width={VIEW_BOX_WIDTH} height={VIEW_BOX_WIDTH} fill="white" />
                    {firstNonZeroIndex >= 0 && lastSegment && (
                        <>
                            <path
                                stroke="black"
                                fill="none"
                                strokeWidth={strokeWidth + separation * 2}
                                strokeLinecap="butt"
                                d={createArcPath({
                                    x1: strokeWidth / 2,
                                    y1: CENTER_Y,
                                    x2: getX(lastSegment.a2, radius),
                                    y2: getY(lastSegment.a2, radius),
                                    radius,
                                    largeArchFlag: lastSegment.a2 >= Math.PI,
                                })}
                            />
                            <circle
                                cx={getX(lastSegment.a2, radius)}
                                cy={getY(lastSegment.a2, radius)}
                                r={strokeWidth / 2 + separation}
                                fill="black"
                            />
                            {type === 'circle' && lastSegment.a2 < Math.PI && (
                                <rect
                                    x={0}
                                    y={CENTER_Y + separation}
                                    width={strokeWidth + separation * 2}
                                    height={strokeWidth / 2 + separation}
                                    fill="white"
                                />
                            )}
                        </>
                    )}
                </mask>
            </defs>

            <path
                stroke={vars.colors.barTrack}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap={type === 'circle' ? 'butt' : 'round'}
                d={createArcPath({
                    x1: getX(0, radius),
                    y1: getY(0, radius),
                    x2: getX(type === 'circle' ? 2 * Math.PI - separationAngle : Math.PI, radius),
                    y2: getY(type === 'circle' ? 2 * Math.PI - separationAngle : Math.PI, radius),
                    largeArchFlag: type === 'circle' ? 1 : 0,
                    radius,
                })}
                mask="url(#mask-bar-track)"
            />

            {firstNonZeroIndex >= 0 &&
                [...segments].reverse().map((segment, reversedIndex) => {
                    // note that the list is reversed, so the first segment is drawn last
                    const index = segments.length - 1 - reversedIndex;
                    const color = getColor(index);
                    const isFirst = index === firstNonZeroIndex;
                    const isLast = index === segments.length - 1;
                    // do not add separation if segment angles are too near to the start
                    const minAngleForSeparation = separationAngle * segments.length;
                    const a1 =
                        isFirst || segment.a1 < minAngleForSeparation
                            ? segment.a1
                            : segment.a1 + separationAngle / 2;
                    const a2 =
                        isLast || segment.a2 < minAngleForSeparation
                            ? segment.a2
                            : segment.a2 - separationAngle / 2;
                    if (a2 <= a1 || a2 - a1 < ANGLE_THRESHOLD) {
                        return null;
                    }
                    const hasStartMarker = isFirst && type === 'arc';
                    return (
                        <path
                            key={reversedIndex}
                            stroke={color}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                            markerEnd={isLast ? 'url(#marker-current)' : undefined}
                            markerStart={hasStartMarker ? 'url(#marker-start)' : undefined}
                            d={createArcPath({
                                x1: getX(a1, radius),
                                y1: getY(a1, radius),
                                x2: getX(a2, radius),
                                y2: getY(a2, radius),
                                largeArchFlag: a2 - a1 >= Math.PI ? 1 : 0,
                                radius,
                            })}
                        />
                    );
                })}
        </svg>
    );
};

export default Meter;
