import * as React from 'react';
import Tooltip from '../tooltip';
import {useBoundingRect} from '../hooks';
import {Text2} from '../text';
import Stack from '../stack';

export default {
    title: 'Hooks/useBoundingRect',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        position: {
            options: ['left', 'right', 'top', 'bottom'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    top: number;
    left: number;
    position: 'left' | 'right' | 'top' | 'bottom';
    title: string;
    description: string;
    delay: boolean;
};

export const Default: StoryComponent<Args> = ({top, left, position, title, description, delay}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const rect = useBoundingRect(ref);

    return (
        <div style={{position: 'relative'}}>
            <div style={{position: 'relative'}}>
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
                    position: 'absolute',
                    zIndex: 1,
                    top,
                    left,
                    transition: 'all 1s',
                }}
            >
                <Tooltip
                    targetLabel="test"
                    target={
                        <div
                            ref={ref}
                            style={{
                                width: 100,
                                height: 100,
                                boxSizing: 'border-box',
                                border: `2px solid red`,
                            }}
                        />
                    }
                    position={position}
                    title={title}
                    delay={delay}
                    description={description}
                    textCenter
                />
            </div>
        </div>
    );
};

Default.storyName = 'useBoundingRect';

Default.args = {
    top: 0,
    left: 0,
    position: 'top',
    title: 'title',
    description: 'description',
    delay: true,
};
