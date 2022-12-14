import * as React from 'react';
import {useWindowSize, skinVars, Stack, Text2} from '..';

export default {
    title: 'Hooks/useWindowSize',
};

export const UseWindowSize: StoryComponent = () => {
    const size = useWindowSize();
    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textSecondary}>
                Resize the window
            </Text2>
            <Text2 as="pre" regular>
                {JSON.stringify(size, null, 2)}
            </Text2>
        </Stack>
    );
};

UseWindowSize.storyName = 'useWindowSize';
