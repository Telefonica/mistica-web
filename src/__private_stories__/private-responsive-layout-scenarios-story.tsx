import * as React from 'react';
import {
    ResponsiveLayout,
    Slideshow,
    Hero,
    Image,
    ButtonPrimary,
    ButtonLink,
    Stack,
    Placeholder,
    Box,
    Carousel,
    MediaCard,
    Text5,
} from '..';
import {InternalResponsiveLayout, ResetResponsiveLayout} from '../responsive-layout';
import tennisUrl from '../__stories__/images/tennis.jpg';

export default {
    title: 'Private/ResponsiveLayout scenarios',
    parameters: {fullScreen: true},
};

const WithTitle = ({title, children}: {title: string; children: React.ReactNode}) => (
    <Stack space={24} dataAttributes={{testid: title}}>
        <Text5 as="div" textAlign="center">
            {title}
        </Text5>

        {children}
    </Stack>
);

export const Default: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <Stack space={24}>
                <WithTitle title="Carousel wrapped in layouts with and without fullWidth">
                    <ResponsiveLayout>
                        <ResponsiveLayout fullWidth>
                            <Carousel
                                withBullets
                                items={Array.from({length: 6}, (_, idx) => (
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
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Hero wrapped in multiple layouts">
                    <ResponsiveLayout>
                        <ResponsiveLayout>
                            <ResponsiveLayout>
                                <Hero
                                    background="default"
                                    media={<Image src={tennisUrl} aspectRatio="16:9" />}
                                    pretitle="Pretitle"
                                    title="Title"
                                    description="This is a long description with a long text to see how this works"
                                    desktopMediaPosition="right"
                                    button={
                                        <ButtonPrimary small onPress={() => {}}>
                                            Action
                                        </ButtonPrimary>
                                    }
                                    buttonLink={
                                        <ButtonLink small onPress={() => {}}>
                                            Link
                                        </ButtonLink>
                                    }
                                />
                            </ResponsiveLayout>
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Slideshow with Hero wrapped in layout">
                    <ResponsiveLayout>
                        <Slideshow
                            dataAttributes={{testid: 'slideshow'}}
                            withBullets
                            inverseBullets={false}
                            items={Array.from({length: 3}, (_, idx) => (
                                <Hero
                                    background="default"
                                    key={idx}
                                    media={<Image src={tennisUrl} aspectRatio="16:9" />}
                                    pretitle="Pretitle"
                                    title="Title"
                                    description="This is a long description with a long text to see how this works"
                                    desktopMediaPosition="right"
                                    button={
                                        <ButtonPrimary small onPress={() => {}}>
                                            Action
                                        </ButtonPrimary>
                                    }
                                    buttonLink={
                                        <ButtonLink small onPress={() => {}}>
                                            Link
                                        </ButtonLink>
                                    }
                                />
                            ))}
                        />
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Multiple nested layouts">
                    <ResponsiveLayout>
                        <ResponsiveLayout>
                            <ResponsiveLayout>
                                <Placeholder />
                            </ResponsiveLayout>
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Multiple layouts and reset">
                    <ResponsiveLayout>
                        <ResponsiveLayout>
                            <ResetResponsiveLayout>
                                <Placeholder />
                            </ResetResponsiveLayout>
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Multiple resets without layouts">
                    <ResetResponsiveLayout>
                        <ResetResponsiveLayout>
                            <ResetResponsiveLayout>
                                <Placeholder />
                            </ResetResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResetResponsiveLayout>
                </WithTitle>

                <WithTitle title="Alternated layouts and resets ending with layout">
                    <ResponsiveLayout>
                        <ResetResponsiveLayout>
                            <ResponsiveLayout>
                                <ResetResponsiveLayout>
                                    <ResponsiveLayout>
                                        <Placeholder />
                                    </ResponsiveLayout>
                                </ResetResponsiveLayout>
                            </ResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Alternated layouts and resets ending with reset">
                    <ResponsiveLayout>
                        <ResetResponsiveLayout>
                            <ResponsiveLayout>
                                <ResetResponsiveLayout>
                                    <Placeholder />
                                </ResetResponsiveLayout>
                            </ResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Layout with fullWidth">
                    <ResponsiveLayout fullWidth>
                        <Placeholder />
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Layout with fullWidth after reset">
                    <ResponsiveLayout>
                        <ResetResponsiveLayout>
                            <ResponsiveLayout fullWidth>
                                <Placeholder />
                            </ResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Layout after one with fullWidth and reset">
                    <ResponsiveLayout fullWidth>
                        <ResetResponsiveLayout>
                            <ResponsiveLayout>
                                <Placeholder />
                            </ResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>

                <WithTitle title="Internal layout expands (only in desktop)">
                    <ResponsiveLayout>
                        <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                            <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                                <Placeholder />
                            </InternalResponsiveLayout>
                        </InternalResponsiveLayout>
                    </ResponsiveLayout>
                </WithTitle>
            </Stack>
        </Box>
    );
};

Default.storyName = 'ResponsiveLayout scenarios';
