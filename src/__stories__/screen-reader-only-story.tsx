import * as React from 'react';
import {ScreenReaderOnly, Stack, Text3, Text7} from '..';
import {useTheme} from '../hooks';

export default {
    title: 'Components/Accesibility/ScreenReaderOnly',
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    return (
        <Stack space={16}>
            <Text3 as="h2">ScreenReader demo</Text3>
            <Text7 regular color={theme.colors.textSecondary}>
                There is a hidden message in this screen that's only accessible to screen readers. Turn on
                your OS screen reader to discover it.
            </Text7>
            <ScreenReaderOnly>
                <div>This will be read by screen readers</div>
            </ScreenReaderOnly>
        </Stack>
    );
};

Default.storyName = 'ScreenReaderOnly';
