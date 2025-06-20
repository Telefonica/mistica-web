import * as React from 'react';
import {
    Slideshow,
    Stack,
    Box,
    ResponsiveLayout,
    Image,
    Text4,
    CarouselContextConsumer,
    CarouselContextProvider,
    FixedFooterLayout,
    Inline,
    ButtonLink,
    PageBullets,
} from '..';
import mechanicStairsImg from './images/mechanic-stairs.jpg';
import surfaceInSofaImg from './images/surface-in-sofa.jpg';

export default {
    title: 'Components/Carousels/Slideshow',
};

type Args = {numItems: number; autoplay: boolean; loop: boolean; bullets: boolean; withControls: boolean};

export const Default: StoryComponent<Args> = ({numItems, autoplay, loop, bullets, withControls}) => {
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Slideshow
                        withBullets={bullets}
                        autoplay={autoplay ? {time: 5000, loop} : false}
                        onPageChange={setCurrentPage}
                        items={Array.from({length: numItems}, (_, idx) => (
                            <Image
                                src={idx % 2 === 0 ? mechanicStairsImg : surfaceInSofaImg}
                                aspectRatio="16:9"
                            />
                        ))}
                        withControls={withControls}
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
    bullets: true,
    withControls: true,
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
                        <Slideshow
                            items={Array.from({length: numItems}, (_, idx) => (
                                <Image
                                    src={idx % 2 === 0 ? mechanicStairsImg : surfaceInSofaImg}
                                    aspectRatio="16:9"
                                />
                            ))}
                            withControls={false}
                            withBullets={false}
                        />
                    </ResponsiveLayout>
                </Box>
            </FixedFooterLayout>
        </CarouselContextProvider>
    );
};

WithCarouselContext.storyName = 'Slideshow with CarouselContext';
WithCarouselContext.parameters = {fullScreen: true};
WithCarouselContext.args = {
    numItems: 6,
};
