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
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';
import tennisImg from './images/tennis.jpg';
import confettiVideo from './videos/confetti.mp4';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/Media card',
    parameters: {fullScreen: false},
};

const VIDEO_SRC = confettiVideo;
const IMAGE_SRC = tennisImg;

type Args = {
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
}) => {
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

Default.storyName = 'Media card';
Default.args = {
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
                    always fixed on bottom:
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

Group.storyName = 'Media card group';
