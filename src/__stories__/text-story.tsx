import * as React from 'react';
import {Text10, Text9, Text8, Text7, Text6, Text5, Text4, Text3, Text2, Text1, Stack} from '..';

export default {
    title: 'Components/Others/Text',
    component: Text,
};

export const Default: StoryComponent = () => (
    <div data-testid="text">
        <Stack space={16}>
            <Text10 dataAttributes={{qsysid: 'text10'}}>Text10 Light 32/40 (Mobile) | 64/72 (Desktop)</Text10>

            <Text9>Text9 Light 32/40 (Mobile) | 56/64 (Desktop)</Text9>

            <Text8>Text8 Light 32/40 (Mobile) | 40/48 (Desktop)</Text8>

            <Text7>Text7 Light 28/32 (Mobile) | 40/48 (Desktop)</Text7>

            <Text6>Text6 Light 24/32 (Mobile) | 32/40 (Desktop)</Text6>

            <Text5>Text5 Light 22/24 (Mobile) | 28/32 (Desktop)</Text5>

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
    </div>
);

Default.storyName = 'Text';
