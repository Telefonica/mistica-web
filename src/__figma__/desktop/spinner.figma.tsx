import React from 'react';
import Spinner from '../../spinner';
import figma from '@figma/code-connect';

figma.connect(
    Spinner,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=809%3A5303',
    {
        props: {},
        example: () => <Spinner />,
    }
);
