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
import {SmallNakedCard} from '../card-naked';
import avatarImg from './images/avatar.jpg';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';

export default {
    title: 'Private/Deprecated Card Stories/NakedCard',
    parameters: {
        fullScreen: true,
    },
};

const VIDEO_SRC = beachVideo;
const IMAGE_SRC = tennisImg;

type Args = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    media: 'image' | 'circular image' | 'video' | 'none';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType;
    title: string;
    titleAs: HeadingType;
    subtitle: string;
    description: string;
    extra: boolean;
    actions: 'button' | 'link' | 'button and link' | 'onPress' | 'href' | 'to' | 'none';
    closable: boolean;
    topAction: boolean;
    emptySource: boolean;
};

export const Default: StoryComponent<Args> = ({
    headline,
    headlineType,
    pretitle,
    pretitleAs,
    title,
    titleAs,
    subtitle,
    description,
    actions = 'button',
    extra,
    closable,
    topAction,
    media,
    asset,
    emptySource,
}) => {
    let assetElement;
    if (asset === 'circle with icon') {
        assetElement = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle with image') {
        assetElement = <Circle size={40} backgroundImage={avatarImg} />;
    }

    const interactiveActions = {
        button: actions.includes('button') ? (
            <ButtonPrimary small fake>
                Action
            </ButtonPrimary>
        ) : undefined,

        buttonLink: actions.includes('link') ? (
            <ButtonLink small href="#">
                Link
            </ButtonLink>
        ) : undefined,
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
                    pretitleAs={pretitleAs}
                    title={title}
                    titleAs={titleAs}
                    subtitle={subtitle}
                    description={description}
                    media={
                        media === 'none' ? undefined : media === 'video' ? (
                            <Video src={emptySource ? '' : VIDEO_SRC} aspectRatio="16:9" />
                        ) : media === 'image' ? (
                            <Image aspectRatio="16:9" src={emptySource ? '' : IMAGE_SRC} />
                        ) : (
                            <Image circular src={emptySource ? '' : IMAGE_SRC} />
                        )
                    }
                    asset={assetElement}
                    {...interactiveActions}
                    extra={extra ? <Placeholder /> : undefined}
                    onClose={closable ? () => {} : undefined}
                    actions={
                        topAction
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
    pretitleAs: 'span',
    title: 'Title',
    titleAs: 'h3',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    extra: false,
    actions: 'button',
    closable: false,
    topAction: false,
    emptySource: false,
};
Default.argTypes = {
    asset: {
        options: ['circle with icon', 'circle with image', 'none'],
        control: {type: 'select'},
    },
    media: {
        options: ['image', 'circular image', 'video', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'onPress', 'href', 'to', 'none'],
        control: {type: 'select'},
    },
    pretitleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    titleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
};

type SmallArgs = {
    media: 'image' | 'circular image' | 'none';
    title: string;
    subtitle: string;
    description: string;
    extra: boolean;
    touchable: boolean;
    emptySource: boolean;
};

export const Small: StoryComponent<SmallArgs> = ({
    media,
    title,
    subtitle,
    description,
    extra,
    touchable,
    emptySource,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <SmallNakedCard
                    dataAttributes={{testid: 'small-naked-card'}}
                    media={
                        media === 'none' ? undefined : media === 'image' ? (
                            <Image aspectRatio="16:9" src={emptySource ? '' : IMAGE_SRC} />
                        ) : (
                            <Image circular src={emptySource ? '' : IMAGE_SRC} />
                        )
                    }
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onPress={touchable ? () => {} : undefined}
                    extra={extra ? <Placeholder /> : undefined}
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
    extra: false,
    touchable: true,
    emptySource: false,
};
Small.argTypes = {
    media: {
        options: ['image', 'circular image', 'none'],
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
                                buttonLink={
                                    <ButtonLink small href="https://google.com">
                                        Link
                                    </ButtonLink>
                                }
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
                                buttonLink={
                                    <ButtonLink small href="https://google.com">
                                        Link
                                    </ButtonLink>
                                }
                            />,
                        ]}
                    />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Group.storyName = 'NakedCard group';
