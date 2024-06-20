import * as React from 'react';
import {Hero, ButtonPrimary, ButtonLink, Tag, Image, Placeholder, Video} from '..';
import usingVrImg from './images/using-vr.jpg';
import beachImg from './images/beach.jpg';
import beachVideo from './videos/beach.mp4';

import type {TagType} from '..';
import type {AspectRatio} from '../video';

export default {
    title: 'Components/Hero/Hero',
    parameters: {
        fullScreen: true,
    },
};

type HeroArgs = {
    media: 'video' | 'image';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    withExtra: boolean;
    actions: 'button' | 'link' | 'button and link';
    background: 'default' | 'alternative' | 'brand' | 'brand-secondary' | 'none';
    desktopMediaPosition: 'left' | 'right';
    height?: string;
    aspectRatio: string;
    noPaddingY: boolean;
};

export const Default: StoryComponent<HeroArgs> = ({
    media,
    background,
    headline,
    headlineType,
    pretitle,
    title,
    description,
    actions,
    desktopMediaPosition,
    height,
    withExtra,
    aspectRatio,
    noPaddingY,
}) => {
    const mediaComponent =
        media === 'video' ? (
            <Video
                src={beachVideo}
                poster={beachImg}
                aspectRatio={aspectRatio.replace(' ', ':') as AspectRatio}
            />
        ) : (
            <Image src={usingVrImg} aspectRatio={aspectRatio.replace(' ', ':') as AspectRatio} />
        );

    const button = actions.includes('button') ? <ButtonPrimary fake>Action</ButtonPrimary> : undefined;
    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;

    return (
        <Hero
            background={background}
            media={mediaComponent}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            extra={withExtra ? <Placeholder /> : undefined}
            button={button}
            buttonLink={buttonLink}
            dataAttributes={{testid: 'hero'}}
            desktopMediaPosition={desktopMediaPosition}
            height={height}
            noPaddingY={noPaddingY}
        />
    );
};

Default.storyName = 'Hero';

Default.args = {
    media: 'image',
    headlineType: 'promo',
    headline: 'Hero',
    pretitle: 'Pretitle',
    title: 'Title',
    description: 'This is a long description with a long text to see how this works',
    withExtra: false,
    actions: 'button and link',
    background: 'default',
    desktopMediaPosition: 'right',
    height: '',
    aspectRatio: '16 9',
    noPaddingY: false,
};

Default.argTypes = {
    media: {
        options: ['video', 'image'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'none'],
        control: {type: 'select'},
    },
    background: {
        options: ['default', 'alternative', 'brand', 'brand-secondary', 'none'],
        control: {type: 'select'},
    },
    desktopMediaPosition: {
        options: ['left', 'right'],
        control: {type: 'select'},
    },
    aspectRatio: {
        options: ['1 1', '16 9', '4 3'],
        control: {
            type: 'select',
            labels: {
                '1 1': '1:1',
                '16 9': '16:9',
                '4 3': '4:3',
            },
        },
    },
};
