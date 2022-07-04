// @flow
import * as React from 'react';
import {ProgressBar} from '..';

export default {
    title: 'Components/ProgressBar',
};

export const Default: StoryComponent = () => (
    <div data-testid="progress-bar">
        <ProgressBar progressPercent={30} />
    </div>
);

Default.storyName = 'ProgressBar';
