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
                                        ? 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                                        : 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
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
