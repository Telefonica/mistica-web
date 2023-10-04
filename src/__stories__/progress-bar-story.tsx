import * as React from 'react';
import {ProgressBar, ProgressBarStepped} from '..';

export default {
    title: 'Components/Progress bar',
    argTypes: {
        color: {
            options: ['default', 'red'],
            control: {type: 'select'},
        },
    },
};

type ProgressBarStoryArgs = {
    reverse: boolean;
    progressPercent: number;
    color: 'default' | 'red';
};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = ({reverse, progressPercent, color}) => (
    <ProgressBar
        dataAttributes={{testid: 'progress-bar'}}
        progressPercent={progressPercent}
        reverse={reverse}
        color={color === 'default' ? undefined : color}
    />
);

type ProgressBarSteppedStoryArgs = {
    reverse: boolean;
    steps: number;
    currentStep: number;
    color: 'default' | 'red';
};

export const ProgressBarSteppedStory: StoryComponent<ProgressBarSteppedStoryArgs> = ({
    reverse,
    steps,
    currentStep,
    color,
}) => (
    <ProgressBarStepped
        steps={steps}
        currentStep={currentStep}
        dataAttributes={{testid: 'progress-bar-stepped'}}
        reverse={reverse}
        color={color === 'default' ? undefined : color}
    />
);

ProgressBarStory.storyName = 'ProgressBar';
ProgressBarSteppedStory.storyName = 'ProgressBarStepped';

ProgressBarStory.args = {
    reverse: false,
    progressPercent: 30,
    color: 'default',
};

ProgressBarSteppedStory.args = {
    reverse: false,
    steps: 4,
    currentStep: 3,
    color: 'default',
};

ProgressBarSteppedStory.argTypes = {
    steps: {
        control: {type: 'range', min: 1, max: 6, step: 1},
    },
};
