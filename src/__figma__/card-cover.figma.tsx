import React from 'react';
import {CoverCard} from '../card-cover';
import figma from '@figma/code-connect';

const coverCardProps = {
    title: figma.boolean('Title', {
        true: 'Title',
        false: undefined,
    }),
    pretitle: figma.boolean('Pretitle', {
        true: 'Pretitle',
        false: undefined,
    }),
    subtitle: figma.boolean('Subtitle', {
        true: 'Subtitle',
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: 'Description',
        false: undefined,
    }),
    variant: figma.enum('Variant', {
        Brand: 'brand',
        Default: 'default',
        Alternative: 'alternative',
        Media: 'media',
    }),
    size: figma.enum('Size', {
        Display: 'display',
        Default: 'default',
        Snap: 'snap',
    }),
};

// Desktop
figma.connect(
    CoverCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=6921%3A7463',
    {
        props: coverCardProps,
        example: (props) => (
            <CoverCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                imageSrc="https://example.com/image.jpg"
                onPress={() => {}}
            />
        ),
    }
);

// Mobile
figma.connect(
    CoverCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=13305%3A10725',
    {
        props: coverCardProps,
        example: (props) => (
            <CoverCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                imageSrc="https://example.com/image.jpg"
                onPress={() => {}}
            />
        ),
    }
);
