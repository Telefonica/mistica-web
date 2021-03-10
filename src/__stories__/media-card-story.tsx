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
} from '..';
import ResponsiveLayout from '../responsive-layout';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/MediaCard',
};

export const Default: StoryComponent = () => {
    const [headline, headlineTextField] = useTextField('headline', 'priority', true);
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Some pretitle', true);
    const [title, titleTextField] = useTextField('title', 'Some title', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'This is a description for the card',
        true
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
                {pretitleTextField}
                {titleTextField}
                {descriptionTextField}
                {actionsSelect}
            </Stack>
            <div data-testid="media-card">
                <StorySection title="MediaCard">
                    <MediaCard
                        headline={headline}
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

export const WithBody: StoryComponent = () => (
    <MediaCard
        headline="headline"
        pretitle="pretitle"
        title="title"
        description="description"
        body={<Placeholder />}
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
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom:
                </Text2>
                <Inline space={16} className={classes.group}>
                    <MediaCard
                        headline="headline"
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
        [theme.mq.mobile]: {
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
    const {isMobile} = useScreenSize();
    const classes = useCarouselStyles();
    return (
        <Box paddingY={16}>
            <Stack space={16}>
                <ResponsiveLayout>
                    <Text2 regular>This is a naive carousel implementation using MediaCards:</Text2>
                </ResponsiveLayout>
                <ResponsiveLayout fullWidth={isMobile}>
                    <Inline space={16} className={classes.carousel}>
                        {Array.from({length: 5}).flatMap((_, idx) => [
                            <MediaCard
                                key={`${idx}-full`}
                                headline="headline"
                                pretitle="pretitle"
                                title="title"
                                description="description"
                                media={{
                                    src: 'https://i.imgur.com/flZfkiX.png',
                                }}
                                buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                            />,
                            <MediaCard
                                key={`${idx}-simple`}
                                title="title"
                                description="description"
                                media={{
                                    src: 'https://i.imgur.com/flZfkiX.png',
                                }}
                                buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                            />,
                        ])}
                    </Inline>
                </ResponsiveLayout>
            </Stack>
        </Box>
    );
};

Carousel.storyName = 'MediaCards carousel';
Carousel.parameters = {fullScreen: true};
