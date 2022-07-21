import * as React from 'react';
import {Slideshow, Stack, Box, ResponsiveLayout, Callout, IconInformationRegular, Image, Text4} from '..';

export default {
    title: 'Components/Carousels/Slideshow',
};

type Args = {numItems: number; autoplay: boolean; loop: boolean; withBullets: boolean};

export const Default: StoryComponent<Args> = ({numItems, autoplay, loop, withBullets}) => {
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices."
                        icon={<IconInformationRegular />}
                    />
                    <Slideshow
                        withBullets={withBullets}
                        autoplay={autoplay ? {time: 5000, loop} : false}
                        onPageChange={setCurrentPage}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <Image
                                src={
                                    idx % 2 === 0
                                        ? 'https://i.imgur.com/HRvhZ6F.jpeg'
                                        : 'https://i.imgur.com/flZfkiX.png'
                                }
                                aspectRatio="16:9"
                            />
                        ))}
                    />
                    <Text4 regular>Page {currentPage}</Text4>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Slideshow';
Default.parameters = {fullScreen: true};
Default.args = {
    numItems: 6,
    autoplay: false,
    loop: false,
    withBullets: true,
};
