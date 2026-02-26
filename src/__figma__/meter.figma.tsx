import React from 'react';
import Meter from '../meter';
import figma from '@figma/code-connect';

figma.connect(
    Meter,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=22685%3A442',
    {
        props: {
            reverse: figma.boolean('Reverse'),
        },
        example: (props) => <Meter values={[50, 30, 20]} reverse={props.reverse} />,
    }
);
