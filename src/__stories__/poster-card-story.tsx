import * as React from 'react';
import {
    IconInvoicePlanFileRegular,
    skinVars,
    Circle,
    Tag,
    IconLightningRegular,
    ResponsiveLayout,
    Stack,
    Text2,
    Inline,
    Title1,
    Box,
} from '..';
import {PosterCard} from '../card';
import usingVrImg from './images/using-vr.jpg';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/Poster card',
};

const BACKGROUND_IMAGE_SRC = usingVrImg;
const BACKGROUND_VIDEO_SRC = beachVideo;
const BACKGROUND_VIDEO_POSTER_SRC = beachImg;

type PosterCardArgs = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    background: 'image' | 'video';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    closable: boolean;
    onPress: boolean;
    withTopAction: boolean;
    width: string;
    height: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
};

export const Default: StoryComponent<PosterCardArgs> = ({
    asset,
    background,
    headline,
    headlineType,
    pretitle,
    title,
    description,
    closable,
    onPress,
    withTopAction,
    width,
    height,
    aspectRatio,
}) => {
    let icon;
    if (asset === 'circle with icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle with image') {
        icon = <Circle size={40} backgroundImage={avatarImg} />;
    }

    const backgroundProps =
        background === 'image'
            ? {
                  onClose: closable ? () => {} : undefined,
                  actions: withTopAction
                      ? [
                            {
                                Icon: IconLightningRegular,
                                onPress: () => {},
                                label: 'Lightning',
                            },
                        ]
                      : undefined,
                  backgroundImage: BACKGROUND_IMAGE_SRC,
              }
            : {
                  backgroundVideo: BACKGROUND_VIDEO_SRC,
                  poster: BACKGROUND_VIDEO_POSTER_SRC,
              };

    const wrongBackgroundProps =
        background === 'image'
            ? {
                  onClose: closable ? () => {} : undefined,
                  actions: withTopAction
                      ? [
                            {
                                Icon: IconLightningRegular,
                                onPress: () => {},
                                label: 'Lightning',
                            },
                        ]
                      : undefined,
                  backgroundImage: 'test',
              }
            : {
                  backgroundVideo: 'test',
                  poster: 'test',
              };

    return (
        <Stack space={32} dataAttributes={{testid: 'poster-card'}}>
            <PosterCard
                {...backgroundProps}
                icon={icon}
                headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                pretitle={pretitle}
                title={title}
                description={description}
                aria-label="Poster card label"
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                onPress={onPress ? () => null : undefined}
            />

            <Title1>Wrong source for media</Title1>
            <PosterCard
                {...wrongBackgroundProps}
                icon={icon}
                headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                pretitle={pretitle}
                title={title}
                description={description}
                aria-label="Poster card fallback label"
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                onPress={onPress ? () => null : undefined}
            />

            <Title1>Wrong source for media with inverse</Title1>
            <ResponsiveLayout isInverse>
                <Box paddingY={8}>
                    <PosterCard
                        {...wrongBackgroundProps}
                        icon={icon}
                        headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                        pretitle={pretitle}
                        title={title}
                        description={description}
                        aria-label="Poster card fallback inverse label"
                        width={width}
                        height={height}
                        aspectRatio={aspectRatio}
                        onPress={onPress ? () => null : undefined}
                    />
                </Box>
            </ResponsiveLayout>
        </Stack>
    );
};

Default.storyName = 'Poster card';
Default.args = {
    asset: 'none',
    headlineType: 'promo',
    background: 'image',
    headline: 'Priority',
    pretitle: 'Pretitle',
    title: 'Title',
    description: 'This is a description for the card',
    closable: false,
    onPress: false,
    withTopAction: false,
    width: 'auto',
    height: 'auto',
    aspectRatio: 'auto',
};
Default.argTypes = {
    asset: {
        options: ['circle with icon', 'circle with image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
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
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card content is
                    aligned to the bottom
                </Text2>
                <style>{`.group > * {width: 300px}`}</style>
                <Inline space={16} className="group">
                    <PosterCard
                        headline={<Tag type="promo">Headline</Tag>}
                        pretitle="Pretitle"
                        title="Title"
                        description="Description"
                        backgroundImage={BACKGROUND_IMAGE_SRC}
                    />
                    <PosterCard title="Title" backgroundImage={BACKGROUND_IMAGE_SRC} />
                    <PosterCard title="Title" backgroundImage={BACKGROUND_IMAGE_SRC} onClose={() => {}} />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'Poster Card group';
