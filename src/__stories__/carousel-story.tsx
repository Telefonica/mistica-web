import * as React from 'react';
import {
    Carousel,
    Box,
    ResponsiveLayout,
    MediaCard,
    ButtonLink,
    Stack,
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
import {CarouselAutoplayControl, CarouselPageControls} from '../carousel';

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
    withControls: boolean;
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
    withControls,
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
                        withControls={withControls}
                        onPageChange={setPageInfo}
                        aria-label="Component story"
                        items={Array.from({length: numItems}, (_, idx) => (
                            <MediaCard
                                aria-label={`Carousel item ${idx}`}
                                key={idx}
                                title={`Title ${idx}`}
                                description="Some description"
                                media={<Image src={tennisUrl} aspectRatio="16:9" />}
                                buttonLink={
                                    <ButtonLink small href="https://google.com">
                                        Link {idx}
                                    </ButtonLink>
                                }
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
    withControls: true,
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
                                {({goNext, goPrev, bulletsProps}) => (
                                    <Inline space="between" alignItems="center">
                                        <ButtonLink small bleedLeft onPress={goPrev}>
                                            Prev
                                        </ButtonLink>
                                        <PageBullets {...bulletsProps} />
                                        <ButtonLink small bleedRight onPress={goNext}>
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
                            aria-label="Component story with context"
                            withControls={false}
                            items={Array.from({length: numItems}, (_, idx) => (
                                <MediaCard
                                    aria-label={`Carousel item ${idx}`}
                                    key={idx}
                                    title={`Title ${idx}`}
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

export const WithCarouselContextAndOutsideControls: StoryComponent<WithCarouselContextArgs> = ({
    numItems,
}) => {
    return (
        <CarouselContextProvider>
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
                                buttonLink={
                                    <ButtonLink small href="https://google.com">
                                        Link {idx}
                                    </ButtonLink>
                                }
                            />
                        ))}
                        aria-label="Component story with context and controls"
                        withBullets={false}
                        withControls={false}
                        autoplay
                    />
                    <Inline space="around">
                        <Text2 regular>Some content here</Text2>
                    </Inline>
                    <CarouselContextConsumer>
                        {({
                            goNext,
                            goPrev,
                            goToPage,
                            bulletsProps,
                            autoplayControlProps,
                            pageControlsProps,
                        }) => (
                            <Inline space="between" alignItems="center">
                                <CarouselAutoplayControl
                                    {...autoplayControlProps}
                                    onAutoplayChanged={() => {
                                        if (autoplayControlProps.isAtLastPage) {
                                            goToPage(0);
                                        }
                                        autoplayControlProps.onAutoplayChanged(
                                            !autoplayControlProps.isAutoplayEnabled
                                        );
                                    }}
                                />
                                <PageBullets {...bulletsProps} />
                                <CarouselPageControls
                                    {...pageControlsProps}
                                    goNext={goNext}
                                    goPrev={goPrev}
                                />
                            </Inline>
                        )}
                    </CarouselContextConsumer>
                </ResponsiveLayout>
            </Box>
        </CarouselContextProvider>
    );
};

WithCarouselContextAndOutsideControls.storyName = 'Carousel with CarouselContext and controls';
WithCarouselContextAndOutsideControls.parameters = {fullScreen: true};
WithCarouselContextAndOutsideControls.args = {
    numItems: 6,
};
