import * as React from 'react';
import {ResponsiveLayout, Box, Slideshow, Hero, Image, ButtonPrimary, ButtonLink} from '..';
import usingVrImg from '../__stories__/images/using-vr.jpg';

export default {
    title: 'Private/Hero with nested responsiveLayouts',
};

export const Default: StoryComponent = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Slideshow
                    dataAttributes={{testid: 'slideshow'}}
                    items={Array.from({length: 3}, (_, idx) => (
                        <Hero
                            background="default"
                            height="500px"
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
        </Box>
    );
};

Default.storyName = 'Hero with nested responsiveLayouts';
