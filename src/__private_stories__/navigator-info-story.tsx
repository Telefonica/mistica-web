import * as React from 'react';
import {ResponsiveLayout, Stack, Text2, Box, Callout, Title1} from '..';

export default {
    title: 'Private/Navigator info',
    parameters: {
        fullScreen: true,
    },
};

const INFO_ENTRIES = Object.entries({
    'User Agent': navigator.userAgent,
    Platform: navigator.platform,
    'Accepted Languages': JSON.stringify(navigator.languages, null, 2),
    'Default Language': navigator.language,
});

export const Default: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout description="This story is to verify that the browser that generates the screenshot and the one that runs in CI are the same" />
                    {INFO_ENTRIES.map(([key, value]) => (
                        <Stack key={key} space={8}>
                            <Title1>{key}</Title1>
                            <Text2 regular as="p">
                                {value}
                            </Text2>
                        </Stack>
                    ))}
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Navigator info';
