import React from 'react';
import {CoverCard} from '../card-cover';
import figma from '@figma/code-connect';

const coverCardProps = {
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
    title: figma.boolean('Title', {
        true: figma.textContent('Title'),
        false: undefined,
    }),
    pretitle: figma.boolean('Pretitle', {
        true: figma.textContent('Pretitle'),
        false: undefined,
    }),
    subtitle: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: figma.textContent('Description'),
        false: undefined,
    }),
    headline: figma.boolean('Tag', {
        true: figma.children('Tag [D]'),
        false: undefined,
    }),
    topActions: figma.boolean('Top actions', {
        true: figma.instance('Top actions'),
        false: undefined,
    }),
    asset: figma.boolean('Asset', {
        true: figma.instance('Asset'),
        false: undefined,
    }),
    actions: figma.boolean('Actions'),
    slot: figma.boolean('Slot', {
        true: figma.instance('🔄 Replace slot'),
        false: undefined,
    }),
    footerSlot: figma.boolean('Footer slot', {
        true: figma.instance('🔄 Replace footer slot'),
        false: undefined,
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
                headline={props.headline}
                pretitle={props.pretitle}
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                asset={props.asset}
                imageSrc="https://example.com/image.jpg"
                onPress={() => {}}
                topActions={props.topActions}
                slot={props.slot}
                footerSlot={props.footerSlot}
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
                headline={props.headline}
                pretitle={props.pretitle}
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                asset={props.asset}
                imageSrc="https://example.com/image.jpg"
                onPress={() => {}}
                topActions={props.topActions}
                slot={props.slot}
                footerSlot={props.footerSlot}
            />
        ),
    }
);
