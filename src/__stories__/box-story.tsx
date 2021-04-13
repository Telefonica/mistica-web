import * as React from 'react';
import {Box, Stack, Placeholder, useTheme} from '..';

export default {
    title: 'Components/Layouts/Box',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <div style={{width: 200}}>
            <Stack space={16}>
                <div style={{border: `1px solid ${colors.error}`}}>
                    <Box padding={8}>
                        <Placeholder />
                    </Box>
                </div>
                <div style={{border: `1px solid ${colors.error}`}}>
                    <Box paddingY={8} paddingX={16}>
                        <Placeholder />
                    </Box>
                </div>
                <div style={{border: `1px solid ${colors.error}`}}>
                    <Box paddingTop={24} paddingRight={16} paddingBottom={32} paddingLeft={8}>
                        <Placeholder />
                    </Box>
                </div>
            </Stack>
        </div>
    );
};

Default.storyName = 'Box';
