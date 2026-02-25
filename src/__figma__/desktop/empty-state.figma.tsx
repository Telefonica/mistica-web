import React from 'react';
import EmptyState from '../../empty-state';
import figma from '@figma/code-connect';

figma.connect(
    EmptyState,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=765%3A53',
    {
        props: {},
        example: () => (
            <EmptyState title="Title" description="Description" imageUrl="https://example.com/image.png" />
        ),
    }
);
