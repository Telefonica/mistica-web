import React from 'react';
import AdvancedDataCard from '../../community/advanced-data-card';
import figma from '@figma/code-connect';

const advancedDataCardProps = {
    title: figma.boolean('Title', {
        true: 'Title',
        false: undefined,
    }),
    subtitle: figma.boolean('Subtitle', {
        true: 'Subtitle',
        false: undefined,
    }),
    pretitle: figma.boolean('Pretitle', {
        true: 'Pretitle',
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: 'Description',
        false: undefined,
    }),
};

// Desktop
figma.connect(
    AdvancedDataCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10668',
    {
        props: advancedDataCardProps,
        example: (props) => (
            <AdvancedDataCard
                title={props.title}
                subtitle={props.subtitle}
                pretitle={props.pretitle}
                description={props.description}
            />
        ),
    }
);

// Mobile
figma.connect(
    AdvancedDataCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=22670%3A11143',
    {
        props: advancedDataCardProps,
        example: (props) => (
            <AdvancedDataCard
                title={props.title}
                subtitle={props.subtitle}
                pretitle={props.pretitle}
                description={props.description}
            />
        ),
    }
);
