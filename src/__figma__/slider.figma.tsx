import React from 'react';
import Slider from '../slider';
import figma from '@figma/code-connect';

figma.connect(
    Slider,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10556%3A9670',
    {
        props: {
            tooltip: figma.boolean('Tooltip'),
            disabled: figma.enum('State', {
                Disabled: true,
            }),
        },
        example: (props) => <Slider name="slider" tooltip={props.tooltip} disabled={props.disabled} />,
    }
);
