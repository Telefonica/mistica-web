import * as React from 'react';
import {Meter} from '..';

export default {
    title: 'Components/Meters',
    argTypes: {
        // color: {
        //     options: ['default', 'error'],
        //     control: {type: 'select'},
        // },
    },
};

type ProgressBarStoryArgs = {foo: 'bar'};

export const ProgressBarStory: StoryComponent<ProgressBarStoryArgs> = () => <Meter />;

ProgressBarStory.storyName = 'Meter';
ProgressBarStory.args = {
    foo: 'bar',
};
