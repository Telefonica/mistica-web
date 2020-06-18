import * as React from 'react';
import {OverscrollColor, useTheme, Text, Box} from '..';

export default {
    title: 'Components|Utils/OverscrollColor',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    return (
        <>
            <div style={{background: theme.colors.backgroundHeading, height: 200}}>
                <OverscrollColor />
            </div>
            <Box padding={16}>
                <Text size={16} color={theme.colors.textSecondary}>
                    Try to overscroll this screen in iOS. You'll see how the header color remains above the
                    scroll.
                </Text>
            </Box>
        </>
    );
};

Default.story = {name: 'OverscrollColor'};
