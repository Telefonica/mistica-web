import * as React from 'react';
import {skinVars, Text2, Box, ResponsiveLayout, useSetOverscrollColor} from '..';

export default {
    title: 'Utilities/OverscrollColor',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    useSetOverscrollColor({topColor: skinVars.colors.backgroundBrand});
    return (
        <>
            <ResponsiveLayout fullWidth isInverse>
                <div style={{height: 200}} />
            </ResponsiveLayout>

            <Box padding={16}>
                <Text2 regular color={skinVars.colors.textSecondary}>
                    Try to overscroll this screen in iOS. You'll see how the header color remains above the
                    scroll.
                </Text2>
            </Box>
        </>
    );
};

Default.storyName = 'OverscrollColor';
