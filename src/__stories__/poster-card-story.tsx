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
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
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
    inverse: boolean;
    backgroundColor?: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
};

export const Default: StoryComponent<PosterCardArgs> = ({
    asset = 'icon',
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
    backgroundColor,
    inverse,
}) => {
    let icon;
    if (asset === 'circle + icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle + image') {
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

    const backgroundColorProps = {
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
        backgroundColor: 'test',
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                        isInverse={inverse}
                        onPress={onPress ? () => null : undefined}
                    />
                </Box>
            </ResponsiveLayout>

            <Title1>NO MIDIA</Title1>
            <PosterCard
                {...backgroundColorProps}
                icon={icon}
                headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                pretitle={pretitle}
                title={title}
                description={description}
                aria-label="Poster card fallback inverse label"
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                isInverse={inverse}
                onPress={onPress ? () => null : undefined}
                backgroundColor={backgroundColor}
            />
        </Stack>
    );
};

Default.storyName = 'Poster card';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    background: 'image',
    backgroundColor: 'backgroundContainerBrandrror',
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
    inverse: true,
};
Default.argTypes = {
    asset: {
        options: ['circle + icon', 'circle + image', 'none'],
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
    backgroundColor: {
        mapping: skinVars.colors,
        control: {type: 'text'},
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
