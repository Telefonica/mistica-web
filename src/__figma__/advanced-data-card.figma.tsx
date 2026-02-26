import React from 'react';
import AdvancedDataCard from '../community/advanced-data-card';
import figma from '@figma/code-connect';

figma.connect(
    AdvancedDataCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10668',
    {
        props: {
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
        },
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
