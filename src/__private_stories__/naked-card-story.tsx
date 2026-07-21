import * as React from 'react';
import {
    NakedCard,
    ButtonPrimary,
    ButtonLink,
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
import tennisImg from '../__stories__/images/tennis.jpg';
import beachVideo from '../__stories__/videos/beach.mp4';
import avatarImg from '../__stories__/images/avatar.jpg';

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
    slot: boolean;
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
    slot,
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
        buttonPrimary: actions.includes('button') ? (
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
        | {buttonPrimary?: JSX.Element; buttonLink?: JSX.Element}
        | {onPress: () => void}
        | {to: string}
        | {href: string}
        | {[key: string]: never};

    const mediaProps =
        media === 'none'
            ? {}
            : media === 'video'
              ? ({videoSrc: emptySource ? '' : VIDEO_SRC, mediaAspectRatio: '16:9'} as const)
              : media === 'image'
                ? ({imageSrc: emptySource ? '' : IMAGE_SRC, mediaAspectRatio: '16:9'} as const)
                : ({imageSrc: emptySource ? '' : IMAGE_SRC, circledImage: true} as const);

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
                    {...mediaProps}
                    asset={assetElement}
                    {...interactiveActions}
                    slot={slot ? <Placeholder /> : undefined}
                    onClose={closable ? () => {} : undefined}
                    topActions={
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
    slot: false,
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
    slot: boolean;
    touchable: boolean;
    emptySource: boolean;
};

export const Small: StoryComponent<SmallArgs> = ({
    media,
    title,
    subtitle,
    description,
    slot,
    touchable,
    emptySource,
}) => {
    const mediaProps =
        media === 'none'
            ? {}
            : media === 'image'
              ? ({imageSrc: emptySource ? '' : IMAGE_SRC, mediaAspectRatio: '16:9'} as const)
              : ({imageSrc: emptySource ? '' : IMAGE_SRC, circledImage: true} as const);

    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <NakedCard
                    size="snap"
                    dataAttributes={{testid: 'small-naked-card'}}
                    {...mediaProps}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onPress={touchable ? () => {} : undefined}
                    slot={slot ? <Placeholder /> : undefined}
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
    slot: false,
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
                                imageSrc={IMAGE_SRC}
                                mediaAspectRatio="16:9"
                                buttonPrimary={
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
                                imageSrc={IMAGE_SRC}
                                mediaAspectRatio="16:9"
                                buttonPrimary={
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
