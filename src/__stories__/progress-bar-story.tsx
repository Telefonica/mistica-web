import * as React from 'react';
import {Box, ProgressBar, ProgressBarStepped, ResponsiveLayout} from '..';
import {vars} from '../skins/skin-contract.css';

export default {
    title: 'Components/Progress bars',
    argTypes: {
        color: {
            options: ['default', 'error'],
            control: {type: 'select'},
        },
    },
    parameters: {fullScreen: true},
};

type ProgressBarStoryArgs = {
    reverse: boolean;
    progressPercent: number;
    color: 'default' | 'error';
    inverse: boolean;
};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = ({
    reverse,
    progressPercent,
    color,
    inverse,
}) => (
    <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
        <Box padding={16}>
            <ProgressBar
                dataAttributes={{testid: 'progress-bar'}}
                progressPercent={progressPercent}
                reverse={reverse}
                color={color === 'error' ? vars.colors.error : undefined}
            />
        </Box>
    </ResponsiveLayout>
);

ProgressBarStory.storyName = 'ProgressBar';
ProgressBarStory.args = {
    reverse: false,
    progressPercent: 30,
    color: 'default',
    inverse: false,
};

type ProgressBarSteppedStoryArgs = {
    steps: number;
    currentStep: number;
    color: 'default' | 'error';
    inverse: boolean;
};

export const ProgressBarSteppedStory: StoryComponent<ProgressBarSteppedStoryArgs> = ({
    steps,
    currentStep,
    color,
    inverse,
}) => (
    <ResponsiveLayout variant={inverse ? 'inverse' : undefined} fullWidth>
        <Box padding={16}>
            <ProgressBarStepped
                aria-label="Progreso"
                steps={steps}
                currentStep={currentStep}
                dataAttributes={{testid: 'progress-bar-stepped'}}
                color={color === 'error' ? vars.colors.error : undefined}
            />
        </Box>
    </ResponsiveLayout>
);

ProgressBarSteppedStory.storyName = 'ProgressBarStepped';
ProgressBarSteppedStory.args = {
    steps: 4,
    currentStep: 3,
    color: 'default',
    inverse: false,
};
ProgressBarSteppedStory.argTypes = {
    steps: {
        control: {type: 'range', min: 1, max: 6, step: 1},
    },
};
