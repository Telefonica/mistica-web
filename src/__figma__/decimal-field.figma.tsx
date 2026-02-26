import React from 'react';
import DecimalField from '../decimal-field';
import figma from '@figma/code-connect';

const decimalFieldProps = {
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
    DecimalField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A7443',
    {
        props: decimalFieldProps,
        example: (props) => (
            <DecimalField
                label={props.label}
                name="decimal-field"
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
    DecimalField,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15432%3A9071',
    {
        props: decimalFieldProps,
        example: (props) => (
            <DecimalField
                label={props.label}
                name="decimal-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
