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
} from '..';
import usingVrImg from './images/using-vr.jpg';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/DisplayMediaCard',
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
    title: string;
    description: string;
    closable: boolean;
    withTopAction: boolean;
    actions: 'button' | 'link' | 'button and link' | 'button and secondary button' | 'onPress';
    width: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
    isEmptySource: boolean;
    inverse: boolean;
};

export const Default: StoryComponent<DisplayMediaCardArgs> = ({
    asset,
    headline,
    headlineType,
    background,
    pretitle,
    title,
    description,
    actions = 'button',
    closable,
    withTopAction,
    width,
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

    const button = actions.includes('button') ? (
        <ButtonPrimary small fake>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;
    const secondaryButton = actions.includes('secondary') ? (
        <ButtonSecondary small fake>
            Action 2
        </ButtonSecondary>
    ) : undefined;

    const onPress = actions.includes('press') ? () => null : undefined;

    const interactiveActions = onPress
        ? {onPress}
        : {
              button,
              buttonLink,
              secondaryButton,
          };

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
                  backgroundImage: isEmptySource ? '' : BACKGROUND_IMAGE_SRC,
              }
            : {
                  backgroundVideo: isEmptySource ? '' : BACKGROUND_VIDEO_SRC,
                  poster: isEmptySource ? '' : BACKGROUND_VIDEO_POSTER_SRC,
              };

    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16}>
                <DisplayMediaCard
                    {...backgroundProps}
                    icon={icon}
                    headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
                    pretitle={pretitle}
                    title={title}
                    description={description}
                    {...interactiveActions}
                    aria-label="Display media card label"
                    width={width}
                    aspectRatio={aspectRatio}
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
    title: 'Title',
    description: 'This is a description for the card',
    actions: 'button',
    closable: false,
    withTopAction: false,
    width: 'auto',
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
    actions: {
        options: ['button', 'link', 'button and link', 'button and secondary button', 'on press'],
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
