import React from 'react';
import EmailField from '../email-field';
import figma from '@figma/code-connect';

const emailFieldProps = {
    label: figma.textContent('Label'),
    helperText: figma.boolean('Helper text', {
        true: figma.textContent('Helper text'),
        false: undefined,
    }),
    error: figma.boolean('Error'),
    disabled: figma.boolean('Disabled'),
    readOnly: figma.boolean('Read only'),
};

// Desktop
figma.connect(
    EmailField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=31751%3A7427',
    {
        props: emailFieldProps,
        example: (props) => (
            <EmailField
                label={props.label}
                name="email-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);

// Mobile
figma.connect(
    EmailField,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=58756%3A3459',
    {
        props: emailFieldProps,
        example: (props) => (
            <EmailField
                label={props.label}
                name="email-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
