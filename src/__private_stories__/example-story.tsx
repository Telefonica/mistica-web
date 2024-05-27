import * as React from 'react';
import {ResponsiveLayout, Stack, Title2, Text2, Box} from '..';

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
                    <Title2 as="h1">This is an example of private story</Title2>
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
