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
    Inline,
} from '..';
import usingVrImg from './images/using-vr.jpg';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';

import type {TagType} from '..';

export default {
    title: 'Components/Cards/Display media card',
};

const BACKGROUND_IMAGE_SRC = usingVrImg;
const BACKGROUND_VIDEO_SRC = beachVideo;

type DisplayMediaCardArgs = {
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
    headlineType: TagType;
    background: 'image' | 'video';
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    closable: boolean;
    withTopAction: boolean;
    actions: 'button' | 'link' | 'button and link' | 'button and secondary button';
    width: string;
    aspectRatio: '1:1' | '16:9' | '7:10' | '9:10' | 'auto';
};

export const Default: StoryComponent<DisplayMediaCardArgs> = ({
    asset = 'icon',
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
              };

    return (
        <DisplayMediaCard
            {...backgroundProps}
            icon={icon}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            button={button}
            buttonLink={buttonLink}
            secondaryButton={secondaryButton}
            dataAttributes={{testid: 'display-media-card'}}
            aria-label="Display data card label"
            width={width}
            aspectRatio={aspectRatio}
        />
    );
};

Default.storyName = 'Display Media card';
Default.args = {
    asset: 'icon',
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
    actions: {
        options: ['button', 'link', 'button and link', 'button and secondary button'],
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
                    />
                    <DisplayMediaCard title="Title" backgroundImage={BACKGROUND_IMAGE_SRC} />
                    <DisplayMediaCard
                        title="Title"
                        backgroundImage={BACKGROUND_IMAGE_SRC}
                        onClose={() => {}}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'Display media card group';
