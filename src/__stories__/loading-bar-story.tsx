import * as React from 'react';
import LoadingBarComponent from '../loading-bar';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/LoadingBar',
    parameters: {
        fullScreen: true,
    },
};

export const LoadingBar: StoryComponent = () => (
    <StorySection title="Loading Bar">
        <LoadingBarComponent visible />
    </StorySection>
);
