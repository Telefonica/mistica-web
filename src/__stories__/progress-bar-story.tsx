import * as React from 'react';
import {ProgressBar} from '..';

export default {
    title: 'Components/Progress bar',
};

type Args = {
    inverted: boolean;
    progressPercent: number;
};

export const Default: StoryComponent<Args> = ({inverted, progressPercent}) => (
    <div data-testid="progress-bar">
        <ProgressBar progressPercent={progressPercent} inverted={inverted} />
    </div>
);

Default.storyName = 'Progress bar';
Default.args = {
    inverted: false,
    progressPercent: 30,
};
