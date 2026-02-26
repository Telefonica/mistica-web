import React from 'react';
import Meter from '../meter';
import figma from '@figma/code-connect';

const meterProps = {
    reverse: figma.boolean('Reverse'),
};

// Desktop
figma.connect(
    Meter,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=22685%3A442',
    {
        props: meterProps,
        example: (props) => <Meter values={[50, 30, 20]} reverse={props.reverse} />,
    }
);

// Mobile
figma.connect(
    Meter,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=46432%3A4971',
    {
        props: meterProps,
        example: (props) => <Meter values={[50, 30, 20]} reverse={props.reverse} />,
    }
);
