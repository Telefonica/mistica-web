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
    Tag,
    useTheme,
    Video,
    Image,
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/MediaCard',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    const tagColors = {
        promo: colors.promo,
        brand: colors.brand,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
    };
    const tagColorNames = Object.keys(tagColors);
    const [headline, headlineTextField] = useTextField('headline', 'priority');
    const [headlineColorName, headlineColorNameSelect] = useSelect(
        'headline color',
        tagColorNames[0],
        tagColorNames
    );
    const headlineColor = (tagColors as any)[headlineColorName];
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Some pretitle');
    const [title, titleTextField] = useTextField('title', 'Some title');
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
                {headline && headlineColorNameSelect}
                {pretitleTextField}
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
            </Stack>
            <div data-testid="media-card">
                <StorySection title="MediaCard">
                    <MediaCard
                        headline={headline && <Tag color={headlineColor}>{headline}</Tag>}
                        pretitle={pretitle}
                        title={title}
                        description={description}
                        media={{
                            src: 'https://i.imgur.com/flZfkiX.png',
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
    const {colors} = useTheme();
    return (
        <MediaCard
            headline={<Tag color={colors.promo}>headline</Tag>}
            pretitle="pretitle"
            title="title"
            description="description"
            extra={<Placeholder />}
            media={{
                src: 'https://i.imgur.com/flZfkiX.png',
            }}
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

const useCardGroupStyles = createUseStyles(() => ({
    group: {
        '& > *': {
            width: 300,
        },
    },
}));

export const Group: StoryComponent = () => {
    const classes = useCardGroupStyles();
    const {colors} = useTheme();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom:
                </Text2>
                <Inline space={16} className={classes.group}>
                    <MediaCard
                        headline={<Tag color={colors.promo}>headline</Tag>}
                        pretitle="pretitle"
                        title="title"
                        description="description"
                        media={{
                            src: 'https://i.imgur.com/flZfkiX.png',
                        }}
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <MediaCard
                        title="title"
                        description="description"
                        media={{
                            src: 'https://i.imgur.com/flZfkiX.png',
                        }}
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

const VIDEO_SRC = 'https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw';
const POSTER_SRC = 'https://i.imgur.com/Fu7RiuY.jpg';
const IMAGE_SRC = 'https://i.imgur.com/flZfkiX.png';

export const Carousel: StoryComponent = () => {
    const {isTabletOrSmaller} = useScreenSize();
    const {colors} = useTheme();
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
                                <Video ref={videoRef} src={VIDEO_SRC} poster={POSTER_SRC} autoPlay={false} />
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
                            media={<Image width={300} aspectRatio="16:9" url={IMAGE_SRC} />}
                            buttonLink={<ButtonLink href="https://example.com">Link</ButtonLink>}
                        />
                        <MediaCard
                            headline={<Tag color={colors.promo}>Headline</Tag>}
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
