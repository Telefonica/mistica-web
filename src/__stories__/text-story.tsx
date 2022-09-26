import * as React from 'react';
import {Text10, Text9, Text8, Text7, Text6, Text5, Text4, Text3, Text2, Text1, Stack, Title1} from '..';
import {isSafari} from '../utils/platform';

export default {
    title: 'Components/Text',
    component: Text,
};

export const TextComponents: StoryComponent = () => (
    <Stack space={16} dataAttributes={{testid: 'text'}}>
        <Text10 dataAttributes={{qsysid: 'text10'}}>Text10 32/40 (Mobile) | 64/72 (Desktop)</Text10>

        <Text9>Text9 32/40 (Mobile) | 56/64 (Desktop)</Text9>

        <Text8>Text8 32/40 (Mobile) | 48/56 (Desktop)</Text8>

        <Text7>Text7 28/32 (Mobile) | 40/48 (Desktop)</Text7>

        <Text6>Text6 24/32 (Mobile) | 32/40 (Desktop)</Text6>

        <Text5>Text5 22/24 (Mobile) | 28/32 (Desktop)</Text5>

        <Text4 medium>Text4 Medium 18/24 (Mobile) | 20/28 (Desktop)</Text4>

        <Text4 regular>Text4 Regular 18/24 (Mobile) | 20/28 (Desktop)</Text4>

        <Text4 light>Text4 Light 18/24 (Mobile) | 20/28 (Desktop)</Text4>

        <Text3 medium>Text3 Medium 16/24 (Mobile) | 18/24 (Desktop)</Text3>

        <Text3 regular>Text3 Regular 16/24 (Mobile) | 18/24 (Desktop)</Text3>

        <Text3 light>Text3 Light 16/24 (Mobile) | 18/24 (Desktop)</Text3>

        <Text2 medium>Text2 Medium 14/24 (Mobile) | 16/24 (Desktop)</Text2>

        <Text2 regular>Text2 Regular 14/20 (Mobile) | 16/24 (Desktop)</Text2>

        <Text1 medium>Text1 Medium 12/16 (Mobile) | 14/20 (Desktop)</Text1>

        <Text1 regular>Text1 Regular 12/16 (Mobile) | 14/20 (Desktop)</Text1>
    </Stack>
);

TextComponents.storyName = 'Text components';

const Wrapper = ({children}: any) => (
    <div
        style={{
            padding: 8,
            // font sizes in safari and chrome are different, using different container sizes
            // so the word breaking places look more or less the same
            width: isSafari() ? 155 : 200,
            border: '1px solid lightgray',
        }}
    >
        {children}
    </div>
);
export const TextWrapping: StoryComponent = () => {
    return (
        <Stack space={16} dataAttributes={{testid: 'text'}}>
            <Wrapper>
                <Title1>Default</Title1>
                <Text2 regular wordBreak={false}>
                    Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate
                    Motivation
                </Text2>
            </Wrapper>

            <Wrapper>
                <Title1>wordBreak</Title1>
                <Text2 regular>
                    Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate
                    Motivation
                </Text2>
            </Wrapper>

            <Wrapper>
                <Title1>truncate=1</Title1>
                <Text2 regular truncate>
                    Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate
                    Motivation
                </Text2>
            </Wrapper>

            <Wrapper>
                <Title1>truncate=3</Title1>
                <Text2 regular truncate={3}>
                    Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate
                    Motivation
                </Text2>
            </Wrapper>
        </Stack>
    );
};

TextWrapping.storyName = 'Text wrapping';
