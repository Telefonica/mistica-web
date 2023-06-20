import * as React from 'react';
import {Hero, ButtonPrimary, ButtonLink, Tag, Image, Placeholder, Slideshow} from '..';
import usingVrImg from './images/using-vr.jpg';

export default {
    title: 'Components/Hero/Slideshow',
};

const HeroComponent = ({idx}: {idx: number}) => {
    return (
        <Hero
            background="default"
            media={<Image src={usingVrImg} aspectRatio="16:9" />}
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
