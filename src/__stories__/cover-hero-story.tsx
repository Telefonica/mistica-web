import * as React from 'react';
import {CoverHero, ButtonPrimary, ButtonLink, Tag, Placeholder, skinVars} from '..';
import usingVrImg from './images/using-vr.jpg';
import beachImg from './images/beach.jpg';
import beachVideo from './videos/beach.mp4';

import type {TagType} from '..';

export default {
    title: 'Components/Hero/CoverHero',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    background: 'image' | 'video' | 'custom color' | 'color from skin';
    backgroundColorCustom: string;
    backgroundColorFromSkin: string;
    variant: 'default' | 'inverse' | 'alternative';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    withExtra: boolean;
    withSideExtra: boolean;
    actions: 'button' | 'link' | 'button and link';
    minHeight: string | undefined;
    aspectRatio: '1:1' | '16:9' | '7:10' | '4:3' | 'auto';
    centered: boolean;
    noPaddingY: boolean;
};

export const Default: StoryComponent<Args> = ({
    background,
    backgroundColorCustom,
    backgroundColorFromSkin,
    variant,
    headlineType,
    headline,
    pretitle,
    title,
    description,
    withExtra,
    withSideExtra,
    actions,
    minHeight,
    aspectRatio,
    centered,
    noPaddingY,
}) => {
    const backgroundProps =
        background === 'image'
            ? {
                  backgroundImage: usingVrImg,
              }
            : background === 'video'
            ? {
                  backgroundVideo: beachVideo,
                  poster: beachImg,
              }
            : {
                  backgroundColor: backgroundColorFromSkin || backgroundColorCustom,
                  variant,
              };

    const button = actions.includes('button') ? <ButtonPrimary fake>Action</ButtonPrimary> : undefined;
    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;

    return (
        <CoverHero
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            extra={withExtra ? <Placeholder /> : undefined}
            sideExtra={withSideExtra ? <Placeholder /> : undefined}
            button={button}
            buttonLink={buttonLink}
            minHeight={minHeight}
            aspectRatio={aspectRatio}
            centered={centered}
            noPaddingY={noPaddingY}
            {...backgroundProps}
        />
    );
};

Default.storyName = 'CoverHero';

Default.args = {
    background: 'image',
    backgroundColorCustom: '',
    backgroundColorFromSkin: '',
    variant: 'default',
    headlineType: 'promo',
    headline: 'Hero',
    pretitle: 'Pretitle',
    title: 'Title',
    description: 'This is a long description with a long text to see how this works',
    withExtra: false,
    withSideExtra: false,
    actions: 'button and link',
    minHeight: undefined,
    aspectRatio: 'auto',
    centered: false,
    noPaddingY: false,
};

Default.argTypes = {
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
    actions: {
        options: ['button', 'link', 'button and link'],
        control: {type: 'select'},
    },
    minHeight: {
        control: {type: 'text'},
    },
    aspectRatio: {
        options: ['1 1', '16 9', '7 10', '4 3', 'auto'],
        mapping: {
            '1 1': '1:1',
            '16 9': '16:9',
            '7 10': '7:10',
            '4 3': '4:3',
        },
        control: {
            type: 'select',
            labels: {
                '1 1': '1:1',
                '16 9': '16:9',
                '7 10': '7:10',
                '4 3': '4:3',
            },
        },
    },
};
