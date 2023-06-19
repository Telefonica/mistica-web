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
} from '..';
import tennisUrl from './images/tennis.jpg';

export default {
    title: 'Components/Carousels/Carousel',
};

type Args = {
    numItems: number;
    itemsPerPageMobile: number;
    itemsPerPageTablet: number;
    itemsPerPageDesktop: number;
    withBullets: boolean;
    free: boolean;
    itemsToScroll: number;
    autoplay: boolean;
    loop: boolean;
    initialActiveItem: number;
};

export const Default: StoryComponent<Args> = ({
    numItems,
    withBullets,
    itemsPerPageMobile,
    itemsPerPageTablet,
    itemsPerPageDesktop,
    free,
    itemsToScroll,
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
                        withBullets={withBullets}
                        free={free}
                        itemsPerPage={{
                            mobile: itemsPerPageMobile,
                            tablet: itemsPerPageTablet,
                            desktop: itemsPerPageDesktop,
                        }}
                        itemsToScroll={itemsToScroll}
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
Default.args = {
    withBullets: true,
    numItems: 6,
    itemsPerPageDesktop: 3,
    itemsPerPageTablet: 2,
    itemsPerPageMobile: 1,
    free: false,
    autoplay: false,
    loop: false,
    itemsToScroll: 0,
    initialActiveItem: 0,
};
