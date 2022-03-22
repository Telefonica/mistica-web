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
    SectionTitle,
    Text2,
    Image,
} from '..';

export default {
    title: 'Components/Carousel/Carousel',
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

export const Default: StoryComponent<Args> = ({
    numItems,
    withBullets,
    itemsPerPageMobile,
    itemsPerPageDesktop,
    nextPageOffset,
    prevPageOffset,
    free,
    itemsToScroll,
    autoplay,
    loop,
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
                        itemsPerPage={{mobile: itemsPerPageMobile, desktop: itemsPerPageDesktop}}
                        itemsToScroll={itemsToScroll}
                        autoplay={autoplay ? {time: 5000, loop} : false}
                        mobilePageOffset={{next: nextPageOffset, prev: prevPageOffset}}
                        onPageChange={setPageInfo}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <MediaCard
                                aria-label={`Carousel item ${idx}`}
                                key={idx}
                                title={`Title ${idx}`}
                                description="Some description"
                                media={<Image src="https://i.imgur.com/flZfkiX.png" aspectRatio="16:9" />}
                                buttonLink={<ButtonLink href="https://google.com">Link {idx}</ButtonLink>}
                            />
                        ))}
                    />
                    <Stack space={8}>
                        <SectionTitle as="h2">Current page info</SectionTitle>
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
    withBullets: true,
    numItems: 6,
    itemsPerPageDesktop: 3,
    itemsPerPageMobile: 1,
    nextPageOffset: 16,
    prevPageOffset: 16,
    free: false,
    autoplay: false,
    loop: false,
    itemsToScroll: 0,
};
