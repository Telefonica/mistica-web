import * as React from 'react';
import {
    Carousel,
    Box,
    ResponsiveLayout,
    MediaCard,
    ButtonLink,
    Stack,
    Image,
    GridLayout,
    Placeholder,
} from '..';
import tennisUrl from '../__stories__/images/tennis.jpg';

export default {
    title: 'Private/Carousel on different container types',
};

type Args = {
    numItems: number;
    itemsPerPageMobile: number;
    itemsPerPageTablet: number;
    itemsPerPageDesktopSmall: number;
    itemsPerPageDesktopMedium: number;
    itemsPerPageDesktopLarge: number;
    bullets: boolean;
};

const ExampleCarousel = ({
    numItems,
    bullets,
    cardsTitlePrefix,
    itemsPerPage,
    'aria-label': ariaLabelProp,
}: {
    numItems: number;
    bullets: boolean;
    cardsTitlePrefix: number;
    itemsPerPage: {mobile: number; tablet: number; desktop: {small: number; medium: number; large: number}};
    'aria-label': string;
}) => (
    <Carousel
        dataAttributes={{testid: 'carousel-story'}}
        withBullets={bullets}
        itemsPerPage={itemsPerPage}
        aria-label={ariaLabelProp}
        items={Array.from({length: numItems}, (_, idx) => (
            <MediaCard
                aria-label={`Carousel ${cardsTitlePrefix} item ${idx}`}
                key={idx}
                title={`Title ${idx} carousel ${cardsTitlePrefix}`}
                description="Some description"
                media={<Image src={tennisUrl} aspectRatio="16:9" />}
                buttonLink={
                    <ButtonLink small href="https://google.com">
                        Link {idx}
                    </ButtonLink>
                }
            />
        ))}
    />
);

export const Default: StoryComponent<Args> = ({
    numItems,
    itemsPerPageMobile,
    itemsPerPageTablet,
    itemsPerPageDesktopSmall,
    itemsPerPageDesktopMedium,
    itemsPerPageDesktopLarge,
    bullets,
}) => {
    const itemsPerPage = {
        mobile: itemsPerPageMobile,
        tablet: itemsPerPageTablet,
        desktop: {
            small: itemsPerPageDesktopSmall,
            medium: itemsPerPageDesktopMedium,
            large: itemsPerPageDesktopLarge,
        },
    };
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <GridLayout
                        template="8+4"
                        left={
                            <ExampleCarousel
                                numItems={numItems}
                                bullets={bullets}
                                itemsPerPage={itemsPerPage}
                                aria-label="Component story, right placeholder"
                                cardsTitlePrefix={1}
                            />
                        }
                        right={<Placeholder height={240} />}
                    ></GridLayout>
                    <GridLayout
                        template="8+4"
                        left={<Placeholder height={240} />}
                        right={
                            <ExampleCarousel
                                numItems={numItems}
                                bullets={bullets}
                                itemsPerPage={itemsPerPage}
                                aria-label="Component story, left placeholder"
                                cardsTitlePrefix={2}
                            />
                        }
                    ></GridLayout>
                    <ExampleCarousel
                        numItems={numItems}
                        bullets={bullets}
                        itemsPerPage={itemsPerPage}
                        cardsTitlePrefix={3}
                        aria-label="Component story, no placeholder"
                    />
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Carousel on different container types';
Default.parameters = {fullScreen: true};
Default.args = {
    numItems: 6,
    itemsPerPageMobile: 1,
    itemsPerPageTablet: 2,
    itemsPerPageDesktopSmall: 1,
    itemsPerPageDesktopMedium: 2,
    itemsPerPageDesktopLarge: 3,
    bullets: true,
};
