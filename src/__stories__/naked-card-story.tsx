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
    Circle,
    skinVars,
    Carousel,
    IconStarFilled,
    IconStarRegular,
} from '..';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import beachVideo from './videos/beach.mp4';
import {SmallNakedCard} from '../card';
import avatarImg from './images/avatar.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/NakedCard',
    parameters: {
        fullScreen: true,
    },
};

const VIDEO_SRC = beachVideo;
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
    actions: 'button' | 'link' | 'button and link' | 'onPress' | 'href' | 'to' | 'none';
    closable: boolean;
    withTopAction: boolean;
    isEmptySource: boolean;
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
    isEmptySource,
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

    const interactiveActions = {
        button: actions.includes('button') ? (
            <ButtonPrimary small fake>
                Action
            </ButtonPrimary>
        ) : undefined,

        buttonLink: actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined,
        onPress: actions === 'onPress' ? () => {} : undefined,
        to: actions === 'to' ? '#' : undefined,
        href: actions === 'href' ? 'https://example.org' : undefined,
    } as
        | {button?: JSX.Element; buttonLink?: JSX.Element; secondaryButton?: JSX.Element}
        | {onPress: () => void}
        | {to: string}
        | {href: string}
        | {[key: string]: never};

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
                            <Video src={isEmptySource ? '' : VIDEO_SRC} aspectRatio="16:9" />
                        ) : media === 'image' ? (
                            <Image aspectRatio="16:9" src={isEmptySource ? '' : IMAGE_SRC} />
                        ) : (
                            <Image circular src={isEmptySource ? '' : IMAGE_SRC} />
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
                                  {
                                      checkedProps: {
                                          Icon: IconStarFilled,
                                          label: 'checked',
                                      },
                                      uncheckedProps: {
                                          Icon: IconStarRegular,
                                          label: 'unchecked',
                                      },
                                      defaultChecked: false,
                                      onChange: () => {},
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
    isEmptySource: false,
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
        options: ['button', 'link', 'button and link', 'onPress', 'href', 'to', 'none'],
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
    isEmptySource: boolean;
};

export const Small: StoryComponent<SmallArgs> = ({
    media,
    title,
    subtitle,
    description,
    withExtra,
    touchable,
    isEmptySource,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <SmallNakedCard
                    dataAttributes={{testid: 'small-naked-card'}}
                    media={
                        media === 'image' ? (
                            <Image aspectRatio="16:9" src={isEmptySource ? '' : IMAGE_SRC} />
                        ) : (
                            <Image circular src={isEmptySource ? '' : IMAGE_SRC} />
                        )
                    }
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onPress={touchable ? () => {} : undefined}
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
    isEmptySource: false,
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
                        always fixed on bottom.
                    </Text2>
                    <Carousel
                        items={[
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
                            />,
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
                            />,
                        ]}
                    />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Group.storyName = 'NakedCard group';
