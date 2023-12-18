import * as React from 'react';
import {OverscrollColor, skinVars, Text2, Box, ResponsiveLayout} from '..';

export default {
    title: 'Utilities/OverscrollColor',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        theme: {
            options: ['default', 'inverse', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    theme: 'default' | 'inverse' | 'alternative';
};

export const Default: StoryComponent<Args> = ({theme}) => {
    return (
        <>
            <ResponsiveLayout fullWidth variant={theme}>
                <div style={{height: 200}} />
                <OverscrollColor />
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
Default.args = {
    theme: 'inverse',
};
