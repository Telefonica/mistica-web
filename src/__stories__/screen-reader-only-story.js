// @flow
import * as React from 'react';
import {ScreenReaderOnly, Stack, Text} from '..';
import {useTheme} from '../hooks';

export default {
    title: 'Components|Accesibility/ScreenReaderOnly',
};

export const Default = (): React.Node => {
    const theme = useTheme();
    return (
        <Stack space={16}>
            <Text as="h2" size={24} weight="medium">
                ScreenReader demo
            </Text>
            <Text size={16} color={theme.colors.textSecondary}>
                There is a hidden message in this screen that's only accessible to screen readers. Turn on
                your OS screen reader to discover it.
            </Text>
            <ScreenReaderOnly>
                <div>This will be read by screen readers</div>
            </ScreenReaderOnly>
        </Stack>
    );
};

Default.story = {name: 'ScreenReaderOnly'};
