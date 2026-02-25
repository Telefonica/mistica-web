import React from 'react';
import Avatar from '../../avatar';
import figma from '@figma/code-connect';

figma.connect(
    Avatar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2725%3A4164',
    {
        props: {
            initials: figma.string('Initials'),
            badge: figma.boolean('Badge'),
            border: figma.boolean('Border'),
            size: figma.boolean('\u2264 40px', {
                true: 40,
                false: 64,
            }),
        },
        example: (props) => (
            <Avatar size={props.size} initials={props.initials} badge={props.badge} border={props.border} />
        ),
    }
);
