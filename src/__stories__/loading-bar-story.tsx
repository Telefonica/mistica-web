import * as React from 'react';
import LoadingBarComponent from '../loading-bar';
import {StorySection} from './helpers';

export default {
    title: 'Components/LoadingBar',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => (
    <StorySection title="LoadingBar">
        <LoadingBarComponent visible />
    </StorySection>
);

Default.storyName = 'LoadingBar';