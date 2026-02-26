import React from 'react';
import {Carousel, CenteredCarousel, Slideshow} from '../carousel';
import figma from '@figma/code-connect';

const carouselProps = {
    autoplay: figma.boolean('Autoplay'),
    // withBullets: figma.boolean('Show bullets'),
    withControls: figma.boolean('Controls'),
};

// Desktop
figma.connect(
    Carousel,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2308%3A4703',
    {
        props: carouselProps,
        example: (props) => (
            <Carousel
                items={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>]}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

figma.connect(
    CenteredCarousel,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=29254%3A860',
    {
        props: {
            withBullets: figma.boolean('Show bullets'),
            withControls: figma.boolean('Controls'),
        },
        example: (props) => (
            <CenteredCarousel
                items={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>]}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

figma.connect(
    Slideshow,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2249%3A5240',
    {
        props: {
            autoplay: figma.boolean('Autoplay'),
            withBullets: figma.boolean('Show bullets'),
            withControls: figma.boolean('Controls'),
        },
        example: (props) => (
            <Slideshow
                items={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>]}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

// Mobile
figma.connect(
    Carousel,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4229%3A8914',
    {
        props: carouselProps,
        example: (props) => (
            <Carousel
                items={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>]}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);
