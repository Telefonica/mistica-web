import React from 'react';
import SkipLink from '../skip-link';
import figma from '@figma/code-connect';

figma.connect(
    SkipLink,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30245%3A13665',
    {
        props: {},
        example: () => <SkipLink targetId="main-content">Skip to main content</SkipLink>,
    }
);
