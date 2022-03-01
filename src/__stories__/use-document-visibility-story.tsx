import * as React from 'react';
import {useDocumentVisibility, useTheme, Stack, Text2} from '..';

export default {
    title: 'Hooks/useDocumentVisibility',
};

export const UseDocumentVisibility: StoryComponent = () => {
    const theme = useTheme();
    const [counter1, setCounter1] = React.useState(0);
    const [counter2, setCounter2] = React.useState(0);
    const isDocumentVisible = useDocumentVisibility();

    React.useEffect(() => {
        setInterval(() => {
            setCounter1((count) => count + 1);
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (isDocumentVisible) {
            const intervalId = setInterval(() => {
                setCounter2((count) => count + 1);
            }, 1000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isDocumentVisible]);

    return (
        <Stack space={16}>
            <Text2 regular color={theme.colors.textSecondary}>
                Move this window to background and then come back.
            </Text2>

            <Text2 regular color={theme.colors.textSecondary}>
                The counter2 will interrupt while the window is in background
            </Text2>

            <Text2 regular as="pre">
                {JSON.stringify({counter1, counter2}, null, 2)}
            </Text2>
        </Stack>
    );
};

UseDocumentVisibility.storyName = 'useDocumentVisibility';
