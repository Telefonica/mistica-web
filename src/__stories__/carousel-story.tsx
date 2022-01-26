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
}) => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices"
                        icon={<IconInformationRegular />}
                    />
                    <Carousel
                        withBullets={withBullets}
                        free={free}
                        itemsPerPage={{mobile: itemsPerPageMobile, desktop: itemsPerPageDesktop}}
                        itemsToScroll={itemsToScroll}
                        mobilePageOffset={{next: nextPageOffset, prev: prevPageOffset}}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <MediaCard
                                key={idx}
                                title={`Title ${idx}`}
                                description="Some description"
                                media={{
                                    src: 'https://i.imgur.com/flZfkiX.png',
                                }}
                                buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                            />
                        ))}
                    />
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
    itemsToScroll: 0,
};
