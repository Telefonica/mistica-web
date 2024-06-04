import * as React from 'react';
import {Box, ResponsiveLayout, Spinner} from '..';

export default {
    title: 'Components/Spinner',
    component: Spinner,
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 100, step: 4},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    size: number;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({size, inverse}) => {
    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <Spinner size={size} />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Spinner';
Default.args = {
    size: 24,
    inverse: false,
};
