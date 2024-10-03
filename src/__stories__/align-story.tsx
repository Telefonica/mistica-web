import * as React from 'react';
import {Align, Text2} from '..';

export default {
    title: 'Layout/Align',
    argTypes: {
        x: {
            options: ['start', 'center', 'end'],
            control: {type: 'select'},
        },
        y: {
            options: ['start', 'center', 'end'],
            control: {type: 'select'},
        },
        width: {
            control: {type: 'range', min: 200, max: 400, step: 20},
        },
        height: {
            control: {type: 'range', min: 200, max: 400, step: 20},
        },
    },
};

type Props = {
    x: 'start' | 'center' | 'end';
    y: 'start' | 'center' | 'end';
    width: number;
    height: number;
};

export const Default: StoryComponent<Props> = ({x, y, width, height}) => {
    return (
        <div style={{display: 'inline-block', border: '1px solid red'}}>
            <Align width={width} height={height} x={x} y={y} dataAttributes={{testid: 'story'}}>
                <Text2 regular>Content</Text2>
            </Align>
        </div>
    );
};

Default.storyName = 'Align';
Default.args = {
    x: 'start',
    y: 'start',
    width: 200,
    height: 200,
};
