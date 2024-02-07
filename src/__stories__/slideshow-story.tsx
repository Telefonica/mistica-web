import * as React from 'react';
import {
    Slideshow,
    Stack,
    Box,
    ResponsiveLayout,
    Callout,
    IconInformationRegular,
    Image,
    Text4,
    CarouselContextConsummer,
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
                                src={idx % 2 === 0 ? mechanicStairsImg : surfaceInSofaImg}
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

type WithCarouselContextArgs = {numItems: number};

export const WithCarouselContext: StoryComponent<WithCarouselContextArgs> = ({numItems}) => {
    return (
        <CarouselContextProvider>
            <FixedFooterLayout
                footer={
                    <ResponsiveLayout>
                        <Box paddingY={16}>
                            <CarouselContextConsummer>
                                {({goNext, goPrev, bulletsProps}) => (
                                    <Inline space="between" alignItems="center">
                                        <ButtonLink bleedLeft onPress={goPrev}>
                                            Prev
                                        </ButtonLink>
                                        <PageBullets {...bulletsProps} />
                                        <ButtonLink bleedRight onPress={goNext}>
                                            Next
                                        </ButtonLink>
                                    </Inline>
                                )}
                            </CarouselContextConsummer>
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
