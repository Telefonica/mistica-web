import * as React from 'react';
import {Stack, Text2, skinVars} from '..';
import {useIsInverseVariant} from '../theme-variant-context';

export default {
    title: 'Utilities/skinVars',
    parameters: {fullScreen: false},
};

const CodeText = ({children}: {children: React.ReactNode}) => <Text2 medium>{children}</Text2>;

const ColorsTable = () => {
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
                {Object.entries(skinVars.colors)
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
                                    {getComputedStyle(document.documentElement).getPropertyValue(
                                        value.replace('var(', '').replace(')', '')
                                    )}
                                </Text2>
                            </td>
                            <td
                                title={`${name}: ${value}`}
                                style={{
                                    backgroundColor: value,
                                    border: `1px dashed ${
                                        isInverse ? skinVars.colors.borderLow : skinVars.colors.borderHigh
                                    }`,
                                }}
                            ></td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export const SkinVars: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textSecondary}>
                You can use the <CodeText>skinVars</CodeText> object to read some css variables from the skin.
                For example, this text is using the <CodeText>textSecondary</CodeText> color from{' '}
                <CodeText>skinVars.colors</CodeText>.
            </Text2>
            <Text2 regular color={skinVars.colors.textSecondary}>
                This table shows all the available colors in <CodeText>skinVars.colors</CodeText>.
            </Text2>
            <ColorsTable />
        </Stack>
    );
};

SkinVars.storyName = 'skinVars';
