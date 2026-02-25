import React from 'react';
import Circle from '../../circle';
import figma from '@figma/code-connect';

figma.connect(
    Circle,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=569%3A6503',
    {
        props: {
            border: figma.boolean('Border'),
        },
        example: (props) => (
            <Circle size={40} backgroundColor="brandLow" border={props.border}>
                Content
            </Circle>
        ),
    }
);
