import * as React from 'react';
import {ProgressBar, ProgressBarStepped} from '..';
import {vars} from '../skins/skin-contract.css';

export default {
    title: 'Components/Progress bars',
    argTypes: {
        color: {
            options: ['default', 'error'],
            control: {type: 'select'},
        },
    },
};

type ProgressBarStoryArgs = {
    reverse: boolean;
    progressPercent: number;
    color: 'default' | 'error';
};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = ({reverse, progressPercent, color}) => (
    <ProgressBar
        dataAttributes={{testid: 'progress-bar'}}
        progressPercent={progressPercent}
        reverse={reverse}
        color={color === 'error' ? vars.colors.error : undefined}
    />
);

ProgressBarStory.storyName = 'ProgressBar';
ProgressBarStory.args = {
    reverse: false,
    progressPercent: 30,
    color: 'default',
};

type ProgressBarSteppedStoryArgs = {
    steps: number;
    currentStep: number;
    color: 'default' | 'error';
};

export const ProgressBarSteppedStory: StoryComponent<ProgressBarSteppedStoryArgs> = ({
    steps,
    currentStep,
    color,
}) => (
    <ProgressBarStepped
        steps={steps}
        currentStep={currentStep}
        dataAttributes={{testid: 'progress-bar-stepped'}}
        color={color === 'error' ? vars.colors.error : undefined}
    />
);

ProgressBarSteppedStory.storyName = 'ProgressBarStepped';
ProgressBarSteppedStory.args = {
    steps: 4,
    currentStep: 3,
    color: 'default',
};
ProgressBarSteppedStory.argTypes = {
    steps: {
        control: {type: 'range', min: 1, max: 6, step: 1},
    },
};
