import * as React from 'react';
import {ProgressBar} from '..';

export default {
    title: 'Components/ProgressBar',
    argTypes: {
        color: {
            options: ['default', 'red'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    reverse: boolean;
    progressPercent: number;
    color: 'default' | 'red';
};

export const Default: StoryComponent<Args> = ({reverse, progressPercent, color}) => (
    <div data-testid="progress-bar">
        <ProgressBar
            progressPercent={progressPercent}
            reverse={reverse}
            color={color === 'default' ? undefined : color}
        />
    </div>
);

Default.storyName = 'ProgressBar';
Default.args = {
    reverse: false,
    progressPercent: 30,
    color: 'default',
};
