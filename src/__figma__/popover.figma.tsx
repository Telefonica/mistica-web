import React from 'react';
import Popover from '../popover';
import figma from '@figma/code-connect';

const popoverProps = {
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
};

// Desktop
figma.connect(
    Popover,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1205%3A4167',
    {
        props: popoverProps,
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

// Mobile
figma.connect(
    Popover,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=809%3A6216',
    {
        props: popoverProps,
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
