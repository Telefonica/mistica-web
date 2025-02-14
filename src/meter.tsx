// https://www.figma.com/design/jWWCJ9kYl6I5uHLz3GcgRp/%F0%9F%94%B6-%5BREADY%5D-Data-Visualizations-Specs
'use client';
import * as React from 'react';
import {vars} from './skins/skin-contract.css';
// @ts-expect-error - no types
import bezier from 'cubic-bezier';
import {getPrefixedDataAttributes} from './utils/dom';
import {useThemeVariant} from './theme-variant-context';
import {useElementDimensions, useTheme} from './hooks';
import {meterTotalLabel, meterSectionLabel} from './text-tokens';
import {isRunningAcceptanceTest} from './utils/platform';

import type {DataAttributes} from './utils/types';

const VIEW_BOX_WIDTH = 100;
const CENTER_X = VIEW_BOX_WIDTH / 2;
const CENTER_Y = VIEW_BOX_WIDTH / 2;

const STROKE_WIDTH_PX = 6;
const SEPARATION_PX = 2;

const ANIMATION_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 1000;
const ANIMATION_EPSILON = 1000 / 60 / ANIMATION_DURATION_MS / 4;

const MAX_SEGMENT_VALUE = 100;
const SMALL_VALUE_THRESHOLD = 0.0001;

const TYPE_LINEAR = 'linear';
const TYPE_ANGULAR = 'angular';
const TYPE_CIRCULAR = 'circular';

export type MeterType = typeof TYPE_LINEAR | typeof TYPE_ANGULAR | typeof TYPE_CIRCULAR;

const DEFAULT_COLORS = [
    vars.colors.controlActivated,
    vars.colors.warning,
    vars.colors.success,
    vars.colors.highlight,
    vars.colors.promo,
];

const DEFAULT_COLORS_INVERSE = [
    vars.colors.controlActivatedInverse,
    vars.colors.warning,
    vars.colors.success,
    vars.colors.highlight,
    vars.colors.promo,
];

/**
 * "start"/"end" values for each segment of the meter. The values are in the range [0, 1]
 */
type Segment = {
    start: number;
    end: number;
};

/**
 * Cubic bezier easing function https://github.com/arian/cubic-bezier/blob/27d2512d15a0b873fa0fca8769069c7b290e80f8/index.js
 * @param time - time in the range [0, 1]
 */
const timingFunction: (time: number) => number = bezier(0.75, 0, 0.27, 1, ANIMATION_EPSILON);

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/**
 * Calculate the start and end segment values for each segment of the meter
 */
const calculateSegments = (
    currentValues: Array<number>,
    targetValues: Array<number>,
    time: number,
    reverse: boolean
): Array<Segment> => {
    const segments: Array<Segment> = [];

    let startValue = 0;
    let endValue = 0;
    for (let i = 0; i < currentValues.length; i++) {
        startValue += currentValues[i];
        endValue += targetValues[i];

        // each segment has an accumulated delay time. The last segment has no delay
        const delay = ANIMATION_DELAY_MS * (reverse ? i : currentValues.length - 1 - i);
        const animationTime = clamp((time - delay) / ANIMATION_DURATION_MS, 0, 1);

        const t = clamp(timingFunction(animationTime), 0, 1);
        const start = segments.at(-1)?.end || 0;
        const end = clamp(startValue + (endValue - startValue) * t, 0, 1 - SMALL_VALUE_THRESHOLD);
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
    /** Position of the meter. 0 is at the start, 100 is at the end. The sum of the values must not exceed 100. */
    values: Array<number>;
    width?: number | string;
    colors?: Array<string>;
    reverse?: boolean;
    dataAttributes?: DataAttributes;
    extra?: React.ReactNode;
    'aria-hidden'?: boolean | 'true' | 'false';
    'aria-label'?: string;
    'aria-labelledby'?: string;
};

const MeterComponent = ({
    type = TYPE_ANGULAR,
    width: widthProp = '100%',
    colors,
    values: valuesProp,
    reverse = false,
    dataAttributes,
    'aria-hidden': ariaHidden = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    extra,
}: MeterProps): JSX.Element => {
    const {borderRadii, t} = useTheme();
    const {ref: containerRef, width: containerWidth} = useElementDimensions();
    const hasRoundLineCaps = parseInt(borderRadii.bar) !== 0;
    const themeVariant = useThemeVariant();
    const isOverMedia = themeVariant === 'media';
    const isInverse = themeVariant === 'inverse';
    const segmentColors = colors || (isInverse || isOverMedia ? DEFAULT_COLORS_INVERSE : DEFAULT_COLORS);
    const [width, setWidth] = React.useState<number>(typeof widthProp === 'number' ? widthProp : 0);
    const scaleFactor = width === 0 ? 1 : VIEW_BOX_WIDTH / width;
    const lineCapRadiusPx = hasRoundLineCaps ? STROKE_WIDTH_PX / 2 : 0;
    const lineCapRadius = lineCapRadiusPx * scaleFactor;
    const strokeWidth = STROKE_WIDTH_PX * scaleFactor;
    const radius = type === TYPE_LINEAR ? 0 : CENTER_X - strokeWidth / 2;
    const separation = SEPARATION_PX * scaleFactor;

    const id = React.useId();
    const markerCurrentId = `marker-current-${id}`;
    const markerStartId = `marker-start-${id}`;
    const maskLastSegmentId = `mask-last-segment-${id}`;
    const maskBarTrackId = `mask-bar-track-${id}`;

    const shouldAnimate = React.useMemo(() => {
        return (
            window.matchMedia(`(prefers-reduced-motion: reduce)`).matches !== true &&
            !isRunningAcceptanceTest()
        );
    }, []);

    const maxValue =
        type === TYPE_LINEAR
            ? VIEW_BOX_WIDTH - lineCapRadius * 2
            : type === TYPE_CIRCULAR
              ? Math.PI * 2
              : Math.PI;

    const segmentSeparation =
        type === TYPE_LINEAR ? separation / VIEW_BOX_WIDTH : separation / radius / maxValue;

    const height =
        type === TYPE_LINEAR ? STROKE_WIDTH_PX : type === TYPE_CIRCULAR ? width : width / 2 + lineCapRadiusPx;

    const viewBoxHeight =
        type === TYPE_LINEAR
            ? strokeWidth
            : type === TYPE_CIRCULAR
              ? VIEW_BOX_WIDTH
              : CENTER_X + lineCapRadius;

    const trackbarColor = isOverMedia
        ? vars.colors.inverse
        : isInverse
          ? vars.colors.barTrackInverse
          : vars.colors.barTrack;

    //  scale values to the range [0, 1]
    const values = React.useMemo(() => {
        return valuesProp.map((v) => v / MAX_SEGMENT_VALUE);
    }, [valuesProp]);

    // the animation starts with these values
    const initialValuesRef = React.useRef<Array<number>>(
        Array.from({length: values.length}, () => (reverse ? 1 : 0))
    );

    const [segments, setSegments] = React.useState<Array<Segment>>(() => {
        return values.map(() => ({start: 0, end: 0}));
    });

    // this is to know which are the first and last visible segments, which have special treatments
    let firstNonZeroIndex = -1;
    let lastNonZeroIndex = -1;
    for (let i = 0; i < segments.length; i++) {
        if (segments[i].end - segments[i].start > SMALL_VALUE_THRESHOLD) {
            if (firstNonZeroIndex < 0) {
                firstNonZeroIndex = i;
            }
            lastNonZeroIndex = i;
        }
    }

    const lastSegment: Segment | undefined = segments.at(-1);

    React.useEffect(() => {
        if (typeof widthProp === 'number') {
            setWidth(widthProp);
        } else {
            setWidth(containerWidth);
        }
    }, [widthProp, containerWidth]);

    React.useEffect(() => {
        let raf: number;
        const start = performance.now();
        const end = start + ANIMATION_DURATION_MS + ANIMATION_DELAY_MS * (values.length - 1);
        let currentSegments: Array<Segment> = [];
        const animate = () => {
            const now = performance.now();
            currentSegments = calculateSegments(initialValuesRef.current, values, now - start, reverse);
            if (shouldAnimate && now < end) {
                raf = requestAnimationFrame(animate); // request next frame
            } else {
                currentSegments = calculateSegments(initialValuesRef.current, values, end - start, reverse); // set the final values
                initialValuesRef.current = values;
            }
            setSegments(currentSegments);
        };
        animate();
        return () => {
            cancelAnimationFrame(raf);
            // animation was cancelled, snapshot current values
            initialValuesRef.current = currentSegments.map((s) => s.end - s.start);
        };
    }, [radius, values, type, reverse, shouldAnimate]);

    const getX = React.useCallback(
        (value: number) =>
            type === TYPE_LINEAR
                ? lineCapRadius + maxValue * value
                : CENTER_X - radius * Math.cos(value * maxValue),
        [lineCapRadius, maxValue, radius, type]
    );

    const getY = React.useCallback(
        (value: number) =>
            type === TYPE_LINEAR ? strokeWidth / 2 : CENTER_Y - radius * Math.sin(value * maxValue),
        [maxValue, radius, strokeWidth, type]
    );

    const getColor = (index: number) => segmentColors[index % segmentColors.length];

    const totalPercent = Math.round((lastSegment?.end || 0) * 100);

    const valueText =
        t(meterTotalLabel, values.length, totalPercent) +
        ' ' +
        values.map((v, i) => `${t(meterSectionLabel, i + 1, Math.round(v * 100))}`).join('. ');

    const extraStyle = React.useMemo(() => {
        if (type === TYPE_LINEAR) {
            return {display: 'flex'};
        }
        const COS_45 = 0.707107;
        const sizeFactor = (width / 2 - STROKE_WIDTH_PX) * COS_45;
        return {
            display: 'flex',
            marginTop:
                -1 * (type === TYPE_ANGULAR ? sizeFactor + STROKE_WIDTH_PX / 2 : sizeFactor + width / 2),
            width: sizeFactor * 2,
            minHeight: type === TYPE_ANGULAR ? sizeFactor + STROKE_WIDTH_PX / 2 : sizeFactor * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        };
    }, [width, type]);

    return (
        <div
            ref={containerRef}
            style={{width: widthProp, minHeight: height}}
            role="meter"
            aria-label={ariaLabel || (ariaLabelledBy ? undefined : valueText)}
            aria-labelledby={ariaLabelledBy}
            aria-valuenow={totalPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-live="polite"
            aria-valuetext={valueText}
            aria-hidden={ariaHidden}
            {...getPrefixedDataAttributes(dataAttributes, 'Meter')}
        >
            <svg
                viewBox={`0 0 ${VIEW_BOX_WIDTH} ${viewBoxHeight}`}
                style={{
                    width,
                    height,
                    display: 'block',
                    transform: `rotate(${type === TYPE_CIRCULAR ? '90deg' : 0})`,
                }}
                // always hidden
                aria-hidden="true"
            >
                <defs>
                    {hasRoundLineCaps && (
                        <>
                            <marker
                                id={markerCurrentId}
                                viewBox="0 0 10 10"
                                markerWidth={1}
                                markerHeight={1}
                                orient="auto"
                                refX={5}
                                refY={5}
                            >
                                <rect x={4} y={0} width={2} height={10} fill={getColor(lastNonZeroIndex)} />
                                <path
                                    d={createPath({x1: 5, y1: 0, x2: 5, y2: 10, radius: 5})}
                                    fill={getColor(lastNonZeroIndex)}
                                />
                            </marker>
                            <marker
                                id={markerStartId}
                                viewBox="0 0 10 10"
                                markerWidth={1}
                                markerHeight={1}
                                orient="auto"
                                refX={5}
                                refY={5}
                            >
                                <rect x={4} y={0} width={2} height={10} fill={getColor(firstNonZeroIndex)} />
                                <path
                                    d={createPath({x1: 5, y1: 0, x2: 5, y2: 10, radius: 5, clockwise: 0})}
                                    fill={getColor(firstNonZeroIndex)}
                                />
                            </marker>
                        </>
                    )}
                    <mask id={maskBarTrackId} maskUnits="userSpaceOnUse">
                        <rect x={0} y={0} width={VIEW_BOX_WIDTH} height={viewBoxHeight} fill="white" />
                        {firstNonZeroIndex >= 0 && lastSegment && (
                            <>
                                <path
                                    // this path is used to mask the trackbar
                                    stroke="black"
                                    fill="none"
                                    strokeWidth={strokeWidth + separation * 2}
                                    strokeLinecap={
                                        type === TYPE_CIRCULAR || !hasRoundLineCaps ? 'butt' : 'round'
                                    }
                                    d={createPath({
                                        x1: getX(0),
                                        y1: getY(0),
                                        x2: getX(
                                            clamp(
                                                lastSegment.end + (hasRoundLineCaps ? 0 : segmentSeparation),
                                                0,
                                                1 - SMALL_VALUE_THRESHOLD
                                            )
                                        ),
                                        y2: getY(
                                            clamp(
                                                lastSegment.end + (hasRoundLineCaps ? 0 : segmentSeparation),
                                                0,
                                                1 - SMALL_VALUE_THRESHOLD
                                            )
                                        ),
                                        radius,
                                        largeArchFlag: type === TYPE_CIRCULAR ? lastSegment.end >= 0.5 : 0,
                                    })}
                                />
                                {type === TYPE_CIRCULAR && hasRoundLineCaps && (
                                    // the circular type has butt line caps, so we need to add a circle to the end
                                    <circle
                                        cx={getX(lastSegment.end)}
                                        cy={getY(lastSegment.end)}
                                        r={strokeWidth / 2 + separation}
                                        fill="black"
                                    />
                                )}
                                {type === TYPE_CIRCULAR && lastSegment.end <= 0.5 && (
                                    // small patch to remove the circular mask when the last segment is too near to the start
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
                    {type === TYPE_CIRCULAR && (
                        <mask id={maskLastSegmentId} maskUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={VIEW_BOX_WIDTH} height={viewBoxHeight} fill="white" />
                            <path
                                stroke="black"
                                strokeWidth={strokeWidth}
                                fill="none"
                                d={createPath({
                                    x1: getX(1 - segmentSeparation),
                                    y1: getY(1 - segmentSeparation),
                                    x2: getX(1),
                                    y2: getY(1),
                                    radius,
                                })}
                            />
                        </mask>
                    )}
                </defs>

                <path
                    stroke={trackbarColor}
                    opacity={isOverMedia ? 0.5 : 1}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeLinecap={type === TYPE_CIRCULAR || !hasRoundLineCaps ? 'butt' : 'round'}
                    d={createPath({
                        x1: getX(0),
                        y1: getY(0),
                        x2: getX(1 - (type === TYPE_CIRCULAR ? segmentSeparation : 0)),
                        y2: getY(1 - (type === TYPE_CIRCULAR ? segmentSeparation : 0)),
                        largeArchFlag: 1,
                        radius,
                    })}
                    mask={`url("#${maskBarTrackId}")`}
                />

                {firstNonZeroIndex >= 0 &&
                    [...segments].reverse().map((segment, reversedIndex) => {
                        // note that the list is reversed, so the first segment is drawn last
                        const index = segments.length - 1 - reversedIndex;
                        const color = getColor(index);
                        const isFirst = index === firstNonZeroIndex;
                        const isLast = index === lastNonZeroIndex;
                        const start =
                            isFirst || segment.end - segment.start < segmentSeparation
                                ? segment.start
                                : segment.start + segmentSeparation / 2;
                        const end =
                            isLast || segment.end - segment.start < segmentSeparation
                                ? segment.end
                                : segment.end - segmentSeparation / 2;

                        if (end - start < SMALL_VALUE_THRESHOLD) {
                            return null;
                        }

                        const shouldIncludeStartMarker = isFirst && type !== TYPE_CIRCULAR;
                        return (
                            <path
                                key={reversedIndex}
                                stroke={color}
                                fill="none"
                                strokeWidth={strokeWidth}
                                strokeLinecap="butt"
                                markerEnd={isLast ? `url(#${markerCurrentId})` : undefined}
                                markerStart={shouldIncludeStartMarker ? `url(#${markerStartId})` : undefined}
                                mask={
                                    isLast && type === TYPE_CIRCULAR
                                        ? `url("#${maskLastSegmentId}")`
                                        : undefined
                                }
                                d={createPath({
                                    x1: getX(start),
                                    y1: getY(start),
                                    x2: getX(end),
                                    y2: getY(end),
                                    largeArchFlag: type === TYPE_CIRCULAR ? end - start >= 0.5 : 0,
                                    radius,
                                })}
                            />
                        );
                    })}
            </svg>
            {extra && <div style={extraStyle}>{extra}</div>}
        </div>
    );
};

/**
 * This wrapper is to force a remount when some specific props change
 */
const Meter = (props: MeterProps): JSX.Element => {
    return <MeterComponent {...props} key={`${props.type},${props.values.length},${props.reverse}`} />;
};

export default Meter;
