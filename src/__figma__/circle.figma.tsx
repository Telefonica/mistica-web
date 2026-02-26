import React from 'react';
import Circle from '../circle';
import figma from '@figma/code-connect';

const circleProps = {
    border: figma.boolean('Border'),
};

// Desktop
figma.connect(
    Circle,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=569%3A6503',
    {
        props: circleProps,
        example: (props) => (
            <Circle size={40} backgroundColor="brandLow" border={props.border}>
                Content
            </Circle>
        ),
    }
);

// Mobile
figma.connect(
    Circle,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=19075%3A9350',
    {
        props: circleProps,
        example: (props) => (
            <Circle size={40} backgroundColor="brandLow" border={props.border}>
                Content
            </Circle>
        ),
    }
);
