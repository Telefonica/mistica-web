import React from 'react';
import {DataCard} from '../card-data';
import figma from '@figma/code-connect';

const dataCardProps = {
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
    DataCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=6886%3A6535',
    {
        props: dataCardProps,
        example: (props) => (
            <DataCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                onPress={() => {}}
            />
        ),
    }
);

// Mobile
figma.connect(
    DataCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=12965%3A8508',
    {
        props: dataCardProps,
        example: (props) => (
            <DataCard
                title={props.title}
                pretitle={props.pretitle}
                subtitle={props.subtitle}
                description={props.description}
                variant={props.variant}
                size={props.size}
                onPress={() => {}}
            />
        ),
    }
);
