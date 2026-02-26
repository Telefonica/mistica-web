import React from 'react';
import Tag from '../tag';
import figma from '@figma/code-connect';

const tagProps = {
    type: figma.enum('State', {
        Active: 'active',
        Inactive: 'inactive',
        Promo: 'promo',
        Info: 'info',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
    }),
    badge: figma.boolean('Badge'),
};

// Desktop
figma.connect(
    Tag,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=47%3A4538',
    {
        props: tagProps,
        example: (props) => (
            <Tag type={props.type} badge={props.badge}>
                Tag
            </Tag>
        ),
    }
);

// Mobile
figma.connect(
    Tag,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=47%3A4538',
    {
        props: tagProps,
        example: (props) => (
            <Tag type={props.type} badge={props.badge}>
                Tag
            </Tag>
        ),
    }
);
