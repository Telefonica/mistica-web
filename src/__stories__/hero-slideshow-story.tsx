import * as React from 'react';
import {Hero, ButtonPrimary, ButtonLink, Tag, Image, Placeholder, Slideshow} from '..';

export default {
    title: 'Components/Hero/Slideshow',
    parameters: {
        fullScreen: true,
    },
};

const HeroComponent = ({idx}: {idx: number}) => {
    return (
        <Hero
            background="default"
            media={
                <Image
                    src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                    aspectRatio="16:9"
                />
            }
            headline={<Tag type="active">Headline</Tag>}
            pretitle="Pretitle"
            title="Title"
            description="This is a long description with a long text to see how this works"
            extra={idx === 1 ? <Placeholder /> : undefined}
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
        items={Array.from({length: 3}).map((_, idx) => (
            <HeroComponent idx={idx} key={idx} />
        ))}
    />
);

Default.storyName = 'Slideshow';
