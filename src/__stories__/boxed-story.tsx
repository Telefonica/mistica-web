import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
};

type Args = {
    inverse: boolean;
    overInverse: boolean;
};

export const Default: StoryComponent<Args> = ({inverse, overInverse}) => {
    return (
        <ResponsiveLayout dataAttributes={{testid: 'boxed'}} fullWidth isInverse={overInverse}>
            <Box padding={16}>
                <Boxed isInverse={inverse}>
                    <Box padding={16}>
                        <Text8>Text</Text8>
                    </Box>
                </Boxed>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Boxed';
Default.args = {
    inverse: false,
    overInverse: false,
};
