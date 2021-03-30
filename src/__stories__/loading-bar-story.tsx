import * as React from 'react';
import LoadingBarComponent from '../loading-bar';
import {StorySection} from './helpers';

export default {
    title: 'Components/Feedbacks/LoadingBar',
};

export const LoadingBar: StoryComponent = () => (
    <StorySection title="Loading Bar">
        <LoadingBarComponent visible />
    </StorySection>
);
