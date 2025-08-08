import * as React from 'react';
import {
    DisplayMediaCard,
    ButtonPrimary,
    ButtonLink,
    IconInvoicePlanFileRegular,
    skinVars,
    Circle,
    Tag,
    ButtonSecondary,
    IconLightningRegular,
    ResponsiveLayout,
    Stack,
    Text2,
    Box,
    Carousel,
    IconStarFilled,
    IconStarRegular,
    Placeholder,
} from '..';
import usingVrImg from './images/using-vr.jpg';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';

export default {
    title: 'Private/Deprecated Card Stories/DisplayMediaCard',
};

const BACKGROUND_IMAGE_SRC = usingVrImg;
const BACKGROUND_VIDEO_SRC = beachVideo;
const BACKGROUND_VIDEO_POSTER_SRC = beachImg;

type DisplayMediaCardArgs = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    headlineType: TagType;
    background: 'image' | 'video';
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType;
    title: string;
    titleAs: HeadingType;
    description: string;
    extra: boolean;
    closable: boolean;
    topAction: boolean;
    actions:
        | 'button'
        | 'link'
        | 'button and link'
        | 'button and secondary button'
        | 'onPress'
        | 'href'
        | 'to'
        | 'none';
    width: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
    emptySource: boolean;
    inverse: boolean;
};

export const Default: StoryComponent<DisplayMediaCardArgs> = ({
    asset,
    headline,
    headlineType,
    background,
    pretitle,
    pretitleAs,
    title,
    titleAs,
    description,
    extra,
    actions = 'button',
    closable,
    topAction,
    width,
    aspectRatio,
    emptySource,
    inverse,
}) => {
    let assetElement;
    if (asset === 'circle with icon') {
        assetElement = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
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
        secondaryButton: actions.includes('secondary') ? (
            <ButtonSecondary small fake>
                Action 2
            </ButtonSecondary>
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

    const backgroundProps =
        background === 'image'
            ? {
                  onClose: closable ? () => {} : undefined,
                  actions: topAction
                      ? [
                            {
                                Icon: IconLightningRegular,
                                onPress: () => {},
                                label: 'Lightning',
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
                      : undefined,
                  backgroundImage: emptySource ? '' : BACKGROUND_IMAGE_SRC,
              }
            : {
                  backgroundVideo: emptySource ? '' : BACKGROUND_VIDEO_SRC,
                  poster: emptySource ? '' : BACKGROUND_VIDEO_POSTER_SRC,
              };

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <DisplayMediaCard
                    {...backgroundProps}
                    asset={assetElement}
                    headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                    pretitle={pretitle}
                    pretitleAs={pretitleAs}
                    title={title}
                    titleAs={titleAs}
                    description={description}
                    {...interactiveActions}
                    aria-label="Display media card label"
                    width={width}
                    aspectRatio={aspectRatio}
                    extra={extra ? <Placeholder /> : undefined}
                    dataAttributes={{testid: 'display-media-card'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'DisplayMediaCard';
Default.args = {
    asset: 'none',
    headlineType: 'promo',
    background: 'image',
    headline: 'Priority',
    pretitle: 'Pretitle',
    pretitleAs: 'span',
    title: 'Title',
    titleAs: 'h3',
    description: 'This is a description for the card',
    extra: false,
    actions: 'button',
    closable: false,
    topAction: false,
    width: 'auto',
    aspectRatio: 'auto',
    emptySource: false,
    inverse: false,
};
Default.argTypes = {
    asset: {
        options: ['circle with icon', 'circle with image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    actions: {
        options: [
            'button',
            'link',
            'button and link',
            'button and secondary button',
            'onPress',
            'href',
            'to',
            'none',
        ],
        control: {type: 'select'},
    },
    background: {
        options: ['image', 'video'],
        control: {type: 'select'},
    },
    aspectRatio: {
        options: ['1:1', '16:9', '7:10', '9:10', 'auto'],
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
Default.parameters = {fullScreen: true};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card content is
                    aligned to the bottom.
                </Text2>
                <Carousel
                    itemsPerPage={3}
                    items={[
                        <DisplayMediaCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            description="Description"
                            backgroundImage={BACKGROUND_IMAGE_SRC}
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                        />,
                        <DisplayMediaCard title="Title" backgroundImage={BACKGROUND_IMAGE_SRC} />,
                        <DisplayMediaCard
                            title="Title"
                            backgroundImage={BACKGROUND_IMAGE_SRC}
                            onClose={() => {}}
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'DisplayMediaCard group';
