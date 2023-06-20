import * as React from 'react';
import LoadingBarComponent from '../loading-bar';
import {Title1} from '../title';
import Box from '../box';

export default {
    title: 'Components/Loading bar',
};

export const Default: StoryComponent = () => (
    <Box padding={16}>
        <LoadingBarComponent visible />
        <Title1>Loading Bar</Title1>
    </Box>
);

Default.storyName = 'Loading bar';
