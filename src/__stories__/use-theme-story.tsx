import * as React from 'react';
import {useTheme, Stack, Text2, skinVars} from '..';

export default {
    title: 'Hooks/useTheme',
};

const CodeText = ({children}: {children: React.ReactNode}) => <Text2 medium>{children}</Text2>;

export const UseTheme: StoryComponent = () => {
    const theme = useTheme();

    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textSecondary}>
                You can use the <CodeText>useTheme()</CodeText> hook to read values from mistica theme.
            </Text2>
            <Text2 regular color={skinVars.colors.textSecondary}>
                Here is a dump of the <CodeText>theme</CodeText> object:
            </Text2>
            <Text2 regular as="pre">
                {JSON.stringify(theme, null, 2)}
            </Text2>
        </Stack>
    );
};

UseTheme.storyName = 'useTheme';
