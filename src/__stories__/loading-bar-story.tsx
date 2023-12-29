import * as React from 'react';
import LoadingBarComponent from '../loading-bar';
import {StorySection} from './helpers';

export default {
    title: 'Components/Loading bar',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    visible: boolean;
};

export const Default: StoryComponent<Args> = ({visible}) => (
    <StorySection title="LoadingBar">
        <LoadingBarComponent visible={visible} />
    </StorySection>
);

Default.args = {
    visible: true,
};

Default.storyName = 'Loading bar';
