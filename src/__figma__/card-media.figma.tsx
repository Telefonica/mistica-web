import React from 'react';
import {MediaCard} from '../card-media';
import figma from '@figma/code-connect';

const mediaCardProps = {
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
    }),
    size: figma.enum('Size', {
        Default: 'default',
        Display: 'display',
        Snap: 'snap',
    }),
};

// Desktop
figma.connect(
    MediaCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=6886%3A6507',
    {
        props: mediaCardProps,
        example: (props) => (
            <MediaCard
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
    MediaCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=12965%3A8421',
    {
        props: mediaCardProps,
        example: (props) => (
            <MediaCard
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
