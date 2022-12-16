import * as React from 'react';
import {Stack, MediaCard, ButtonPrimary, ButtonLink, Inline, Text2, Video, Image, Tag, TagType} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/Media card',
};

const VIDEO_SRC = 'https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw';
const IMAGE_SRC = 'https://i.imgur.com/aEVtKsE.jpg';

type Args = {
    media: 'image' | 'video';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    withExtra: boolean;
    actions: 'button' | 'link' | 'button and link' | 'none';
    closable: boolean;
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
                    <Video src={VIDEO_SRC} aspectRatio="12:5" dataAttributes={{qsysid: 'video'}} />
                ) : (
                    <Image aspectRatio="16:9" src={IMAGE_SRC} />
                )
            }
            button={button}
            buttonLink={buttonLink}
            extra={withExtra ? <Placeholder /> : undefined}
            onClose={closable ? () => {} : undefined}
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
        options: ['button', 'link', 'button and link', 'none'],
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
