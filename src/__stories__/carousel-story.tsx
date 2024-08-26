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
    Title1,
    Text2,
    Image,
    CarouselContextProvider,
    FixedFooterLayout,
    CarouselContextConsumer,
    Inline,
    PageBullets,
} from '..';
import tennisUrl from './images/tennis.jpg';

export default {
    title: 'Components/Carousels/Carousel',
};

const mobilePageOffsetOptions = ['regular', 'large'] as const;

type Args = {
    numItems: number;
    itemsPerPageMobile: number;
    itemsPerPageTablet: number;
    itemsPerPageDesktop: number;
    bullets: boolean;
    free: boolean;
    itemsToScroll: number;
    mobilePageOffset: (typeof mobilePageOffsetOptions)[number];
    autoplay: boolean;
    loop: boolean;
    initialActiveItem: number;
};

export const Default: StoryComponent<Args> = ({
    numItems,
    bullets,
    itemsPerPageMobile,
    itemsPerPageTablet,
    itemsPerPageDesktop,
    free,
    itemsToScroll,
    mobilePageOffset,
    autoplay,
    loop,
    initialActiveItem,
}) => {
    const [pageInfo, setPageInfo] = React.useState<{
        pageIndex: number;
        shownItemIndexes: Array<number>;
    } | null>(null);
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices"
                        icon={<IconInformationRegular />}
                    />
                    <Carousel
                        dataAttributes={{testid: 'carousel-story'}}
                        withBullets={bullets}
                        free={free}
                        itemsPerPage={{
                            mobile: itemsPerPageMobile,
                            tablet: itemsPerPageTablet,
                            desktop: itemsPerPageDesktop,
                        }}
                        itemsToScroll={itemsToScroll}
                        mobilePageOffset={mobilePageOffset}
                        autoplay={autoplay ? {time: 5000, loop} : false}
                        onPageChange={setPageInfo}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <MediaCard
                                aria-label={`Carousel item ${idx}`}
                                key={idx}
                                title={`Title ${idx}`}
                                description="Some description"
                                media={<Image src={tennisUrl} aspectRatio="16:9" />}
                                buttonLink={<ButtonLink href="https://google.com">Link {idx}</ButtonLink>}
                            />
                        ))}
                        initialActiveItem={initialActiveItem}
                    />
                    <Stack space={8}>
                        <Title1 as="h2">Current page info</Title1>
                        {pageInfo && (
                            <Text2 regular as="pre">
                                {JSON.stringify(pageInfo, null, 2)}
                            </Text2>
                        )}
                    </Stack>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Carousel';
Default.parameters = {fullScreen: true};
Default.args = {
    bullets: true,
    numItems: 6,
    itemsPerPageDesktop: 3,
    itemsPerPageTablet: 2,
    itemsPerPageMobile: 1,
    free: false,
    autoplay: false,
    loop: false,
    itemsToScroll: 0,
    initialActiveItem: 0,
    mobilePageOffset: 'regular',
};
Default.argTypes = {
    mobilePageOffset: {
        options: mobilePageOffsetOptions,
        control: {type: 'select'},
    },
};

type WithCarouselContextArgs = {numItems: number};

export const WithCarouselContext: StoryComponent<WithCarouselContextArgs> = ({numItems}) => {
    return (
        <CarouselContextProvider>
            <FixedFooterLayout
                footer={
                    <ResponsiveLayout>
                        <Box paddingY={16}>
                            <CarouselContextConsumer>
                                {({goNext, goPrev, goToPage, bulletsProps}) => (
                                    <Inline space="between" alignItems="center">
                                        <ButtonLink bleedLeft onPress={goPrev}>
                                            Prev
                                        </ButtonLink>
                                        <PageBullets {...bulletsProps} onPress={goToPage} />
                                        <ButtonLink bleedRight onPress={goNext}>
                                            Next
                                        </ButtonLink>
                                    </Inline>
                                )}
                            </CarouselContextConsumer>
                        </Box>
                    </ResponsiveLayout>
                }
            >
                <Box paddingY={24}>
                    <ResponsiveLayout>
                        <Carousel
                            items={Array.from({length: numItems}, (_, idx) => (
                                <MediaCard
                                    aria-label={`Carousel item ${idx}`}
                                    key={idx}
                                    title={`Title ${idx}`}
                                    description="Some description"
                                    media={<Image src={tennisUrl} aspectRatio="16:9" />}
                                    buttonLink={<ButtonLink href="https://google.com">Link {idx}</ButtonLink>}
                                />
                            ))}
                        />
                    </ResponsiveLayout>
                </Box>
            </FixedFooterLayout>
        </CarouselContextProvider>
    );
};

WithCarouselContext.storyName = 'Carousel with CarouselContext';
WithCarouselContext.parameters = {fullScreen: true};
WithCarouselContext.args = {
    numItems: 6,
};
