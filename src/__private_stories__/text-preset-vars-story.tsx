import * as React from 'react';
import {Stack, Text} from '..';
import {vars} from '../skins/skin-contract.css';

export default {
    title: 'Private/TextPresets CSS vars',
};

const TextWrapper = ({
    weight,
    size,
    lineHeight,
    children,
}: {
    weight?: string;
    size?: string;
    lineHeight?: string;
    children: React.ReactNode;
}) => {
    return (
        <Text>
            <span style={{fontWeight: weight, fontSize: size, lineHeight}}>{children}</span>
        </Text>
    );
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={8} dataAttributes={{testid: 'story'}}>
            <TextWrapper weight={vars.textPresets.cardTitle.weight}>cardTitle</TextWrapper>
            <TextWrapper weight={vars.textPresets.button.weight}>button</TextWrapper>
            <TextWrapper weight={vars.textPresets.link.weight}>link</TextWrapper>
            <TextWrapper weight={vars.textPresets.title1.weight}>title1</TextWrapper>
            <TextWrapper weight={vars.textPresets.title2.weight}>title2</TextWrapper>
            <TextWrapper
                weight={vars.textPresets.title3.weight}
                size={vars.textPresets.title3.size}
                lineHeight={vars.textPresets.title3.lineHeight}
            >
                title3
            </TextWrapper>
            <TextWrapper weight={vars.textPresets.indicator.weight}>indicator</TextWrapper>
            <TextWrapper
                weight={vars.textPresets.tabsLabel.weight}
                size={vars.textPresets.tabsLabel.size}
                lineHeight={vars.textPresets.tabsLabel.lineHeight}
            >
                tabsLabel
            </TextWrapper>
            <TextWrapper weight={vars.textPresets.navigationBar.weight}>navigationBar</TextWrapper>
            <TextWrapper size={vars.textPresets.text1.size} lineHeight={vars.textPresets.text1.lineHeight}>
                text1
            </TextWrapper>
            <TextWrapper size={vars.textPresets.text2.size} lineHeight={vars.textPresets.text2.lineHeight}>
                text2
            </TextWrapper>
            <TextWrapper size={vars.textPresets.text3.size} lineHeight={vars.textPresets.text3.lineHeight}>
                text3
            </TextWrapper>
            <TextWrapper size={vars.textPresets.text4.size} lineHeight={vars.textPresets.text4.lineHeight}>
                text4
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text5.size}
                lineHeight={vars.textPresets.text5.lineHeight}
                weight={vars.textPresets.text5.weight}
            >
                text5
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text6.size}
                lineHeight={vars.textPresets.text6.lineHeight}
                weight={vars.textPresets.text6.weight}
            >
                text6
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text7.size}
                lineHeight={vars.textPresets.text7.lineHeight}
                weight={vars.textPresets.text7.weight}
            >
                text7
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text8.size}
                lineHeight={vars.textPresets.text8.lineHeight}
                weight={vars.textPresets.text8.weight}
            >
                text8
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text9.size}
                lineHeight={vars.textPresets.text9.lineHeight}
                weight={vars.textPresets.text9.weight}
            >
                text9
            </TextWrapper>
            <TextWrapper
                size={vars.textPresets.text10.size}
                lineHeight={vars.textPresets.text10.lineHeight}
                weight={vars.textPresets.text10.weight}
            >
                text10
            </TextWrapper>
        </Stack>
    );
};

Default.storyName = 'TextPresets CSS vars';
