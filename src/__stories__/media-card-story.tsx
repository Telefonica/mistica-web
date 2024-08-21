import * as React from 'react';
import {
    Stack,
    MediaCard,
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
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import beachVideo from './videos/beach.mp4';
import avatarImg from './images/avatar.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/MediaCard',
};

const VIDEO_SRC = beachVideo;
const IMAGE_SRC = tennisImg;

type Args = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    media: 'image' | 'video';
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
        <MediaCard
            dataAttributes={{testid: 'media-card'}}
            headline={headline && <Tag type={headlineType}>{headline}</Tag>}
            pretitle={pretitle}
            title={title}
            subtitle={subtitle}
            description={description}
            asset={assetElement}
            media={
                media === 'video' ? (
                    <Video
                        src={isEmptySource ? '' : VIDEO_SRC}
                        aspectRatio="16:9"
                        dataAttributes={{qsysid: 'video'}}
                    />
                ) : (
                    <Image aspectRatio="16:9" src={isEmptySource ? '' : IMAGE_SRC} />
                )
            }
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
    );
};

Default.storyName = 'MediaCard';
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
        options: ['image', 'video'],
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
                            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                        />,
                        <MediaCard
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'MediaCard group';
