import React from 'react';
import LoadingBar from '../loading-bar';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    LoadingBar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=0%3A2450',
    {
        props: {},
        example: () => <LoadingBar visible />,
    }
);

// Mobile
figma.connect(
    LoadingBar,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=0%3A2450',
    {
        props: {},
        example: () => <LoadingBar visible />,
    }
);
