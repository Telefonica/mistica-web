import * as React from 'react';
import {
    Carousel,
    Box,
    ResponsiveLayout,
    MediaCard,
    ButtonLink,
    Callout,
    Stack,
    IconInformationRegular,
    Image,
    GridLayout,
    Placeholder,
} from '..';

export default {
    title: 'Components/Carousels/Carousel on different container types',
};

type Args = {
    numItems: number;
    itemsPerPageMobile: number;
    itemsPerPageDesktop: number;
    withBullets: boolean;
    nextPageOffset: number;
    prevPageOffset: number;
    free: boolean;
    itemsToScroll: number;
    autoplay: boolean;
    loop: boolean;
};

const ExampleCarousel = ({
    cardsTitlePrefix,
    intemsPerPage,
}: {
    cardsTitlePrefix: number;
    intemsPerPage: number;
}) => (
    <Carousel
        dataAttributes={{testid: 'carousel-story'}}
        withBullets
        itemsPerPage={intemsPerPage}
        itemsToScroll={1}
        items={Array.from({length: 6}, (_, idx) => (
            <MediaCard
                aria-label={`Carousel ${cardsTitlePrefix} item ${idx}`}
                key={idx}
                title={`Title ${idx} carousel ${cardsTitlePrefix}`}
                description="Some description"
                media={<Image src="https://i.imgur.com/flZfkiX.png" aspectRatio="16:9" />}
                buttonLink={<ButtonLink href="https://google.com">Link {idx}</ButtonLink>}
            />
        ))}
    />
);

export const Default: StoryComponent<Args> = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices"
                        icon={<IconInformationRegular />}
                    />
                    <GridLayout
                        template="8+4"
                        left={<ExampleCarousel intemsPerPage={3} cardsTitlePrefix={1} />}
                        right={<Placeholder height={240} />}
                    ></GridLayout>
                    <GridLayout
                        template="8+4"
                        left={<Placeholder height={240} />}
                        right={<ExampleCarousel intemsPerPage={1.3} cardsTitlePrefix={2} />}
                    ></GridLayout>
                    <ExampleCarousel intemsPerPage={4} cardsTitlePrefix={3} />
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Carousel on different container types';
Default.parameters = {fullScreen: true};
