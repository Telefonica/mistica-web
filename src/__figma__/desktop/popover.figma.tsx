import React from 'react';
import Popover from '../../popover';
import figma from '@figma/code-connect';

figma.connect(
    Popover,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1205%3A4167',
    {
        props: {
            title: figma.boolean('Title', {
                true: 'Title',
                false: undefined,
            }),
            description: figma.boolean('Description', {
                true: 'Description',
                false: undefined,
            }),
            position: figma.enum('Position', {
                Bottom: 'bottom',
                Left: 'left',
                Top: 'top',
                Right: 'right',
            }),
        },
        example: (props) => (
            <Popover
                target={<span>Target element</span>}
                title={props.title}
                description={props.description}
                position={props.position}
            />
        ),
    }
);
