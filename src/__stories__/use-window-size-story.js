// @flow
import * as React from 'react';
import {useWindowSize, useTheme, Stack, Text} from '..';

export default {
    title: 'Hooks|useWindowSize',
};

export const UseWindowSize = (): React.Node => {
    const theme = useTheme();
    const size = useWindowSize();
    return (
        <Stack space={16}>
            <Text size={16} color={theme.colors.textSecondary}>
                Resize the window
            </Text>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(size, null, 2)}</pre>
        </Stack>
    );
};

UseWindowSize.story = {
    name: 'useWindowSize',
};
