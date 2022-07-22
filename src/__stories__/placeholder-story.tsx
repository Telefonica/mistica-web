import * as React from 'react';
import {Placeholder, Stack} from '..';

export default {
    title: 'Components/Primitives/Placeholder',
};

export const Default: StoryComponent = () => (
    <Stack space={16}>
        <Placeholder />
        <Placeholder height={200} />
    </Stack>
);

Default.storyName = 'Placeholder';
