import React from 'react';
import Divider from '../divider';
import figma from '@figma/code-connect';

figma.connect(
    Divider,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1646%3A5384',
    {
        props: {},
        example: () => <Divider />,
    }
);
