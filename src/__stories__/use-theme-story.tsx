// @flow
import * as React from 'react';
import {useTheme, Stack, Text} from '..';

export default {
    title: 'Hooks|useTheme',
};

const CodeText = ({children}) => (
    <Text size={16} weight="medium">
        {children}
    </Text>
);

export const UseTheme = (): React.ReactNode => {
    const theme = useTheme();

    return (
        <Stack space={16}>
            <Text size={16} color={theme.colors.textSecondary}>
                You can use the <CodeText>useTheme()</CodeText> hook to read values from mistica theme. For
                example, this text is using the <CodeText>textSecondary</CodeText> color from{' '}
                <CodeText>theme.colors</CodeText>.
            </Text>
            <Text size={16} color={theme.colors.textSecondary}>
                Here is a dump of the whole <CodeText>theme</CodeText> object:
            </Text>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(theme, null, 2)}</pre>
        </Stack>
    );
};

UseTheme.story = {
    name: 'useTheme',
};
