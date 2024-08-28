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
    Box,
    Carousel,
    IconStarFilled,
    IconStarRegular,
    Placeholder,
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
    subtitle: string;
    description: string;
    extra: boolean;
    ariaLabel: string;
    closable: boolean;
    actions: 'onPress' | 'href' | 'to' | 'none';
    topAction: boolean;
    width: string;
    height: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
    emptySource: boolean;
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
    subtitle,
    description,
    extra,
    ariaLabel,
    closable,
    actions,
    topAction,
    width,
    height,
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

    const topActionsProps = {
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
    };
    const backgroundProps =
        background === 'image'
            ? {
                  ...topActionsProps,
                  backgroundImage: emptySource ? '' : BACKGROUND_IMAGE_SRC,
              }
            : background === 'video'
              ? {
                    backgroundVideo: emptySource ? '' : BACKGROUND_VIDEO_SRC,
                    poster: emptySource ? '' : BACKGROUND_VIDEO_POSTER_SRC,
                }
              : {
                    ...topActionsProps,
                    backgroundColor: backgroundColorFromSkin || backgroundColorCustom,
                    variant,
                };

    const interactiveProps = {
        onPress: actions === 'onPress' ? () => {} : undefined,
        to: actions === 'to' ? '#' : undefined,
        href: actions === 'href' ? 'https://example.org' : undefined,
    } as {onPress: () => void} | {to: string} | {href: string} | {[key: string]: never};

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <PosterCard
                    dataAttributes={{testid: 'poster-card'}}
                    {...backgroundProps}
                    asset={assetElement}
                    headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                    pretitle={pretitle}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    extra={extra ? <Placeholder /> : undefined}
                    aria-label={ariaLabel}
                    width={width}
                    height={height}
                    aspectRatio={aspectRatio}
                    {...interactiveProps}
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
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    extra: false,
    ariaLabel: '',
    closable: false,
    actions: 'none',
    topAction: false,
    width: 'auto',
    height: 'auto',
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
        // This control should only be visible when background is set to 'color from skin' or 'custom color'.
        // That could look similar to this in a future storybook version (see https://github.com/ComponentDriven/csf/pull/76):
        // if: {
        //     or: [
        //         {arg: 'background', eq: 'color from skin'},
        //         {arg: 'background', eq: 'custom color'},
        //     ],
        // },
    },
    aspectRatio: {
        options: ['1:1', '16:9', '7:10', '9:10', 'auto'],
        control: {type: 'select'},
    },
    actions: {
        options: ['onPress', 'href', 'to', 'none'],
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
                        <PosterCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            description="Description"
                            backgroundImage={BACKGROUND_IMAGE_SRC}
                        />,
                        <PosterCard title="Title" backgroundImage={BACKGROUND_IMAGE_SRC} />,
                        <PosterCard
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

Group.storyName = 'PosterCard group';
