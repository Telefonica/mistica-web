import * as React from 'react';
import {Box, Placeholder} from '..';

export default {
    title: 'Components/Primitives/Placeholder',
};

type Args = {
    width: string;
    height: string;
};

export const Default: StoryComponent<Args> = ({width, height}) => (
    <Box padding={16}>
        <Placeholder width={width} height={height} />
    </Box>
);

Default.storyName = 'Placeholder';

Default.args = {
    width: '100%',
    height: '100%',
};
