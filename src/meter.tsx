// https://www.figma.com/design/jWWCJ9kYl6I5uHLz3GcgRp/%F0%9F%94%B6-%5BREADY%5D-Data-Visualizations-Specs
import * as React from 'react';

const VIEW_BOX_SIZE = 300;
const STROKE_WIDTH = 6;
const HALF_STROKE_WIDTH = STROKE_WIDTH / 2;
const RADIUS = VIEW_BOX_SIZE / 2 - STROKE_WIDTH / 2;

/**
 * https://www.nan.fyi/svg-paths/arcs
 */
const createArcPath = ({
    startX,
    startY,
    endX,
    endY,
}: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}): string => {
    const clockwise = 1;
    const xAxisRotation = 0; // no effect because the arc is a circle
    const largeArchFlag = 0;
    return `M ${startX} ${startY} A ${RADIUS} ${RADIUS} ${xAxisRotation} ${largeArchFlag} ${clockwise} ${endX} ${endY}`;
};

type MeterProps = {
    /**
     * Position of the meter. 0 is at the start, 1 is at the end.
     * If an array is provided, the positions will be stacked. The sum of the values must not exceed 1.
     */
    value: number | Array<number>;
};

const Meter = ({value}: MeterProps): JSX.Element => {
    console.log('--------------' + Date.now());
    const radius = VIEW_BOX_SIZE / 2 - STROKE_WIDTH / 2;

    const angle = (value ?? 0.5) * Math.PI; // radians. position = 1 is half circle
    const endX = VIEW_BOX_SIZE / 2 - radius * Math.cos(angle);
    const endY = VIEW_BOX_SIZE / 2 - radius * Math.sin(angle);

    return (
        <svg
            viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
            width={400}
            height={400}
            style={{border: '1px solid red'}}
        >
            <defs>
                <marker id="round" viewBox="-3 -3 6 6" markerWidth={STROKE_WIDTH} orient="auto">
                    <circle r={1} fill="black" />
                </marker>
            </defs>

            <path
                stroke="gray"
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth={STROKE_WIDTH - 0.5}
                strokeLinecap="round"
                d={createArcPath({
                    startX: HALF_STROKE_WIDTH,
                    startY: VIEW_BOX_SIZE / 2,
                    endX: VIEW_BOX_SIZE - HALF_STROKE_WIDTH,
                    endY: VIEW_BOX_SIZE / 2,
                })}
            />

            <path
                stroke="red"
                fill="none"
                strokeWidth={STROKE_WIDTH}
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#round)"
                markerStart="url(#round)"
                d={createArcPath({
                    startX: HALF_STROKE_WIDTH,
                    startY: VIEW_BOX_SIZE / 2,
                    endX,
                    endY,
                })}
            />
        </svg>
    );
};

export default Meter;
