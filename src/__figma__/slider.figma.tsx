import React from 'react';
import Slider from '../slider';
import figma from '@figma/code-connect';

const sliderProps = {
    tooltip: figma.boolean('Tooltip'),
    disabled: figma.enum('State', {
        Disabled: true,
    }),
};

// Desktop
figma.connect(
    Slider,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10556%3A9670',
    {
        props: sliderProps,
        example: (props) => <Slider name="slider" tooltip={props.tooltip} disabled={props.disabled} />,
    }
);

// Mobile
figma.connect(
    Slider,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2373%3A8535',
    {
        props: sliderProps,
        example: (props) => <Slider name="slider" tooltip={props.tooltip} disabled={props.disabled} />,
    }
);
