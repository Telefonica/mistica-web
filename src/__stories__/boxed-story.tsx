import * as React from 'react';
import {Box, Boxed, Text8, ResponsiveLayout} from '..';

export default {
    title: 'Components/Primitives/Boxed',
    parameters: {fullScreen: true},
};

type Args = {
    inverseInside: boolean;
    inverseOutside: boolean;
};

export const Default: StoryComponent<Args> = ({inverseInside, inverseOutside}) => {
    return (
        <ResponsiveLayout dataAttributes={{testid: 'boxed'}} fullWidth isInverse={inverseOutside}>
            <Box padding={16}>
                <Boxed isInverse={inverseInside}>
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
    inverseInside: false,
    inverseOutside: false,
};
