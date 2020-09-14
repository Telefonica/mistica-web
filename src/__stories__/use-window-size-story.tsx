import * as React from 'react';
import {useWindowSize, useTheme, Stack, Text7} from '..';

export default {
    title: 'Hooks|useWindowSize',
};

export const UseWindowSize: StoryComponent = () => {
    const theme = useTheme();
    const size = useWindowSize();
    return (
        <Stack space={16}>
            <Text7 color={theme.colors.textSecondary}>Resize the window</Text7>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(size, null, 2)}</pre>
        </Stack>
    );
};

UseWindowSize.story = {
    name: 'useWindowSize',
};
