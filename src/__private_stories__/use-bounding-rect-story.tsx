import * as React from 'react';
import {useBoundingRect} from '../hooks';
import {Text2} from '../text';
import Stack from '../stack';

export default {
    title: 'Private/useBoundingRect',
    argTypes: {
        offsetX: {control: {type: 'range', min: 0, max: 1500, step: 100}},
        offsetY: {control: {type: 'range', min: 0, max: 1500, step: 100}},
        width: {control: {type: 'range', min: 50, max: 250, step: 50}},
        height: {control: {type: 'range', min: 50, max: 250, step: 50}},
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
};

export const Default: StoryComponent<Args> = ({offsetX, offsetY, width, height}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const rect = useBoundingRect(ref);

    return (
        <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', top: 0, left: 0, zIndex: 1, userSelect: 'none'}}>
                <Stack space={16}>
                    <Text2 regular>Top: {rect?.top}</Text2>
                    <Text2 regular>Bottom: {rect?.bottom}</Text2>
                    <Text2 regular>Left: {rect?.left}</Text2>
                    <Text2 regular>Right: {rect?.right}</Text2>
                    <Text2 regular>Width: {rect?.width}</Text2>
                    <Text2 regular>Height: {rect?.height}</Text2>
                </Stack>
            </div>
            <div
                style={{
                    position: 'relative',
                    paddingLeft: offsetX,
                    paddingTop: offsetY,
                    transition: 'all 1s',
                }}
            >
                <div
                    ref={ref}
                    style={{
                        width,
                        height,
                        boxSizing: 'border-box',
                        border: `2px solid red`,
                    }}
                />
            </div>
        </div>
    );
};

Default.storyName = 'useBoundingRect';

Default.args = {
    offsetX: 0,
    offsetY: 0,
    width: 100,
    height: 100,
};
