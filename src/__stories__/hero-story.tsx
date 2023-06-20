import * as React from 'react';
import {Hero, ButtonPrimary, ButtonLink, Tag, Image, Placeholder} from '..';
import usingVrImg from './images/using-vr.jpg';

import type {TagType} from '..';
import type {AspectRatio} from '../image';

export default {
    title: 'Components/Hero/Component',
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
    background: 'default' | 'alternative' | 'brand' | 'brand-secondary';
    desktopMediaPosition: 'left' | 'right';
    height?: string;
    aspectRatio: AspectRatio;
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
}) => {
    const mediaComponent =
        media === 'video' ? (
            <Placeholder />
        ) : (
            <Image src={usingVrImg} aspectRatio={aspectRatio} height="100%" />
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
        />
    );
};

Default.storyName = 'Component';

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
    height: '100vh',
    aspectRatio: '16:9',
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
        options: ['default', 'alternative', 'brand', 'brand-secondary'],
        control: {type: 'select'},
    },
    desktopMediaPosition: {
        options: ['left', 'right'],
        control: {type: 'select'},
    },
};
