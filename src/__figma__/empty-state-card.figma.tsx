import React from 'react';
import EmptyStateCard from '../empty-state-card';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    EmptyStateCard,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=846%3A4162',
    {
        props: {},
        example: () => (
            <EmptyStateCard
                title="Title"
                description="Description"
                imageUrl="https://example.com/image.jpg"
            />
        ),
    }
);

// Mobile
figma.connect(
    EmptyStateCard,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=846%3A4162',
    {
        props: {},
        example: () => (
            <EmptyStateCard
                title="Title"
                description="Description"
                imageUrl="https://example.com/image.jpg"
            />
        ),
    }
);
