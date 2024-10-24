// https://www.figma.com/design/jWWCJ9kYl6I5uHLz3GcgRp/%F0%9F%94%B6-%5BREADY%5D-Data-Visualizations-Specs
'use client';
import * as React from 'react';
// @ts-expect-error - no types
import bezier from 'cubic-bezier';

const VIEW_BOX_WIDTH = 100;
const CENTER_X = VIEW_BOX_WIDTH / 2;
const CENTER_Y = VIEW_BOX_WIDTH / 2;

const STROKE_WIDTH_PX = 26;
const SEPARATION_PX = 6;

const ANIMATION_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 1000;
const ANIMATION_EPSILON = 1000 / 60 / ANIMATION_DURATION_MS / 4;

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
        // accumulate the values
        const desiredValue = endValues.slice(0, i + 1).reduce((acc, v) => acc + v, 0);

        // each segment has an accumulated delay time. The last segment has no delay
        const delay = ANIMATION_DELAY_MS * (startValues.length - i - 1);
        const animationTime = clamp((time - delay) / ANIMATION_DURATION_MS, 0, 1);

        const isFirst = i === 0;

        const position = clamp(timingFunction(animationTime), 0, 1);

        const a1 = isFirst ? 0 : segments.at(-1)?.a2 || 0;
        const a2 = (desiredValue - startValues[i]) * position * Math.PI;

        segments.push({a1, a2});

        if (isFirst) {
            // console.log({v0: startValues[i], v1: endValues[i], value, position, animationTime, delay});
        }
    }

    return segments;
};

const Marker = ({id, color}: {id: string; color: string}): JSX.Element => {
    return (
        <marker id={id} viewBox="0 0 10 10" markerWidth={1} markerHeight={1} orient="auto" refX={5} refY={5}>
            <circle cx={5} cy={5} r={5} fill={color} />
        </marker>
    );
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
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
}): string => {
    const clockwise = 1;
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
};

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown'];

const Meter = ({width = 400}: MeterProps): JSX.Element => {
    const scaleFactor = VIEW_BOX_WIDTH / width;
    const strokeWidth = STROKE_WIDTH_PX * scaleFactor;
    const radius = CENTER_X - strokeWidth / 2;
    const separation = SEPARATION_PX * scaleFactor;

    const [values, setValue] = React.useState<Array<number>>(Array.from({length: 8}, () => 0.1));

    const [segments, setSegments] = React.useState<Array<Segment>>(
        values.map(() => ({
            a1: 0,
            a2: 0,
            x1: CENTER_X - radius,
            y1: CENTER_Y,
            x2: CENTER_X - radius,
            y2: CENTER_Y,
        }))
    );

    const initialValuesRef = React.useRef(Array.from({length: 8}, () => 0));

    const arcLenght = Math.PI * radius;
    const separationAngle = separation / radius;

    React.useEffect(() => {
        let raf: number;
        const start = performance.now();
        const end = start + ANIMATION_DURATION_MS + ANIMATION_DELAY_MS * (values.length - 1);
        console.log('EFFECT-------------------', {start, end, duration: end - start});
        const animate = () => {
            const now = performance.now();
            setSegments(calculateArcSegments(initialValuesRef.current, values, now - start));
            if (now < end) {
                // request next frame
                raf = requestAnimationFrame(animate);
            } else {
                // animation is done, update the initial values
                console.log('DONE');
                initialValuesRef.current = values;
            }
        };
        animate();
        return () => {
            cancelAnimationFrame(raf);
        };
    }, [radius, values]);

    return (
        <div
            style={{
                padding: 8,
                background: 'url(https://img.freepik.com/free-photo/fantasy-style-clouds_23-2151057636.jpg)',
                backgroundSize: 'cover',
            }}
        >
            <svg
                viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_WIDTH}`}
                width={width}
                height={width}
                style={{border: '1px dotted red'}}
            >
                <defs>
                    <Marker id="marker-start" color={colors[0]} />
                    <Marker id="marker-current" color={colors[values.length - 1]} />
                    <mask id="mask-circle">
                        <rect x={0} y={0} width={VIEW_BOX_WIDTH} height={VIEW_BOX_WIDTH} fill="white" />
                        <circle
                            cx={getX(segments.at(-1)?.a2 || 0, radius)}
                            cy={getY(segments.at(-1)?.a2 || 0, radius)}
                            r={strokeWidth / 2 + separation}
                            fill="black"
                        />
                    </mask>
                </defs>

                <path
                    stroke="lightgray"
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    // strokeDasharray={`${arcLenght - sum * arcLenght} ${arcLenght}`}
                    // strokeDashoffset={-sum * arcLenght}
                    d={createArcPath({
                        x1: strokeWidth / 2,
                        y1: VIEW_BOX_WIDTH / 2,
                        x2: VIEW_BOX_WIDTH - strokeWidth / 2,
                        y2: VIEW_BOX_WIDTH / 2,
                        radius,
                    })}
                    mask="url(#mask-circle)"
                />

                {[...segments].reverse().map((segment, reversedIndex) => {
                    // note that the list is reversed, so the first segment is drawn last
                    const index = segments.length - 1 - reversedIndex;
                    const color = colors[index % colors.length];
                    const isFirst = index === 0;
                    const isLast = index === segments.length - 1;
                    return (
                        <path
                            key={reversedIndex}
                            stroke={color}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                            markerStart={isFirst ? 'url(#marker-start)' : undefined}
                            markerEnd={isLast ? 'url(#marker-current)' : undefined}
                            d={createArcPath({
                                x1: getX(segment.a1, radius),
                                y1: getY(segment.a1, radius),
                                x2: getX(segment.a2, radius),
                                y2: getY(segment.a2, radius),
                                radius,
                            })}
                        />
                    );
                })}
            </svg>
            <div>
                <input
                    type="range"
                    style={{width: 400}}
                    value={values[0] * 1000 * 8}
                    max={1000}
                    onChange={(e) => {
                        const v = +e.currentTarget.value / 1000 / 8;
                        setValue(Array.from({length: 8}, () => v));
                    }}
                ></input>
                {values[0]}
            </div>
        </div>
    );
};

export default Meter;
