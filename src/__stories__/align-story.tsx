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
    },
};

type Props = {
    x: 'start' | 'center' | 'end';
    y: 'start' | 'center' | 'end';
};

export const Default: StoryComponent<Props> = ({x, y}) => {
    return (
        <div style={{display: 'inline-block', border: '1px solid red'}}>
            <Align width={200} height={200} x={x} y={y} dataAttributes={{testid: 'story'}}>
                <Text2 regular>Content</Text2>
            </Align>
        </div>
    );
};

Default.storyName = 'Align';
Default.args = {
    x: 'start',
    y: 'start',
};
