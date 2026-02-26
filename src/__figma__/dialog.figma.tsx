import React from 'react';
import Dialog from '../dialog';
import figma from '@figma/code-connect';

// Confirm dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5689%3A4566',
    {
        props: {
            title: figma.boolean('Title', {
                true: 'Title',
                false: undefined,
            }),
        },
        example: (props) => (
            <Dialog
                type="confirm"
                title={props.title}
                message="Message"
                acceptText="Accept"
                cancelText="Cancel"
                onAccept={() => {}}
                onCancel={() => {}}
            />
        ),
    }
);

// Alert dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1217%3A4059',
    {
        props: {
            title: figma.boolean('Title', {
                true: 'Title',
                false: undefined,
            }),
        },
        example: (props) => (
            <Dialog
                type="alert"
                title={props.title}
                message="Message"
                acceptText="Accept"
                onAccept={() => {}}
            />
        ),
    }
);

// Extended dialog
figma.connect(
    Dialog,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5680%3A5004',
    {
        props: {
            subtitle: figma.boolean('Subtitle', {
                true: 'Subtitle',
                false: undefined,
            }),
            description: figma.boolean('Description', {
                true: 'Description',
                false: undefined,
            }),
        },
        example: (props) => (
            <Dialog
                type="dialog"
                title="Title"
                subtitle={props.subtitle}
                message="Message"
                acceptText="Accept"
                onAccept={() => {}}
            />
        ),
    }
);
