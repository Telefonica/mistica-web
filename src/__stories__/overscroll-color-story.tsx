import * as React from 'react';
import {OverscrollColor, useTheme, Text2, Box} from '..';

export default {
    title: 'Components/Utils/OverscrollColor',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    return (
        <>
            <div style={{background: theme.colors.backgroundBrand, height: 200}}>
                <OverscrollColor />
            </div>
            <Box padding={16}>
                <Text2 regular color={theme.colors.textSecondary}>
                    Try to overscroll this screen in iOS. You'll see how the header color remains above the
                    scroll.
                </Text2>
            </Box>
        </>
    );
};

Default.storyName = 'OverscrollColor';
