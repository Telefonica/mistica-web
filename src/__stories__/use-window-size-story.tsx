import * as React from 'react';
import {useWindowSize, useTheme, Stack, Text2} from '..';

export default {
    title: 'Hooks/useWindowSize',
};

export const UseWindowSize: StoryComponent = () => {
    const theme = useTheme();
    const size = useWindowSize();
    return (
        <Stack space={16}>
            <Text2 regular color={theme.colors.textSecondary}>
                Resize the window
            </Text2>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(size, null, 2)}</pre>
        </Stack>
    );
};

UseWindowSize.storyName = 'useWindowSize';
