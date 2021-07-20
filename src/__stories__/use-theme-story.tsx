import * as React from 'react';
import {useTheme, Stack, Text2} from '..';
import {useIsInverseVariant} from '../theme-variant-context';

export default {
    title: 'Hooks/useTheme',
};

const CodeText: React.FC = ({children}) => <Text2 medium>{children}</Text2>;

const ColorsTable = () => {
    const {colors} = useTheme();
    const isInverse = useIsInverseVariant();

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <Text2 medium>Name</Text2>
                    </th>
                    <th>
                        <Text2 medium>Value</Text2>
                    </th>
                    <th>
                        <Text2 medium>Preview</Text2>
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(colors)
                    .sort(([name1], [name2]) => (name1 > name2 ? 1 : -1))
                    .map(([name, value]) => (
                        <tr key={name}>
                            <td>
                                <Text2 regular as="pre">
                                    {name}
                                </Text2>
                            </td>
                            <td>
                                <Text2 regular as="pre">
                                    {value}
                                </Text2>
                            </td>
                            <td
                                title={`${name}: ${value}`}
                                style={{
                                    backgroundColor: value,
                                    border: `1px dashed ${
                                        isInverse ? colors.borderLight : colors.borderDark
                                    }`,
                                }}
                            ></td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export const UseTheme: StoryComponent = () => {
    const {colors, ...theme} = useTheme();

    return (
        <Stack space={16}>
            <Text2 regular color={colors.textSecondary}>
                You can use the <CodeText>useTheme()</CodeText> hook to read values from mistica theme. For
                example, this text is using the <CodeText>textSecondary</CodeText> color from{' '}
                <CodeText>theme.colors</CodeText>.
            </Text2>
            <Text2 regular color={colors.textSecondary}>
                This table shows all the available <CodeText>colors</CodeText> available inside.
            </Text2>
            <ColorsTable />
            <Text2 regular color={colors.textSecondary}>
                Here is a dump of the rest of the <CodeText>theme</CodeText> object:
            </Text2>
            <Text2 regular as="pre">
                {JSON.stringify(theme, null, 2)}
            </Text2>
        </Stack>
    );
};

UseTheme.storyName = 'useTheme';
