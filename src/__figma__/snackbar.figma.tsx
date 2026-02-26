import React from 'react';
import Snackbar from '../snackbar';
import figma from '@figma/code-connect';

figma.connect(
    Snackbar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=302%3A5497',
    {
        props: {
            withDismiss: figma.boolean('Dismiss'),
            type: figma.enum('Type', {
                Informative: 'INFORMATIVE',
                Critical: 'CRITICAL',
            }),
            buttonText: figma.boolean('Action', {
                true: 'Action',
                false: undefined,
            }),
            duration: figma.enum('Duration', {
                Infinite: 'PERSISTENT',
            }),
        },
        example: (props) => (
            <Snackbar
                message="Snackbar message"
                type={props.type}
                buttonText={props.buttonText}
                duration={props.duration}
                withDismiss={props.withDismiss}
            />
        ),
    }
);
