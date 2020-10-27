import * as React from 'react';
import {Text1, Text2, Text3, Text4, Text5, Text6, Text7, Text8} from '../text';
import {StorySection} from './helpers';

export default {
    title: 'Components/Others/Text',
    component: Text,
};

export const Default: StoryComponent = () => (
    <div data-testid="text">
        <StorySection title="text-preset-1">
            <Text1>Text1 Light 32/40 (Mobile) | 40/48 (Desktop)</Text1>
        </StorySection>
        <StorySection title="text-preset-2">
            <Text2>Text2 Light 28/32 (Mobile) | 40/48 (Desktop)</Text2>
        </StorySection>
        <StorySection title="text-preset-3">
            <Text3>Text3 Light 24/32 (Mobile) | 32/40 (Desktop)</Text3>
        </StorySection>
        <StorySection title="text-preset-4">
            <Text4>Text4 Light 22/24 (Mobile) | 28/32 (Desktop)</Text4>
        </StorySection>
        <StorySection title="text-preset-5">
            <Text5 medium>Text5 Medium 18/24 (Mobile) | 20/28 (Desktop)</Text5>
        </StorySection>
        <StorySection title="text-preset-5">
            <Text5 light>Text5 Light 18/24 (Mobile) | 20/28 (Desktop)</Text5>
        </StorySection>
        <StorySection title="text-preset-6">
            <Text6 medium>Text6 Medium 16/24 (Mobile) | 18/24 (Desktop)</Text6>
        </StorySection>
        <StorySection title="text-preset-6">
            <Text6 regular>Text6 Regular 16/24 (Mobile) | 18/24 (Desktop)</Text6>
        </StorySection>
        <StorySection title="text-preset-6">
            <Text6 light>Text6 Light 16/24 (Mobile) | 18/24 (Desktop)</Text6>
        </StorySection>
        <StorySection title="text-preset-7">
            <Text7 medium>Text7 Medium 14/24 (Mobile) | 16/24 (Desktop)</Text7>
        </StorySection>
        <StorySection title="text-preset-7">
            <Text7 regular>Text7 Regular 14/20 (Mobile) | 16/24 (Desktop)</Text7>
        </StorySection>
        <StorySection title="text-preset-8">
            <Text8 medium>Text8 Medium 12/16 (Mobile) | 14/20 (Desktop)</Text8>
        </StorySection>
        <StorySection title="text-preset-8">
            <Text8 regular>Text8 Regular 12/16 (Mobile) | 14/20 (Desktop)</Text8>
        </StorySection>
    </div>
);

Default.story = {name: 'Text'};
