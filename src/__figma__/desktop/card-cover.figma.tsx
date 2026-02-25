import React from 'react';
import {CoverCard} from '../../card-cover';
import figma from '@figma/code-connect';

figma.connect(
    CoverCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=6921%3A7463',
    {
        props: {
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
        },
        example: (props) => (
            <CoverCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                backgroundSrc="https://example.com/image.jpg"
                onPress={() => {}}
            />
        ),
    }
);
