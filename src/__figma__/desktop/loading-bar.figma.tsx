import React from 'react';
import LoadingBar from '../../loading-bar';
import figma from '@figma/code-connect';

figma.connect(
    LoadingBar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=0%3A2450',
    {
        props: {},
        example: () => <LoadingBar visible />,
    }
);
