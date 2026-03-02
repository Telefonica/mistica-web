import React from 'react';
import Hero from '../hero';
import Image from '../image';
import figma from '@figma/code-connect';

const heroProps = {
    background: figma.enum('Background', {
        Default: 'default',
        Brand: 'brand',
        'Brand Secondary': 'brand-secondary',
        Alternative: 'alternative',
    }),
    // desktopMediaPosition: figma.enum('Image position', {
    //     Right: 'right',
    //     Left: 'left',
    // }),
    noPaddingY: figma.boolean('NoPaddingY'),
};

// Desktop
figma.connect(
    Hero,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8164%3A8736',
    {
        props: heroProps,
        example: (props) => (
            <Hero
                background={props.background}
                media={<Image src="https://example.com/image.jpg" aspectRatio="16:9" />}
                title="Title"
                description="Description"
                desktopMediaPosition={props.desktopMediaPosition}
                noPaddingY={props.noPaddingY}
            />
        ),
    }
);

// Mobile
figma.connect(
    Hero,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15890%3A11120',
    {
        props: heroProps,
        example: (props) => (
            <Hero
                background={props.background}
                media={<Image src="https://example.com/image.jpg" aspectRatio="16:9" />}
                title="Title"
                description="Description"
                desktopMediaPosition={props.desktopMediaPosition}
                noPaddingY={props.noPaddingY}
            />
        ),
    }
);
