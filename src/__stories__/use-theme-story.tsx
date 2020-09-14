import * as React from 'react';
import {useTheme, Stack, Text7} from '..';

export default {
    title: 'Hooks|useTheme',
};

const CodeText: React.FC = ({children}) => <Text7>{children}</Text7>;

export const UseTheme: StoryComponent = () => {
    const theme = useTheme();

    return (
        <Stack space={16}>
            <Text7 color={theme.colors.textSecondary}>
                You can use the <CodeText>useTheme()</CodeText> hook to read values from mistica theme. For
                example, this text is using the <CodeText>textSecondary</CodeText> color from{' '}
                <CodeText>theme.colors</CodeText>.
            </Text7>
            <Text7 color={theme.colors.textSecondary}>
                Here is a dump of the whole <CodeText>theme</CodeText> object:
            </Text7>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(theme, null, 2)}</pre>
        </Stack>
    );
};

UseTheme.story = {
    name: 'useTheme',
};
