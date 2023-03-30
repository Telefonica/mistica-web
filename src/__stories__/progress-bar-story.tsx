import * as React from 'react';
import {ProgressBar} from '..';

export default {
    title: 'Components/Progress bar',
    argTypes: {
        inverse: false,
        progressPercent: 30,
    },
};

type Args = {
    inverse: boolean;
    progressPercent: number;
};

export const Default: StoryComponent<Args> = ({inverse, progressPercent}) => (
    <div data-testid="progress-bar">
        <ProgressBar progressPercent={progressPercent} inverse={inverse} />
    </div>
);

Default.storyName = 'Progress bar';
Default.args = {
    inverse: false,
    progressPercent: 30,
};
