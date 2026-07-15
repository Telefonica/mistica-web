import * as React from 'react';
import {
    Stack,
    ButtonPrimary,
    ButtonLink,
    Text2,
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
import tennisImg from '../__stories__/images/tennis.jpg';
import beachVideo from '../__stories__/videos/beach.mp4';
import avatarImg from '../__stories__/images/avatar.jpg';

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
        media === 'video'
            ? ({
                  videoSrc: emptySource ? '' : VIDEO_SRC,
                  mediaAspectRatio: '16:9',
                  videoDataAttributes: {qsysid: 'video'},
              } as const)
            : ({imageSrc: emptySource ? '' : IMAGE_SRC, mediaAspectRatio: '16:9'} as const);

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
            {...mediaProps}
            {...interactiveActions}
            extra={extra ? <Placeholder /> : undefined}
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
                            imageSrc={IMAGE_SRC}
                            mediaAspectRatio="16:9"
                            buttonLink={
                                <ButtonLink small href="https://google.com">
                                    Link
                                </ButtonLink>
                            }
                        />,
                        <MediaCard
                            title="Title"
                            description="Description"
                            imageSrc={IMAGE_SRC}
                            mediaAspectRatio="16:9"
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
