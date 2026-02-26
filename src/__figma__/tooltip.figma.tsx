import React from 'react';
import Tooltip from '../tooltip';
import figma from '@figma/code-connect';

figma.connect(
    Tooltip,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1636%3A5385',
    {
        props: {
            description: figma.boolean('Description', {
                true: figma.string('Description Text'),
                false: undefined,
            }),
            title: figma.boolean('Title', {
                true: figma.string('Title Text'),
                false: undefined,
            }),
            delay: figma.boolean('Delay'),
            position: figma.enum('Arrow position', {
                '↑ Top': 'top',
                '→ Right': 'right',
                '↓ Bottom': 'bottom',
                '← Left': 'left',
            }),
        },
        example: (props) => (
            <Tooltip
                target={<span>Target element</span>}
                title={props.title}
                description={props.description}
                position={props.position}
                delay={props.delay}
            />
        ),
    }
);
