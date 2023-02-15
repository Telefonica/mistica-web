import * as React from 'react';
import {Hero, ButtonPrimary, ButtonLink, Tag, Image, Placeholder, Slideshow} from '..';

export default {
    title: 'Components/Hero/Slideshow',
};

const HeroComponent = () => {
    return (
        <Hero
            background="default"
            media={
                <Image
                    src="https://api.lorem.space/image/furniture?w=1500&h=1500&hash=8B7BCDC2"
                    aspectRatio="16:9"
                    noBorderRadius
                    height="100%"
                />
            }
            headline={<Tag type="active">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="This is a long description with a long text to see how this works"
            extra={<Placeholder />}
            button={<ButtonPrimary fake>Action</ButtonPrimary>}
            buttonLink={<ButtonLink href="#">Link</ButtonLink>}
            desktopMediaPosition="right"
        />
    );
};

export const Default: StoryComponent = () => (
    <Slideshow
        withBullets
        inverseBullets={false}
        dataAttributes={{testid: 'hero'}}
        items={Array.from({length: 3}).map(() => (
            <HeroComponent />
        ))}
    />
);

Default.storyName = 'Slideshow';
