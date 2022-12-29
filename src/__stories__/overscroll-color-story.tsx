import * as React from 'react';
import {OverscrollColor, skinVars, Text2, Box} from '..';

export default {
    title: 'Utilities/OverscrollColor',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    return (
        <>
            <div style={{background: skinVars.colors.backgroundBrand, height: 200}}>
                <OverscrollColor />
            </div>
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
