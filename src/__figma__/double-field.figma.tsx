import React from 'react';
import DoubleField from '../double-field';
import figma from '@figma/code-connect';

figma.connect(
    DoubleField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2669%3A4139',
    {
        props: {
            layout: figma.enum('Layout', {
                '50/50': '50/50',
                '40/60': '40/60',
                '60/40': '60/40',
            }),
        },
        example: (props) => <DoubleField layout={props.layout}>{/* Two field components */}</DoubleField>,
    }
);
