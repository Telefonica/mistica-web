import React from 'react';
import SkipLink from '../skip-link';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    SkipLink,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30245%3A13665',
    {
        props: {},
        example: () => <SkipLink targetId="main-content">Skip to main content</SkipLink>,
    }
);

// Mobile
figma.connect(
    SkipLink,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=55911%3A14307',
    {
        props: {},
        example: () => <SkipLink targetId="main-content">Skip to main content</SkipLink>,
    }
);
