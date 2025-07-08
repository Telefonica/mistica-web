import * as React from 'react';
import {Text10, Text9, Text8, Text7, Text6, Text5, Text4, Text3, Text2, Text1, Stack, Title1} from '..';
import {useTheme} from '../hooks';
import * as textProps from '../text-props';
import {isSafari} from '../utils/platform';

export default {
    title: 'Components/Text',
    component: Text,
};

const getDisplaySizes = (textPreset: any, textProp: any) => {
    const mobileSize = textPreset.size.mobile || textProp.mobileSize;
    const mobileLineHeight = textPreset.lineHeight.mobile || textProp.mobileLineHeight;
    const desktopSize = textPreset.size.desktop || textProp.desktopSize;
    const desktopLineHeight = textPreset.lineHeight.desktop || textProp.desktopLineHeight;

    return `${mobileSize}/${mobileLineHeight} (Mobile) | ${desktopSize}/${desktopLineHeight} (Desktop)`;
};

type TextKey = keyof typeof textProps;

const useTextDisplayContent = (textKey: TextKey, weight?: string) => {
    const {textPresets} = useTheme();
    const textProp = textProps[textKey];
    const textPreset = textPresets[textKey];

    const sizeInfo = getDisplaySizes(textPreset, textProp);
    const weightText = weight ? ` ${weight.charAt(0).toUpperCase() + weight.slice(1)}` : '';
    const displayText = `${textKey.charAt(0).toUpperCase() + textKey.slice(1)}${weightText} ${sizeInfo}`;

    return displayText;
};

export const TextComponents: StoryComponent = () => {
    // Get automatic text content for each component
    const text10Content = useTextDisplayContent('text10');
    const text9Content = useTextDisplayContent('text9');
    const text8Content = useTextDisplayContent('text8');
    const text7Content = useTextDisplayContent('text7');
    const text6Content = useTextDisplayContent('text6');
    const text5Content = useTextDisplayContent('text5');
    const text4MediumContent = useTextDisplayContent('text4', 'medium');
    const text4RegularContent = useTextDisplayContent('text4', 'regular');
    const text4LightContent = useTextDisplayContent('text4', 'light');
    const text3MediumContent = useTextDisplayContent('text3', 'medium');
    const text3RegularContent = useTextDisplayContent('text3', 'regular');
    const text3LightContent = useTextDisplayContent('text3', 'light');
    const text2MediumContent = useTextDisplayContent('text2', 'medium');
    const text2RegularContent = useTextDisplayContent('text2', 'regular');
    const text1MediumContent = useTextDisplayContent('text1', 'medium');
    const text1RegularContent = useTextDisplayContent('text1', 'regular');

    return (
        <Stack space={16} dataAttributes={{testid: 'text'}}>
            <Text10 dataAttributes={{qsysid: 'text10'}}>{text10Content}</Text10>
            <Text9>{text9Content}</Text9>
            <Text8>{text8Content}</Text8>
            <Text7>{text7Content}</Text7>
            <Text6>{text6Content}</Text6>
            <Text5>{text5Content}</Text5>
            <Text4 medium>{text4MediumContent}</Text4>
            <Text4 regular>{text4RegularContent}</Text4>
            <Text4 light>{text4LightContent}</Text4>
            <Text3 medium>{text3MediumContent}</Text3>
            <Text3 regular>{text3RegularContent}</Text3>
            <Text3 light>{text3LightContent}</Text3>
            <Text2 medium>{text2MediumContent}</Text2>
            <Text2 regular>{text2RegularContent}</Text2>
            <Text1 medium>{text1MediumContent}</Text1>
            <Text1 regular>{text1RegularContent}</Text1>
        </Stack>
    );
};

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

type TextWrappingArgs = {
    text: 'custom' | 'text with line breaks';
    customText: string;
};

export const TextWrapping: StoryComponent<TextWrappingArgs> = ({text, customText}) => {
    return (
        <Stack space={16} dataAttributes={{testid: 'text'}}>
            <Wrapper>
                <Title1>Default (with wordBreak)</Title1>
                <Text2 regular>{customText ?? text}</Text2>
            </Wrapper>

            <Wrapper>
                <Title1>Without wordBreak</Title1>
                <Text2 regular wordBreak={false}>
                    {customText ?? text}
                </Text2>
            </Wrapper>

            <Wrapper>
                <Title1>truncate=1</Title1>
                <Text2 regular truncate>
                    {customText ?? text}
                </Text2>
            </Wrapper>

            <Wrapper>
                <Title1>truncate=3</Title1>
                <Text2 regular truncate={3}>
                    {customText ?? text}
                </Text2>
            </Wrapper>
        </Stack>
    );
};

TextWrapping.storyName = 'Text wrapping';
TextWrapping.args = {
    text: 'custom',
    customText:
        'Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation',
};

TextWrapping.argTypes = {
    text: {
        control: {type: 'select'},
        options: ['text with line breaks', 'custom'],
        mapping: {
            'text with line breaks': '\nan example text\n\n\nwith\n\nsome line\n breaks\n',
        },
    },
    customText: {
        control: {type: 'text'},
        if: {arg: 'text', eq: 'custom'},
    },
};
