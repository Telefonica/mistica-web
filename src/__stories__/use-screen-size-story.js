// @flow
import * as React from 'react';
import {useScreenSize, useTheme, Stack, Text} from '..';

export default {
    title: 'Components|Hooks/useScreenSize',
};

export const UseScreenSize = (): React.Node => {
    const theme = useTheme();
    const screenSize = useScreenSize();
    return (
        <Stack space={16}>
            <Text size={16} color={theme.colors.textSecondary}>
                Resize the window
            </Text>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(screenSize, null, 2)}</pre>
        </Stack>
    );
};

UseScreenSize.story = {
    name: 'useScreenSize',
};
