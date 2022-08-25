import * as React from 'react';
import {
    Stack,
    MediaCard,
    ButtonPrimary,
    ButtonLink,
    Inline,
    Text2,
    useScreenSize,
    Box,
    createUseStyles,
    Video,
    Image,
    Tag,
    TagType,
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/Media card',
};

const VIDEO_SRC = 'https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw';
const POSTER_SRC = 'https://i.imgur.com/aEVtKsE.jpg';
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

const useCardGroupStyles = createUseStyles(() => ({
    group: {
        '& > *': {
            width: 300,
        },
    },
}));

export const Group: StoryComponent = () => {
    const classes = useCardGroupStyles();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom:
                </Text2>
                <Inline space={16} className={classes.group}>
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

const useCarouselStyles = createUseStyles((theme) => ({
    carousel: {
        overflowY: 'auto',
        width: '100%',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        [theme.mq.tabletOrSmaller]: {
            padding: '0 16px',
        },
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '& > *': {
            width: 300,
            flexShrink: 0,
            scrollSnapAlign: 'center',
        },
    },
}));

export const Carousel: StoryComponent = () => {
    const {isTabletOrSmaller} = useScreenSize();
    const classes = useCarouselStyles();
    const videoRef = React.useRef<HTMLVideoElement>(null);
    return (
        <Box paddingY={16}>
            <Stack space={16}>
                <ResponsiveLayout>
                    <Text2 regular>This is a naive carousel implementation using MediaCards:</Text2>
                </ResponsiveLayout>
                <ResponsiveLayout fullWidth={isTabletOrSmaller}>
                    <Inline space={16} className={classes.carousel}>
                        <MediaCard
                            title="Video"
                            description="Example media card with <Video> element"
                            media={
                                <Video
                                    ref={videoRef}
                                    src={VIDEO_SRC}
                                    poster={POSTER_SRC}
                                    autoPlay={false}
                                    aspectRatio="16:9"
                                />
                            }
                            buttonLink={
                                <ButtonLink
                                    onPress={() => {
                                        videoRef.current?.play();
                                    }}
                                >
                                    Play Video
                                </ButtonLink>
                            }
                        />
                        <MediaCard
                            title="Image"
                            description="Example media card with <Image> element"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard
                            title="Title"
                            description="Description"
                            media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                        />
                    </Inline>
                </ResponsiveLayout>
            </Stack>
        </Box>
    );
};

Carousel.storyName = 'Media cards carousel';
Carousel.parameters = {fullScreen: true};
