import * as React from 'react';
import {Carousel, Box, ResponsiveLayout, MediaCard, ButtonLink} from '..';

export default {
    title: 'Components/Layouts/Carousel',
    // argTypes: {
    //     numItems: {
    //         type: {name: 'number', required: true},
    //         defaultValue: 6,
    //     },
    // },
};

type Args = {
    numItems: number;
    itemsPerPageMobile: number;
    itemsPerPageDesktop: number;
    withBullets: boolean;
};

export const Default: StoryComponent<Args> = ({
    numItems,
    withBullets,
    itemsPerPageMobile,
    itemsPerPageDesktop,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Carousel
                    withBullets={withBullets}
                    itemsPerPage={{mobile: itemsPerPageMobile, desktop: itemsPerPageDesktop}}
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
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Carousel';
Default.parameters = {fullScreen: true};
Default.args = {
    withBullets: true,
    numItems: 6,
    itemsPerPageDesktop: 3,
    itemsPerPageMobile: 1,
};
