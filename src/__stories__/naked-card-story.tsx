import * as React from 'react';
import {
    NakedCard,
    ButtonPrimary,
    ButtonLink,
    Video,
    Image,
    Tag,
    IconMobileDeviceRegular,
    ResponsiveLayout,
    Box,
    Stack,
    Text2,
    Inline,
    Circle,
    skinVars,
} from '..';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import confettiVideo from './videos/confetti.mp4';
import {SmallNakedCard} from '../card';
import avatarImg from './images/avatar.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/NakedCard',
    parameters: {
        fullScreen: true,
    },
};

const VIDEO_SRC = confettiVideo;
const IMAGE_SRC = tennisImg;

type Args = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    media: 'image' | 'circular image' | 'video';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    withExtra: boolean;
    actions: 'button' | 'link' | 'button and link' | 'on press' | 'none';
    closable: boolean;
    withTopAction: boolean;
};

export const Default: StoryComponent<Args> = ({
    headline,
    headlineType,
    pretitle,
    title,
    subtitle,
    description,
    actions = 'button',
    withExtra,
    closable,
    withTopAction,
    media,
    asset,
}) => {
    let icon;
    if (asset === 'circle with icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle with image') {
        icon = <Circle size={40} backgroundImage={avatarImg} />;
    }

    const button = actions.includes('button') ? (
        <ButtonPrimary small href="https://google.com">
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink href="https://google.com">Link</ButtonLink>
    ) : undefined;

    const onPress = actions.includes('press') ? () => null : undefined;

    const interactiveActions = onPress
        ? {onPress}
        : {
              button,
              buttonLink,
          };

    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <NakedCard
                    dataAttributes={{testid: 'naked-card'}}
                    headline={headline && <Tag type={headlineType}>{headline}</Tag>}
                    pretitle={pretitle}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    media={
                        media === 'video' ? (
                            <Video src={VIDEO_SRC} aspectRatio="16:9" />
                        ) : media === 'image' ? (
                            <Image aspectRatio="16:9" src={IMAGE_SRC} />
                        ) : (
                            <Image circular src={IMAGE_SRC} />
                        )
                    }
                    icon={icon}
                    {...interactiveActions}
                    extra={withExtra ? <Placeholder /> : undefined}
                    onClose={closable ? () => {} : undefined}
                    actions={
                        withTopAction
                            ? [
                                  {
                                      Icon: IconMobileDeviceRegular,
                                      onPress: () => {
                                          alert('icon press');
                                      },
                                      label: 'Device',
                                  },
                              ]
                            : undefined
                    }
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'NakedCard';
Default.args = {
    asset: 'none',
    media: 'image',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    withExtra: false,
    actions: 'button',
    closable: false,
    withTopAction: false,
};
Default.argTypes = {
    asset: {
        options: ['circle with icon', 'circle with image', 'none'],
        control: {type: 'select'},
    },
    media: {
        options: ['image', 'circular image', 'video'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'on press', 'none'],
        control: {type: 'select'},
    },
};

type SmallArgs = {
    media: 'image' | 'circular image';
    title: string;
    subtitle: string;
    description: string;
    withExtra: boolean;
    touchable: boolean;
};

export const Small: StoryComponent<SmallArgs> = ({
    media,
    title,
    subtitle,
    description,
    withExtra,
    touchable,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <SmallNakedCard
                    dataAttributes={{testid: 'small-naked-card'}}
                    media={
                        media === 'image' ? (
                            <Image aspectRatio="16:9" src={IMAGE_SRC} />
                        ) : (
                            <Image circular src={IMAGE_SRC} />
                        )
                    }
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onPress={touchable ? () => null : undefined}
                    extra={withExtra ? <Placeholder /> : undefined}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Small.storyName = 'SmallNakedCard';
Small.args = {
    media: 'image',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    withExtra: false,
    touchable: true,
};
Small.argTypes = {
    media: {
        options: ['image', 'circular image'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={16}>
                    <Text2 regular>
                        We can group multiple cards and they adjust to the same height. The card actions are
                        always fixed on bottom:
                    </Text2>
                    <style>{`.group > * {width: 300px}`}</style>
                    <Inline space={16} className="group">
                        <NakedCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            subtitle="Subtitle"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                        />
                        <NakedCard
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                        />
                    </Inline>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Group.storyName = 'NakedCard group';
