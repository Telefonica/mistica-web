import * as React from 'react';
import {useScreenSize, useTheme, Stack, Text2} from '..';

export default {
    title: 'Hooks/useScreenSize',
};

export const UseScreenSize: StoryComponent = () => {
    const theme = useTheme();
    const screenSize = useScreenSize();
    return (
        <Stack space={16}>
            <Text2 regular color={theme.colors.textSecondary}>
                Resize the window
            </Text2>
            <Text2 regular as="pre">
                {JSON.stringify(screenSize, null, 2)}
            </Text2>
        </Stack>
    );
};

UseScreenSize.storyName = 'useScreenSize';
