import * as React from 'react';
import {FullWidthCarousel, Stack, Box, ResponsiveLayout, Callout, IconInformationRegular, Image} from '..';
import {DisableBorderRadiusProvider} from '../image';

export default {
    title: 'Components/Carousel/FullWidthCarousel',
};

type Args = {numItems: number; autoplay: boolean; withBullets: boolean};

export const Default: StoryComponent<Args> = ({numItems, autoplay, withBullets}) => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices."
                        icon={<IconInformationRegular />}
                    />
                    <DisableBorderRadiusProvider>
                        <FullWidthCarousel
                            withBullets={withBullets}
                            autoplay={autoplay}
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
                    </DisableBorderRadiusProvider>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'FullWidthCarousel';
Default.parameters = {fullScreen: true};
Default.args = {
    numItems: 6,
    autoplay: false,
    withBullets: true,
};
