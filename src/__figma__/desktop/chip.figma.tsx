import React from 'react';
import Chip from '../../chip';
import figma from '@figma/code-connect';

figma.connect(
    Chip,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2106%3A4571',
    {
        props: {
            active: figma.boolean('Selected'),
            badge: figma.boolean('Badge'),
        },
        example: (props) => (
            <Chip active={props.active} badge={props.badge} onPress={() => {}}>
                Chip
            </Chip>
        ),
    }
);
