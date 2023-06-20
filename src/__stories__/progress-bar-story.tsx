import * as React from 'react';
import {ProgressBar} from '..';

export default {
    title: 'Components/Progress bar',
    parameters: {fullScreen: false},
};

type Args = {
    reverse: boolean;
    progressPercent: number;
};

export const Default: StoryComponent<Args> = ({reverse, progressPercent}) => (
    <div data-testid="progress-bar">
        <ProgressBar progressPercent={progressPercent} reverse={reverse} />
    </div>
);

Default.storyName = 'Progress bar';
Default.args = {
    reverse: false,
    progressPercent: 30,
};
