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

const SMALL_VALUE_THRESHOLD = Math.PI / 1000;

const TYPE_LINEAR = 'linear';
const TYPE_ANGULAR = 'angular';
const TYPE_CIRCULAR = 'circular';

export type MeterType = typeof TYPE_LINEAR | typeof TYPE_ANGULAR | typeof TYPE_CIRCULAR;

const DEFAULT_COLORS = [
    vars.colors.success,
    vars.colors.error,
    vars.colors.warning,
    vars.colors.promo,
    vars.colors.highlight,
];

/**
 * "start"/"end" values are angles for types 'angular' and 'circular', and a fraction of the total for 'linear'.
 */
type Segment = {
    start: number;
    end: number;
};

/**
 * Cubic bezier easing function
 * https://github.com/arian/cubic-bezier/blob/27d2512d15a0b873fa0fca8769069c7b290e80f8/index.js
 *
 * @param time - time in the range [0, 1]
 */
const timingFunction: (time: number) => number = bezier(0.75, 0, 0.27, 1, ANIMATION_EPSILON);

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/**
 * Calculate the start and end segment values for each segment of the meter
 */
const calculateSegments = (
    startValues: Array<number>,
    endValues: Array<number>,
    time: number,
    maxValue: number // radians if angular, 1 if linear
) => {
    const segments: Array<Segment> = [];
    for (let i = 0; i < startValues.length; i++) {
        const startValue = startValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);
        const endValue = endValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);

        // each segment has an accumulated delay time. The last segment has no delay
        const delay = ANIMATION_DELAY_MS * (startValues.length - i - 1);
        const animationTime = clamp((time - delay) / ANIMATION_DURATION_MS, 0, 1);

        const t = clamp(timingFunction(animationTime), 0, 1);
        const start = segments.at(-1)?.end || 0;
        const end = clamp(
            (startValue + (endValue - startValue) * t) * maxValue,
            0,
            maxValue - SMALL_VALUE_THRESHOLD
        );
        segments.push({start, end});
    }
    return segments;
};

const createPath = ({
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
    if (radius) {
        //  https://www.nan.fyi/svg-paths/arcs
        return `M ${x1} ${y1} A ${radius} ${radius} ${xAxisRotation} ${+largeArchFlag} ${+clockwise} ${x2} ${y2}`;
    } else {
        // https://www.nan.fyi/svg-paths/lines
        return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
};

type MeterProps = {
    type?: MeterType;
    /** Position of the meter. 0 is at the start, 1 is at the end. The sum of the values must not exceed 1. */
    values: Array<number>;
    width?: number;
    colors?: Array<string>;
};

const Meter = ({
    type = TYPE_ANGULAR,
    width = 400,
    colors = DEFAULT_COLORS,
    values,
}: MeterProps): JSX.Element => {
    const scaleFactor = VIEW_BOX_WIDTH / width;
    const strokeWidth = STROKE_WIDTH_PX * scaleFactor;
    const maxValue = type === TYPE_LINEAR ? 1 : type === TYPE_CIRCULAR ? 2 * Math.PI : Math.PI;
    const radius = type === TYPE_LINEAR ? 0 : CENTER_X - strokeWidth / 2;
    const separation = SEPARATION_PX * scaleFactor;
    const segmentSeparation = type === TYPE_LINEAR ? separation / VIEW_BOX_WIDTH : separation / radius;

    const initialValuesRef = React.useRef(Array.from({length: values.length}, () => 0));

    const [segments, setSegments] = React.useState<Array<Segment>>(() => {
        return values.map(() => ({start: 0, end: 0}));
    });

    const firstNonZeroIndex = segments.findIndex((s) => s.end - s.start > SMALL_VALUE_THRESHOLD);
    const lastSegment: Segment | undefined = segments.at(-1);

    React.useEffect(() => {
        let raf: number;
        const start = performance.now();
        const end = start + ANIMATION_DURATION_MS + ANIMATION_DELAY_MS * (values.length - 1);
        let currentSegments: Array<Segment> = [];
        const animate = () => {
            const now = performance.now();
            currentSegments = calculateSegments(initialValuesRef.current, values, now - start, maxValue);
            if (now < end) {
                raf = requestAnimationFrame(animate); // request next frame
            } else {
                currentSegments = calculateSegments(initialValuesRef.current, values, end - start, maxValue); // set the final values
                initialValuesRef.current = values;
            }
            setSegments(currentSegments);
        };
        animate();
        return () => {
            cancelAnimationFrame(raf);
            // animation was cancelled, snapshot current values
            initialValuesRef.current = currentSegments.map(
                (s) =>
                    (s.end - s.start) /
                    (type === TYPE_LINEAR ? 1 : type === TYPE_CIRCULAR ? Math.PI * 2 : Math.PI)
            );
        };
    }, [radius, values, maxValue, type]);

    const getX = (value: number) =>
        type === TYPE_LINEAR
            ? strokeWidth / 2 + (VIEW_BOX_WIDTH - strokeWidth) * value
            : CENTER_X - radius * Math.cos(value);

    const getY = (value: number) =>
        type === TYPE_LINEAR ? strokeWidth / 2 : CENTER_Y - radius * Math.sin(value);

    const getHeight = (width: number) =>
        type === TYPE_LINEAR ? strokeWidth : type === TYPE_CIRCULAR ? width : width / 2 + strokeWidth / 2;

    const getColor = (index: number) => colors[index % colors.length];

    return (
        <svg
            viewBox={`0 0 ${VIEW_BOX_WIDTH} ${getHeight(VIEW_BOX_WIDTH)}`}
            width={width}
            style={{transform: `rotate(${type === TYPE_CIRCULAR ? '90deg' : 0})`, border: '1px dotted red'}}
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
                        // the sub-pixel displacement is to avoid a gap between the marker and the path
                        d={createPath({x1: 5 - 0.3, y1: 0, x2: 5 - 0.3, y2: 10, radius: 5})}
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
                        // the sub-pixel displacement is to avoid a gap between the marker and the path
                        d={createPath({x1: 5 + 0.3, y1: 0, x2: 5 + 0.3, y2: 10, radius: 5, clockwise: 0})}
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
                                d={createPath({
                                    x1: strokeWidth / 2,
                                    y1: CENTER_Y,
                                    x2: getX(lastSegment.end),
                                    y2: getY(lastSegment.end),
                                    radius,
                                    largeArchFlag: lastSegment.end >= Math.PI,
                                })}
                            />
                            <circle
                                cx={getX(lastSegment.end)}
                                cy={getY(lastSegment.end)}
                                r={strokeWidth / 2 + separation}
                                fill="black"
                            />
                            {type === TYPE_CIRCULAR && lastSegment.end < Math.PI && (
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
                strokeLinecap={type === TYPE_CIRCULAR ? 'butt' : 'round'}
                d={createPath({
                    x1: getX(0),
                    y1: getY(0),
                    x2: getX(type === TYPE_CIRCULAR ? 2 * Math.PI - segmentSeparation : Math.PI),
                    y2: getY(type === TYPE_CIRCULAR ? 2 * Math.PI - segmentSeparation : Math.PI),
                    largeArchFlag: type === TYPE_CIRCULAR ? 1 : 0,
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
                    const minValueForSeparation = segmentSeparation * segments.length;
                    const start =
                        isFirst || segment.end < minValueForSeparation
                            ? segment.start
                            : segment.start + segmentSeparation / 2;
                    const end =
                        isLast || segment.end < minValueForSeparation
                            ? segment.end
                            : segment.end - segmentSeparation / 2;
                    if (end <= start || end - start < SMALL_VALUE_THRESHOLD) {
                        return null;
                    }
                    const hasStartMarker = isFirst && type !== TYPE_CIRCULAR;
                    return (
                        <path
                            key={reversedIndex}
                            stroke={color}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                            markerEnd={isLast ? 'url(#marker-current)' : undefined}
                            markerStart={hasStartMarker ? 'url(#marker-start)' : undefined}
                            d={createPath({
                                x1: getX(start),
                                y1: getY(start),
                                x2: getX(end),
                                y2: getY(end),
                                largeArchFlag: end - start >= Math.PI ? 1 : 0,
                                radius,
                            })}
                        />
                    );
                })}
        </svg>
    );
};

export default Meter;
