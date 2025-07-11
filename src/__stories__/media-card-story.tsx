import * as React from 'react';
import {
    Stack,
    ButtonPrimary,
    ButtonLink,
    Text2,
    Video,
    Image,
    Tag,
    IconMobileDeviceRegular,
    Circle,
    skinVars,
    Carousel,
    IconStarFilled,
    IconStarRegular,
    MediaCard,
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import beachVideo from './videos/beach.mp4';
import avatarImg from './images/avatar.jpg';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';

export default {
    title: 'Private/Deprecated Card Stories/MediaCard',
};

const VIDEO_SRC = beachVideo;
const IMAGE_SRC = tennisImg;

type Args = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    media: 'image' | 'video';
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
        <MediaCard
            dataAttributes={{testid: 'media-card'}}
            headline={headline && <Tag type={headlineType}>{headline}</Tag>}
            pretitle={pretitle}
            pretitleAs={pretitleAs}
            title={title}
            titleAs={titleAs}
            subtitle={subtitle}
            description={description}
            asset={assetElement}
            media={
                media === 'video' ? (
                    <Video
                        src={emptySource ? '' : VIDEO_SRC}
                        aspectRatio="16:9"
                        dataAttributes={{qsysid: 'video'}}
                    />
                ) : (
                    <Image aspectRatio="16:9" src={emptySource ? '' : IMAGE_SRC} />
                )
            }
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
    );
};

Default.storyName = 'MediaCard';
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
        options: ['image', 'video'],
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

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom.
                </Text2>
                <Carousel
                    items={[
                        <MediaCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            subtitle="Subtitle"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={
                                <ButtonLink small href="https://google.com">
                                    Link
                                </ButtonLink>
                            }
                        />,
                        <MediaCard
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={
                                <ButtonLink small href="https://google.com">
                                    Link
                                </ButtonLink>
                            }
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'MediaCard group';
