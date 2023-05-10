import * as React from 'react';
import {Box, HorizontalScroll, Inline, ResponsiveLayout, Stack} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/HorizontalScroll',
    parameters: {fullScreen: true},
};

type Args = {
    showScrollbar: boolean;
};

export const Default: StoryComponent<Args> = ({showScrollbar}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={16}>
                    <Placeholder />
                    <HorizontalScroll noScrollbar={!showScrollbar}>
                        <Inline space={16}>
                            <Placeholder width={200} height={200} />
                            <Placeholder width={200} height={200} />
                            <Placeholder width={200} height={200} />
                            <Placeholder width={200} height={200} />
                        </Inline>
                    </HorizontalScroll>
                    <Placeholder />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'HorizontalScroll';

Default.args = {
    showScrollbar: true,
};
