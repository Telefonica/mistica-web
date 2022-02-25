import * as React from 'react';
import {StorySection, useTextField, useSelect} from './helpers';
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
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/MediaCard',
};

const VIDEO_SRC = 'https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw';
const POSTER_SRC = 'https://i.imgur.com/aEVtKsE.jpg';
const IMAGE_SRC = 'https://i.imgur.com/aEVtKsE.jpg';

export const Default: StoryComponent = () => {
    const tagColorNames = ['promo', 'active', 'inactive', 'success', 'warning', 'error'];
    const [headline, headlineTextField] = useTextField('Headline', 'Priority');
    const [headlineType, headlineTypeSelect] = useSelect('headline color', tagColorNames[0], tagColorNames);
    const [pretitle, pretitleTextField] = useTextField('Pretitle', 'Some pretitle');
    const [title, titleTextField] = useTextField('Title', 'Some title');
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the card'
    );
    const [actions, actionsSelect] = useSelect('actions', 'button', [
        'button',
        'link',
        'button & link',
        'none',
    ]);

    const button = actions.includes('button') ? (
        <ButtonPrimary small href="https://google.com">
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink href="https://google.com">Link</ButtonLink>
    ) : undefined;

    return (
        <>
            <Stack space={16}>
                {headlineTextField}
                {headline && headlineTypeSelect}
                {pretitleTextField}
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
            </Stack>
            <div data-testid="media-card">
                <StorySection title="MediaCard">
                    <MediaCard
                        headline={headline && <Tag type={headlineType as never}>{headline}</Tag>}
                        pretitle={pretitle}
                        title={title}
                        description={description}
                        media={{
                            src: IMAGE_SRC,
                        }}
                        button={button}
                        buttonLink={buttonLink}
                    />
                </StorySection>
            </div>
        </>
    );
};

Default.storyName = 'MediaCard';

export const WithBody: StoryComponent = () => {
    return (
        <MediaCard
            headline={<Tag type="promo">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="Description"
            extra={<Placeholder />}
            media={<Image src={IMAGE_SRC} aspectRatio="16:9" dataAttributes={{qsysid: 'image'}} />}
            button={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    );
};

WithBody.storyName = 'MediaCard with body';

export const WithVideo: StoryComponent = () => {
    return (
        <MediaCard
            headline={<Tag type="promo">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="Description"
            media={<Video src={VIDEO_SRC} aspectRatio="12:5" dataAttributes={{qsysid: 'video'}} />}
            button={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    );
};

WithVideo.storyName = 'MediaCard with video';

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
                        description="Description"
                        media={{src: IMAGE_SRC}}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <MediaCard
                        title="Title"
                        description="Description"
                        media={{src: IMAGE_SRC}}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'MediaCard group';

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
                            media={{src: IMAGE_SRC}}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard
                            title="Title"
                            description="Description"
                            media={{src: IMAGE_SRC}}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard title="Title" description="Description" media={{src: IMAGE_SRC}} />
                    </Inline>
                </ResponsiveLayout>
            </Stack>
        </Box>
    );
};

Carousel.storyName = 'MediaCards carousel';
Carousel.parameters = {fullScreen: true};
