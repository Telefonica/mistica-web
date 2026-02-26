import React from 'react';
import Tooltip from '../tooltip';
import figma from '@figma/code-connect';

const tooltipProps = {
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
        '\u2191 Top': 'top',
        '\u2192 Right': 'right',
        '\u2193 Bottom': 'bottom',
        '\u2190 Left': 'left',
    }),
};

// Desktop
figma.connect(
    Tooltip,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1636%3A5385',
    {
        props: tooltipProps,
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

// Mobile
figma.connect(
    Tooltip,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2147%3A7654',
    {
        props: tooltipProps,
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
