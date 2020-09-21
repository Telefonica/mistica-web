import * as React from 'react';
import {useScreenSize, useTheme, Stack, Text7} from '..';

export default {
    title: 'Hooks|useScreenSize',
};

export const UseScreenSize: StoryComponent = () => {
    const theme = useTheme();
    const screenSize = useScreenSize();
    return (
        <Stack space={16}>
            <Text7 regular color={theme.colors.textSecondary}>
                Resize the window
            </Text7>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(screenSize, null, 2)}</pre>
        </Stack>
    );
};

UseScreenSize.story = {
    name: 'useScreenSize',
};
