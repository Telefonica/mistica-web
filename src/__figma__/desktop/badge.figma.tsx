import React from 'react';
import Badge from '../../badge';
import figma from '@figma/code-connect';

figma.connect(
    Badge,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2817%3A4076',
    {
        props: {},
        example: () => <Badge value={5}>{/* Content */}</Badge>,
    }
);
