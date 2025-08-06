import * as React from 'react';
import {
    Title2,
    Ul,
    Ol,
    Li,
    IconLightningFilled,
    ResponsiveLayout,
    Box,
    Text1,
    Text2,
    Text3,
    Text4,
    Text5,
    Text6,
    Text7,
    Text8,
    Text9,
    Text10,
    Stack,
} from '..';

export default {
    title: 'Components/Ul Ol',
    parameters: {fullScreen: true},
};

type Args = {
    inverse: boolean;
    textPreset:
        | 'Text1'
        | 'Text2'
        | 'Text3'
        | 'Text4'
        | 'Text5'
        | 'Text6'
        | 'Text7'
        | 'Text8'
        | 'Text9'
        | 'Text10';
    customIcon: boolean;
    withMarker: boolean;
};

export const Default: StoryComponent<Args> = ({inverse, textPreset, customIcon, withMarker}) => {
    const TextComponent = {
        Text1,
        Text2,
        Text3,
        Text4,
        Text5,
        Text6,
        Text7,
        Text8,
        Text9,
        Text10,
    }[textPreset];
    const Icon = customIcon ? IconLightningFilled : undefined;
    return (
        <ResponsiveLayout variant={inverse ? 'inverse' : 'default'}>
            <TextComponent as="div" regular>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Title2 id="title">Unordered List</Title2>
                        <Ul aria-labelledby="title">
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 1
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum
                                <Ul>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.1
                                    </Li>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.2
                                        <Ul>
                                            <Li Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.1
                                            </Li>
                                            <Li Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.2
                                            </Li>
                                        </Ul>
                                    </Li>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.3
                                    </Li>
                                </Ul>
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 3
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 4
                            </Li>
                        </Ul>
                    </Stack>
                </Box>
            </TextComponent>
        </ResponsiveLayout>
    );
};

const argTypes = {
    textPreset: {
        control: 'select',
        options: ['Text1', 'Text2', 'Text3', 'Text4', 'Text5', 'Text6', 'Text7', 'Text8', 'Text9', 'Text10'],
    },
} as const;

const args = {
    inverse: false,
    textPreset: 'Text1',
    customIcon: true,
    withMarker: true,
} as const;

Default.storyName = 'Ul';
Default.argTypes = argTypes;
Default.args = args;

export const OrderedList: StoryComponent<Args> = ({inverse, textPreset, customIcon, withMarker}) => {
    const TextComponent = {
        Text1,
        Text2,
        Text3,
        Text4,
        Text5,
        Text6,
        Text7,
        Text8,
        Text9,
        Text10,
    }[textPreset];
    const Icon = customIcon ? IconLightningFilled : undefined;
    return (
        <ResponsiveLayout variant={inverse ? 'inverse' : 'default'}>
            <TextComponent as="div" regular>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Title2 id="title">Ordered List</Title2>
                        <Ol aria-labelledby="title">
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 1
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum
                                <Ol>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.1
                                    </Li>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.2
                                        <Ol>
                                            <Li Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.1
                                            </Li>
                                            <Li Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.2
                                            </Li>
                                        </Ol>
                                    </Li>
                                    <Li Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.3
                                    </Li>
                                </Ol>
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 3
                            </Li>
                            <Li Icon={Icon} withMarker={withMarker}>
                                List item 4
                            </Li>
                        </Ol>
                    </Stack>
                </Box>
            </TextComponent>
        </ResponsiveLayout>
    );
};

OrderedList.storyName = 'Ol';
OrderedList.argTypes = argTypes;
OrderedList.args = args;
