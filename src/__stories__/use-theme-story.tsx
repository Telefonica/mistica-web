import * as React from 'react';
import {useTheme, Stack, Text2} from '..';

export default {
    title: 'Hooks/useTheme',
};

const CodeText: React.FC = ({children}) => <Text2 medium>{children}</Text2>;

export const UseTheme: StoryComponent = () => {
    const theme = useTheme();

    return (
        <Stack space={16}>
            <Text2 regular color={theme.colors.textSecondary}>
                You can use the <CodeText>useTheme()</CodeText> hook to read values from mistica theme. For
                example, this text is using the <CodeText>textSecondary</CodeText> color from{' '}
                <CodeText>theme.colors</CodeText>.
            </Text2>
            <Text2 regular color={theme.colors.textSecondary}>
                Here is a dump of the whole <CodeText>theme</CodeText> object:
            </Text2>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(theme, null, 2)}</pre>
        </Stack>
    );
};

UseTheme.storyName = 'useTheme';
