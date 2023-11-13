import * as React from 'react';
import {
    Stack,
    MediaCard,
    ButtonPrimary,
    ButtonLink,
    Inline,
    Text2,
    Video,
    Image,
    Tag,
    IconMobileDeviceRegular,
    Circle,
    skinVars,
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import confettiVideo from './videos/confetti.mp4';
import avatarImg from './images/avatar.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/MediaCard',
};

const VIDEO_SRC = confettiVideo;
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
        <MediaCard
            dataAttributes={{testid: 'media-card'}}
            headline={headline && <Tag type={headlineType}>{headline}</Tag>}
            pretitle={pretitle}
            title={title}
            subtitle={subtitle}
            description={description}
            icon={icon}
            media={
                media === 'video' ? (
                    <Video src={VIDEO_SRC} aspectRatio="16:9" dataAttributes={{qsysid: 'video'}} />
                ) : (
                    <Image aspectRatio="16:9" src={IMAGE_SRC} />
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
        options: ['button', 'link', 'button and link', 'on press', 'none'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom
                </Text2>
                <style>{`.group > * {width: 300px}`}</style>
                <Inline space={16} className="group">
                    <MediaCard
                        headline={<Tag type="promo">Headline</Tag>}
                        pretitle="Pretitle"
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <MediaCard
                        title="Title"
                        description="Description"
                        media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'MediaCard group';
