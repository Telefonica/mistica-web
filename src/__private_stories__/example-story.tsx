import * as React from 'react';
import {ResponsiveLayout, Stack, Text2, Box, Title3} from '..';

export default {
    title: 'Private/Example',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Title3 as="h1">This is an example of private story</Title3>
                    <Stack space={8}>
                        <Text2 regular as="p">
                            Private stories are only available in dev and CI builds, not in production.
                        </Text2>
                        <Text2 regular as="p">
                            These stories are meant to be used for acceptance/screenshot tests that we don't
                            want to appear in the production mística storybook.
                        </Text2>
                    </Stack>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Example';
