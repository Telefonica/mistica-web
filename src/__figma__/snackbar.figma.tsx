import React from 'react';
import Snackbar from '../snackbar';
import figma from '@figma/code-connect';

const snackbarProps = {
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
};

// Desktop
figma.connect(
    Snackbar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=302%3A5497',
    {
        props: snackbarProps,
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

// Mobile
figma.connect(
    Snackbar,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=6102%3A8009',
    {
        props: snackbarProps,
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
