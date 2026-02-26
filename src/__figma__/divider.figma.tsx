import React from 'react';
import Divider from '../divider';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    Divider,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1646%3A5384',
    {
        props: {},
        example: () => <Divider />,
    }
);

// Mobile
figma.connect(
    Divider,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2197%3A7637',
    {
        props: {},
        example: () => <Divider />,
    }
);
