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
} from '..';
import {InternalResponsiveLayout, ResetResponsiveLayout} from '../responsive-layout';
import usingVrImg from '../__stories__/images/using-vr.jpg';

export default {
    title: 'Private/ResponsiveLayout scenarios',
    parameters: {fullScreen: true},
};

export const Default: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <Stack space={24}>
                {/** Multiple layouts */}
                <ResponsiveLayout>
                    <ResponsiveLayout>
                        <ResponsiveLayout>
                            <Placeholder />
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </ResponsiveLayout>

                {/** Multiple layouts and reset */}
                <ResponsiveLayout>
                    <ResponsiveLayout>
                        <ResetResponsiveLayout>
                            <Placeholder />
                        </ResetResponsiveLayout>
                    </ResponsiveLayout>
                </ResponsiveLayout>

                {/** Reset without layout */}
                <ResetResponsiveLayout>
                    <Placeholder />
                </ResetResponsiveLayout>

                {/** Multiple resets without layouts */}
                <ResetResponsiveLayout>
                    <ResetResponsiveLayout>
                        <ResetResponsiveLayout>
                            <Placeholder />
                        </ResetResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResetResponsiveLayout>

                {/** Alternate layouts and resets ending with layout */}
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

                {/** Alternate layouts and resets ending with reset */}
                <ResponsiveLayout>
                    <ResetResponsiveLayout>
                        <ResponsiveLayout>
                            <ResetResponsiveLayout>
                                <Placeholder />
                            </ResetResponsiveLayout>
                        </ResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResponsiveLayout>

                {/** Alternate layouts and resets with multiple repetitions ending with layout */}
                <ResponsiveLayout>
                    <ResetResponsiveLayout>
                        <ResetResponsiveLayout>
                            <ResponsiveLayout>
                                <ResponsiveLayout>
                                    <ResponsiveLayout>
                                        <ResetResponsiveLayout>
                                            <ResponsiveLayout>
                                                <ResponsiveLayout>
                                                    <Placeholder />
                                                </ResponsiveLayout>
                                            </ResponsiveLayout>
                                        </ResetResponsiveLayout>
                                    </ResponsiveLayout>
                                </ResponsiveLayout>
                            </ResponsiveLayout>
                        </ResetResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResponsiveLayout>

                {/** Layout with fullWidth */}
                <ResponsiveLayout fullWidth>
                    <Placeholder />
                </ResponsiveLayout>

                {/** Layout with fullWidth after reset */}
                <ResponsiveLayout>
                    <ResetResponsiveLayout>
                        <ResponsiveLayout fullWidth>
                            <Placeholder />
                        </ResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResponsiveLayout>

                {/** Layout after fullWidth and reset */}
                <ResponsiveLayout fullWidth>
                    <ResetResponsiveLayout>
                        <ResponsiveLayout>
                            <Placeholder />
                        </ResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResponsiveLayout>

                {/** Internal layout expands (desktop) */}
                <ResponsiveLayout>
                    <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                        <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                            <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                                <Placeholder />
                            </InternalResponsiveLayout>
                        </InternalResponsiveLayout>
                    </InternalResponsiveLayout>
                </ResponsiveLayout>

                {/** Internal layout doesn't expand after reset (desktop) */}
                <ResponsiveLayout>
                    <ResetResponsiveLayout>
                        <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                            <Placeholder />
                        </InternalResponsiveLayout>
                    </ResetResponsiveLayout>
                </ResponsiveLayout>

                {/** Hero wrapped in multiple layouts */}
                <ResponsiveLayout>
                    <ResponsiveLayout>
                        <ResponsiveLayout>
                            <Hero
                                background="default"
                                media={<Image src={usingVrImg} aspectRatio="16:9" />}
                                pretitle="Pretitle"
                                title="Title"
                                description="This is a long description with a long text to see how this works"
                                desktopMediaPosition="right"
                                button={
                                    <ButtonPrimary small onPress={() => {}}>
                                        Action
                                    </ButtonPrimary>
                                }
                                buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
                            />
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </ResponsiveLayout>

                {/** Slideshow with Hero wrapped in layout */}
                <ResponsiveLayout>
                    <Slideshow
                        dataAttributes={{testid: 'slideshow'}}
                        withBullets
                        inverseBullets={false}
                        items={Array.from({length: 3}, (_, idx) => (
                            <Hero
                                background="default"
                                key={idx}
                                media={<Image src={usingVrImg} aspectRatio="16:9" />}
                                pretitle="Pretitle"
                                title="Title"
                                description="This is a long description with a long text to see how this works"
                                desktopMediaPosition="right"
                                button={
                                    <ButtonPrimary small onPress={() => {}}>
                                        Action
                                    </ButtonPrimary>
                                }
                                buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
                            />
                        ))}
                    />
                </ResponsiveLayout>

                {/** Carousel with alternating fullWidth and not fullWidth layouts */}
                <ResponsiveLayout>
                    <ResponsiveLayout fullWidth>
                        <ResponsiveLayout>
                            <ResponsiveLayout fullWidth>
                                <ResponsiveLayout>
                                    <ResponsiveLayout fullWidth>
                                        <Carousel
                                            withBullets
                                            items={Array.from({length: 6}, (_, idx) => (
                                                <MediaCard
                                                    title={'Card ' + idx}
                                                    description="Description"
                                                    media={
                                                        <Image
                                                            src="https://source.unsplash.com/1600x900/?watch"
                                                            aspectRatio="16:9"
                                                        />
                                                    }
                                                    button={
                                                        <ButtonPrimary small onPress={() => {}}>
                                                            Action
                                                        </ButtonPrimary>
                                                    }
                                                    buttonLink={
                                                        <ButtonLink onPress={() => {}}>Link</ButtonLink>
                                                    }
                                                />
                                            ))}
                                        />
                                    </ResponsiveLayout>
                                </ResponsiveLayout>
                            </ResponsiveLayout>
                        </ResponsiveLayout>
                    </ResponsiveLayout>
                </ResponsiveLayout>
            </Stack>
        </Box>
    );
};

Default.storyName = 'ResponsiveLayout scenarios';
