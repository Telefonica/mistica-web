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
    Box,
} from '..';
import {PosterCard} from '../card';
import usingVrImg from './images/using-vr.jpg';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/PosterCard',
};

const BACKGROUND_IMAGE_SRC = usingVrImg;
const BACKGROUND_VIDEO_SRC = beachVideo;
const BACKGROUND_VIDEO_POSTER_SRC = beachImg;

type PosterCardArgs = {
    asset: 'circle with icon' | 'circle with image' | 'none';
    background: 'image' | 'video' | 'custom color' | 'color from skin';
    backgroundColorCustom: string;
    backgroundColorFromSkin: string;
    variant: 'default' | 'inverse' | 'alternative';
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
    isEmptySource: boolean;
    inverse: boolean;
};

export const Default: StoryComponent<PosterCardArgs> = ({
    asset,
    background,
    backgroundColorCustom,
    backgroundColorFromSkin,
    variant,
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
    isEmptySource,
    inverse,
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

    const topActionsProps = {
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
    };
    const backgroundProps =
        background === 'image'
            ? {
                  ...topActionsProps,
                  backgroundImage: isEmptySource ? '' : BACKGROUND_IMAGE_SRC,
              }
            : background === 'video'
            ? {
                  backgroundVideo: isEmptySource ? '' : BACKGROUND_VIDEO_SRC,
                  poster: isEmptySource ? '' : BACKGROUND_VIDEO_POSTER_SRC,
              }
            : {
                  ...topActionsProps,
                  backgroundColor: backgroundColorFromSkin || backgroundColorCustom,
                  variant,
              };

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <PosterCard
                    dataAttributes={{testid: 'poster-card'}}
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
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'PosterCard';
Default.args = {
    asset: 'none',
    headlineType: 'promo',
    background: 'image',
    backgroundColorCustom: '',
    backgroundColorFromSkin: '',
    variant: 'default',
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
    isEmptySource: false,
    inverse: false,
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
        options: ['image', 'video', 'color from skin', 'custom color'],
        control: {type: 'select'},
    },
    backgroundColorCustom: {
        control: {type: 'color'},
        if: {arg: 'background', eq: 'custom color'},
    },
    backgroundColorFromSkin: {
        control: {type: 'select'},
        options: {'none (determined by variant)': '', ...skinVars.colors},
        if: {arg: 'background', eq: 'color from skin'},
    },
    variant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
        // this control should only be visible when background is set to 'color from skin' or 'custom color'
        // if: {arg: 'background', eq: 'color'},
    },
    aspectRatio: {
        options: ['1:1', '16:9', '7:10', '9:10', 'auto'],
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

Group.storyName = 'PosterCard group';
