import * as React from 'react';
import {ResponsiveLayout, Slideshow, Hero, Image, ButtonPrimary, ButtonLink} from '..';
import usingVrImg from '../__stories__/images/using-vr.jpg';

export default {
    title: 'Private/Hero with nested responsiveLayouts',
    parameters: {fullScreen: true},
};

export const Default: StoryComponent = () => {
    return (
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
    );
};

Default.storyName = 'Hero with nested responsiveLayouts';
